import debug from 'debug';
import { Teams } from '../../../data/teams';
import { getCurrentUser } from '../utils/users';

const TEAM_EVENTS = {
    REQUEST_LISTING: 'teams:get',
    SEND_LISTING: 'teams:update',
    JOIN_TEAM: 'teams:join'
};

const teamHandler = (io, socket) => {
    const dbg = debug('handler:team');
  
    const sendTeamData = () => {
        dbg(TEAM_EVENTS.SEND_LISTING);
        const user = getCurrentUser(socket.id);
        socket.emit(TEAM_EVENTS.SEND_LISTING, Teams);
    }

    socket.on(TEAM_EVENTS.REQUEST_LISTING, sendTeamData);
}

export default teamHandler;