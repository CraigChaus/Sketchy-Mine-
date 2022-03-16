import debug from 'debug';
import randomWords from 'random-words';
import { getIO } from '..';
import { Teams } from '../../../data/teams';
import { broadcastTeamSpecificGuesses, sendProgress, sendResult } from '../handlers/guessHandler';

const dbg = debug('state');

const ROUND_DURATION = 30;
const teamGuesses = [];

/**
 * List of words that can be used for guessing
 * for now, 10000 random words will be stored
*/

const wordBank = randomWords(10000);

/**
 * Get random word to guess
 * @returns Random word from the word bank
 */
export const getRandomWord = () => {
  const nextWordIndex = Math.floor(Math.random() * wordBank.length);
  const nextWord = wordBank[nextWordIndex];
  return nextWord;
};

/**
 * Storage for game round state
 */
const defaultState = {
  currentWord: null,
  roundTime: null,
};

/**
 * Get the game state with the current word to guess and with the round's remaining time
 */
export const gameState = JSON.parse(JSON.stringify(defaultState));

/**
 * Get the guesses to be sent for a user over the socket
 * @param {String} username Username of the user who submitted a guess
 * @returns An array of guess object that the frontend needs
 */
export const getGuesses = (username) => {
  const guesses = [];
  // Get the user's team
  const currentTeam = Teams.find((t) => t.members.find((m) => m.username === username));
  if (!currentTeam) return guesses;
  // Find the team's guess dataset
  const teamGuessData = teamGuesses.find((t) => t.teamname === currentTeam.teamname);

  if (teamGuessData) {
    // Fill out the guesses array with the guesses to be sent
    teamGuessData.guesses.forEach((g) => guesses.push({ value: g.guess, frequency: g.freq }));
  }
  return guesses;
};

/**
 * Add a new guess.
 * This function will make sure to add a user's guess to the team guesses database
 * @param {String} username Username of the user who submitted a guess
 * @param {String} guess The user's guess to add
 */
export const addGuess = (username, guess) => {
  // We check to which team the user belongs
  const currentTeam = Teams.find((t) => t.members.find((m) => m.username === username));
  if (!teamGuesses.some((t) => t.teamname === currentTeam.teamname)) {
    // This section executes if the team guesses database doesn't contain the team yet
    const guessObj = { guess, freq: 1, usernames: [username] };
    const teamObj = { teamname: currentTeam.teamname, guesses: [guessObj] };
    currentTeam.lastGuessSubmit = new Date();
    teamGuesses.push(teamObj); // Add the new team with the new guess
  } else {
    // If we already have the team
    teamGuesses.forEach((t) => {
      if (t.teamname === currentTeam.teamname) { // Only modify the user's team's guesses
        // We make sure with the code below that a user can only have one guess submitted
        t.guesses = t.guesses.filter((g) => !g.usernames.includes(username));
        // We check if the team guesses already has the new guess to add
        const found = t.guesses.some((g) => g.guess === guess);
        if (!found) {
          t.guesses.push({ guess, freq: 1, usernames: [username] });
          // Update the last guess time for the team placement at the end of the round
          currentTeam.lastGuessSubmit = new Date();
        } else {
          t.guesses.forEach((g) => {
            if (g.guess === guess && !g.usernames.includes(username)) {
              g.freq += 1;
              g.usernames.push(username);
              // Update the last guess time for the team placement at the end of the round
              currentTeam.lastGuessSubmit = new Date();
            }
          });
        }
      }
    });
  }
};

/**
 * Get the current word that should be guessed
 * @returns The current word
 */
export const getCurrentWord = () => gameState.currentWord;

/**
 * Calculates the results for each team
 * This function handles:
 * - Deciding who won and not
 * - Team placement order
 * @returns Array of team object with the final results
 */
export const getTeamResults = () => {
  const team = [...Teams]; // Copy teams so we don't modify the original dataset
  team.forEach((t) => {
    // Fetch the team guess records so we can pair them with the team dataset
    const tGuesses = teamGuesses.find((tm) => tm.teamname === t.teamname);
    if (tGuesses) {
      // Find the team's top guess (This ignores order!)
      const bg = tGuesses.guesses.reduce((max, obj) => (obj.freq > max.freq ? obj : max));
      // Check if the team won or not
      if (bg.guess.toLowerCase() === getCurrentWord().toLowerCase()) t.won = true;
      else t.won = false;
    }
  });
  // Calculate the teams' placement order by the time when the last guess was submitted
  team.sort((a, b) => a.lastGuessSubmit - b.lastGuessSubmit);
  let index = 1;
  team.forEach((t) => {
    if (t.won)t.placementNr = index++;
  });
  return team;
};

/**
 * Start a new round
 * - Pick a word
 * - Set the round duration
 * - Start the timer loop
 */
export const nextWord = () => {
  const word = getRandomWord();
  gameState.currentWord = word;
  gameState.roundTime = ROUND_DURATION;
  teamGuesses.guesses = [];

  sendProgress({ roundTime: gameState.roundTime });

  const progressTimer = setInterval(() => {
    gameState.roundTime -= 1;
    // Send every second an update to the frontend to make sure the
    // frontend knows the remaining time
    sendProgress({ roundTime: gameState.roundTime });

    // Once the time hits 0, the round is over
    if (gameState.roundTime <= 0) {
      dbg('Round over');
      clearInterval(progressTimer);
      sendResult();
    }
  }, 1000);

  dbg('Round Word -', getCurrentWord());
};

export const removeUserGuesses = (user) => {
  if (user) {
    // eslint-disable-next-line max-len
    teamGuesses.forEach((t) => {
      t.guesses.forEach((g) => {
        if (g.usernames.includes(user.username)) {
          // Once guesses found that belongs to the leaving user, remove it;
          g.usernames = g.usernames.filter((u) => u !== user.username);
          g.freq -= 1;
        }
      });
    });

    // Loop once more to make sure there are no orphaned guesses
    teamGuesses.forEach((t) => {
      // Make sure we remove orphaned guesses that the previous forEach() block made
      t.guesses = t.guesses.filter((g) => g.freq > 0);
    });
    // Once a user is removed, their guesses is removed too, so we send an update of guesses
    broadcastTeamSpecificGuesses(getIO());
  }
};
