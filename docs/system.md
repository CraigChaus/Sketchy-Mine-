# System Document
---
## Requirements

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

## User stories
1. As a system admin, I want the user to be able to sign up and sign in, so that the progress is saved to their account.

2. As a player, I want to be able to see the players' statistics, so that I can compare myself to other players.

3. As a player, I want to be able to draw on a canvas, so that the teams can guess my word. 

4. As a player, I want to be able to submit my guess, so that I can get more emeralds.

5. As a player, I want a chat functionality, so I can communicate with my teammates.

6. As a player, I want the game to be mobile responsive, so that I can play it on my mobile phone.

7. As a player, I want the ability to leave an ongoing game, so that I am not forced to play.

8. As a moderator, I want to remove players from an ongoing game, so that there is no inappropriate behavior.

9. As a moderator, I want to buff or debuff teams, so that I can influence the game logic.

10. As a user, I want to be able to spectate, so that I can watch an ongoing game.

11. As a player, I want to get emeralds, so that I can purchase powerups with the gained emeralds.

12. As a moderator, I want to have a means of communicating with the players, so that I can give them warnings.

---

## Backlog items

### Sprint 1

### US03 - As a player, I want to be able to draw on a canvas, so that the teams can guess my word.

#### US03 BI01
Create canvas component

#### US03 BI02
Create separate roles for drawing and viewing canvas

#### US03 BI03
Create drawing tools (e.g. colours) selection

#### US03 BI04
Create websocket for transferring canvas content between drawer and server

#### US03 BI05
Create a save of the canvas content for sending to users that connected later on

### US04 - As a player, I want to be able to submit my guess, so that I can get more emeralds.

#### US04 BI01
 Create guess section where guesses will be submitted

#### US04 BI02
Ability to pick a guess from the guess list

#### US04 BI03
See top picks guess in a certain team

#### US04 BI04
Get emeralds when the guess is correct

#### US04 BI05
Create a progress bar to see where the team is currently at

#### US04 BI06
Multiply the gained emeralds when a new level is reached


### US05 - As a player, I want a chat functionality, so I can communicate with my teammates.
#### US05 BI01
Create chat component

#### US05 BI02
Add chat frontend functionality

#### US05 BI03
Establish socket.io server

#### US05 BI04
Add chat backend functionality

---

## Development tools

For Sprint 1 to start developing the game, we decided to use Svelte, Tailwind CSS for the client. For the server, we are going to use Node.js, Express, Socket.IO, and PostgreSQL. The server will store player data, and distribute the game state to connected clients.

All team members will use Visual Studio Code as the primary editor for the project.

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