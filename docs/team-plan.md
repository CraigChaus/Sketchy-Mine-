# Team Plan

## Table Of Contents
- [Roles](#roles)
- [Code of Conduct](#code-of-conduct)
- [Process artifacts](#process-artifacts)
    - [User stories](#user-stories)
    - [Backlog items](#backlog-items)
- [Budget](#budget)
- [Sprint retrospectives](#sprint-retrospectives)
    - [Sprint 0](#sprint-0)
    - [Sprint 1](#sprint-1)
    - [Sprint 2](#sprint-2)
    - [Sprint 3](#sprint-3)
- [Communication methods](#communication-methods)
---

## Roles

### Team Roles

The whole team is divided into 2 groups. Each group has an ambassador and a scrum master.

We have a few roles that are responsible for different aspects of the teams.
Certain roles will be swapped within the team for the following sprints.
Below is an overview of the role description and who is responsible.

### Groups

**Group 1**

- Craig Chauraya
- Vincenzo Savarase
- Ana Kareco
- Mira Ilieva
- Melissa Neamt-Jilovan
- Daria Grigoruk

**Group 2**

- Philippos Slicher
- Lukman Sulaiman Al-Busaidi
- Marko Špišic
- Peter Pinter
- Vedat Daglar

### Roles

#### Git Maintainer

- Responsible: Philippos Slicher

The Git Maintainer keeps track of the team repository. Their goal is to keep
the repo clean and organized.

#### VPS Responsible

- Responsible: Philippos Slicher

As the project will be running on a virtual private server, there must be
someone who is responsible for the connection of the VPS and the project itself
therefore we have a role dedicated to this issue.

#### Head Ambassador

- Responsible: Peter Pinter

The purpose of the ambassador is to handle the two groups ambassadors and maintain the progress of the team.

#### Scrum Masters

- Group-1 Scrum Master (Sprint 1): Craig Chauraya
- Group-2 Scrum Master (Sprint 1): Vedat Daglar
- Group-1 Scrum Master (Sprint 2): Mira Ilieva
- Group-2 Scrum Master (Sprint 2): Lukman Sulaiman Al-Busaidi
- Group-1 Scrum Master (Sprint 3): Mira Ilieva
- Group-2 Scrum Master (Sprint 3): Peter Pinter

The scrum masters keep track of the issues/tasks given for the following stand-up meeting.

#### Group Ambassadors

- Group-1 Ambassador (Sprint 1): Vincenzo Savarese
- Group-2 Ambassador (Sprint 1): Vedat Daglar
- Group-1 Ambassador (Sprint 2): Melissa Neamt-Jilovan
- Group-2 Ambassador (Sprint 2): Philippos Slicher
- Group-1 Ambassador (Sprint 3): Craig Chauraya
- Group-2 Ambassador (Sprint 3): Lukman Sulaiman Al-Busaidi

The group ambassadors are responsible for communication with the other teams' ambassador.
They also inform the head ambassador of the progress within the team.

---

## Code of Conduct

### Article 1 - Acceptance of Code of Conduct and new versions

_§1_ All team members, who are considered as members of this team (team no. 2) by the official Excel sheet of the group members list agree to this code of conduct automatically and declare they are aware of said rules and accept them.

_§2_ Upon publishing the code of conduct to the team's repository (GitLab), the committer of the document containing the code of conduct must inform all team members about the existence of the code of conduct within 24 hours of publication. Written proof must be present of this.

_§3_ Once the document containing the code of conduct is published, all team members must read the code of conduct within 72 hours (3 days). Once 72 hours passed, all team members, who have been informed by the code of conduct's publisher (with written proof) are considered to have read and accepted the code of conduct, considering no objections have been raised.

_§4_ Once a team member is notified about of the publication of a version of the code of conduct, team members must decline articles and/or individual paragraphs within 72 hours after the publication of the code of conduct. If a team member declines the publication of the code of conduct, they must act under the definition of paragraph 6. If no reaction is made, or they do not act under paragraph 6, that means the team member accepts the code of conduct.

_§5_ Once the first version of the code of conduct is published, changes to the code of conduct may be made. A new version to the code of conduct may only be made after 120 hours passed of the last version's publication. Once 120 hours passed, a new version may be published under the same procedure describe in Article 1, paragraph 1 to 4.

_§6_ If a team member decides not to agree with a section of the newly published code of conduct, they must inform all team members about the section they are not in agreement with. In this case, within 48 hours, all team members must agree on a change. If this does not happen, the original version will stay in act.

### Article 2 - Strike definition

_§1_ A team member may be given a maximum of 3 strikes. Upon receiving the third strike, under the definition of the manual, the team member is removed from the team.

_§2_ A strike may be issued to any team member once they do not follow any point the code of conduct, however, issuing a strike is not mandatory. A strike can only be issued if the majority of the team agrees to issue the strike. There must be written proof of said agreement.

### Article 3 - Communication rules

_§1_ The online (long distance) communication between team members is to be performed using the shared group server in Discord. Thus, all team members must have a free account registered on Discord. Said software must be installed both on everyone's main working computer and on their personal mobile phones. Notifications must also be enabled for at least the group server to make sure team-members are aware of new messages from other team-members. This is to ensure proper team communication and to make sure that all team-members are aware of new meetings, tasks and other important information regarding the project.

_§2_ Whenever an important decision is made, or a request is made, a written proof must be made of said act that all team members can see.

_§3_ If a meeting is planned (online or physical), the meeting must be planned at least 48 hours of the planned event date. All team members must be informed about the planned meeting. Once planning is made in said manner, everyone, who doesn't give within 24 hours an expectable written reason to be absent, must be present in the meeting (online or physical). If a team member doesn't react to a meeting plan within the given time, they are considered to be aware of the meeting, and they shall therefore attend it.

_§4_ If a team member is not able to attend physical meetings due to lockdown, quarantine or if said person is abroad for an extended period of time, they then--if appropriate conditions (internet, well being, etc.) are met--must attend the physical meetings online.

### Article 4 - Work agreements

_§1_ Every team member's work must be uploaded to the team's GitLab repository. The only exception applies to the time sheet (Excel document) which is located in a shared One Drive folder.

_§2_ Every written document, that is not code, must be written in Markdown format (.md file).

_§3_ Every team member is responsible to solve merge conflicts themselves. It is neither the SCRUM master's nor the branch merger's task to solve merge conflicts. Whenever a merge conflict occurs, the one, who wrote the original code that is now causing the merge conflict, must solve the issue.

_§4_ Team members must implement their SCRUM backlog items in a separate branch and rebase their branch on the current master branch when it is ready to be reviewed and merged. Nobody is allowed to work on the master branch, as it is protected.

_§5_ Each team member must push their functioning commits to the git repository at least 1 hour before the agreed and announced deadline. If a team member is unable to finish their task in time, they must at least publish a subset of the work, indicating the status. This work must still be pushed to the upstream repository, so others can use said work.

_§6_ If a team member is "hard stuck" (cannot progress anymore alone with their task), they must ask help from others. Simply not completing their tasks is unacceptable. They must inform the team about this situation 12 hours before the agreed and announced deadline for their work.

_§7_ Whenever a team member has done any work (either alone or together with someone else) that is related to the project, they must record their working time on the team's time sheet.

_§8_ Once an announced meeting happens (online or physical), that is planned 24 hours prior (in other words, it is not an ad-hoc meeting) and no notice was provided 12 hours prior the meeting about being late, a team member is considered to be absent after being late by 15 minutes.

_§9_ Whenever a team member produces any work, it must be usable work by other team members. Usable work is defined as work that is generally complete, clear and interpretable by other team members.

_§10_ Deadlines for work and scheduled group meetings must be announced 24 hours before the actual deadline. Said announcements must be written down. The announcer must make sure everyone knows the deadline. Agreements must be made if said deadline is not suitable for a team member.

_§11_ Whenever someone has done any work, whether code or documentation related, they must inform all team members in any way that their work is completed.

_§12_ In git commit messages, the author must give a basic description about the changes that their commit contains. Commit messages must be 'semantic', prefixed with keywords such as "chore", "feature", "fix".

_§13_ In git, branches must follow the 'git flow' naming convention, and track referenced issues from the Gitlab issue board.

_§14_ In git, all branches must be automatically created from the issue board, and linked to their issue and associated merge request. Team members should not manually create arbitrary branches.

---

## Process artifacts

### User stories

1. As a user, I want the user to be able to sign up and sign in, so that the progress is saved to my account.

2. As a player, I want to be able to see the players' statistics, so that I can compare myself to other players.

3. As a player, I want to be able to draw on a canvas, so that the teams can guess my drawing.

4. As a player, I want to be able to submit my guess, so that I can get more emeralds.

5. As a player, I want a chat functionality, so I can communicate with my teammates.

6. As a player, I want the game to be mobile responsive, so that I can play it on my mobile phone.

7. As a player, I want the ability to leave an ongoing game, so that I am not forced to play.

8. As a moderator, I want to remove players from an ongoing game, so that there is no inappropriate behavior.

9. As a moderator, I want to buff or debuff teams, so that I can influence the game logic.

10. As a user, I want to be able to spectate, so that I can watch an ongoing game.

11. As a player, I want to get emeralds, so that I can purchase powerups with the gained emeralds.

12. As a moderator, I want to have a means of communicating with the players, so that I can give them warnings.

13. As a user, I want to be able to login using SSO

---

### Backlog items

#### US01 - As a user, I want the user to be able to sign up and sign in, so that the progress is saved to my account

| Backlog ID | Description            |
| ---------- | ---------------------- |
| US01 BI01  | Login page component   |
| US01 BI02  | Sign up page component |
| US01 BI03  | Login functionality    |
| US01 BI04  | Sign up functionality  |
| US01 BI05  | Routing                |
| US01 BI06  | Home screen component  |

#### US02 - As a player, I want to be able to see the players' statistics, so that I can compare myself to other players

| Backlog ID | Description            |
| ---------- | ---------------------- |
| US02 BI01  | Ranking page component |

#### US03 - As a player, I want to be able to draw on a canvas, so that the other teams can guess my drawing.

| Backlog ID | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| US03 BI01  | Create canvas component                                                          |
| US03 BI02  | Create separate roles for drawing and viewing canvas                             |
| US03 BI03  | Create drawing tools (e.g. colours) selection                                    |
| US03 BI04  | Create websocket for transferring canvas content between drawer and server       |
| US03 BI05  | Create a save of the canvas content for sending to users that connected later on |
| US03 BI06  | Create the logic for the canvas                                                  |

#### US04 - As a player, I want to be able to submit my guess, so that I can get more emeralds.

| Backlog ID | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| US04 BI01  | Create guess section where guesses will be submitted        |
| US04 BI02  | Ability to pick a guess from the guess list                 |
| US04 BI03  | See top picks guess in a certain team                       |
| US04 BI04  | Get emeralds when the guess is correct                      |
| US04 BI05  | Create a progress bar to see where the team is currently at |
| US04 BI06  | Multiply the gained emeralds when a new level is reached    |
| US04 BI07  | Add the functionality to the progress bar to move                   |
| US04 BI08  | Create guess backend                                        |
| US04 BI09  | Team level UI                                               |

#### US05 - As a player, I want a chat functionality, so I can communicate with my teammates.

| Backlog ID | Description                                   |
| ---------- | --------------------------------------------- |
| US05 BI01  | Create chat component                         |
| US05 BI02  | Connect frontend incoming chat to the backend |
| US05 BI03  | Establish socket.io server                    |
| US05 BI04  | Add chat backend functionality                |
| US05 BI05  | Connect frontend outgoing chat to the backend |
| US05 BI06  | Add team based chat scopes in the backend     |
| US05 BI07  | Add team list component                       |
| US05 BI08  | Connect team listing component with backend   |
| US05 BI09  | Make team based chat                          |

#### US06 - As a player, I want the game to be mobile responsive, so that I can play it on my mobile phone.

| Backlog ID | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| US06 BI01  | Add responsive styling to the main (game) page                           |
| US06 BI02  | Better looking progress bar (with textures and emerald pictures)         |
| US06 BI03  | Adding a page layout component with a backgorund for each page component |
| US06 BI04  | Matching login and signup pages                                          |
| US06 BI05  | Matching home screen and ranking page                                    |

#### US07 - As a player, I want the ability to leave an ongoing game, so that I am not forced to play.

| Backlog ID | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| US07 BI01  | Creating Screen for the user when they successfully leave the game |
| US07 BI02  | Player is removed from the team with saved progress                |

#### US08 - As a moderator, I want to remove players from an ongoing game, so that there is no inappropriate behavior.

| Backlog ID | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| US08 BI01  | Handle the ability to assign moderator role to a specific user                   |
| US08 BI02  | Create the moderator screen/view of the game                                     |
| US08 BI03  | Create the functionality to remove another player from their team as a moderator |

#### US09 - As a player, I want to buy power-ups to influence my gameplay

| Backlog ID | Description                                        |
| ---------- | -------------------------------------------------- |
| US09 BI01  | See a list of purchasable power-ups on screen      |
| US09 BI02  | Store power-up purchases in database               |
| US09 BI03  | Set up server to support power-up purchases        |
| US09 BI04  | Implement power-up for increasing digging distance |
| US09 BI05  | Implement power-up for getting a hint              |

#### US10 - As a user, I want to be able to spectate, so that I can watch an ongoing game.

| Backlog ID | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| US10 BI01  | Create the ability to assign spectator role to myself as a user |
| US10 BI02  | Create the spectator view of the game                           |
| US10 BI03  | Remove the user from the team if he/she wants to be a spectator |

#### US11 - As a player, I want to get emeralds, so that I can purchase powerups with the gained emeralds.

| Backlog ID | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| US11 BI01  | Create the database and the database schema                                                           |
| US11 BI02  | Handling team stats in the backend so that each level, emeralds are distributed among team members    |
| US11 BI03  | Send updates to the frontend about team progression from the backend.                                 |
| US11 BI04  | Reset the progress of the finished team to the begining when they reach the end of the progress.      |
| US11 BI05  | Store the digging distance for each team in the backend                                               |
| US11 BI06  | Pick a word from the word list in the databse and send it to the frontend                             |
| US11 BI07  | Send results of the round to the frontend to display the teams that guseed the word correclty or not. |
| US11 BI08  | Define the progress that the team should progress in each round in the backend.                       |
| US11 BI09  | Matchmaking ui in the frontend                                                                        |
| US11 BI10  | Matchmaking system in the backend                                                                     |
| US11 BI11  | Create the voting system.                                                                             |

#### US12 - As a moderator, I want to have a means of communicating with the players, so that I can give them warnings.

| Backlog ID | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| US12 BI01  | Create warning form for moderator to write the message to the player                           |
| US12 BI02  | Add button on each player tab on the teams section that opens the form for writing the warning |
| US12 BI03  | Ability to send the warning message to the player                                              |
| US12 BI04  | Displaying the warning message on the player's side with a pop up                              |

#### US13 - As a user, I want to be able to login using SSO

| Backlog ID | Description                     |
| ---------- | ------------------------------- |
| US13 BI01  | Refactor backend to support SSO |
| US13 BI02  | Add UI for SSO option           |

#### US14 - Unexpected features

| Backlog ID | Description               |
|------------|---------------------------|
| US14 BI01  | Automatic start of rounds |
| US14 BI02  | Apply sound effects       |
| US14 BI03  | Drawing notification      |
| US14 BI04  | Add page for the rules    |
| US14 BI05  | Tool tips for main page   |
| US14 BI06  | Time ends soon warning    |

---

## Budget

- Available hours per person per week: **12 hours**
- Euros required per person per hour: **50€**

### Budget breakdown

| Definition               | Cost (€) |
| ------------------------ | -------- |
| Work per person per week | 600      |
| Total cost per week      | 6'600    |
| Sprint 0                 | 6'600    |
| Sprint 1                 | 13'200   |
| Sprint 2                 | 13,200   |
| Sprint 3                 | 19,800   |
| Project total            | 52,800   |

> 12 EUR 11 _(developers)_ 50 _(hourly rate)_ \* 8 _(weeks)_ = _52'800 EUR_

---

## Sprint retrospectives

### Sprint 0

#### What accelerated us

- Clear plan on who has to do what
- Having a todo list
- Issues on gitlab (with labels, assigned members, etc)
- Working in only one environment (GitLab)
- Visual Studio Code live share (pair "programming")
- Having a game idea that doesn't rely on a game engine
- Having everyone in our Discord group so we can all communicate easily with each other

#### What slowed us down

- Communication
- Agreeing on game specifics
- Not everyone read the manual
- Enforcing standardized usage of git (commit messages, branches, issues, etc)
- Onboarding new members, who weren't there during the original planning phase

#### Future plans

- Having organized and scheduled meetings as agreed by the team
- Familiarizing everyone with the standard git rules
- Having a celebratory meeting after every sprint to boost the moral of the team, e.g lunch, mangoes and drinks
- Being more specific on deadlines and meeting times
- Clearly working in our defined sub-groups instead of as one large group (individual scrum masters, ambassadors, etc)
- Making tasks clearly explained to follow a uniform standard as agreed byn everyone in the team

#### Costs:

- Sprint 0 total time spent: *125.71 hours*
- Sprint 0 estimated costs: *6'600€*
- Sprint 0 actual costs: *6'285.5€*

### Sprint 1

![S1R](./resources/img/sprint1-retrospective.png "Sprint 1 Retrospective")

#### Focus factor:
𝑓 = 𝑓𝑜𝑐𝑢𝑠 𝑓𝑎𝑐𝑡𝑜𝑟

𝑡 = 𝑎𝑣𝑎𝑖𝑙𝑎𝑏𝑙𝑒 h𝑜𝑢𝑟𝑠 𝑝𝑒𝑟 𝑤𝑒𝑒𝑘 𝑝𝑒𝑟 𝑝𝑒𝑟𝑠𝑜𝑛 (12)

𝑛 = 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑡𝑒𝑎𝑚 𝑚𝑒𝑚𝑏𝑒𝑟𝑠 (11)

𝑤 = 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑤𝑒𝑒𝑘𝑠 𝑓𝑜𝑟 𝑎 𝑆𝑝𝑟𝑖𝑛𝑡 (2)

𝑣 = 𝑆𝑢𝑚 𝑤𝑒𝑖𝑔h𝑡 𝑜𝑓 𝑏𝑎𝑐𝑘𝑙𝑜𝑔 𝑖𝑡𝑒𝑚 (221)

![S1R](./resources/img/retrospective-formula.png "Retrospective formula")

> Focus factor this sprint: **0.83712**

> This means that the productivity of the team was great as it nearly reached 1 which the optimal ratio, this was due to the fact that every team members sticked to the rules and the deadlines for the tasks as the hours spent on this sprint for each individual is
enough.

#### Costs:

- Sprint 1 total time spent: *179.41 hours*
- Sprint 1 estimated costs: *13'200€*
- Sprint 1 actual costs: *8'970.5€*

### Sprint 2

![S2R](./resources/img/sprint2-retrospective.jpg "Sprint 2 Retrospective")

#### Focus factor:
𝑓 = 𝑓𝑜𝑐𝑢𝑠 𝑓𝑎𝑐𝑡𝑜𝑟

𝑡 = 𝑎𝑣𝑎𝑖𝑙𝑎𝑏𝑙𝑒 h𝑜𝑢𝑟𝑠 𝑝𝑒𝑟 𝑤𝑒𝑒𝑘 𝑝𝑒𝑟 𝑝𝑒𝑟𝑠𝑜𝑛 (12)

𝑛 = 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑡𝑒𝑎𝑚 𝑚𝑒𝑚𝑏𝑒𝑟𝑠 (11)

𝑤 = 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑤𝑒𝑒𝑘𝑠 𝑓𝑜𝑟 𝑎 𝑆𝑝𝑟𝑖𝑛𝑡 (2)

𝑣 = 𝑆𝑢𝑚 𝑤𝑒𝑖𝑔h𝑡 𝑜𝑓 𝑏𝑎𝑐𝑘𝑙𝑜𝑔 𝑖𝑡𝑒𝑚 (216)

![S1R](./resources/img/retrospective-formula.png "Retrospective formula")

> Focus factor this sprint: **0.81**

> The focus factor for this sprint got reduced due to the fact that team members got sick and therefore, the hours spent got also decreased. However, it roughly remained the same as the previous sprint and everyone was trying to cope with it. Nevertheless, the productivity was as good enough as the previous sprint

#### Costs:

- Sprint 2 total time spent: *191.06 hours*
- Sprint 2 estimated costs: *13'200€*
- Sprint 2 actual costs: *9'553€*

### Sprint 3
![S3R](./resources/img/sprint3-retorspective.jpg "Sprint 3 Retrospective")

#### Focus factor:
𝑓 = 𝑓𝑜𝑐𝑢𝑠 𝑓𝑎𝑐𝑡𝑜𝑟

𝑡 = 𝑎𝑣𝑎𝑖𝑙𝑎𝑏𝑙𝑒 h𝑜𝑢𝑟𝑠 𝑝𝑒𝑟 𝑤𝑒𝑒𝑘 𝑝𝑒𝑟 𝑝𝑒𝑟𝑠𝑜𝑛 (12)

𝑛 = 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑡𝑒𝑎𝑚 𝑚𝑒𝑚𝑏𝑒𝑟𝑠 (11)

𝑤 = 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑤𝑒𝑒𝑘𝑠 𝑓𝑜𝑟 𝑎 𝑆𝑝𝑟𝑖𝑛𝑡 (3)

𝑣 = 𝑆𝑢𝑚 𝑤𝑒𝑖𝑔h𝑡 𝑜𝑓 𝑏𝑎𝑐𝑘𝑙𝑜𝑔 𝑖𝑡𝑒𝑚 (255)

![S3R](./resources/img/retrospective-formula.png "Retrospective formula")

> Focus factor this sprint: **0.644**

> The purpose of this sprint was to polish/fix bugs and not implmenting a new features and as a result, every team member spent less time on the project cause the main goal was to make the game better which we managed to acheive. Hence, the focus factor got decreased. Nonetheless, the productivity of the team was good enough to finish the assigned tasks/issues on time.

#### Costs:

- Sprint 3 total time spent: *205.04 hours*
- Sprint 3 estimated costs: *19'800€*
- Sprint 3 actual costs: *10'252€*

---

## Communication methods

### Introduction

To successfully complete this complex project, team members must communicate effectively. This section of the documentDone describes the ways and general plan for team communication, as well as the tools used for this.

---

### Communication plan

The following is an overview for how the team will communicate internally, as well as with stakeholders.

| Communication     |         Audience          |                                                                                                           Goals |                            Schedule |
| ----------------- | :-----------------------: | --------------------------------------------------------------------------------------------------------------: | ----------------------------------: |
| Kick-off meeting  | Project team, stakeholder |                                                      Set expectations, introduce the project to the stakeholder |                    Start of project |
| Sprint planning   |       Project team        |                                                        Establish the backlog and objectives for the next sprint |                     Start of sprint |
| Standup           |     Project subgroup      | Share members progress, addressing further action for blocked issues. Assign items from the backlog to members. |           At least 2 times per week |
| Group brief       |    Project ambassadors    |           Share the groups progress, with an overview of the state of the group according to the global sprint. | At least once a week, and as needed |
| Sprint review     |       Project team        |                                                           Validate sprint, reflect on project and team progress |                       End of sprint |
| Publisher meeting | Project team, stakeholder |                                                        Present current deliverables, update on product progress |                       End of sprint |

### Schedule

|          | Sprint planning | Sprint review | Standups                    | Publisher meeting |
| -------- | --------------- | ------------- | --------------------------- | ----------------- |
| Sprint 1 | 14.02.2022      | 07.03.2022    | Monday, Friday (every week) | 07.03.2022        |
| Sprint 2 | 07.03.2022      | 21.03.2022    | Monday, Friday (every week) | 22.03.2022        |

### Communication tools

For communicating and sharing information with other project members, the following tools are to be used:

- Discord - A common server is used for voice/video calls, screensharing and pair programming, as well as the primary chat tool and permanent record of all team communication. Members in the server are labelled with the role of the sub-group they belong to. Multiple channels are available for members to use depending on the context necessary.
- OneDrive - A shared OneDrive folder is used to grant access to the shared timesheet for all project members to log their tracked project time.
- GitLab - The issue board is used as the single source of truth of assigned items and project state. Issues and merge requests are assigned to discrete project members, with the possibility for members to leave review notes, and manage active items. GitLab is also the central store for **_all_** project documentation (in markdown format).
- Email - Used to formally communicate with the publisher and other stakeholders
- Physical meetings - Used for standups, and publisher presentations.
