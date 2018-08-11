const request = require('request');
const _ = require('lodash')

const subreddit = {
  "soccer": "soccerstreams",
  "hockey": "NHLstreams"
}

if (process.argv[2]) {
  request.get(`https://www.reddit.com/r/${subreddit[process.argv[2]]}/best/.json?limit=2`, (err, res, body) => {
    if (err) return console.log(err);
    body = JSON.parse(body);
    console.log(body.data.children[0])
  })
} else {
  console.log("Did not supply arguements for sport")
}

