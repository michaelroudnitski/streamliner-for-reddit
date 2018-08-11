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
        console.log(bestComment.body);
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