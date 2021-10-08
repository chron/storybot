const shuffle = require('@architect/shared/shuffle');

module.exports = function standup(team, userNames) {
  if (!team.standupCaptains) { return null; }
  if (!team.standupMessage) { return null; }

  const [main, backup] = shuffle(team.standupCaptains);

  return team.standupMessage(userNames[main], userNames[backup]);
}
