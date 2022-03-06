import debug from 'debug';
import { sendProgress, sendResult } from '../handlers/guessHandler';

const dbg = debug('state');

const wordBank = [
  'Apple',
  'Banana',
  'Emerald',
];

const ROUND_DURATION = 10;

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

// eslint-disable-next-line max-len
export const checkWord = (guess) => (guess.toLowerCase() === getCurrentWord ? getCurrentWord().toLowerCase() : false);

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
