const wekaStandup = (main, backup) => `Today's Chief Weka is :bird: :crown: ${main} :crown: :bird:
They'll be responsible for facilitating our standup meeting at 11.30.
If they aren't available, the Backup Weka is :bird: ${backup} :bird:`;

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
    standupCaptains: [
      'timothyjohn2015',
      'dave',
      'nat',
      'StoryparkNick',
      'opal-storypark',
      'AaronThornton00',
    ],
    captainDayExceptions: {
      5: ['nat'],
    },
    standupMessage: wekaStandup,
    webhookEnvVar: 'SLOTH_WEBHOOK',
    // paused: true,
  },
  {
    name: 'csteam',
    standupCaptains: ['geena', 'kerry', 'david', 'erika', 'sabeena'],
    standupMessage: csTeamStandup,
    webhookEnvVar: 'CSTEAM_WEBHOOK',
    // paused: true,
  }
];
