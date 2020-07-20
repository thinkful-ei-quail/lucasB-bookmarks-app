'use strict';

import $ from 'jquery';

import page from './page';
import store from './store';
import api from './api';

import './style.css';

const main = async function() {
  await api.getBookmarks()
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        store.setBookmarks(response);
      }
    })
  
  page.renderHeader();
  page.render();
  page.bindEventListeners();
};

$(main);