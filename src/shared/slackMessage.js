const fetch = require('node-fetch');

module.exports = async function slackMessage(message) {
  return fetch(process.env.SLACK_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify(message),
  });
}
