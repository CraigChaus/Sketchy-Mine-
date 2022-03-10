import debug from 'debug';
import { Teams } from '../../../data/teams';
import { sendProgress, sendResult } from '../handlers/guessHandler';

const dbg = debug('state');

const ROUND_DURATION = 20;
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

export const addGuess = (username, session, guess) => {
  const currentTeam = Teams.find((t) => t.members.find((m) => m.username === username));
  if (!teamGuesses.some((t) => t.teamname === currentTeam.teamname)) {
    teamGuesses.push({ teamname: currentTeam.teamname, guesses: [{ guess, freq: 1, username }] });
  } else {
    teamGuesses.forEach((t) => {
      if (t.teamname === currentTeam.teamname) {
        const found = t.guesses.some((g) => g.guess === guess);
        if (!found) {
          t.guesses.push({ guess, freq: 1 });
        } else {
          t.guesses.forEach((g) => {
            if (g.guess === guess && g.username !== username) g.freq += 1;
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
      dbg(gameState);
      sendResult(gameState);
    }
  }, 1000);

  dbg('Round Word -', getCurrentWord());
};

export const removeUserGuesses = (user) => {
  if (user) {
    // eslint-disable-next-line max-len
    teamGuesses.forEach((t) => {
      t.guesses = t.guessses.filter((g) => g.username !== user.username);
    });
  }
};
