import _ from 'lodash';
// import subreddits from './subreddits';

function getT3(url) {
  return _.split(url, '/')[6]
}

function getComments(e) {
  if (!_.endsWith(e.url, '.json?sort=best')) { // this if statement prevents an infinite loop of get requests
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const bestComment = JSON.parse(xhr.response)[1].data.children[0].data;
        const start = bestComment.body.indexOf('http');
        // loop through the comment starting from the 'http' substring and find where reddit closes the href using ')'
        // var end will be accessible to the outer scope with the index of ')'
        for (var end = start; bestComment.body[end] != ')'; ++end) {}
        const stream_url = bestComment.body.substring(start, end);
      }
    }
    xhr.open(
      'GET',
      `https://www.reddit.com/r/soccerstreams/comments/${getT3(e.url)}/.json?sort=best`,
      true
    )
    xhr.send();
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  getComments,
  { urls: ["*://*.reddit.com/r/soccerstreams/comments/*"] }
)