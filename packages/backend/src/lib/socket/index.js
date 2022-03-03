import { Server } from 'socket.io';
import chatHandler from './handlers/chatHandler';
import canvasHandler from './handlers/canvasHandler';

const debug = require('debug')('socket');

const setup = (server) => {
  debug('Initializing Socket.IO server ');
  const io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:8080',
        'https://sketchymine.philipposslicher.tech',
        'https://socketio-playground.ibrod83.com',
        /.+--sketchymine\.netlify\.app$/,
      ],
      methods: ['GET', 'POST'],
    },
  });

  const onConnection = (socket) => {
    debug('New socket connection');
    chatHandler(io, socket);
    canvasHandler(io, socket);
  };
  io.on('connection', onConnection);
};

export default setup;
