const CANVAS_EVENTS = {
  POINTS: 'canvas:points',
  CLEAR: 'canvas:clear',
};

const canvasHandler = (io, socket) => {
  const drawPoints = (payload) => {
    socket.broadcast.emit(CANVAS_EVENTS.POINTS, payload);
  };

  const clearCanvas = () => {
    socket.broadcast.emit(CANVAS_EVENTS.CLEAR);
  }

  socket.on(CANVAS_EVENTS.POINTS, drawPoints);
  socket.on(CANVAS_EVENTS.CLEAR, clearCanvas);
};

export default canvasHandler;
