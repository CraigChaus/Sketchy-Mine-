const CANVAS_EVENTS = {
  POINTS: 'canvas:points',
  CLEAR: 'canvas:clear',
  DRAWER: 'canvas:drawer',
  GUESSER: 'canvas:guesser',
  SPECTATOR: 'canvas:spectator',
  NEWLOGIN: 'canvas:new-user',
  RESTRICT_DRAWING: 'canvas:lock',
  UNRESTRICT_DRAWING: 'canvas:unlock',
};

let canvasHistory = [];

const canvasHandler = (io, socket) => {
  const drawPoints = (payload) => {
    // saves to the array containing the previous drawings
    canvasHistory.push(payload);

    socket.broadcast.emit(CANVAS_EVENTS.POINTS, payload);
  };

  const clearCanvas = () => {
    socket.broadcast.emit(CANVAS_EVENTS.CLEAR);
    canvasHistory = [];
  };

  const drawAllPoints = () => {
    canvasHistory.forEach((item) => socket.emit(CANVAS_EVENTS.POINTS, item);
  };

  socket.on(CANVAS_EVENTS.POINTS, drawPoints);
  socket.on(CANVAS_EVENTS.CLEAR, clearCanvas);
  socket.on(CANVAS_EVENTS.NEWLOGIN, drawAllPoints);

  const makeSpectator = () => socket.broadcast.emit(CANVAS_EVENTS.SPECTATOR);
  const makeDrawer = () => socket.broadcast.emit(CANVAS_EVENTS.DRAWER);
  const makeGuesser = () => socket.broadcast.emit(CANVAS_EVENTS.GUESSER);

  socket.on(CANVAS_EVENTS.DRAWER, makeDrawer);
  socket.on(CANVAS_EVENTS.GUESSER, makeGuesser);
  socket.on(CANVAS_EVENTS.SPECTATOR, makeSpectator);
};

export const giveAppropriateRoles = (io, Teams) => {
  // also clears the canvas since a new team is drawing
  io.emit(CANVAS_EVENTS.CLEAR);
  canvasHistory = [];

  // loops through every team
  Teams.forEach((team) => {
    // find the drawing team
    if (team.isDrawing === true) {
      team.members.forEach((member) => {
        io.to(member.socketID).emit(CANVAS_EVENTS.DRAWER);
      });
      // gives the other teams excluding spectators guessing permissions
    } else if (team.members.length >= 3 && team.isSpectator === false) {
      team.members.forEach((member) => {
        io.to(member.socketID).emit(CANVAS_EVENTS.GUESSER);
      });
      // gives spectator and teams that are not full spectator permissions
    } else {
      team.members.forEach((member) => {
        io.to(member.socketID).emit(CANVAS_EVENTS.SPECTATOR);
      });
    }
  });
};

export const lockCanvas = (io) => io.emit(CANVAS_EVENTS.RESTRICT_DRAWING);
export const unlockCanvas = (io) => io.emit(CANVAS_EVENTS.UNRESTRICT_DRAWING);

export default canvasHandler;
