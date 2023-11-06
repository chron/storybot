const { users } = require('@architect/shared/users');
const config = require('@architect/shared/config');
const standup = require('@architect/shared/standup');
const slackMessage = require('@architect/shared/slackMessage');
const shouldIRun = require('@architect/shared/shouldIRun');

exports.handler = async function() {
  await Promise.all(config.map(async team => {
    console.log(`Running standup for ${team.name}`);

    if (!shouldIRun(team)) { return; }

    console.log('Should run, generating standup text');

    const text = [
      standup(team, users)
    ];

    console.log('Standup text generated');
    console.log('Posting to slack');

    return slackMessage(team, { text: text.filter(v => v).join("\n\n") });
  }));

  console.log('Finished');
}
