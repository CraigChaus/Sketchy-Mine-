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
  guesses: [],
  roundTime: null,
};

export const gameState = JSON.parse(JSON.stringify(defaultState));

export const getGuesses = (session) => {
  const filteredGuesses = gameState.guesses.filter((g) => g.session === session);

  const guessesMap = {};

  filteredGuesses.forEach((g) => {
    if (guessesMap[g.guess]) {
      guessesMap[g.guess] += 1;
    } else {
      guessesMap[g.guess] = 1;
    }
  });

  const guesses = [];

  Object.keys(guessesMap).forEach((guess) => {
    guesses.push({ value: guess, frequency: guessesMap[guess] });
  });

  return guesses;
};

export const getProgress = () => {
  const timeLeft = gameState.roundTime;

  return {
    timeLeft,
  };
};

export const addGuess = (username, session, guess) => {
  const currentTeam = Teams.find((t) => t.members.find((m) => m.username === username));
  if (!teamGuesses.some((t) => t.teamname === currentTeam.teamname)) {
    teamGuesses.push({ teamname: currentTeam.teamname, guesses: [{ guess, freq: 1 }] });
  } else {
    teamGuesses.forEach((t) => {
      if (t.teamname === currentTeam.teamname) {
        const found = t.guesses.some((g) => g.guess === guess);
        if (!found) {
          t.guesses.push({ guess, freq: 1 });
        } else {
          t.guesses.forEach((g) => {
            if (g.guess === guess) g.freq += 1;
          });
        }
      }
    });
  }

  let savedGuess = gameState.guesses.find((g) => g.username === username && g.session === session);

  if (savedGuess) {
    savedGuess.guess = guess;
  } else {
    savedGuess = {
      username, session, guess,
    };
    gameState.guesses = [...gameState.guesses, savedGuess];
  }
  dbg('New guess', savedGuess);

  const guesses = getGuesses(session);
  dbg('Guesses -', guesses);
};

export const getCurrentWord = () => gameState.currentWord;

export const getTeamResults = () => {
  const team = [...Teams];
  team.forEach((t) => {
    const currentTeamGuessStat = teamGuesses.find((tm) => tm.teamname === t.teamname);
    const bg = currentTeamGuessStat.guesses.reduce((max, obj) => (obj.freq > max.freq ? obj : max));
    if (bg.guess.toLowerCase() === getCurrentWord().toLowerCase()) t.won = true;
    else t.won = false;
  });
  return team;
};

export const nextWord = () => {
  const word = getRandomWord();
  gameState.currentWord = word;
  gameState.roundTime = ROUND_DURATION;
  gameState.guesses = [];

  sendProgress();

  const progressTimer = setInterval(() => {
    gameState.roundTime -= 1;
    sendProgress();

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
    gameState.guesses = gameState.guesses.filter((g) => g.username !== user.username);
  }
};
