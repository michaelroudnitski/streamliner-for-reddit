import _ from 'lodash';
import subreddits from './subreddits';
import getGames from './getGames';
import getComments from './getComments';

var subreddit_urls = [];
_.forEach(subreddits, (subreddit) => {
  subreddit_urls.push(`*://*.reddit.com/r/${subreddit}/`)
})
// event listener for when a user requests a subreddit
chrome.webRequest.onBeforeRequest.addListener(
  getGames,
  { urls: subreddit_urls }
)

var comments_urls = []
_.forEach(subreddits, (subreddit) => {
  comments_urls.push(`*://*.reddit.com/r/${subreddit}/comments/*`)
})
// event listener for when a user requests a thread
chrome.webRequest.onBeforeRequest.addListener(
  getComments,
  { urls: comments_urls }
)