import _ from 'lodash';
// import subreddits from './subreddits';

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    console.log(xhr.response);
  }
}
console.log("request sent");
xhr.open('GET', `https://www.reddit.com/r/soccerstreams/best/.json?limit=2`, true)
xhr.send();