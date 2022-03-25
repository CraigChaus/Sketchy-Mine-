import User from '../../database/controllers/models/user_model';

const levelShards = process.env.LEVEL_SHARDS ?? 1;
const emeraldShardValue = process.env.EMERALD_SHARD_VALUE ?? 5;
let currentColourIndex = 0;
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
    // this is the shards calculator
    if (this.points >= 25 && !this.checkpoints.one) {
      this.shards += levelShards * this.level;
      this.checkpoints.one = true;
    } else if (this.points >= 50 && !this.checkpoints.two) {
      this.shards += levelShards * this.level;
      this.checkpoints.two = true;
    } else if (this.points >= 80 && !this.checkpoints.three) {
      this.shards += levelShards * this.level;
      this.checkpoints.three = true;
    }

    if (this.points >= 100) {
      // We make sure no team has more than the maximum amount of points
      this.points -= 100;
      this.level++;
      this.checkpoints.one = false;
      this.checkpoints.two = false;
      this.checkpoints.three = false;
      // calculate emeralds for each user after each level
      if (this.shards >= emeraldShardValue) {
        const extraShards = this.shards % emeraldShardValue;
        emeralds += Math.round(this.shards / emeraldShardValue);
        this.shards -= extraShards;
        // for each member of team, find from db and increment emeralds
        this.members.forEach(async (member) => {
          const user = (await User.findAll({ where: { username: member.username } }))[0];
          if (user) {
            await user.increment('total_emeralds', { by: emeralds });
          }
        });
      }
    }
  }
}

export default Team;
