import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import chatHandler from './handlers/chatHandler';
import canvasHandler from './handlers/canvasHandler';
import guessHandler from './handlers/guessHandler';
import teamHandler from './handlers/teamHandler';
import moderationHandler from './handlers/moderationHandler';

const debug = require('debug')('socket');

let io;
export const getIO = () => io;

const setup = (server) => {
  debug('Initializing Socket.IO server ');
  io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:8080',
        'https://sketchymine.philipposslicher.tech',
        /.+--sketchymine\.netlify\.app$/,
        'https://socketio-playground.ibrod83.com',
        'https://admin.socket.io',
      ],
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  const onConnection = (socket) => {
    debug('New socket connection');

    // Register handlers
    chatHandler(io, socket);
    canvasHandler(io, socket);
    guessHandler(io, socket);
    teamHandler(io, socket);
    moderationHandler(io, socket);
  };

  instrument(io, {
    auth: {
      type: 'basic',
      username: 'admin',
      password: '$2b$10$heqvAkYMez.Va6Et2uXInOnkCT6/uQj1brkrbyG3LpopDklcq7ZOS', // "changeit" encrypted with bcrypt
    },
  });

  io.on('connection', onConnection);

  // Game setup
  // nextWord();

  return io;
};

export default setup;
