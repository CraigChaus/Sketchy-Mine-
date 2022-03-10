import debug from 'debug';
import { getIO } from '..';
import {
  addGuess, getCurrentWord, getGuesses, nextWord, getTeamResults,
} from '../utils/gameState';
import { getCurrentUser } from '../utils/users';
import { TEAM_EVENTS } from './teamHandler';

/**
 * Socket IO events for handling guesses
 */
export const GUESS_EVENTS = {
  ROUND_GUESS: 'round:guess', // When a guess is received
  ROUND_STATE: 'round:state', // When game state is sent
  ROUND_RESULT: 'round:result', // When the word to guess is sent
  ROUND_GUESSES: 'round:progress', // When the timer is sent
  ROUND_START: 'round:start', // When the round starts
};

const dbg = debug('handler:guess');

/**
 * Broadcast the round timer to all connected users
 * @param {Object} progress Round time
 */
export const sendProgress = (progress) => {
  const io = getIO();

  dbg(GUESS_EVENTS.ROUND_STATE, progress);
  io.emit(GUESS_EVENTS.ROUND_STATE, progress);
};

/**
 * Send guesses for all the teams
 * @param {IO} io IO of the connection
 */
export const broadcastTeamSpecificGuesses = (io) => {
  // v -> socket
  // k -> user ID
  io.sockets.sockets.forEach((v, k) => {
    const user = getCurrentUser(k);
    if (!user) return;
    // The getGuesses() function makes sure that only team specific guesses will be sent
    const guesses = getGuesses(user.username);
    dbg(GUESS_EVENTS.ROUND_GUESSES, guesses);
    v.emit(GUESS_EVENTS.ROUND_GUESSES, guesses);
  });
};

/**
 * Send guesses
 * @param {Socket} socket User's socket
 */
export const sendState = (socket) => {
  const user = getCurrentUser(socket.id);

  if (user) {
    broadcastTeamSpecificGuesses(getIO());
  }
};

/**
 * Send the word to guess
 */
export const sendResult = () => {
  const io = getIO();

  io.emit(TEAM_EVENTS.SEND_LISTING, getTeamResults());
  // This is what the frontend wants
  const progress = { result: getCurrentWord() };

  dbg(GUESS_EVENTS.ROUND_RESULT, progress);
  io.emit(GUESS_EVENTS.ROUND_RESULT, progress);
};

/**
 * Start a new round
 * @param {Socket} socket User's socket
 */
const startRound = (socket) => {
  nextWord();
  sendState(socket);
  // Null needs to be sent to hide the round results on the team listing
  getIO().emit(GUESS_EVENTS.ROUND_RESULT, null);
};

/**
 * Handle incoming guess
 * @param {IO} io IO
 * @param {Socket} socket User's socket
 */
const guessHandler = (io, socket) => {
  const sendGuess = (payload) => {
    // Convert word to lowercase to make the guesses non case-sensitive
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
