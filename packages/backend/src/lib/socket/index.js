import { Server } from 'socket.io';
import chatHandler from './handlers/chatHandler';

const debug = require('debug')('socket');

const setup = (server) => {
  debug('Initializing Socket.IO server ');
  const io = new Server(server, { /* options */ });

  const onConnection = (socket) => {
    debug('New socket connection');
    chatHandler(io, socket);
  };

  io.on('connection', onConnection);
};

export default setup;
