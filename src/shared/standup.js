const shuffle = require('@architect/shared/shuffle');

module.exports = function standup(users, userNames) {
  const [main, backup] = shuffle(users);

  return `Today's Chief Sloth™ is :sloth: :crown: ${userNames[main]} :crown: :sloth:
They'll be responsible for facilitating our standup meeting at 9.15.
If they aren't available, the backup sloth is :sloth: ${userNames[backup]} :sloth:

*1.* What is blocking you?
*2.* What help do you need?
*3.* What comms need to happen?
*4.* _<question of the day>_ (<https://andyhansen.co.nz/posts/stand-up-bonus-question|inspiration list>)
*5.* _Incoherent developer noises_

You can see our in-flight PRs at <https://sloth.engineering/today/|sloth.engineering>, or use the \`/prs\` slash command.`;
}
