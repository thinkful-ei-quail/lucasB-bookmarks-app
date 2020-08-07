'use strict';

import $ from 'jquery';

import page from './src/page';
import store from './src/store';
import api from './src/api';

import './style.css';

const main = function() {
  api.getBookmarks()
    .then(response => response.json())
    .then(response => {
      store.setBookmarks(response);
    })
    .finally(response => {
      store.initializeExpanded(store.bookmarks);
  
      page.renderHeader();
      page.render();
      page.bindEventListeners();

      console.log(store.bookmarks);
    })
};

$(main);