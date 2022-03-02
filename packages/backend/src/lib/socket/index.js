import { Server } from 'socket.io';
import chatHandler from './handlers/chatHandler';

const debug = require('debug')('socket');

const setup = (server) => {
  debug('Initializing Socket.IO server ');
  const io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:8080',
        'https://sketchymine.philipposslicher.tech',
        /.+--sketchymine\.netlify\.app$/,
      ],
      methods: ['GET', 'POST'],
    },
  });

  const onConnection = (socket) => {
    debug('New socket connection');
    chatHandler(io, socket);
  };

  io.on('connection', onConnection);
};

export default setup;
