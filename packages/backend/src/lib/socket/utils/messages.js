// Get current time using moment library
const moment = require('moment');

function messageFormat(username, text) {
  return {
    username,
    text,
    currentTime: moment().format('h:mm a'),
  };
}

module.exports = messageFormat;
