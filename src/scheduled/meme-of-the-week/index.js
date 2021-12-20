const arc = require('@architect/functions');
const slackMessage = require('@architect/shared/slackMessage');
const config = require('@architect/shared/config');

exports.handler = async function() {
  await Promise.all(config.map(async team => {
    if (!team.memeOfTheWeek) { return; }
    if (team.paused) { return; }

    console.log('Getting pending memes from DynamoDB');

    const data = await arc.tables();
    const pendingMemes = (await data.memes.scan({
      FilterExpression: 'attribute_not_exists(isPosted)',
    })).Items;

    const memeList = pendingMemes.map((meme) => {
      return `• ${meme.url} (from <@${meme.createdBy}>)`;
    }).join("\n");

    console.log(`${pendingMemes.length} memes obtained.`);

    console.log('Marking memes as posted');

    await Promise.all(pendingMemes.map(meme => {
      return data.memes.update({
        Key: { memeID: meme.memeID },
        UpdateExpression: 'set isPosted = :isPosted',
        ExpressionAttributeValues: {
          ':isPosted' : true,
        }
      });
    }));

    console.log('Generating message');

    const text = `Weka Bot 9000 presents *MEME OF THE WEEK*!

Your contenders for this week:

${memeList}

To add your own memes for next time, use \`/meme https://url-goes-here\` (or thread some here, I'm not your boss)`;

    console.log('Sending to Slack');
    return slackMessage(team, { text });
  }));
}
