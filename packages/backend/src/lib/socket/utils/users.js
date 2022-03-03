/**
 * For now, iam using static data but later connect via DB
 */

const users = [];

// Join user to chat room
// If later on we decided to add multiple session/rooms then this method is already up to date
function userJoin(id, username, session) {
  const user = { id, username, session };
  users.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat session
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
}

// Get session users
function getSessionUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin, getCurrentUser, userLeave, getSessionUsers,
};
