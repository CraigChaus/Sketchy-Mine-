/**
 * In-memory teams DB
 */
export const Teams = [];

/**
 * Set the teams available
 * @param {Team[]} t Array of teams to set
 */
export function updateTeams(t) {
  Teams.length = 0;
  t.forEach((element) => Teams.push(element));
}

/**
 * Remove a player from any team they are in
 * @param {String} username Player username to remove
 */
export function removePlayerFromTeam(username) {
  Teams.forEach((t) => {
    t.members = t.members.filter((m) => m.username !== username);
  });

  // Delete any teams that are now empty
  updateTeams(Teams.filter((t) => t.members.length > 0));
}

/**
 * Add a new team
 * @param {Team} t Team instance to add
 */
export function addTeam(t) {
  Teams.push(t);
}
