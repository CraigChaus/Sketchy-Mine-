import debug from 'debug';
import User from '../../../data/model/user';
import { Teams, updateTeams } from '../../../data/teams';
import { getCurrentUser } from '../utils/users';

const TEAM_EVENTS = {
  REQUEST_LISTING: 'teams:get',
  SEND_LISTING: 'teams:update',
  JOIN_TEAM: 'teams:join',
};

const dbg = debug('handler:team');

export const sendTeamData = (io) => {
  dbg(TEAM_EVENTS.SEND_LISTING);
  io.emit(TEAM_EVENTS.SEND_LISTING, Teams);
};

const teamHandler = (io, socket) => {
  const joinTeam = (payload) => {
    const user = getCurrentUser(socket.id);
    dbg(TEAM_EVENTS.JOIN_TEAM, user.username);

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
        io.emit(TEAM_EVENTS.SEND_LISTING, Teams);
      }
    }
  };

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
    const teamToJoin = sortedTeams[0];

    joinTeam(teamToJoin.teamname);
  };

  socket.on(TEAM_EVENTS.REQUEST_LISTING, () => sendTeamData(io));
  socket.on(TEAM_EVENTS.JOIN_TEAM, joinMatch);
};

export default teamHandler;
