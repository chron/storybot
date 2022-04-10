const fetch = require('node-fetch');
const parseISO = require('date-fns/parseISO');
const formatDistance = require('date-fns/formatDistance');

function prToString(pr) {
  const readyDaysAgo = pr.markedReadyAt
    ? `Ready for ${formatDistance(parseISO(pr.markedReadyAt), new Date())}, `
    : '';
  return `• <${pr.url}|${pr.title}> (${readyDaysAgo}*${pr.delta}*) — Assigned: [${pr.assignees.join(', ')}]`;
}

module.exports = async function pullRequests({
  users,
  labels,
  message,
  filterCriteria,
  ignoreUser,
  raw = false,
}) {
  try {
    const githubPRs = await Promise.all(labels.map(async label => {
      console.log(`Getting PRs for ${label}`);

      let search = 'SLOW- OR GIRA- OR WEKA- OR WEKA1 in:title org:storypark is:open is:pr'
      if (label) { search += ` label:\\"${label}\\"`; }
      if (ignoreUser) { search += ` -author:${ignoreUser} -assignee:${ignoreUser}`; }

      const query = `
        query {
          search(query: "${search}", type: ISSUE, first: 20) {
            edges {
              node {
                ... on PullRequest {
                  url
                  title
                  createdAt
                  additions
                  deletions
                  author {
                    login
                  }
                  assignees(first: 5) {
                    nodes {
                      login
                    }
                  }
                  timelineItems(last: 10, itemTypes: [LABELED_EVENT]) {
                    nodes {
                      __typename
                      ... on LabeledEvent {
                        createdAt
                        label {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const githubResponse = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query })
      }).then(r => r.json());

      return githubResponse.data.search.edges.map(edge => {
        const {
          url,
          title,
          createdAt,
          additions,
          deletions,
          author: { login },
          assignees: { nodes: assigneeNodes },
          timelineItems: { nodes: labelNodes },
        } = edge.node;

        return {
          url, title,
          createdAt: new Date(createdAt),
          author: users[login],
          assignees: assigneeNodes.map(n => users[n.login] || n.login),
          markedReadyAt: labelNodes.find(l => l.label.name === label).createdAt,
          delta: `+${additions}-${deletions}`,
        };
      });
    }))

    const prsMeetingCriteria = githubPRs.flat().filter(filterCriteria);
    const uniquePRs = prsMeetingCriteria.filter((pr, i) => {
      return prsMeetingCriteria.findIndex(p => p.url === pr.url) === i;
    });

    if (raw) { return uniquePRs }
    if (!uniquePRs.length) { return null; }

    return `*${message}*

${uniquePRs.map(prToString).join("\n")}`;
  } catch (e) {
    console.error(e);
    return '(The github API request failed for some reason :grimacing:)';
  }
}
