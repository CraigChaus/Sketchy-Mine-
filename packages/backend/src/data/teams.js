import { Team } from "./model/team";
import { User } from "./model/user";

let bob = new User("Bob");
let jack = new User("Jack");
let susan = new User("Susan");
let alice = new User("Alice");
let mark = new User("Mark");
let david = new User("David");

let team1 = new Team("Team 1");

let team2 = new Team("Team 2");
team2.members.push(bob);
team2.members.push(jack);
team2.members.push(susan);

let team3 = new Team("Team 3");
team3.members.push(alice);
team3.members.push(mark);
team3.members.push(david);

export const Teams = [
    team1, team2, team3
]
