import {
  userJoin, getCuurentUser, userLeave, getSessionUsers,
} from '../utils/users';

import messageFormat from '../utils/messages';

// This will appear as the name of the sender
const name = 'Sketchy Mine Bot';

const CHAT_EVENTS = {
  JOIN: 'joinSession',
  SEND: 'chat:send',
  MESSAGE: 'message',
  SESSION_USERS: 'sessionUsers',
  CHAT_MESSAGE: 'chatMessage',
};

const chatHandler = (io, socket) => {
  socket.on(CHAT_EVENTS.JOIN, ({ username, session }) => {
    const user = userJoin(socket.id, username, session);
    socket.join(user.session);
    // Welcome current user
    socket.emit(CHAT_EVENTS.MESSAGE, messageFormat(name, 'Welcome to Sketchy Mine!'));

    // Send to all users this message except for current user
    socket.broadcast.to(user.session).emit(CHAT_EVENTS.MESSAGE, messageFormat(name, `${user.username} has joined the chat`));

    // Send users and session info
    io.to(user.session).emit(CHAT_EVENTS.SESSION_USERS, {
      room: user.session,
      users: getSessionUsers(user.session),
    });
  });

  // Listen for chat message
  socket.on(CHAT_EVENTS.CHAT_MESSAGE, (msg) => {
    const user = getCuurentUser(socket.id);
    io.to(user.session).emit(CHAT_EVENTS.MESSAGE, messageFormat(user.username, msg));
  });

  // Runs when client disconnects from the server
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      // Send to everyone using emit() method
      io.to(user.session).emit(CHAT_EVENTS.MESSAGE, messageFormat(name, `${user.username} has left the chat`));
    }

    // Send users and session info again when user disconnects
    io.to(user.session).emit(CHAT_EVENTS.SESSION_USERS, {
      room: user.session,
      users: getSessionUsers(user.session),
    });
  });
};

export default chatHandler;
