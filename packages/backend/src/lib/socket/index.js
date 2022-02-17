import { Server } from 'socket.io';
// import chatHandler from './handlers/chatHandler';
const debug = require('debug')('socket');
const messageFormat = require('./utils/messages');
const {
  userJoin, getCuurentUser, userLeave, getSessionUsers,
} = require('./utils/users');

const name = 'Sketchy Mine Bot';

const setup = (server) => {
  debug('Initializing Socket.IO server ');
  const io = new Server(server, { /* options */ });

  const onConnection = (socket) => {
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
    debug('New socket connection');
    // chatHandler(io, socket);
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

  io.on('connection', onConnection);
};

export default setup;
