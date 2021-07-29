const fetch = require('node-fetch');

module.exports = async function slackMessage(text) {
  return fetch(process.env.SLACK_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify({
      text
    }),
  });
}
