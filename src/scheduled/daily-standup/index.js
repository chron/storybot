const { users } = require('@architect/shared/users');
const config = require('@architect/shared/config');
const standup = require('@architect/shared/standup');
const pullRequests = require('@architect/shared/pullRequests');
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

    if (team.showPRs) {
      console.log('Generating PR info');

      text.push(await pullRequests({
        users,
        labels: ['1. Ready for code review'],
        message: 'Pull requests with code review label that still need reviewers:',
        filterCriteria: (pr) => pr.author && pr.assignees.length < 2
      }));

      console.log('In between');

      text.push(await pullRequests({
        users,
        labels: ['3. Ready for testing', 'Combo'],
        message: 'Pull requests in testing that still have people assigned:',
        filterCriteria: (pr) => pr.author && pr.assignees.length > 0
      }));
    }

    console.log('Posting to slack');

    return slackMessage(team, { text: text.filter(v => v).join("\n\n") });
  }));

  console.log('Finished');
}
