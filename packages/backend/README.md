# Sketchy Mine API Server

This project contains the Express REST server for the game, as well as the Socket.IO server for game state.

## Running

### Requirements

> Important, prior to running the server, copy the [_.env.example_](./.env.example) file provided into _.env_, and edit the variables as required.

Ensure a PostgreSQL server is reachable and configured with the **DB_URL** variable configured.

#### Compose

A [docker-compose file](./docker-compose.yml) has been provided for running a local database server.

### Dev

To run the project in development mode, run `npm run watch:dev`.

### Production

To transpile and run the project in production mode, run `npm run prod`.

### Test

Use `npm test` to run the Jest test cases.

## Linting

This project is set up to be automatically linted using ESLint. Install ESLint for your editor and make sure all commits are linted before being pushed to Gitlab.

> Gitlab will automatically run a linting pipeline task, so the pipeline **will fail** if the code has linting errors!

## Future Plans

- Additional tests
