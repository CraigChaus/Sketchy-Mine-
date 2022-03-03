const GUESS_EVENTS = {
  ROUND_GUESS: 'guess:send',
};

const guessHandler = (io, socket) => {
  const sendGuess = (payload) => {
    console.log(`GUESS: ${payload}`);
    io.emit(GUESS_EVENTS.ROUND_GUESS, payload);
  };

  socket.on(GUESS_EVENTS.ROUND_GUESS, sendGuess);
};

export default guessHandler;
