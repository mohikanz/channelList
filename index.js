const { WebClient } = require('@slack/client');
require('dotenv').config();

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// See: https://api.slack.com/methods/channels.list

var fs = require('fs');
var stream = fs.createWriteStream("channelList.md");
stream.once('open', function(fd) {
  stream.write("Name  | Topic | Persons\n");
  stream.write("----- | ----- | -------\n");

web.channels.list()
  .then((res) => {
    // `res` contains information about the channels
    for (let channel of res.channels) {
      stream.write("[#" + channel.name + "](https://mohikanz.slack.com/messages/" + channel.name + ") |" + channel.topic.value + " | " + channel.num_members + "\n");
    }
    stream.end();
  })
  .catch(console.error);
});
