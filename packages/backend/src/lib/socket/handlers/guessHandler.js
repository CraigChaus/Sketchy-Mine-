import debug from 'debug';
import { getIO } from '..';
import {
  addGuess, checkWord, getCurrentWord, getGuesses, getProgress, nextWord, getTeamResults,
} from '../utils/gameState';
import { getCurrentUser } from '../utils/users';
import { TEAM_EVENTS } from './teamHandler';

export const GUESS_EVENTS = {
  GUESS_ERR: 'guess:err',
  GUESS_OK: 'guess:ok',
  ROUND_GUESS: 'round:guess',
  ROUND_STATE: 'round:state',
  ROUND_PROGRESS: 'round:progress',
  ROUND_RESULT: 'round:result',
  ROUND_START: 'round:start',
};

const dbg = debug('handler:guess');

export const sendState = (socket) => {
  const user = getCurrentUser(socket.id);

  if (user) {
    const guesses = getGuesses(user.session);
    dbg(GUESS_EVENTS.ROUND_STATE, guesses);
    socket.emit(GUESS_EVENTS.ROUND_STATE, guesses);
  }
};

export const sendProgress = () => {
  const io = getIO();

  const progress = getProgress();
  dbg(GUESS_EVENTS.ROUND_PROGRESS, progress);
  io.emit(GUESS_EVENTS.ROUND_PROGRESS, progress);
};

export const sendResult = () => {
  const io = getIO();

  io.emit(TEAM_EVENTS.SEND_LISTING, getTeamResults());
  const progress = { result: getCurrentWord() };

  dbg(GUESS_EVENTS.ROUND_RESULT, progress);
  io.emit(GUESS_EVENTS.ROUND_RESULT, progress);
};

const startRound = (socket) => {
  nextWord();
  sendState(socket);
};

const guessHandler = (io, socket) => {
  const sendGuess = (payload) => {
    const word = payload.toLowerCase();

    const user = getCurrentUser(socket.id);

    if (!user) {
      return;
    }

    const isCorrect = checkWord(word);

    addGuess(user.username, user.session, word);
    io.emit(GUESS_EVENTS.ROUND_STATE, getGuesses(user.session));

    if (!isCorrect) {
      // Client guessed incorrectly
      const response = {
        error: 'Invalid guess',
        payload: word,
        id: socket.id,
      };
      dbg(response);
      socket.emit(GUESS_EVENTS.GUESS_ERR, response);
      return;
    }

    // Correct guess

    const response = {
      payload: word,
      id: socket.id,
    };
    socket.emit(GUESS_EVENTS.GUESS_OK, response);
  };

  socket.on(GUESS_EVENTS.ROUND_GUESS, sendGuess);
  socket.on(GUESS_EVENTS.ROUND_STATE, () => sendState(socket));
  socket.on(GUESS_EVENTS.ROUND_START, () => startRound(socket));
};

export default guessHandler;
