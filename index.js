const { WebClient } = require('@slack/client');
require('dotenv').config();

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// See: https://api.slack.com/methods/channels.list
web.channels.list()
  .then((res) => {
    // `res` contains information about the channels
    res.channels.forEach(c => console.log(c.name));
  })
  .catch(console.error);
