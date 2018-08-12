import _ from 'lodash';
import subreddits from './subreddits';

function getSubreddit(url) {
  return _.split(url, '/')[4]
}

function getThread(url) {
  return _.split(url, '/')[6]
}

function getComments(e) {
  if (!_.endsWith(e.url, '.json?sort=best')) { // this if statement prevents an infinite loop of get requests
    const subreddit = getSubreddit(e.url);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          const comments = JSON.parse(xhr.response)[1].data.children;
          _.forEach(comments, (comment) => {
            // loop through the comment starting from the 'http' substring and find where reddit closes the href using ')' or ' '
            // var end will be accessible to the outer scope and will be the index of ')' or ' '
            const start = comment.data.body.indexOf('http');
            if (start != -1) {
              for (var end = start; comment.data.body[end] != ')' && comment.data.body[end] != ' '; ++end) { }
              const stream_url = comment.data.body.substring(start, end);
              chrome.tabs.create({ url: stream_url });
              return false; // break lodash's foreach loop earlys
            }
          })
        } catch (err) { }
      }
    }
    xhr.open(
      'GET',
      `https://www.reddit.com/r/${subreddit}/comments/${getThread(e.url)}/.json?sort=best`,
      true
    )
    xhr.send();
  }
}

var urls = []
_.forEach(subreddits, (subreddit) => {
  urls.push(`*://*.reddit.com/r/${subreddit}/comments/*`)
})

chrome.webRequest.onBeforeRequest.addListener(
  getComments,
  { urls }
)