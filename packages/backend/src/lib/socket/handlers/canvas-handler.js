const CANVAS_EVENTS = {
    POINTS: 'canvas:points',
    MIDPOINT: 'canvas:midpoint',
    LINE: 'canvas:line',
};

const canvasHandler = (io,socket) => {
    const drawMidpoint = (payload) => {
        socket.broadcast.emit(CANVAS_EVENTS.MIDPOINT, payload);
    }

    const drawPoints = (payload) => {
        console.log(`Received: points: ${payload['points']}, brushColor: ${payload['brushColor']}, brushRadius: ${payload['brushRadius']}`);
        socket.broadcast.emit(CANVAS_EVENTS.POINTS, payload);
    };

    const drawLine = (payload) => {
        console.log("-----------in draw line backend")
        socket.broadcast.emit(CANVAS_EVENTS.LINE, payload);
    }

    socket.on(CANVAS_EVENTS.MIDPOINT, drawMidpoint);
    socket.on(CANVAS_EVENTS.POINTS, drawPoints);
    socket.on(CANVAS_EVENTS.LINE, drawLine);
};

export default canvasHandler;