import debug from 'debug';
import User from '../../../data/model/user';
import { Teams, updateTeams } from '../../../data/teams';
import { getCurrentUser } from '../utils/users';

const TEAM_EVENTS = {
  REQUEST_LISTING: 'teams:get',
  SEND_LISTING: 'teams:update',
  JOIN_TEAM: 'teams:join',
};

function getUserSpecificTeamData(username) {
  const teamsToSend = [];

  for (const t of Teams) {
    const team = { ...t };
    const members = [];
    for (const m of team.members) {
      if (m.username === username) {
        const u = { ...m };
        u.current = true;
        members.push(u);
        team.isSelf = true;
      } else {
        members.push(m);
      }
    }
    team.members = members;
    teamsToSend.push(team);
  }

  return teamsToSend;
}

const teamHandler = (io, socket) => {
  const dbg = debug('handler:team');

  const sendTeamData = () => {
    const user = getCurrentUser(socket.id);
    dbg(TEAM_EVENTS.SEND_LISTING);
    socket.emit(TEAM_EVENTS.SEND_LISTING, getUserSpecificTeamData(user.username));
  };

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
        io.emit(TEAM_EVENTS.SEND_LISTING, getUserSpecificTeamData(user.username));
      }
    }
  };

  socket.on(TEAM_EVENTS.REQUEST_LISTING, sendTeamData);
  socket.on(TEAM_EVENTS.JOIN_TEAM, joinTeam);
};

export default teamHandler;
