const fetch = require('node-fetch');

module.exports = async function slackMessage(team, message) {
  if (!team.webhookEnvVar) {
    console.error(`No webhook set for ${team.name}`);
    return;
  }

  return fetch(process.env[team.webhookEnvVar], {
    method: 'POST',
    body: JSON.stringify(message),
  });
}
