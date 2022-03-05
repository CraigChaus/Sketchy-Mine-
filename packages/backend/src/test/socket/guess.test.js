import Client from 'socket.io-client';
import { createServer } from 'http';
import setup from '../../lib/socket';
import { GUESS_EVENTS } from '../../lib/socket/handlers/guessHandler';

describe('SocketIO Guess Backend', () => {
  let io;
  let clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = setup(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address();
      clientSocket = new Client(`http://localhost:${port}`);
      // io.on('connection', (socket) => {
      //   serverSocket = socket;
      // });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('Guess - Invalid guess', (done) => {
    const message = 'invalid guess';

    clientSocket.emit(GUESS_EVENTS.ROUND_GUESS, message);

    clientSocket.on(GUESS_EVENTS.ROUND_STATE, () => {
      done();
    });
  });
});
