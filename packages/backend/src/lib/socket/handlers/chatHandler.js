import debug from 'debug';
import {
  userJoin, getCurrentUser, userLeave, getSessionUsers,
} from '../utils/users';

import messageFormat from '../utils/messages';
import { sendState } from './guessHandler';
import { removeUserGuesses } from '../utils/gameState';
import { removePlayerFromTeam } from '../../../data/teams';
import { sendTeamData } from './teamHandler';

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

  socket.on(CHAT_EVENTS.JOIN, ({ username, teamSession }, callback) => {
    dbg(CHAT_EVENTS.JOIN, { username, teamSession });
    const user = userJoin(socket.id, username, teamSession);
    socket.join(user.teamSession);
    // Welcome current user
    socket.emit(CHAT_EVENTS.MESSAGE, messageFormat(name, 'Welcome to Sketchy Mine!', 3));

    // Send to all users this message except for current user
    socket.broadcast.to(user.teamSession).emit(CHAT_EVENTS.MESSAGE, messageFormat(name, `${user.username} has joined the chat`, 3));

    // Send users and session info
    io.to(user.teamSession).emit(CHAT_EVENTS.SESSION_USERS, {
      room: user.teamSession,
      users: getSessionUsers(user.teamSession),
    });

    sendState(socket);

    callback();
  });

  // Listen for chat message
  socket.on(CHAT_EVENTS.CHAT_MESSAGE, (msg) => {
    dbg(CHAT_EVENTS.CHAT_MESSAGE, { msg });
    const user = getCurrentUser(socket.id);
    socket.broadcast.to(user.teamSession).emit(CHAT_EVENTS.MESSAGE, messageFormat(user.username, msg));
    socket.emit(CHAT_EVENTS.MESSAGE, messageFormat(user.username, msg, 1));
  });

  // Runs when client disconnects from the server
  socket.on('disconnect', () => {
    const existingUser = getCurrentUser(socket.id);

    if (existingUser) {
      removeUserGuesses(existingUser);
      removePlayerFromTeam(existingUser.username);
      sendTeamData(io);
    }

    const user = userLeave(socket.id);

    if (user) {
      dbg('Client disconnected', existingUser);
      // Send to everyone using emit() method
      io.to(existingUser.teamSession).emit(CHAT_EVENTS.MESSAGE, messageFormat(name, `${existingUser.username} has left the chat`, 3));

      // Send users and session info again when user disconnects
      io.to(existingUser.teamSession).emit(CHAT_EVENTS.SESSION_USERS, {
        room: existingUser.teamSession,
        users: getSessionUsers(existingUser.teamSession),
      });
    }
  });
};

export default chatHandler;
