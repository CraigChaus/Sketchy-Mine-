const CHAT_EVENTS = {
  SEND: 'chat:send',
};

const chatHandler = (io, socket) => {
  const sendChat = (payload) => {
    console.log(`Received: ${payload}`);
    io.emit(CHAT_EVENTS.SEND);
  };

  socket.on(CHAT_EVENTS.SEND, sendChat);
};

export default chatHandler;
