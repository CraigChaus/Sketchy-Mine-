import debug from 'debug';

const dbg = debug('state');

const wordBank = [
  'Apple',
  'Banana',
  'Emerald',
];

export const getRandomWord = () => {
  const nextWordIndex = Math.floor(Math.random() * wordBank.length);
  const nextWord = wordBank[nextWordIndex];
  return nextWord;
};

export const gameState = {
  currentWord: null,
  guesses: [],
};

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

export const addGuess = (username, session, guess) => {
  const savedGuess = {
    username, session, guess,
  };
  dbg('New guess', savedGuess);
  gameState.guesses = [...gameState.guesses, savedGuess];

  const guesses = getGuesses(session);
  dbg('Guesses -', guesses);
};

export const getCurrentWord = () => gameState.currentWord;

export const checkWord = (guess) => guess.toLowerCase() === getCurrentWord().toLowerCase();

export const nextWord = () => {
  const word = getRandomWord();
  gameState.currentWord = word;
  dbg('Round Word -', getCurrentWord());
};
