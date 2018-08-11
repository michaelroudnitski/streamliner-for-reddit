import _ from 'lodash';
// import subreddits from './subreddits';

function getT3(url) {
  return _.split(url, '/')[6]
}

function getComments(e) {
  if (!_.endsWith(e.url, '.json')) { // this if statement prevents an infinite loop of get requests
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.response);
      }
    }
    xhr.open('GET', `https://www.reddit.com/r/soccerstreams/comments/${getT3(e.url)}/.json`, true)
    xhr.send();
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  getComments,
  { urls: ["*://*.reddit.com/r/soccerstreams/comments/*"] }
)