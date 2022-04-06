/**
 * For now, I am using static data but later connect via DB
 */

const users = [];

// check if user with same username already exists
const userExists = (username) => users.some((user) => user.username === username);

// Join user to chat room
// If later on we decided to add multiple session/rooms then this method is already up to date
export const userJoin = (socketId, username, isModerator, totalEmeralds, isUsernameGenerated) => {
  const user = {
    id: socketId, username, isModerator, totalEmeralds, isUsernameGenerated,
  };
  const exists = userExists(user.username);
  if (!exists) {
    users.push(user);
  }
  return user;
};

// Get current user
export const getCurrentUser = (id) => users.find((user) => user.id === id);

// Get user by username
export const getUserByUsername = (username) => users.find((user) => user.username === username);

// User leaves chat teamSession
export const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

  return null;
};

// Get team users
export const getSessionUsers = (room) => users.filter((user) => user.room === room);
