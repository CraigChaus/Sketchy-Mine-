# *Project* Sketchy Mine

> *By Team* DHI2V.So2

---

## Project folder structure

- `deploy` folder contains the VPS deployment files
- `docs` folder contains the project documentations
- `packages` folder contains the source codes for the backend and for the frontend

## Documents

The docs folder has two sub-folders:
- `internal` (taken notes, todo tasks, etc.)
- `resources` (images for the docs, presentations, etc.)

The resources folder contains:
- The diagrams
- Image sources

The docs folder contains the following documents:
- [Game Design Doc](./docs/game-design.md)
  - Definition of our game
  - Gameplay description
  - Game rules
  - Mockups
- [Playtest](./docs/playtest.md)
  - Feedback on our game during the playtest
- [Standups](./docs/standups.md)
  - Team standup notes
  - Sub-group standup notes
- [System Doc](./docs/system.md)
  - Functional design
  - Requirements
  - Diagrams
  - Technical design
  - Networking protocol spec
  - Roadmap (project deadlines and User Stories plan)
- [Team Plan Doc](./docs/team-plan.md)
  - Team composition (roles, sub-group members)
  - Code of Conduct
  - Process artifacts
  - Backlogs
  - Budget brakedown
  - Sprint retrospectives
  - Team communication plan
- [Time Sheet](./docs/Timesheet.xlsx)
  - Time spent on the project by individual team members

## Backend

The [packages/backend](./packages/backend/README.md) directory contains the Sketchy Mine backend. This package is the backend server that communicates with the database and the frontend.

The backend package contains the `.env` file that holds the configuration to connect a PostgreSQL database to the backend.

## Frontend

The [packages/frontend](./packages/frontend/README.md) directory contains the Sketchy Mine Svelte frontend. This package holds the code for the website that will communicate with the backend.

