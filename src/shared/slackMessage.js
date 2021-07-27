const fetch = require('node-fetch');

module.exports = async function slackMessage(text) {
  return fetch(process.env.SLACK_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify({
      username: 'Sloth Bot 9000',
      icon_emoji: ':sloth:',
      channel: process.env.SLACK_CHANNEL,
      text
    }),
  });
}
