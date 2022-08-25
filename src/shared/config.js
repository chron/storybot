const wekaStandup = (main, backup) => `Today's Chief Weka is :bird: :crown: ${main} :crown: :bird:
They'll be responsible for facilitating our standup meeting at 9.30.
If they aren't available, the Backup Weka is :bird: ${backup} :bird:

*1.* What is blocking you?
*2.* What help do you need?
*3.* What comms need to happen?
*4.* _<question of the day>_ (<https://andyhansen.co.nz/posts/stand-up-bonus-question|inspiration 1>, <https://rendall.github.io/icebreakers/|inspiration 2>)
*5.* _Incoherent developer noises_

You can see our in-flight PRs at <https://weka.digital/today/|weka.digital>, or use the \`/prs\` slash command.`;

const giraffeStandup = (main, backup) => `Today's Prophet of the Giraffes is :giraffe_face: :crown: ${main} :crown: :giraffe_face:

They'll be responsible for facilitating our standup meeting at 9.30.
If they aren't available, the backup giraffe is :giraffe_face: ${backup} :giraffe_face:

Standup will happen on the <https://miro.com/app/board/o9J_l4Tqg8E=/|Horizon 2 Miro board>.

If you need inspiration for the question of the day, <https://andyhansen.co.nz/posts/stand-up-bonus-question|this> or <https://rendall.github.io/icebreakers/|this> are great.`;

const ruruStandup = (main, backup) => `Today's Chief Owl is :ruru: :crown: ${main} :crown: :ruru:
They'll be responsible for facilitating our standup meeting at 9.15.
If they aren't available, the Backup Owl is :ruru: ${backup} :ruru:

*1.* What is blocking you?
*2.* What help do you need?
*3.* What comms need to happen?
*4.* Activity of the day: Share a joke, a book/song/show/movie you like, do some stretching, have a dance-off, or ask a <https://learnhip.com/randomq/|question of the day>.

Standup will be run against the <https://trello.com/b/C73E32CS/ruru|Ruru Trello board>`;

const csTeamStandup = (main, backup) => `Today's Chief is :crown: ${main} :crown:
They'll be responsible for facilitating our standup meeting at 9.30.
If they aren't available, the Backup is ${backup}.

Remember, there is only 2-3 minutes for each person - your job is to keep them on track and the stand up moving along.

1. What did you do yesterday?
2. What will you do today?
3. What is blocking you?
4. <question of the day> (<https://andyhansen.co.nz/posts/stand-up-bonus-question|inspiration 1>, <https://rendall.github.io/icebreakers/|inspiration 2>)`

module.exports = [
  {
    name: 'weka',
    standupCaptains: ['libbyschuknight', 'timothyjohn2015', 'fourseven', 'eileen', 'dave', 'nat', 'charlotte', 'StoryparkNick'],
    captainDayExceptions: {
      2: ['eileen'],
      4: ['eileen', 'charlotte'],
      5: ['charlotte', 'nat'],
    },
    standupMessage: wekaStandup,
    showPRs: true,
    webhookEnvVar: 'SLOTH_WEBHOOK',
    // paused: true,
  },
  {
    name: 'giraffes',
    standupCaptains: ['katie', 'shannon', 'gavin', 'andrew', 'sarah', 'chron'],
    onlyOnDays: [2, 4, 5],
    standupMessage: giraffeStandup,
    showPRs: false,
    webhookEnvVar: 'GIRAFFE_WEBHOOK',
    paused: true,
  },
  {
    name: 'ruru',
    standupCaptains: ['AaronThornton00', 'marielleaurabelle', 'Rob-Bee-Neilson'],
    standupMessage: ruruStandup,
    showPRs: false,
    webhookEnvVar: 'RURU_WEBHOOK',
    paused: true,
  },
  {
    name: 'csteam',
    standupCaptains: ['maddy', 'geena', 'shalita', 'kerry', 'abbie'],
    standupMessage: csTeamStandup,
    showPRs: false,
    webhookEnvVar: 'CSTEAM_WEBHOOK',
    // paused: true,
  }
];
