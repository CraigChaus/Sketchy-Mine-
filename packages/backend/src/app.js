import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import credentialsRouter from './routes/credentials';

export const IS_PROD = process.env.NODE_ENV === 'production';

const app = express();
const cors = require('cors');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/credentials', credentialsRouter);

export default app;
