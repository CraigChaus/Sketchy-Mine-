/**
 * For now, I am using static data but later connect via DB
 */

const users = [];

// Join user to chat room
// If later on we decided to add multiple session/rooms then this method is already up to date
export const userJoin = (id, username, session) => {
  const user = { id, username, session };
  users.push(user);
  return user;
};

// Get current user
export const getCurrentUser = (id) => users.find((user) => user.id === id);

// User leaves chat session
export const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

  return null;
};

// Get session users
export const getSessionUsers = (room) => users.filter((user) => user.room === room);
