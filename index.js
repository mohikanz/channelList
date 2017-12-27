const { WebClient } = require('@slack/client');
require('dotenv').config();

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// See: https://api.slack.com/methods/channels.list

const fs = require('fs');
const stream = fs.createWriteStream("channelList.md");
stream.once('open', function(fd) {
  stream.write("Name  | Topic | Persons\n");
  stream.write("----- | ----- | -------\n");

web.channels.list()
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
