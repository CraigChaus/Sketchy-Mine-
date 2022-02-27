const messageFormat = require('../utils/messages').default;

const {
  userJoin, getCuurentUser, userLeave, getSessionUsers,
} = require('../utils/users');

// This will appear as the name of the sender
const name = 'Sketchy Mine Bot';

/** const CHAT_EVENTS = {
  SEND: 'chat:send',
}; */

const chatHandler = (io, socket) => {
  /** const sendChat = (payload) => {
    console.log(`Received: ${payload}`);
    // io.emit(CHAT_EVENTS.SEND);
  }; */
  // socket.on(CHAT_EVENTS.SEND, sendChat);

  socket.on('joinSession', ({ username, session }) => {
    const user = userJoin(socket.id, username, session);
    socket.join(user.session);
    // Welcome current user
    socket.emit('message', messageFormat(name, 'Welcome to Sketchy Mine!'));

    // Send to all users this message except for current user
    socket.broadcast.to(user.session).emit('message', messageFormat(name, `${user.username} has joined the chat`));

    // Send users and session info
    io.to(user.session).emit('sessionUsers', {
      room: user.session,
      users: getSessionUsers(user.session),
    });
  });

  // Listen for chat message
  socket.on('chatMessage', (msg) => {
    const user = getCuurentUser(socket.id);
    io.to(user.session).emit('message', messageFormat(user.username, msg));
  });

  // Runs when client disconnects from the server
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      // Send to everyone using emit() method
      io.to(user.session).emit('message', messageFormat(name, `${user.username} has left the chat`));
    }

    // Send users and session info
    io.to(user.session).emit('sessionUsers', {
      room: user.session,
      users: getSessionUsers(user.session),
    });
  });
};

export default chatHandler;
