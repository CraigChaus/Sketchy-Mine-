import User from '../../database/controllers/models/user_model';

let currentColourIndex = 0;
const levelShards = 1;
let emeralds = 0;

function teamColour() {
  currentColourIndex += 1;
  return `hsl(${currentColourIndex * 37}, 100%, 50%)`;
}
class Team {
  constructor(teamname) {
    this.teamname = teamname;
    this.isSpectator = false;
    this.isDrawing = false;
    this.isSelf = false;
    this.won = false;
    this.placementNr = 0;
    this.points = 0;
    this.level = 1;
    this.shards = 0;
    this.lastGuessSubmit = new Date();
    this.checkpoints = {
      one: false,
      two: false,
      three: false,
    };
    this.colour = teamColour();
    this.members = [];
  }

  /**
   * Add a certain amount of points to the team
   * @param {Number} points Points to add
   */
  addPoints(points) {
    this.points += points;

    this.checkpoints.one = this.points >= 25;
    this.checkpoints.two = this.points >= 50;
    this.checkpoints.three = this.points >= 80;
    // this is the shards calculator
    if (this.checkpoints.one || this.checkpoints.two || this.checkpoints.three) {
      this.shards = levelShards * this.level;
    }

    if (this.points >= 100) {
      // We make sure no team has more than the maximum amount of points
      this.points -= 100;
      this.level++;
      this.checkpoints.one = false; // TODO needs refactoring
      this.checkpoints.two = false;
      this.checkpoints.three = false;
      // calculate emeralds for each user after each level
      if ((this.shards % 20) === 0) {
        emeralds++;
        // for each member of team, find from db and increment emeralds
        this.members.forEach(async (member) => {
          const user = await User.findByPk(member.socketID);
          if (user) {
            await user.increment('total_emeralds', { by: emeralds });
          }
        });
      }
    }
  }
}

export default Team;
