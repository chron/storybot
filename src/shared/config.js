const slothStandup = (main, backup) => `Today's Chief Sloth™ is :sloth: :crown: ${main} :crown: :sloth:
They'll be responsible for facilitating our standup meeting at 9.15.
If they aren't available, the backup sloth is :sloth: ${backup} :sloth:

*1.* What is blocking you?
*2.* What help do you need?
*3.* What comms need to happen?
*4.* _<question of the day>_ (<https://andyhansen.co.nz/posts/stand-up-bonus-question|inspiration list>)
*5.* _Incoherent developer noises_

You can see our in-flight PRs at <https://sloth.engineering/today/|sloth.engineering>, or use the \`/prs\` slash command.`;

const giraffeStandup = (main, backup) => `Today's Prophet of the Giraffes is :giraffe_face: :crown: ${main} :crown: :giraffe_face:

They'll be responsible for facilitating our standup meeting at 9.30.
If they aren't available, the backup giraffe is :giraffe_face: ${backup} :giraffe_face:

If you need inspiration for the question of the day, <https://andyhansen.co.nz/posts/stand-up-bonus-question|this> is a great list.`;

const slothStandDown = `SLOTHS get SLOTHY — stand down in 15 mins!

You going to be present? :gift:
Or you need to have your head down? :heads-down:
Got any questions that you need people for? :interrobang:

Everyone is welcome to join us in <https://meet.google.com/nxw-bjgg-ibd|this Google Meet>.`;

module.exports = [
  {
    name: 'sloths',
    memeOfTheWeek: true,
    standupCaptains: ['libbyschuknight', 'marielleaurabelle', 'chron', 'timothyjohn2015', 'willsmart'],
    standupMessage: slothStandup,
    standDownMessage: slothStandDown,
    showPRs: true,
    webhookEnvVar: 'SLOTH_WEBHOOK',
  },
  {
    name: 'giraffes',
    memeOfTheWeek: false,
    standupCaptains: ['katie', 'shannon', 'gavin', 'andrew', 'chron'],
    onlyOnDays: [2, 4, 5],
    standupMessage: giraffeStandup,
    showPRs: false,
    webhookEnvVar: 'GIRAFFE_WEBHOOK',
  },
];
