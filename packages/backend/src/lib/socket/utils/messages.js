// Get current time using moment library
import moment from 'moment';

/**
 * @param {*} username of the sender
 * @param {*} text, the message of the user
 * @param {*} type of the message
 * @returns username,text,current time and the type of the message
*/

function messageFormat(username, text, type = 2) {
  return {
    username,
    text,
    currentTime: moment().format('h:mm a'),
    type,
  };
}

export default messageFormat;
