'use strict';

import api from './api';

const bookmarks = [];

const setBookmarks = function (bookmarks) {
  this.bookmarks = bookmarks;
}

const addNewBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
}

const removeBookmark = function (ID) {
  this.bookmarks.splice(this.bookmarks.indexOf(this.bookmarks.find(bookmark => bookmark.id === ID)), 1);
}

export default {
  bookmarks,
  setBookmarks,
  addNewBookmark,
  removeBookmark
}