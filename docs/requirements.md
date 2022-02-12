# Requirements for Sketchy Mine

## Business requirements

Requirement ID | Statement | MSCW
----- | ------ | -----
B1 | Business wants to accumulate as many players as possible | MUST
B2|Business wants to have a shopping system in the game|MUST
B3|Business wants the system to display a players statistics|MUST
B4|Business wants the game to have an emerald mine theme|MUST
B5| Business wants to spend as little money as possible to produce the game| SHOULD

## User requirements

### Player user

Requirement ID| Statement | MSCW
------ | ------- | ------
U1|User can view another players statistics |MUST
U2|User can view their rank in the leaderboard|MUST
U3|User can get into an active session match|MUST
U4|User can draw on the canvas in the game|MUST
U5|User can get help on how to play the game|MUST
U6|User can submit a guess|MUST
U7|User can chat with other players in the same team|MUST
U8|User can buy power ups and buffs using the emeralds they accumulated|MUST
U9|User can leave an active session match|MUST
U10|User can play the game on their mobile device|COULD

### Moderator user

Requirement ID| Statement | MSCW
------ | ------- | ------
MU1|User can influence the game logic|MUST
MU2|User can chat with all the other players|MUST
MU3|User can kick out a player|SHOULD
MU4|User can permanently ban a player|COULD

### Spectator user

Requirement ID| Statement | MSCW
------ | ------- | ------
SpU1|User can enter an active session match to watch|MUST
SpU2|User can chat with another spectator|WOULD

## System requirements

### Functional requirements
Requirement ID| Statement | MSCW
------ | ------- | ------
SF1|System can evenly distribute players between teams before and during the match|MUST
SF2|System can send messages between players in the same team|MUST
SF3|System can support drawing on a canvas|MUST
SF4|System can give each player a score|MUST
SF5|System can show a drawing in realtime|MUST
SF6|System can show a team their guesses in realtime|MUST
SF7|System can display a specific players rank score|MUST
SF8|System can display all the teams level progress in realtime|MUST
SF9|System can give the drawing team a description of what to draw|MUST
SF10|System can allow only moderators to kick out players|MUST
SF11|System can allow a player to leave an active match|MUST
SF12|System can display the game rules to a player|MUST
SF13|System can time a round of drawing and guessing|MUST
SF14|System can display the players statistics such as accuracy and average guess time|MUST
SF15|System can allow only moderators to influence the game logic|SHOULD
SF16|System can allow only moderators to permanently ban a player|COULD


### Non functional requirements
Requirement ID| Statement | MSCW
------ | ------- | ------
SNF1|System can be available and run 24/7|MUST
SNF2|System can securely log in a player|MUST
SNF3|System can run on a web browser|MUST
SNF4|System can handle up to 99 players per match|MUST
SNF5|System can handle an unlimited number of spectators|MUST
SNF6|System can run on a mobile device|COULD 

