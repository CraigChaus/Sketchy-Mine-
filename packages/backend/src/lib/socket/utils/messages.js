// Get current time using moment library
import moment from 'moment';

function messageFormat(username, text) {
  return {
    username,
    text,
    currentTime: moment().format('h:mm a'),
  };
}

export default messageFormat;
