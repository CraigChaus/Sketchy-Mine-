import debug from 'debug';
import User from '../../../data/model/user';
import { Teams, updateTeams } from '../../../data/teams';
import { getCurrentUser } from '../utils/users';

const TEAM_EVENTS = {
  REQUEST_LISTING: 'teams:get',
  SEND_LISTING: 'teams:update',
  JOIN_TEAM: 'teams:join',
  JOIN_SESSION: 'joinSession',
};

const teamHandler = (io, socket) => {
  const dbg = debug('handler:team');

  const sendTeamData = () => {
    dbg(TEAM_EVENTS.SEND_LISTING);
    socket.emit(TEAM_EVENTS.SEND_LISTING, Teams);
  };

  const joinTeam = (payload) => {
    const user = getCurrentUser(socket.id);
    dbg(TEAM_EVENTS.JOIN_TEAM, user.username);

    const team = Teams.find((o) => o.teamname === payload);

    if (team) {
      const u = team.members.find((m) => m.username === user.username);
      if (!u) {
        const currentUser = new User(user.username);
        currentUser.current = true;
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

  socket.on(TEAM_EVENTS.REQUEST_LISTING, sendTeamData);
  socket.on(TEAM_EVENTS.JOIN_TEAM, joinTeam);
};

export default teamHandler;
