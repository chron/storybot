const fetch = require('node-fetch');

module.exports = async function slackMessage(team, message) {
  return fetch(process.env[team.webhookEnvVar], {
    method: 'POST',
    body: JSON.stringify(message),
  });
}
