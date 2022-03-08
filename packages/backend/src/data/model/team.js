export class Team {
  constructor(teamname) {
    this.teamname = teamname,
    this.isDrawing = false,
    this.isSelf = false,
    this.won = false,
    this.placementNr = 0,
    this.points = 0,
    this.level = 0,
    this.shards = 0,
    this.submittedGuess = "",
    this.checkpoints = {
      1: false,
      2: false,
      3: false
    },
    this.colour = teamColour(),
    this.members = []
  }
}

let currentColourIndex = 0;

function teamColour() {
  return `hsl(${currentColourIndex++ * 37}, 100%, 50%)`;
}