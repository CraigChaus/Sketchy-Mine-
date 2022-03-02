import { io } from 'socket.io-client';

const { env } = process;

const API_URL = env.API_URL ?? 'http://localhost:3000';

const socket = io(API_URL);

export default socket;
