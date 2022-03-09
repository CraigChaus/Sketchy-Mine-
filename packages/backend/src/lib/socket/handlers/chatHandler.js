import debug from 'debug';
import {
  userJoin, getCurrentUser, userLeave, getSessionUsers,
} from '../utils/users';

import messageFormat from '../utils/messages';
import { GUESS_EVENTS, sendState } from './guessHandler';
import { getGuesses, removeUserGuesses } from '../utils/gameState';
import { removePlayer } from '../../../data/teams';

// This will appear as the name of the sender
const name = 'Sketchy Mine System';

const CHAT_EVENTS = {
  JOIN: 'joinSession',
  SEND: 'chat:send',
  MESSAGE: 'message',
  SESSION_USERS: 'sessionUsers',
  CHAT_MESSAGE: 'chatMessage',
};

const chatHandler = (io, socket) => {
  const dbg = debug('handler:chat');

  socket.on(CHAT_EVENTS.JOIN, ({ username, session }, callback) => {
    dbg(CHAT_EVENTS.JOIN, { username, session });
    const user = userJoin(socket.id, username, session);
    socket.join(user.session);
    // Welcome current user
    socket.emit(CHAT_EVENTS.MESSAGE, messageFormat(name, 'Welcome to Sketchy Mine!', 3));

    // Send to all users this message except for current user
    socket.broadcast.to(user.session).emit(CHAT_EVENTS.MESSAGE, messageFormat(name, `${user.username} has joined the chat`, 3));

    // Send users and session info
    io.to(user.session).emit(CHAT_EVENTS.SESSION_USERS, {
      room: user.session,
      users: getSessionUsers(user.session),
    });

    sendState(socket);

    callback();
  });

  // Listen for chat message
  socket.on(CHAT_EVENTS.CHAT_MESSAGE, (msg) => {
    dbg(CHAT_EVENTS.CHAT_MESSAGE, { msg });
    const user = getCurrentUser(socket.id);
    socket.broadcast.to(user.session).emit(CHAT_EVENTS.MESSAGE, messageFormat(user.username, msg));
    socket.emit(CHAT_EVENTS.MESSAGE, messageFormat(user.username, msg, 1));
  });

  // Runs when client disconnects from the server
  socket.on('disconnect', () => {
    const existingUser = getCurrentUser(socket.id);

    if (existingUser) {
      removeUserGuesses(existingUser);
      removePlayer(existingUser.username);
      io.emit(GUESS_EVENTS.ROUND_STATE, getGuesses(existingUser.session));
    }

    const user = userLeave(socket.id);

    if (user) {
      dbg('Client disconnected', existingUser);
      // Send to everyone using emit() method
      io.to(existingUser.session).emit(CHAT_EVENTS.MESSAGE, messageFormat(name, `${existingUser.username} has left the chat`, 3));

      // Send users and session info again when user disconnects
      io.to(existingUser.session).emit(CHAT_EVENTS.SESSION_USERS, {
        room: existingUser.session,
        users: getSessionUsers(existingUser.session),
      });
    }
  });
};

export default chatHandler;
