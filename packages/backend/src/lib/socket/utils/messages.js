// Get current time using moment library
import moment from 'moment';

function messageFormat(username, text, type = 2) {
  return {
    username,
    text,
    currentTime: moment().format('h:mm a'),
    type,
  };
}

export default messageFormat;
