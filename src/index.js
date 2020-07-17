'use strict';

import $ from 'jquery';

import page from './page';
import store from './store';
import api from './api';

const main = async function() {
  await api.getBookmarks()
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        store.addNewBookmark(response);
      }
    })

  console.log(store.bookmarks[0]);
  
  page.render();
  page.bindEventListeners();
};

$(main);