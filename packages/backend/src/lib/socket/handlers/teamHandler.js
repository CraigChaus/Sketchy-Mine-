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

  socket.on(TEAM_EVENTS.REQUEST_LISTING, () => sendTeamData(io));
  socket.on(TEAM_EVENTS.JOIN_TEAM, () => joinTeam('Team 1'));
};

export default teamHandler;
