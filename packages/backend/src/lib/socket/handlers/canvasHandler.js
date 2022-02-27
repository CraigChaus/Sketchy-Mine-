const CANVAS_EVENTS = {
  POINTS: 'canvas:points',
  LINE: 'canvas:line',
  LINE_SAVE: 'canvas:lineData',
  PRELOAD: 'canvas:prepImage',
};

const canvasHandler = (io, socket) => {
  const drawPoints = (payload) => {
    socket.broadcast.emit(CANVAS_EVENTS.POINTS, payload);
  };
  const drawLine = (payload) => {
    socket.broadcast.emit(CANVAS_EVENTS.LINE, payload);
  };
  const saveLine = (payload) => {
    socket.broadcast.emit(CANVAS_EVENTS.LINE_SAVE, payload);
  };
  const prepImage = (payload) => {
    socket.broadcast.emit(CANVAS_EVENTS.PRELOAD, payload);
  };
  socket.on(CANVAS_EVENTS.POINTS, drawPoints);
  socket.on(CANVAS_EVENTS.LINE, drawLine);
  socket.on(CANVAS_EVENTS.LINE_SAVE, saveLine);
  socket.on(CANVAS_EVENTS.PRELOAD, prepImage);
};

export default canvasHandler;
