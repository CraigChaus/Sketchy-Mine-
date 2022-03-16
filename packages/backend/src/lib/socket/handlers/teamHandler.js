import debug from 'debug';
import { getIO } from '..';
import Team from '../../../data/model/team';
import User from '../../../data/model/user';
import { addTeam, Teams, updateTeams } from '../../../data/teams';
import { getCurrentUser } from '../utils/users';
import { broadcastTeamSpecificGuesses } from './guessHandler';

export const TEAM_EVENTS = {
  REQUEST_LISTING: 'teams:get', // Get teams listing
  SEND_LISTING: 'teams:update', // Send team listing updates
  JOIN_TEAM: 'teams:join', // Join a team
};

const dbg = debug('handler:team');

/**
 * Broadcast team listing to everyone
 * @param {IO} io IO of the connection
 */
export const sendTeamData = (io) => {
  dbg(TEAM_EVENTS.SEND_LISTING);
  io.emit(TEAM_EVENTS.SEND_LISTING, Teams);
};

const teamHandler = (io, socket) => {
  /**
   * Add a user to a specific team
   * @param {String} payload Name of the team to join
   */
  const joinTeam = (payload) => {
    const user = getCurrentUser(socket.id);
    dbg(TEAM_EVENTS.JOIN_TEAM, user.username);

    // Find team
    const team = Teams.find((o) => o.teamname === payload);

    if (team) {
      const u = team.members.find((m) => m.username === user.username);
      if (!u) {
        const currentUser = new User(user.username);
        updateTeams(Teams.map((obj) => {
          if (obj.teamname === payload) {
            obj.members.push(currentUser);
            return obj;
          }

          return obj;
        }));
        // After adding a new member, broadcast an update to every member
        io.emit(TEAM_EVENTS.SEND_LISTING, Teams);
      }
    }
  };

  /**
   * Join a team as a player based on the available teams and their current capacity,
   * or by creating a new team
   */
  const joinMatch = () => {
    // Log team member capacity
    Teams.forEach((t) => {
      dbg(`${t.teamname}:`, `${t.members.length} players`);
    });

    const sortedTeams = Teams.slice()
      .filter((t) => t.level === 0) // Only consider teams at level 0
      // eslint-disable-next-line max-len
      .sort((t1, t2) => t1.members.length - t2.members.length || t1.teamname.toLowerCase() - t2.teamname.toLowerCase()); // Sort teams by team members and name

    // Get team with lowest number of players
    let teamToJoin = sortedTeams[0];

    // If the team already has 3 members, create a new team instead
    if (!teamToJoin || teamToJoin.members.length >= 3) {
      const teamIndex = Teams.length + 1;
      teamToJoin = new Team(`Team ${teamIndex}`);
      addTeam(teamToJoin);
      dbg('Adding team:', teamToJoin.teamname);
    }
    joinTeam(teamToJoin.teamname);
    broadcastTeamSpecificGuesses(getIO());
  };

  socket.on(TEAM_EVENTS.REQUEST_LISTING, () => sendTeamData(io));
  socket.on(TEAM_EVENTS.JOIN_TEAM, joinMatch);
};

export default teamHandler;
