const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const { users } = require('@architect/shared/users');
const config = require('@architect/shared/config');
const standDown = require('@architect/shared/standDown');
const pullRequests = require('@architect/shared/pullRequests');
const slackMessage = require('@architect/shared/slackMessage');
const shouldIRun = require('@architect/shared/shouldIRun');

exports.handler = async function() {
  await Promise.all(config.map(async team => {
    if (!team.standDownMessage) { return; }
    if (!shouldIRun()) { return; }

    const dateInNZST = utcToZonedTime(new Date(), 'Pacific/Auckland');
    const dayOfWeek = dateInNZST.getDay();

    const text = [
      standDown(team, dayOfWeek !== 5) // No standdown on Fridays!
    ];

    if (team.showPRs) {
       text.push(await pullRequests({
        users,
        labels: ['1. Ready for code review'],
        message: 'Pull requests with code review label that still need reviewers:',
        filterCriteria: (pr) => pr.author && pr.assignees.length < 2
      }));

      text.push(await pullRequests({
        users,
        labels: ['3. Ready for testing', 'Combo'],
        message: 'Pull requests in testing that still have people assigned:',
        filterCriteria: (pr) => pr.author && pr.assignees.length > 0
      }));
    }

    return slackMessage(team, { text: text.filter(v => v).join("\n\n") });
  }));
}
