const { standupCaptains, users } = require('@architect/shared/users');
const standup = require('@architect/shared/standup');
const pullRequests = require('@architect/shared/pullRequests');
const slackMessage = require('@architect/shared/slackMessage');
const shouldIRun = require('@architect/shared/shouldIRun');

exports.handler = async function() {
  if (!shouldIRun()) { return; }

  const message = [
    standup(standupCaptains, users),
    await pullRequests(
      users,
      ['1. Ready for code review'],
      'Pull requests with code review label that still need reviewers:',
      (pr) => pr.author && pr.assignees.length < 2
    ),
    await pullRequests(
      users,
      ['3. Ready for testing', 'Combo'],
      'Pull requests in testing that still have people assigned:',
      (pr) => pr.author && pr.assignees.length > 0
    ),
  ].filter(v => v).join("\n\n");

  return slackMessage(message);
}
