import debug from 'debug';
import { getIO } from '..';
import {
  addGuess, getCurrentWord, getGuesses, nextWord, getTeamResults,
} from '../utils/gameState';
import { getCurrentUser } from '../utils/users';
import { TEAM_EVENTS } from './teamHandler';

export const GUESS_EVENTS = {
  ROUND_GUESS: 'round:guess',
  ROUND_STATE: 'round:state',
  ROUND_RESULT: 'round:result',
  ROUND_GUESSES: 'round:progress',
  ROUND_START: 'round:start',
};

const dbg = debug('handler:guess');

export const sendProgress = (progress) => {
  const io = getIO();

  dbg(GUESS_EVENTS.ROUND_STATE, progress);
  io.emit(GUESS_EVENTS.ROUND_STATE, progress);
};

export const broadcastTeamSpecificGuesses = (io) => {
  io.sockets.sockets.forEach((v, k) => {
    const user = getCurrentUser(k);
    if (!user) return;
    const guesses = getGuesses(user.username);
    dbg(GUESS_EVENTS.ROUND_GUESSES, guesses);
    v.emit(GUESS_EVENTS.ROUND_GUESSES, guesses);
  });
};

export const sendState = (socket) => {
  const user = getCurrentUser(socket.id);

  if (user) {
    broadcastTeamSpecificGuesses(getIO());
  }
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
  getIO().emit(GUESS_EVENTS.ROUND_RESULT, null);
};

const guessHandler = (io, socket) => {
  const sendGuess = (payload) => {
    const word = payload.toLowerCase();

    const user = getCurrentUser(socket.id);

    if (!user) {
      return;
    }

    addGuess(user.username, word);
    broadcastTeamSpecificGuesses(io);
  };

  socket.on(GUESS_EVENTS.ROUND_GUESS, sendGuess);
  socket.on(GUESS_EVENTS.ROUND_STATE, () => sendState(socket));
  socket.on(GUESS_EVENTS.ROUND_START, () => startRound(socket));
};

export default guessHandler;
