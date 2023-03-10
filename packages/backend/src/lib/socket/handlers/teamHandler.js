import debug from 'debug';
import { getIO } from '..';
import Team from '../../../data/model/team';
import User from '../../../data/model/user';
import { addTeam, Teams, updateTeams } from '../../../data/teams';
import { gameState } from '../utils/gameState';
import { getCurrentUser } from '../utils/users';
import { broadcastTeamSpecificGuesses, startRound } from './guessHandler';

export const TEAM_EVENTS = {
  REQUEST_LISTING: 'teams:get', // Get teams listing
  SEND_LISTING: 'teams:update', // Send team listing updates
  JOIN_TEAM: 'teams:join', // Join a team
  JOIN_SPECTATORS: 'spectators:join', // joins the game as a spectator
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

// starts a round when a new user joins and the game in not currently ongoing
export const startGame = async () => {
  if (gameState.roundTime > 1) {
    return;
  }
  const playersPerTeam = 3;
  const teamsReady = [];

  // first we check if teams are full and ready to play
  Teams.forEach((team) => {
    const players = team.members.length;
    if (players >= playersPerTeam && !team.isSpectator) {
      teamsReady.push(true);
    }
  });

  // now we check whether there are at least 2 teams ready, so we can start the game
  if (teamsReady.length >= 2) {
    await startRound();
  }
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
        const currentUser = new User(user.username, user.id);
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
      .filter((t) => t.level === 1) // Only consider teams at level 1
      // eslint-disable-next-line max-len
      .sort((t1, t2) => t1.members.length - t2.members.length || t1.teamname.toLowerCase() - t2.teamname.toLowerCase()); // Sort teams by team members and name

    // ignore the spectators team
    if (sortedTeams[0]) {
      if (sortedTeams[0].teamname === 'Spectators') {
        sortedTeams.shift();
      }
    }

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

    startGame();
  };

  const joinSpectators = () => {
    const findSpectatorTeam = Teams.slice()
      .filter((t) => t.teamname === 'Spectators'); // Get only the team with name Spectators

    let spectators = findSpectatorTeam[0];

    if (findSpectatorTeam.length === 0) { // no spectator team exists yet, creates a new one
      spectators = new Team('Spectators');
      spectators.isSpectator = true;
      addTeam(spectators);
      dbg('Adding spectators');
    }
    joinTeam(spectators.teamname);
  };

  socket.on(TEAM_EVENTS.REQUEST_LISTING, () => sendTeamData(io));
  socket.on(TEAM_EVENTS.JOIN_TEAM, joinMatch);
  socket.on(TEAM_EVENTS.JOIN_SPECTATORS, joinSpectators);
};

export default teamHandler;
