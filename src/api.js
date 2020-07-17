'use strict';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/lucas/bookmarks';

const getBookmarks = function() {
  return fetch(`${BASE_URL}`);
};

const addBookmark = function(title, url, desc, rating=5) {
  let data = JSON.stringify({
    title,
    url,
    desc,
    rating
  });
  
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  };

  return fetch(`${BASE_URL}`, options);
}

export default {
  getBookmarks,
  addBookmark
}