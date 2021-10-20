const pullRequests = require('@architect/shared/pullRequests');
const { users } = require('@architect/shared/users');

module.exports.handler = async function() {
  const response = {
    review: await pullRequests({
      users,
      labels: ['1. Ready for code review'],
      message: 'Pull requests with code review label that still need reviewers:',
      filterCriteria: (pr) => pr.author && pr.assignees.length < 2,
      raw: true,
    }),
    test: await pullRequests({
      users,
      labels: ['3. Ready for testing', 'Combo'],
      message: 'Pull requests in testing that still have people assigned:',
      filterCriteria: (pr) => pr.author && pr.assignees.length > 0,
      raw: true,
    })
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(response),
  };
}
