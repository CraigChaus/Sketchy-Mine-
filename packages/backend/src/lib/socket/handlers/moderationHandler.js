import { Teams } from '../../../data/teams';
import { verifyToken } from '../../../middleware/is_logged_in';

const MODERATION_EVENTS = {
    INCWARNING: "moderation:send_warning",
    OUTWARNING: "moderation:receive_warning"

  };

const moderationHandler = (io, socket) => {

    //first check whether the sender is a moderator
    const isModerator = (token) => {
        const decryptedToken = verifyToken(token);
        if(decryptedToken.isModerator){return true; //user is a moderator, perfect
        }else{return false;}
    };


    //payload should contain team name, warning message and sender token as json
    const warnTeam = (payload) => {
        // if  (isModerator(payload.token)){
            Teams.forEach(team => {
                if(payload.team == team.teamname){
                    team.members.forEach(member => {
                        io.to(member.socketID).emit(MODERATION_EVENTS.OUTWARNING, payload.message);
                    })
                    return;
                }
            })
        // }
    };

    socket.on(MODERATION_EVENTS.INCWARNING, warnTeam)
    
  };

  export default moderationHandler;