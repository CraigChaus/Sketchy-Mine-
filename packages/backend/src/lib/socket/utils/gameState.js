import debug from 'debug';
import { getIO } from '..';
import { Teams } from '../../../data/teams';
import { broadcastTeamSpecificGuesses, sendProgress, sendResult } from '../handlers/guessHandler';

const dbg = debug('state');

const ROUND_DURATION = 40;
const teamGuesses = [];

const wordBank = [
  // 'Apple',
  // 'Banana',
  'Emerald',
];

export const getRandomWord = () => {
  const nextWordIndex = Math.floor(Math.random() * wordBank.length);
  const nextWord = wordBank[nextWordIndex];
  return nextWord;
};

const defaultState = {
  currentWord: null,
  roundTime: null,
};

export const gameState = JSON.parse(JSON.stringify(defaultState));

export const getGuesses = (username) => {
  const guesses = [];
  const currentTeam = Teams.find((t) => t.members.find((m) => m.username === username));
  if (!currentTeam) return guesses;
  const teamGuessData = teamGuesses.find((t) => t.teamname === currentTeam.teamname);

  console.log(teamGuessData);

  if (teamGuessData) {
    teamGuessData.guesses.forEach((g) => guesses.push({ value: g.guess, frequency: g.freq }));
  }
  return guesses;
};

export const addGuess = (username, guess) => {
  const currentTeam = Teams.find((t) => t.members.find((m) => m.username === username));
  if (!teamGuesses.some((t) => t.teamname === currentTeam.teamname)) {
    const guessObj = { guess, freq: 1, usernames: [username] };
    const teamObj = { teamname: currentTeam.teamname, guesses: [guessObj] };
    teamGuesses.push(teamObj);
  } else {
    teamGuesses.forEach((t) => {
      if (t.teamname === currentTeam.teamname) {
        t.guesses = t.guesses.filter((g) => !g.usernames.includes(username));
        const found = t.guesses.some((g) => g.guess === guess);
        if (!found) {
          t.guesses.push({ guess, freq: 1, usernames: [username] });
          currentTeam.lastGuessSubmit = new Date();
        } else {
          t.guesses.forEach((g) => {
            if (g.guess === guess && !g.usernames.includes(username)) {
              g.freq += 1;
              g.usernames.push(username);
              currentTeam.lastGuessSubmit = new Date();
            }
          });
        }
      }
    });
  }
};

export const getCurrentWord = () => gameState.currentWord;

export const getTeamResults = () => {
  const team = [...Teams];
  team.forEach((t) => {
    const tGuesses = teamGuesses.find((tm) => tm.teamname === t.teamname);
    if (tGuesses) {
      const bg = tGuesses.guesses.reduce((max, obj) => (obj.freq > max.freq ? obj : max));
      if (bg.guess.toLowerCase() === getCurrentWord().toLowerCase()) t.won = true;
      else t.won = false;
    }
  });
  team.sort((a, b) => b.lastGuessSubmit - a.lastGuessSubmit);
  let index = 1;
  team.forEach((t) => {
    if (t.won)t.placementNr = index++;
  });
  console.log(team);
  return team;
};

export const nextWord = () => {
  const word = getRandomWord();
  gameState.currentWord = word;
  gameState.roundTime = ROUND_DURATION;
  teamGuesses.guesses = [];

  sendProgress({ roundTime: gameState.roundTime });

  const progressTimer = setInterval(() => {
    gameState.roundTime -= 1;
    sendProgress({ roundTime: gameState.roundTime });

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
          g.usernames = g.usernames.filter((u) => u !== user.username);
          g.freq -= 1;
        }
      });
    });

    teamGuesses.forEach((t) => {
      t.guesses = t.guesses.filter((g) => g.freq > 0);
    });
    broadcastTeamSpecificGuesses(getIO());
  }
};
