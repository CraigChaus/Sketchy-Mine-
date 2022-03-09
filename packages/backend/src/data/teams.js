import Team from './model/team';
import User from './model/user';

const bob = new User('Bob');
const jack = new User('Jack');
const susan = new User('Susan');
const alice = new User('Alice');
const mark = new User('Mark');
const david = new User('David');

const team1 = new Team('Team 1');

const team2 = new Team('Team 2');
team2.members.push(bob);
team2.members.push(jack);
team2.members.push(susan);

const team3 = new Team('Team 3');
team3.members.push(alice);
team3.members.push(mark);
team3.members.push(david);

export const Teams = [
  team1, team2, team3,
];

export function updateTeams(t) {
  Teams.length = 0;
  t.forEach((element) => Teams.push(element));
}

export function removePlayer(username) {
  Teams.forEach((t) => {
    t.members = t.members.filter((m) => m.username !== username);
  });
}
