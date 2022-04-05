// Models a user
class User {
  constructor(username, userID) {
    this.username = username;
    this.guessed = false; // Is guess submitted
    this.current = false; // Is the user the current user
    this.draws = false;
    this.socketID = userID;
  }
}

export default User;
