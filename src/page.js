'use strict';

import $ from 'jquery';

import store from './store';
import api from './api';

// TEMPLATING FUNCTIONS

const generateTopMenu = function() {
  return $(`
    <h1>Bookmarks</h1>
    <form>
      <div class="group">
        <button type="submit" class="filter">Filter by Importance</button>
        <select class="bookmark-importance">
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
    </form>
    <form class="wrapper">
      <div class="group add-area">
        <label for="title">Title:</label>
          <input type="text" name="title" class="title" required></input>
        <label for="url">URL:</label>
          <input type="text" name="url" class="url" placeholder="http(s)://" required></input>
        <label for="desc">Description:</label>
          <input type="text" name="desc" class="desc"></input>
        <label for="rating">Rating:</label>
          <input type="number" name="rating" class="rating"></input>
        <button type="submit" class="add-new">Add New Bookmark</button>
      </div>
    </form>
  `);
};

const generateStars = function (numStars) {
  switch (numStars) {
    case 1:
      return '★☆☆☆☆';
    case 2:
      return '★★☆☆☆';
    case 3:
      return '★★★☆☆';
    case 4:
      return '★★★★☆';
    case 5:
      return '★★★★★';
    default:
      return 'Error, star not in range';
  }
}

const generateBookmarkItem = function (bookmark) {
  return $(`
    <li class="item" id=${bookmark.id}>
      <div class="group">
        <h3 class="inline-block item">${bookmark.title}</h3>
        <p class="inline-block item">${generateStars(bookmark.rating)}</p>
        <div class="hiddennnn group">
          <a href=${bookmark.url}>Visit Site</a>
          <p>${bookmark.desc}</p>
          <button type="submit" class="remove">Remove</button>
        </div>
      </div>
    </li>
  `);
}

// EVENT HANDLER FUNCTIONS

const handleFilter = function () {
  $('header').on('click', '.filter', function(evt) {
    evt.preventDefault();
    console.log($('.bookmark-importance').val());
    renderConditionally($('.bookmark-importance').val());
  })
}

const handleAddNewBookmark = function () {
  $('header').on('click', '.add-new', function(evt) {
    evt.preventDefault();

    const title = $('.title').val();
    const url = $('.url').val();
    const desc = $('.desc').val();
    const rating = $('.rating').val();

    $('.title').empty();
    $('.url').empty();
    $('.desc').empty();
    $('.rating').empty();

    api.addBookmark(title, url, desc, rating)
      .then(response => response.json())
      .then(response => {
        store.addNewBookmark(response);
        render();
      })
  });
}

const handleDeleteBookmark = function () {
  $('main').on('click', '.remove', function(evt) {
    evt.preventDefault();

    let currentID = $(this).closest('li').attr('id');

    api.deleteBookmark(currentID)
      .then(response => response.json())
      .then(response => {
        store.removeBookmark(currentID);
        render();
      })
  })
}

const bindEventListeners = function () {
  handleAddNewBookmark();
  handleFilter();
  handleDeleteBookmark();
}

// RENDER FUNCTIONS

const renderConditionally = function (rating) {
  for (let i = 0; i < store.bookmarks.length; i++) {
    if (store.bookmarks[i] < rating) {
      $(`#${store.bookmarks.id}`).hide();
    } else {
      $(`#${store.bookmarks.id}`).show();
    }
  }
}

const renderHeader = function () {
  const headerObj = generateTopMenu();
  $('header').html(headerObj);
}

const render = function() {
  $('main ul').empty();

  for (let i = 0; i < store.bookmarks.length; i++) {
    $('main ul').append(generateBookmarkItem(store.bookmarks[i]));
  }
}

export default {
  render,
  renderHeader,
  bindEventListeners
}