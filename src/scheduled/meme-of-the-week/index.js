const arc = require('@architect/functions');
const slackMessage = require('@architect/shared/slackMessage');

exports.handler = async function() {
  console.log('Getting memes from DynamoDB');

  const data = await arc.tables();
  const memes = (await data.memes.scan()).Items
  const memeList = memes.map((meme) => {
    return `• ${meme.url} (from <@${meme.createdBy}>)`;
  }).join("\n");

  console.log(`${memes.length} memes obtained.`);

  // TODO: handle 0 items

  console.log('Generating message');

  const text = `Slothbot 9000 presents *MEME OF THE WEEK*!

Your contenders for this week:

${memeList}

To add your own memes for next time, use \`/slothbot meme https://url-goes-here\` (or thread some here, I'm not your boss)`;

  console.log('Sending to Slack');
  return slackMessage({ text });
}
