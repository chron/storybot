const arc = require('@architect/functions');

module.exports.handler = async function() {
  const data = await arc.tables();

  // TODO: if this gets big later, should probably use a GSI?

  const pendingMemes = await data.memes.scan({
    FilterExpression: 'attribute_not_exists(isPosted)',
  });

  // const memes = (await data.memes.scan()).Items;

  // TODO: serializer or something here?

  return {
    statusCode: 200,
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({ memes: pendingMemes.Items }),
  };
}
