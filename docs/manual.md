# Installation & Deployment Manual

The Sketchy Mine system consists of two main modules, the backend Node server, and the Svelte game frontend. Additionally, a PostgreSQL database service is used.

To deploy a usable game environment, the database, backend, and frontend _must_ be running and configured correctly,

## Backend

### PostgreSQL

> The latest Postgres version as of 07.03.2022 is used, _v14_. Other versions have not been tested.

For quickly launching a database, a [development docker-compose file](../packages/backend/docker-compose.yml) has been provided, which spins up a Postgres, and pgadmin instance. This compose file requires 3 DB environment variables (`DB_USER`, `DB_PASS`, and `DB_NAME`) to be set. Check [Environment Configuration](#environment-configuration) for this.

Successfully using this compose file, a PostgreSQL container will be accessible on port `5432`, with the specified user, password, and database created.

Additionally, the optional, empty pgadmin interface can be accessed on port `8000`, with `noreply@sketchymine.philipposslicher.tech` as the email, and the password being the same one as specified for the database.

This docker-compose file does not have to be used if the [Production Docker Deployment](#docker-deployment) is used.

### API Server

> The backend has been tested and validated to work with Node v16. Other versions may work, but cannot be guaranteed.

To deploy the [backend](../packages/backend/README.md), the Node server can be directly started using, `npm i`, followed by `npm run prod` (in the backend directory), after setting up the required environment variables. Check [Environment Configuration](#environment-configuration) for this.

If the backend starts up correctly, the CLI output should look something like this:

![Backend - Startup](./resources/screenshots/Backend%20-%20Startup%20output.png)

#### GitLab SSO

The backend authentication system supports logging in users via email and password, but also via GitLab Single-Sign-On. To set this up, a GitLab application must be made by creating an application on the [following GitLab page](https://gitlab.com/-/profile/applications). The only required application scope is `read_user`.

##### Redirect URI

The redirect URI(s) must be set to the GitLab callback URL of the backend.
Whatever the URL of the backend may be, ensure the `HOST/auth/gitlab/callback` URL is added in order for the SSO functionality to work.
Additionally, ensure the `GITLAB_APP_ID`, `GITLAB_APP_SECRET`, `CLIENT_URL`, and `API_URL` variables are configured. Check [Environment Configuration](#environment-configuration) for this.

> For example, the current production deploy uses two redirect URIs: `http://localhost:3000/auth/gitlab/callback`, for testing in development, and `https://sketchymineapi.philipposslicher.tech:8443/auth/gitlab/callback` for the production backend server.

#### Word Bank

The default word bank, found in the [word.db](../packages/backend/words.db) file holds the list of words that are randomly chosen for each game round.
This word bank can be tweaked to preference, with each line of the file containing a word or phrase.

### Docker Deployment

Besides locally building and running the backend, the recommended way to spin up the Sketchy Mine backend is using Docker.

The backend service has been fully containerized, and the additional [production docker-compose](../deploy/docker-compose.yml) has been provided for this.

This file is a production-ready configuration for running the backend, which utilizes Docker Volumes for persisting the database, automatic restarting in case of crashes, a locked down Postgres behind an internal network, and the necessary environment variables needed to run the backend container.

The backend image is continuously built in our CI pipeline from the main branch, and is available under the `registry.gitlab.com/saxion.nl/server-clients/dhi2v.so2/backend:latest` tag.

To use this image, ensure the Docker host has been configured to authenticate with GitLab using the [GitLab Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/).

> The backend image can also be locally built, instead of being pulled from GitLab, by running the `npm run docker:build` command in the backend package.

To deploy the entire backend using this approach, ensure a valid `.env` has been [configured](#environment-configuration) in the same folder as the production docker-compose file, and then run `docker-compose up -d`.

### Environment Configuration

The following is a table overview of all the available environment variables for the backend. These variables can either be passed in by copying the [_.env.example_](../packages/backend/.env.example) file provided into _`.env`_, and editing the variables as required, or by Docker container variables, if Docker deployment is used (see: [Docker Deployment](#docker-deployment)).

| Key                     | Description                                                                                            | Default Value |          Required?           |
| :---------------------- | :----------------------------------------------------------------------------------------------------- | :-----------: | :--------------------------: |
| DB_URL                  | PostgreSQL connection string                                                                           |      N/A      |              ✅              |
| DB_NAME                 | PostgreSQL database name to use (used for docker compose)                                              |      N/A      | 🟨 (if using docker-compose) |
| DB_USER                 | PostgreSQL username (used for docker compose)                                                          |      N/A      | 🟨 (if using docker-compose) |
| DB_PASS                 | PostgreSQL password (used for docker compose)                                                          |      N/A      | 🟨 (if using docker-compose) |
| SYNC                    | Whether to forcefully re-create the database (should be `true` or `false`)                             |    `false`    |              ❌              |
| SENTRY_DSN              | The backend uses Sentry for automated error monitoring and tracing. A valid Sentry API key may be used |      N/A      |              ❌              |
| ROUND_DURATION          | Sets the duration, in seconds, of a single game round                                                  |     `30`      |              ❌              |
| ROUND_POINTS_MULTIPLIER | Linear digging distance point multiplier for all rounds. (`1`, `1.3`, `2`, etc)                        |      `1`      |              ❌              |
| EMERALD_SHARD_VALUE     | Sets the amount of shards needed to obtain a single emerald                                            |      `5`      |              ❌              |
| LEVEL_SHARDS            | Sets the amount of base shards (before level multipliers) gained per checkpoint                        |      `1`      |              ❌              |
| WORD_BANK               | Relative path for the backend to load a word bank file (.e.g `words.db`)                               |      N/A      |              ✅              |
| GITLAB_APP_ID           | GitLab OAuth Application ID                                                                            |      N/A      |      🟨 (SSO optional)       |
| GITLAB_APP_SECRET       | GitLab OAuth Application Secret                                                                        |      N/A      |      🟨 (SSO optional)       |
| CLIENT_URL              | GitLab OAuth Redirect Client URL (e.g. `http://localhost:8080`, base frontend URL)                     |      N/A      |      🟨 (SSO optional)       |
| API_URL                 | GitLab OAuth Callback URL (e.g. `http://localhost:3000`, base backend URL)                             |      N/A      |      🟨 (SSO optional)       |

## Frontend

> Ensure the appropriate environment variables are set prior to building the frontend

To deploy the frontend, the [frontend package](../packages/frontend/README.md) can be built using `npm i`, followed by `npm run build`.

The built application can be locally started using `npm run start`.

A recommended way to host the frontend is to use a service like Netlify, which can be used to deploy the frontend with zero configuration, besides setting the correct build environment variable(s).

If the frontend starts up correctly, the CLI output should look something like this:

![Frontend - Startup](./resources/screenshots/Frontend%20-%20Startup%20output.png)

Loading the frontend in a web browser should load the home page:

![Frontend - Home Page](./resources/screenshots/Frontend%20-%20Home%20Page.png)

The main game page itself can be loaded by clicking the _Play_ button:

![Frontend - Game Page](./resources/screenshots/Frontend%20-%20Game%20Page.png)

### Environment Configuration

| Key        | Description                                                                                             | Default Value | Required? |
| :--------- | :------------------------------------------------------------------------------------------------------ | :-----------: | :-------: |
| SENTRY_DSN | The frontend uses Sentry for automated error monitoring and tracing. A valid Sentry API key may be used |      N/A      |    ❌     |
| API_URL    | The base URL of the backend (e.g. `http://localhost:3000`)                                              |      N/A      |    ✅     |

## Playing the Game

Once the system is configured and running, the game be played. For information on game-level specifics, consult the [Game Design Document](./game-design.md)
