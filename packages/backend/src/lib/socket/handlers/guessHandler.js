import debug from 'debug';
import {
  addGuess, checkWord, getGuesses,
} from '../utils/gameState';
import { getCurrentUser } from '../utils/users';

export const GUESS_EVENTS = {
  GUESS_ERR: 'guess:err',
  GUESS_OK: 'guess:ok',
  ROUND_GUESS: 'round:guess',
  ROUND_STATE: 'round:state',
};

const guessHandler = (io, socket) => {
  const dbg = debug('handler:guess');

  const sendGuess = (payload) => {
    const isCorrect = checkWord(payload);

    addGuess('user', 'main', payload);
    io.emit(GUESS_EVENTS.ROUND_STATE, getGuesses('main'));

    if (!isCorrect) {
      // Client guessed incorrectly
      const response = {
        error: 'Invalid guess',
        payload,
        id: socket.id,
      };
      dbg(response);
      socket.emit(GUESS_EVENTS.GUESS_ERR, response);
      return;
    }

    // Correct guess

    const response = {
      payload,
      id: socket.id,
    };
    socket.emit(GUESS_EVENTS.GUESS_OK, response);
  };

  const sendState = () => {
    const user = getCurrentUser(socket.id);

    if (user) {
      const guesses = getGuesses(socket);
      dbg(GUESS_EVENTS.ROUND_STATE, guesses);
      socket.emit(GUESS_EVENTS.ROUND_STATE, guesses);
    }
  };

  socket.on(GUESS_EVENTS.ROUND_GUESS, sendGuess);
  socket.on(GUESS_EVENTS.ROUND_STATE, sendState);
};

export default guessHandler;
