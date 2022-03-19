class User {
  constructor(username, userID) {
    this.username = username;
    this.guessed = false;
    this.current = false;
    this.draws = false;
    this.socketID = userID;
  }
}

export default User;
