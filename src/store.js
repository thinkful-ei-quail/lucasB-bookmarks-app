'use strict';

import api from './api';

const bookmarks = [];

const addNewBookmark = function (bookmarks) {
  this.bookmarks = bookmarks;
}

export default {
  bookmarks,
  addNewBookmark
}