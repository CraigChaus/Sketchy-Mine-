# Game design
- An Emerald Mine™ themed, collaborative, team based sketch guessing game and a reward system.
- Teams "dig" distance to emerald shards by guessing words based on sketches.

## Levels
- There are endless levels
- Each level has a defined range of emeralds
- All emeralds must be collected in order to progress to the next level
- Teams have to dig to the end of the tunnel to progress to finish the level and to keep all the emeralds they collected in that level
- If once person disconnects before leaving the end of the tunnel, they won't keep the emeralds the team earned in that level.
- Once a level is completed, the team can keep the emeralds and they are placed back to the start with a new level indicator (counter).

## Game flow
- No defeat condition
- No win condition (endless game)

### Progression
- Teams must dig a distance (progress) to reach the end of the level
- During the digging, they can collect the emeralds that are placed in a random distance between each other

### Rewards and penalties
- Digging distance bonuses/multipliers for teams based on how fast they locked in a correct guess.
- Penalty for leaving the game without reaching the end of level (loosing all collected emeralds in that level)
- The emerald shards you earn are multiplied by the "levels completed" counter, so in higher levels, teams can earn more emerald shards when reaching an emerald ore

> An emerald shard is a fraction of an emerald (a value lass then 1). An emerald is a whole number of emerald fractions (a whole number)

## Teams
- There are 2 types of teams: a drawing team and guessing team
- Once a team is formed, no new members can join that team anymore (due to level progression)
- Members of the teams may leave any time
  - Once everyone from a team has left, the team is destroyed

### Drawing team
- In each match, one team must draw a given word for the other teams to guess. This team is randomly chosen.
- Once a team has been chosen to draw, a category is shown to the members of the team and they can elect a player to draw. 
- With a chosen player to draw, the actual word is revealed, and the player starts drawing the word.
  - The player who was elected to draw will not be able to draw again for the next 2 rounds
- If no other teams guess the word based on the drawing, no digging distance progress is made for the drawing team.
- The more people guess the word, the more digging distance is awarded

### Guessing team
- A team has to guess a word in *x* seconds
- A team has to agree on a word
  - The word has to be agreed on by 51% of the team members (majority) in order to mark it word as the team's final guess
  - Each team member has to "lock in" a word. This lock can be changed any time
- Once a word reaches majority, it is submitted and the team can make no more guesses. They have to wait for all teams to submit their guesses or wait till the time runs out
- If the team didn't agree on a word but the timer runs out, the most commonly agreed word will be submitted
- Answers from all the teams and the results (correct solution, etc.) are revealed once the timer runs out or each team submitted an answer
- If a word is guessed correctly, a great amount of digging progress is awarded (plus multipliers)
- If the word is not guessed correctly, a small amount of progress is still given to make sure that the drawing team does not make the drawing unguessable.

## Game parameters
| Name         | Max        | Minimum   |
| ------------ | ---------- | --------- |
| Server       | 99 players | 9 players |
| Team members | 30 players | 3 players |
| Teams        | 33 teams   | 3 teams   |
| Spectator    | ∞          | 0         |

## Moderator
- Moderators can (de)buff teams by temporarily increasing or decreasing a teams digging distance multiplier. 
- Moderators can also kick teams for inappropriate behavior

## Chatting
- Each team member can send chat messages within their team
- Each member in a guessing team can send messages to the drawing team

## Spectators
- Can only see the drawing board, and all the team chats. Current word is not shown.

## Ranking
- All players have their own persistent ranking, based on the number of emerald shards they have obtained while playing in teams.

## Initial match making
- Once a player joins they will be put on hold until they can join a team with 2 other players or form a new one
- The teams will be put on hold until there are at least 3 teams in total (with at least 3 players per each team)