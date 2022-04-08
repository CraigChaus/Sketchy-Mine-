# System Document
---
## Functional design

### Goal

The purpose of the created product is entertainment by teaming up with other players and competing in order to gain ranks in the player board.
### Product


The presented product is a network game created for a large number of players who will be divided into teams.  Teams compete with each other to collect prizes.  This game does not have an ending, but it has difficulty levels, with each level the prize for completing the task increases.  The game consists in guessing the word made by one of the teams, using the image of this word in the form of a sketch as a clue.  The game also has a moderator who has a direct influence on the course of the game.





### Requirements

### Business requirements

| Requirement ID | Statement                                                               | MSCW   |
| -------------- | ----------------------------------------------------------------------- | ------ |
| B1             | Business wants to accumulate as many players as possible                | MUST   |
| B2             | Business wants to have a shopping system in the game                    | MUST   |
| B3             | Business wants the system to display a players statistics               | MUST   |
| B4             | Business wants the game to have an emerald mine theme                   | MUST   |
| B5             | Business wants to spend as little money as possible to produce the game | SHOULD |

### User requirements

#### Player user

| Requirement ID | Statement                                                            | MSCW  |
| -------------- | -------------------------------------------------------------------- | ----- |
| U1             | User can view another players statistics                             | MUST  |
| U2             | User can view their rank in the leaderboard                          | MUST  |
| U3             | User can get into an active session match                            | MUST  |
| U4             | User can draw on the canvas in the game                              | MUST  |
| U5             | User can get help on how to play the game                            | MUST  |
| U6             | User can submit a guess                                              | MUST  |
| U7             | User can chat with other players in the same team                    | MUST  |
| U8             | User can buy power ups and buffs using the emeralds they accumulated | MUST  |
| U9             | User can leave an active session match                               | MUST  |
| U10            | User can play the game on their mobile device                        | COULD |

#### Moderator user

| Requirement ID | Statement                                | MSCW   |
| -------------- | ---------------------------------------- | ------ |
| MU1            | User can influence the game logic        | MUST   |
| MU2            | User can chat with all the other players | MUST   |
| MU3            | User can kick out a player               | SHOULD |
| MU4            | User can permanently ban a player        | COULD  |

#### Spectator user

| Requirement ID | Statement                                       | MSCW  |
| -------------- | ----------------------------------------------- | ----- |
| SpU1           | User can enter an active session match to watch | MUST  |
| SpU2           | User can chat with another spectator            | WOULD |

### System requirements

#### Functional requirements
| Requirement ID | Statement                                                                         | MSCW   |
| -------------- | --------------------------------------------------------------------------------- | ------ |
| SF1            | System can evenly distribute players between teams before and during the match    | MUST   |
| SF2            | System can send messages between players in the same team                         | MUST   |
| SF3            | System can support drawing on a canvas                                            | MUST   |
| SF4            | System can give each player a score                                               | MUST   |
| SF5            | System can show a drawing in realtime                                             | MUST   |
| SF6            | System can show a team their guesses in realtime                                  | MUST   |
| SF7            | System can display a specific players rank score                                  | MUST   |
| SF8            | System can display all the teams level progress in realtime                       | MUST   |
| SF9            | System can give the drawing team a description of what to draw                    | MUST   |
| SF10           | System can allow only moderators to kick out players                              | MUST   |
| SF11           | System can allow a player to leave an active match                                | MUST   |
| SF12           | System can display the game rules to a player                                     | MUST   |
| SF13           | System can time a round of drawing and guessing                                   | MUST   |
| SF14           | System can display the players statistics such as accuracy and average guess time | MUST   |
| SF15           | System can allow only moderators to influence the game logic                      | SHOULD |
| SF16           | System can allow only moderators to permanently ban a player                      | COULD  |


#### Non functional requirements
| Requirement ID | Statement                                           | MSCW  |
| -------------- | --------------------------------------------------- | ----- |
| SNF1           | System can be available and run 24/7                | MUST  |
| SNF2           | System can securely log in a player                 | MUST  |
| SNF3           | System can run on a web browser                     | MUST  |
| SNF4           | System can handle up to 99 players per match        | MUST  |
| SNF5           | System can handle an unlimited number of spectators | MUST  |
| SNF6           | System can run on a mobile device                   | COULD |


---
### Interface

#### Description of a graphical representation of interaction with the WebApplication.

![UseCaseDiagram](./resources/diagrams/Use%20Case%20Diagram.png "Use case diagram")


#### Use case diagrams consist of 3 actors:
1. Player
2. Moderator
3. Spectator


#### Player capabilities:
- The player can register to participate or log into a previously registered account. Alternatively, users can also play as guests, meaning they do not have login whatsoever.

- Players can collect shards as a team by reaching certain progress points throughout levels
- Player can see the progress and rating of the players.
- During the game, the player communicates via chat with their team, discussing options for solving the current word.
- The players of the team can guess the drawn image through voting and chat discussions
- Can draw on the canvas

#### Spectator capabilities:
- The spectator can just watch the game process, without the ability to somehow influence it
- Spectators have the ability to chat with eachother
- Spectators can also be logged in users


#### Purpose of moderator:
 The goal of the moderator is to monitor and control the correct course of the game.

#### Moderator capabilities:
- The moderator's capabilities include private chat with the whole team, as well as with an individual team member.
- The moderator can kick any player out of the game, as well as completely ban the player's account.
- Moderators can send warning messages to teams and/or players


## Description of Component Diagram

![ComponentDiagram](./resources/diagrams/Abstract%20Component%20Diagram.png "Abstract component diagram")

#### Component diagram consists of 7 components connected to each other illustrating the operation of the system.

- The Client Web Browser component that requires the
 Game Server component to provide a running game, inside the Game server component are four subclasses:

  1.Socket.IO component, which provides our Client Web Browser component realtime web application ( communication between webclient and servers).

  2.Authentication, is for authenticating the user credentials using JWT and consists of 2 seperate middleware layers which one of them checks if the user is a moderator or not.

  3.Socket Handler, the socket handler defines the functionality of the sockets and is the layer that processes the incoming/outgoing message events.
  
  4.Database controller component, Data from the Socket.io component is streamed to the Database controller component, which in turn is connected to the database.

  
  
- the Database component provides access to write new data about the course of the game, players, and so on, it also provides the Database Controller with access to read previously saved data.
## Diagrams
### Package Diagram
![PackageDiagram](./resources/diagrams/Package%20Diagram.png)

The game logic are the rules, and the evaluation of every turn inside the game. After playing round after round the shards that the players collect are calculated into emeralds which then is added to the players account. SocketIO is the socket library that connects users to the web server. 

There are Spectators, Drawers, Guessers and Moderators as for different types of users which all of them use sockets.

The Database component, uses the controllers to read and write the data to/from the database.

### Application Layer Diagram
![Application Layer Diagram](./resources/diagrams/Application%20Layer%20Diagram.png)

Game Server, Game Logic and GUI are in the game specific layer. The first layer is about the logic of the game the animation of the game and basically the storing of the game entirely.
Network, Graphics and GUI are in the Middleware layer. Network focuses on the communication between the game and the server. Graphics are a collection of subsystem all related to visualizing the game in our case the canvas, progress bar, chat component interface etc..

After encapsulating everything and having input from the last layer which is System Software the end product is our game Sketchy Mine.

### Deployment Diagram
![Deployment Diagram](./resources/diagrams/Deployment%20Diagram%20.png)

The server contains a Docker container containing the container for the backend, a container for DataDog (which is simply a web traffic monitor) and a database container for postgres (where we store user data). These components are Dockerized to create a seperate container for each client connected to the VPS to optimize performance and compatibility.

Netlify is the service responsible for deploying the frontend to the clients browser with information provided by the VPS  for optimum performance and security.

The external service Sentry is for tracking any errors or performance hinderances that might be in the product code.It communicates with both the VPS and Netlify for it to check those two components. We use Gitlabs OAuth SSO provider for Single Sign Ons when registering to play.

All the external components communicate to each other using an HTTPS protocol. The site has to be secure in order to protect the user from data exploitation. The client is the Computer that will use the browser to play the game. All communication is bidirectional. With the help of all these performance tools the deployed game performs well even when multiple clients are connected to it.

## Technical design
The following section describes the technologies and development tools we have used throughout the development process of our game.

### Technology stack

#### Programming language
- JavaScript - to create the application and add dynamic behavior to web pages 

#### User interface
- HTML - to ensure proper formatting of text and images on the web page
- CSS - to style and layout the web pages

#### Frontend frameworks
- Svelte - for faster development with reusable components
- Tailwind - CSS framework for a faster styling process

#### Backend frameworks
- SocketIO - to enable bidirectional communication between the client and the server
- ExpressJS - to configure routes and render HTML pages for various HTTP requests
- Sequelize - ORM that eases the database management

#### Runtime environment
- NodeJS - to start both the frontend and the backend web applications

#### Database
- PostgreSQL - for data storage and querying

#### Hosting
- VPS - for hosting our application to be used by multiple users

#### Containerization
- Docker Compose - to configure multiple Docker containers on the same host

#### Linter
- ESLint - to make code more consistent and readable

### Development tools
#### Code editors
- Visual Studio Code - free, open-source, cross-platform editor
- JetBrains Intellij IDEA - provides a service for pair programming - Code With Me, free version for students

#### Version control tools
- Git - to track the changes made to files

#### Online code repositories
- Gitlab - for team collaboration

#### Additional tools for wireframes and diagrams creation
- PowerPoint
- draw.io 

## Communication protocols
Since is going to be an online game the protocols we are going to use WebSockets and HTTP. HTTP over a REST API will be used for interacting with the game and dispatching certain actions like logging in, joining a game, etc. HTTP will also be used to serve the client Svelte frontend. Socket.IO over WebSockets will be used between the server and client to receive game updates. For the database, we are going to use the SQL protocol to query and store persistent information.

---

## Road-map

| Sprint nr | Start      | End        | Main aim                                                                                                                                                                                                                             | User stories                 |
| --------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| 0         | 07/02/2022 | 13/02/2022 | Come up with a game idea, subdivide team into smaller groups, make pitch presentation for the publisher, write initial docs, plan Sprint 1                                                                                           | –                            |
| 1         | 14/02/2022 | 06/03/2022 | Basic user (web) interface, main parts of our game (canvas, buttons, chat, group listings, ranking, various pages such as the login page, etc.), Basic UI functionality (Sketching on the canvas, Word guessing, Basic chat system ) | 3, 4, 5                      |
| 2         | 07/03/2022 | 20/03/2022 | Implement database, level progression system, user accounts, moderation, spectating                                                                                                                                                  | 1, 2, 6, 7, 8, 9, 10, 11, 12 |
| 3         | 21/03/2022 | 10/04/2022 | Polishing the game, fixing game bugs, improving features                                                                                                                                                                             | TBA                          |

## Server protocol spec

### Teams

| Type    | Event name        | Payload      | Action                                                       |
| ------- | ----------------- | ------------ | ------------------------------------------------------------ |
| listens | `teams:get`       | –            | Request server to send an array of `Team` objects            |
| listens | `teams:join`      | –            | Request to put the socket's user into a team                 |
| sends   | `teams:update`    | `Team` array | Sends and array of `Team` objects including the members list |
| listens | `spectators:join` | -            | Request the server to be put into the `Spectators` Team      |

### User management

| Type    | Event name    | Payload      | Action                                                                                    |
| ------- | ------------- | ------------ | ----------------------------------------------------------------------------------------- |
| listens | `joinSession` | `Credential` | Adds a user to the current match. Sends welcome chat message. Informs other users in chat |

### Chat

| Type    | Event name    | Payload       | Action                                      |
| ------- | ------------- | ------------- | ------------------------------------------- |
| listens | `chatMessage` | `ChatMessage` | Send a chat to team members only            |
| sends   | `message`     | `chatMessage` | Sends chat message to intended users/groups |

### Guess

| Type    | Event name       | Payload       | Action                                                                                |
| ------- | ---------------- | ------------- | ------------------------------------------------------------------------------------- |
| listens | `round:guess`    | `String`      | Stores a guess from the payload                                                       |
| sends   | `round:state`    | `RoundState`  | Sends round information (such as time remaining)                                      |
| sends   | `round:result`   | `Result`      | Sends either the correct work and marks the end of a round                            |
| sends   | `round:progress` | `Guess` array | Sends team specific guesses to a user                                                 |
| sends   | `round:start`    | `Result`      | Marks a new round. Sends an object containing the correct work, whose value is `null` |

### Canvas

| Type    | Event name         | Payload  | Action                                                          |
| ------- | ------------------ | -------- | --------------------------------------------------------------- |
| sends   | `canvas:points`    | `Canvas` | Sends the canvas points to draw on other users' canvas          |
| listens | `canvas:points`    | `Canvas` | Reads canvas points that needs to be broadcasted to other users |
| listens | `canvas:clear`     | -        | Request canvas clear broadcast                                  |
| sends   | `canvas:clear`     | -        | Sends canvas clear broadcast instruction                        |
| listens | `canvas:drawer`    | -        | Request drawer role (write access to the canvas)                |
| sends   | `canvas:drawer`    | -        | Sends ok signal for drawer role request for the canvas          |
| listens | `canvas:spectator` | -        | Request spectator role (read access to the canvas)              |
| sends   | `canvas:spectator` | -        | Sends ok signal for spectator role request for the canvas       |
| listens | `canvas:guesser`   | -        | Request guesser role (read access to the canvas)                |
| sends   | `canvas:guesser`   | -        | Sends ok signal for guesser role request for the canvas         |
| listens | `canvas:new-user`  | `Canvas` | As a newly joined user ask for current canvas state             |
| sends   | `canvas:lock`      | -        | locks the canvas at the end of the round                        |
| sends   | `canvas:unlock`    | -        | unlocks the canvas at the start of a new round                  |

### Moderation
| Type | Event Name | Payload | Action |
| ------- | -------------------------- | ------- | ---------------------------------------------------------------- |
| listens | moderation:send_warning    | warning | reads the whether sender is a moderator & reads team and message |
| sends   | moderation:receive_warning | message | sends the message that should be displayed in the warning        |

### Object types in Payload

#### Credential

```
{ 
  username,
  session
}
```

#### Team

```
{
  teamname,
  isDrawing,
  isSelf,
  won,
  placementNr,
  points,
  level,
  shards,
  lastGuessSubmit,
  checkpoints {
    1,
    2,
    3,
  },
  colour,
  members[Member]
}
```

#### Member

```
{
  username,
  guessed,
  current,
  draws
}
```

#### chatMessage

```
{
  username,
  text,
  currentTime,
  type
}
```

#### Canvas 

```
{ 
  points,
  brushColor,
  brushRadius
}
```

#### RoundState

```
{
  roundTime
}
```

#### Result

```
{
  result
}
```

#### Guess

```
{ 
  value,
  frequency
}
```

#### Warning
```
{
  token,
  team,
  message
}
```

## Branching strategy
The team decided to use branching strategies in this project to enable parallel development for every member of the team.

#### What is a branching strategy
Branching strategy it is essentially a set of rules that developers can use to specify how they interact with a common codebase.
A branching strategy is thus the strategy used by software development teams when writing, merging, and deploying code when using a version control system.

#### Where 
Branches are primarily used by teams to develop features by providing them with a separate workspace for their code. Upon completion of work, these branches are usually merged back into a master branch. In this manner, features (as well as any bugs and bug fixes) are separated from one another, allowing you to fix mistakes more easily.

#### What are branches
Branches are isolated lines of code that branch off the master branch, letting developers to work individually before merging their changes back into the code base.
By default, all branches have been made protected. Thus, only the person responsible for merging branches (Maintainer role) has access to the final decision on merging branches.

#### How it helps
1) This means that branches protect the mainline of code and that any changes made to any given branch have no effect on other developers.

2) Maintain a bug-free code base in which developers can quickly resolve issues and return changes to production without disrupting the development workflow.
3) Moreover, for more efficient work through Gitlab, it was decided to use an additional tool "Сontinuous Integration"(CI). When changes are checked in, CI validates them using an automated build process that also runs validation and integration tests. Continuous integration aims to detect bugs and errors faster and eliminate integration issues that arise when developers work in isolation, resulting in higher quality software releases and faster delivery times.
   CI was necessary to quickly identify problems in the code before pushing it to the main branch.
4) Since branches are created protected by default, each developer creating a branch does not have the opportunity to directly merge his branch after changes with the main one. This helps protect the base code from multiple conflicts and bugs.
5) In addition, in order to better track the process of the work of the entire team in real time, labels for each merge reguest were used in this project. Labels (like bug, feature request,FrontEnd, BackEnd or docs.) help the developer responsible for the merge to classify the branches associated with different problems and quickly decide what priority to merge branches
