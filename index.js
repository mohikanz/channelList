const {
  WebClient
} = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

function getAllChannels() {
  // See: https://api.slack.com/methods/conversations.list#arguments
  const param = {
    exclude_archived: true,
    types: 'public_channel',
    // Only get first 100 items
    limit: 100
  };
  return web.conversations.list(param).then(results => {
    return results.channels
  });
}

const fs = require('fs');
const stream = fs.createWriteStream("channelList.md");
stream.once('open', function (fd) {
  stream.write("Name  | Topic | Persons\n");
  stream.write("----- | ----- | -------\n");

  getAllChannels()
    .then((res) => {
      // `res` contains information about the channels
      for (let channel of res.channels) {
        const escapedTopic = channel.topic.value.replace(/\r?\n/g, '');
        stream.write(`[#${channel.name}](https://mohikanz.slack.com/messages/${channel.name}} | ${escapedTopic} | ${channel.num_members} \n`);
      }
      stream.end();
    })
    .catch(console.error);

});
