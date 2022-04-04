import { Teams } from '../../../data/teams';
import { verifyToken } from '../../../middleware/is_logged_in';
import { getUserByUsername } from '../utils/users';
import { handleKick } from './chatHandler';

const MODERATION_EVENTS = {
  INCWARNING: 'moderation:send_warning',
  OUTWARNING: 'moderation:receive_warning',
  KICK: 'moderation:kick_player',

};

const moderationHandler = (io, socket) => {
  // first check whether the sender is a moderator
  const isModerator = async (token) => {
    const decryptedToken = await verifyToken(token);
    if (decryptedToken.is_moderator) {
      return true; // user is a moderator, perfect
    } return false;
  };

  // payload should contain team name, warning message and sender token as json
  const warnTeam = async (payload) => {
    if (await isModerator(payload.token)) {
      Teams.forEach((team) => {
        if (payload.team === team.teamname) {
          team.members.forEach((member) => {
            io.to(member.socketID).emit(MODERATION_EVENTS.OUTWARNING, payload.message);
          });
        }
      });
    }
  };

  // Runs when client is removed from a team by the moderator
  /**
   * Method for disconnecting a kicked player and notifying all the other players
   */
  const kickPlayer = async (payload) => {
    if (await isModerator(payload.token)) {
      const playerToKick = getUserByUsername(payload.player);
      if (playerToKick) {
        handleKick(playerToKick);
      }
    }
  };

  socket.on(MODERATION_EVENTS.INCWARNING, warnTeam);
  socket.on(MODERATION_EVENTS.KICK, kickPlayer);
};

export default moderationHandler;
