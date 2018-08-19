import _ from 'lodash';

function getSubreddit(url) {
  return _.split(url, '/')[4]
}

function parseTitle(s) {
  return s.slice(_.indexOf(s, ']')+2);
}

export default function getGames(e) {
  if (!_.endsWith(e.url, '.json')) { // this if statement prevents an infinite loop of get requests
    if (e.tabId != -1) chrome.pageAction.show(e.tabId)
    const subreddit = getSubreddit(e.url);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          const threads = JSON.parse(xhr.response).data.children;
          let games = [];
          _.forEach(threads, (thread) => {
            if (thread.data.title[0] == '[' && thread.data.title[3] == ':') {
              console.log("we've got a game on our hands");
              games.push({
                league: thread.data.selftext,
                title: parseTitle(thread.data.title),
                url: thread.data.url
              })
            }
          })
          console.log(games);
        } catch (err) { }
      }
    }
    xhr.open(
      'GET',
      `https://www.reddit.com/r/${subreddit}.json`,
      true
    )
    xhr.send();
  }
}