const { users } = require('@architect/shared/users');
const pullRequests = require('@architect/shared/pullRequests');

module.exports.handler = async function(event) {
  const parsedBody = Buffer.from(event.body, 'base64').toString('utf-8');
  const bodyParams = new URLSearchParams(parsedBody);
  const params = Object.fromEntries(bodyParams);


  const [ignoreUser] = Object.entries(users).find(([githubName,slackName]) => {
    return slackName === `<@${params.user_id}>`;
  }) || [];

  const pullRequestMessage = await pullRequests({
    users,
    ignoreUser,
    labels: ['1. Ready for code review'],
    message: 'Pull requests you could start reviewing _right now_:',
    filterCriteria: (pr) => pr.author && pr.assignees.length < 2,
  });

  const text = pullRequestMessage ? `Here you go, ${params.user_name}!

${pullRequestMessage}` : `There's nothing to review right now, ${params.user_name}.  Thanks for checking in!`;

  const body = JSON.stringify({
    response_type: "ephemeral", // or "in_channel"
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
        },
      },
    ],
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": 'application/json',
    },
    body,
  };
}
