const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const { users } = require('@architect/shared/users');
const standDown = require('@architect/shared/standDown');
const pullRequests = require('@architect/shared/pullRequests');
const slackMessage = require('@architect/shared/slackMessage');
const shouldIRun = require('@architect/shared/shouldIRun');

exports.handler = async function() {
  if (!shouldIRun()) { return; }

  const dateInNZST = utcToZonedTime(new Date(), 'Pacific/Auckland');
  const dayOfWeek = dateInNZST.getDay();

  const message = [
    standDown(dayOfWeek !== 5), // No standdown on Fridays!
    await pullRequests({
      users,
      labels: ['1. Ready for code review'],
      message: 'Pull requests with code review label that still need reviewers:',
      filterCriteria: (pr) => pr.author && pr.assignees.length < 2
    }),
    await pullRequests({
      users,
      labels: ['3. Ready for testing', 'Combo'],
      message: 'Pull requests in testing that still have people assigned:',
      filterCriteria: (pr) => pr.author && pr.assignees.length > 0
    }),
  ].filter(v => v).join("\n\n");

  return slackMessage({ message });
}
