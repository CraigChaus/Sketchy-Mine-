const CANVAS_EVENTS = {
  POINTS: 'canvas:points',
};

const canvasHandler = (io, socket) => {
  const drawPoints = (payload) => {
    socket.broadcast.emit(CANVAS_EVENTS.POINTS, payload);
  };

  socket.on(CANVAS_EVENTS.POINTS, drawPoints);
};

export default canvasHandler;
