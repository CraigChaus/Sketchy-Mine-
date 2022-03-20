import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import debug from 'debug';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import credentialsRouter from './routes/credentials';

export const IS_PROD = process.env.NODE_ENV === 'production';

const app = express();

if (IS_PROD) {
  const dbg = debug('sentry');

  dbg('Setting up...');
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

const cors = require('cors');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/credentials', credentialsRouter);

if (IS_PROD) {
  app.use(Sentry.Handlers.errorHandler());
}

export default app;
