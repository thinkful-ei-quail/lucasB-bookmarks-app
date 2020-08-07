'use strict';

import api from './api';

const bookmarks = [];

const isExpanded = [];

const setBookmarks = function (bookmarks) {
  this.bookmarks = bookmarks;
  console.log(this.bookmarks);
}

const addNewBookmark = function (bookmarks, bookmark) {
  bookmarks.push(bookmark);
  this.bookmarks = bookmarks;
}

const removeBookmark = function (bookmarks, ID) {
  console.log(this.bookmarks);
  this.bookmarks.splice(getBookmarkAtID(bookmarks, ID), 1);
}

const getBookmarkAtID = function (bookmarks, ID) {
  return bookmarks.indexOf(bookmarks.find(bookmark => bookmark.id === ID));
}

const initializeExpanded = function (bookmarks) {
  for (let i = 0; i < bookmarks.length; i++) {
    isExpanded.push(false);
  }
}

const getIsExpanded = function (ID) {
  return isExpanded[getBookmarkAtID(bookmarks, ID)];
}

const updateExpanded = function (ID) {
  isExpanded[getBookmarkAtID(bookmarks, ID)] = !isExpanded[getBookmarkAtID(bookmarks, ID)];
}

export default {
  bookmarks,
  isExpanded,
  setBookmarks,
  getBookmarkAtID,
  addNewBookmark,
  removeBookmark,
  initializeExpanded,
  getIsExpanded,
  updateExpanded
}