const CHAT_EVENTS = {
  SEND: 'chat:send',
};

const chatHandler = (io, socket) => {
  const sendChat = (payload) => {
    console.log(`Received: ${payload}`);
    socket.broadcast.emit(CHAT_EVENTS.SEND, payload);
  };

  // io.emit(CHAT_EVENTS.SEND, "Testing message.")

  socket.on(CHAT_EVENTS.SEND, sendChat);
};

export default chatHandler;
