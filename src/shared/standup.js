const shuffle = require('@architect/shared/shuffle');

module.exports = function standup(users, userNames) {
  const [main, backup] = shuffle(users);

  return `Today's Chief Sloth™ is :sloth: :crown: ${userNames[main]} :crown: :sloth:
They'll be responsible for facilitating our standup meeting at 9.15.
If they aren't available, the backup sloth is :sloth: ${userNames[backup]} :sloth:

:jira::jira::jira: If you are facilitating, please bring your laptop to present the Jira board. :jira::jira::jira:

*1.* What did you do yesterday? What is your plan for today?
*2.* Anything you need help with?  Do you have capacity to help others?
*3.* Any updates for the team?
*4.* _<question of the day>_

If you need ideas for a question of the day, <https://andyhansen.co.nz/posts/stand-up-bonus-question|this> is a great list.`;
}
