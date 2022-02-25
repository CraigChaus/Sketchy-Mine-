import { Server } from 'socket.io';
import chatHandler from './handlers/chatHandler';
import canvasHandler from './handlers/canvas-handler';

const debug = require('debug')('socket');

const setup = (server) => {
  debug('Initializing Socket.IO server ');
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
    }
  });

  const onConnection = (socket) => {
    debug('New socket connection');
    chatHandler(io, socket);
    canvasHandler(io, socket);
  };

  io.on('connection', onConnection);
};

export default setup;
