import debug from 'debug';
import { getIO } from '..';
import { Teams } from '../../../data/teams';
import { broadcastTeamSpecificGuesses, sendProgress, sendResult } from '../handlers/guessHandler';
import { giveAppropriateRoles } from '../handlers/canvasHandler';
import { sendTeamData, startGame } from '../handlers/teamHandler';
import Word from '../../../database/controllers/models/word_model';
import sequelize from '../../../database/util/config';

const dbg = debug('state');

const ROUND_DURATION = process.env.ROUND_DURATION ?? 30;
const teamGuesses = []; // Stores teams and their guesses

let nrTeamsWithFinalizedGuess = 0; // Stores how many teams submitted their final guess

/**
 * Get random word to guess
 * @returns Random word from the word bank
*/

export const getRandomWord = async () => {
  const nextWord = (await Word.findAll({ order: sequelize.random(), limit: 1 }))[0];
  // const nextWordIndex = Math.floor(Math.random() * wordBank.length);
  // const nextWord = wordBank[nextWordIndex];
  // console.log(nextWord);
  return nextWord.word;
};

/**
 * Change the indicator whether a user has submitted a guess or not
 * @param {String} username Name of the user to change guessed indicator
 * @param {Boolean} guessed State to change the guess status
 */
function changeUserGuessState(username, guessed) {
  Teams.forEach((t) => {
    t.members.forEach((m) => {
      if (m.username === username) m.guessed = guessed;
    });
  });
}

/**
 * Remove the guess of a user from the teamGuesses repo
 * @param {String} username Name of the user
 */
function removeGuessOfUser(username) {
  // eslint-disable-next-line max-len
  teamGuesses.forEach((t) => {
    t.guesses.forEach((g) => {
      if (g.usernames.includes(username)) {
        // Once guesses found that belongs to the leaving user, remove it;
        g.usernames = g.usernames.filter((u) => u !== username);
        g.freq -= 1;
      }
    });
  });

  // Loop once more to make sure there are no orphaned guesses
  teamGuesses.forEach((t) => {
    // Make sure we remove orphaned guesses that the previous forEach() block made
    t.guesses = t.guesses.filter((g) => g.freq > 0);
  });

  changeUserGuessState(username, false);
}

/**
 * Storage for game round state
 */
const defaultState = {
  currentWord: null, // This is the word to draw/guess
  roundTime: null, // Remaining time to draw/guess
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
 * Clear the guess of all users
 */
export const resetGuesses = () => {
  // Clear the guess repo
  teamGuesses.splice(0, teamGuesses.length);

  // Make sure each team member is marked as 'not guessed yet'
  Teams.forEach((t) => {
    t.members.forEach((m) => {
      changeUserGuessState(m.username, false);
    });
  });
};

function addGuessForExistingTeam(currentTeam, username, guess) {
  teamGuesses.forEach((t) => {
    if (t.teamname === currentTeam.teamname) { // Only modify the user's team's guesses
      // We check if the team guesses already has the new guess to add
      const found = t.guesses.some((g) => g.guess === guess);
      if (!found) {
        t.guesses.push({ guess, freq: 1, usernames: [username] });
        // Update the last guess time for the team placement at the end of the round
        currentTeam.lastGuessSubmit = new Date();
      } else {
        t.guesses.forEach((g) => {
          if (g.guess === guess
            && !g.usernames.includes(username)
            && g.freq < currentTeam.members.length / 2) {
            if (++g.freq >= currentTeam.members.length / 2) nrTeamsWithFinalizedGuess++;

            g.usernames.push(username);
            // Update the last guess time for the team placement at the end of the round
            currentTeam.lastGuessSubmit = new Date();
          }
        });
      }
    }
  });
}

/**
 * Add a new guess.
 * This function will make sure to add a user's guess to the team guesses database
 * @param {String} username Username of the user who submitted a guess
 * @param {String} guess The user's guess to add
 */
export const addGuess = (username, guess) => {
  // We make sure with the code below that a user can only have one guess submitted
  removeGuessOfUser(username);
  // First, we mark that the user submitted a guess
  changeUserGuessState(username, true);
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
    addGuessForExistingTeam(currentTeam, username, guess);
  }
  // Send team user-listing update to show who guessed
  sendTeamData(getIO());
};

/**
 * Get the current word that should be guessed
 * @returns The current word
 */
export const getCurrentWord = () => gameState.currentWord;

function calculatePointsForTeam(t) {
  const timeNow = new Date();
  let pointsEarned = 0;

  const guessedTimeTaken = ROUND_DURATION - ((timeNow - t.lastGuessSubmit) / 1000);
  dbg(`${t.teamname} took ${guessedTimeTaken} seconds to guess`);

  if (guessedTimeTaken < 5) {
    // if they guessed in less than 30 seconds, they get 20 points and so on
    pointsEarned += 25;
  } else if (guessedTimeTaken < 10) {
    pointsEarned += 20;
  } else if (guessedTimeTaken < 15) {
    pointsEarned += 15;
  } else {
    pointsEarned += 5;
  }

  pointsEarned *= process.env.ROUND_POINTS_MULTIPLIER ?? 1;
  pointsEarned = Math.round(pointsEarned);

  dbg(`Adding ${pointsEarned} points to ${t.teamname}`);

  t.addPoints(pointsEarned);
}

// Update the teams array
function updateTeamArray(team) {
  team.forEach((t) => {
    // First check if we have any guesses for a team
    if (teamGuesses === undefined || teamGuesses.length < 1) return;
    // Fetch the team guess records so we can pair them with the team dataset
    const tGuesses = teamGuesses.find((tm) => tm.teamname === t.teamname);
    if (tGuesses) {
      // Find the team's top guess (This ignores order!)
      const bg = tGuesses.guesses.reduce((max, obj) => (obj.freq > max.freq ? obj : max));
      // Check if the team won or not
      if (bg.guess.toLowerCase() === getCurrentWord().toLowerCase()) t.won = true;
      else t.won = false;

      if (t.won) {
        // Add points to the team if they guessed correctly
        calculatePointsForTeam(t);
      }
    }
  });
}

/**
 * Calculates the results for each team
 * This function handles:
 * - Deciding who won and not
 * - Team placement order
 * @returns Array of team object with the final results
 */
export const getTeamResults = () => {
  const team = [...Teams]; // Copy teams so we don't modify the original dataset

  updateTeamArray(team); // Update the dataset

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
export const nextWord = async () => {
  const word = await getRandomWord();
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
    if (gameState.roundTime <= 0 || nrTeamsWithFinalizedGuess === Teams.length - 1) {
      nrTeamsWithFinalizedGuess = 0;
      gameState.roundTime = 0;
      dbg('Round over');
      clearInterval(progressTimer);
      sendProgress({ roundTime: gameState.roundTime });
      sendResult();

      // round is over so next round can start in 5 seconds
      dbg('round ended. starting next in 5 seconds');
      setTimeout(() => {
        startGame();
      }, 5000);
    }
  }, 1000);

  dbg('Round Word -', getCurrentWord());
};

// gets the next team in the array
// made as a method to reduce duplication
const nextTeam = (teamsAmount, index) => {
  if (index === teamsAmount) {
    index = 0;
  } else {
    index++;
  }
  return index;
};

// checks whether the next team can be considered

const considerDrawer = (team) => {
  if (team.isSpectator) {
    return false;
  } if (team.members.length < 3) {
    return false;
  }
  return true; // Team must be full to reach this part
};

/**
 * Get next team in the list
 * teams are selected as drawing teams in order
 */
export const nextDrawingTeam = () => {
  const drawerTeam = Teams.findIndex((team) => { // find drawing team
    if (team.isDrawing === true) {
      return true;
    } return false;
  });
  if (drawerTeam === -1) { // There is no drawing team
    for (let i = 0; i < Teams.length; i++) { // for loop to make sure we ignore spectator teams
      // would have liked to filter out spectator teams but that messes with the Teams array length.
      if (Teams[i].isSpectator === false && Teams[i].members.length >= 3) {
        Teams[i].isDrawing = true;
        break;
      }
    }
  } else {
    Teams[drawerTeam].isDrawing = false; // removes drawing permissions from old team
    const teamsAmount = Teams.length - 1;

    let i = drawerTeam;
    // this iterates over the teams to check if all of them are complete
    // and assigns the drawing role
    while (i < Teams.length) {
      i = nextTeam(teamsAmount, i);
      if (considerDrawer(Teams[i])) {
        Teams[i].isDrawing = true;
        break;
      }
    }
  }
  sendTeamData(getIO()); // Update team listing to show who is the drawer
  giveAppropriateRoles(getIO());
};

export const removeUserGuesses = (user) => {
  if (user) {
    // Remove the guess
    removeGuessOfUser(user.username);
    // Once a user is removed, their guesses is removed too, so we send an update of guesses
    broadcastTeamSpecificGuesses(getIO());
    // Mark user as not guessed a word
    changeUserGuessState(user.username, false);
  }
};
