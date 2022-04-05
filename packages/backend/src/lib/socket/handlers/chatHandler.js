import debug from 'debug';
import {
  userJoin, getCurrentUser, userLeave, getSessionUsers,
} from '../utils/users';
import messageFormat from '../utils/messages';
import { sendState } from './guessHandler';
import { removeUserGuesses } from '../utils/gameState';
import { removePlayerFromTeam, Teams } from '../../../data/teams';
import { sendTeamData } from './teamHandler';
import { verifyToken } from '../../../middleware/is_logged_in';
import { getIO } from '..';

// This will appear as the name of the sender
const name = 'Sketchy Mine System';

// Chat events will be used as the socket events
const CHAT_EVENTS = {
  JOINTEAMCHAT: 'joinTeamChat',
  // JOINSESSION is joining the whole game.
  JOINSESSION: 'joinSession',
  SEND: 'chat:send',
  MESSAGE: 'message',
  SESSION_USERS: 'sessionUsers',
  CHAT_MESSAGE: 'chatMessage',
};

/**
 * Handle the messages from the frontend
 * @param {*} io socket
 * @param {*} socket connection
 */

const chatHandler = (io, socket) => {
  const dbg = debug('handler:chat');

  // User joins a session / game.

  socket.on(CHAT_EVENTS.JOINSESSION, async ({ tokenValue }, callback) => {
    const tokenPayload = await verifyToken(tokenValue);

    let isUsernameGenerated = true;
    let isModerator = false;
    let username = `User${Math.round(Math.random() * 10000)}`;
    let totalEmeralds = 0;

    if (tokenPayload) {
      username = tokenPayload.username;
      isModerator = tokenPayload.is_moderator;
      totalEmeralds = tokenPayload.total_emeralds;
      isUsernameGenerated = false;
    }

    dbg(CHAT_EVENTS.JOIN, {
      username, isModerator, totalEmeralds, isUsernameGenerated,
    });
    userJoin(socket.id, username, isModerator, totalEmeralds, isUsernameGenerated);

    // Welcome current user
    socket.emit(CHAT_EVENTS.MESSAGE, messageFormat(name, 'Welcome to Sketchy Mine!', 3));

    sendState(socket);

    callback(username);
  });

  // User that has already joined the game is now
  // connected to the chat that only his team members can see.
  socket.on(CHAT_EVENTS.JOINTEAMCHAT, ({ teamSession }) => {
    const user = getCurrentUser(socket.id);
    if (!user) {
      return;
    }

    user.teamSession = teamSession;
    socket.join(user.teamSession);

    // Send to all users this message except for current user
    socket.broadcast.to(user.teamSession).emit(
      CHAT_EVENTS.MESSAGE,
      messageFormat(name, `${user.username} has joined the chat`, 3),
    );

    // Send users and session info
    io.to(user.teamSession).emit(CHAT_EVENTS.SESSION_USERS, {
      room: user.teamSession,
      users: getSessionUsers(user.teamSession),
    });
  });

  // Listen for chat message
  socket.on(CHAT_EVENTS.CHAT_MESSAGE, (msg) => {
    dbg(CHAT_EVENTS.CHAT_MESSAGE, { msg });
    // Get the user who sent the message
    const user = getCurrentUser(socket.id);
    if (user === undefined) {
      return;
    }
    // check if the user is in a team, otherwise the server will crash
    let userHasTeam = false;
    Teams.forEach((team) => {
      team.members.forEach((member) => {
        if (user.username === member.username) {
          userHasTeam = true;
        }
      });
    });

    // user does not have a team to exit out
    if (!userHasTeam) {
      return;
    }
    socket.broadcast.to(user.teamSession).emit(
      CHAT_EVENTS.MESSAGE,
      messageFormat(user.username, msg),
    );
    socket.emit(CHAT_EVENTS.MESSAGE, messageFormat(user.username, msg, 1));
  });

  // Runs when client disconnects from the server
  socket.on('disconnect', () => {
    const existingUser = getCurrentUser(socket.id);
    // if the user disconnects from the server, disconnect him from all the places
    if (existingUser) {
      removeUserGuesses(existingUser);
      removePlayerFromTeam(existingUser.username);
      sendTeamData(io);
    }

    const user = userLeave(socket.id);

    if (user) {
      dbg('Client disconnected', existingUser);
      // Send to everyone using emit() method
      io.to(existingUser.teamSession).emit(
        CHAT_EVENTS.MESSAGE,
        messageFormat(name, `${existingUser.username} has left the chat`, 3),
      );

      // Send users and session info again when user disconnects
      io.to(existingUser.teamSession).emit(CHAT_EVENTS.SESSION_USERS, {
        room: existingUser.teamSession,
        users: getSessionUsers(existingUser.teamSession),
      });
    }
  });

  // Runs when client is removed from a team by the moderator
  /**
   * Method for disconnecting a kicked player and notifying all the other players
   */
};

export const handleKick = (existingUser) => {
  const io = getIO();
  removeUserGuesses(existingUser);
  removePlayerFromTeam(existingUser.username);
  sendTeamData(io);

  const user = userLeave(existingUser.id);
  const dbg = debug('handler:kick');
  if (user) {
    dbg('Client kicked by moderator', existingUser);
    // Send to everyone using emit() method
    io.to(existingUser.session).emit(CHAT_EVENTS.MESSAGE, messageFormat(name, `${existingUser.username} has been kicked out by moderator`, 3));

    // Send users and session info again when user disconnects
    io.to(existingUser.session).emit(CHAT_EVENTS.SESSION_USERS, {
      room: existingUser.session,
      users: getSessionUsers(existingUser.session),
    });
  }
};

export default chatHandler;
