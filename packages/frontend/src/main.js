import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';
import App from './App.svelte';

const { env } = process;

const { SENTRY_DSN, IS_PROD } = env;

if (IS_PROD && SENTRY_DSN) {
  // eslint-disable-next-line no-console
  console.log('Configuring production tracing and logging');
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
});

export default app;
