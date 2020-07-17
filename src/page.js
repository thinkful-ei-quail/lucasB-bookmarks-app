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
        <button type="submit" class="reveal-add">Add</button>
        <select>
          <option value="something">Option 1<option>
        </select>
      </div>
    </form>
    <form>
      <div class="hidden group">
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
    <li class="item">
      <div class="group">
        <h3 class="inline-block item">${bookmark.title}</h3>
        <p class="inline-block item">${generateStars(bookmark.rating)}</p>
      </div>
      <a href=${bookmark.url}>Visit Site</a>
      <p>${bookmark.desc}</p>
    </li>
  `);
}

// EVENT HANDLER FUNCTIONS

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

const bindEventListeners = function () {
  handleAddNewBookmark();
}

// RENDER FUNCTION

const render = function() {
  const headerObj = generateTopMenu();

  for (let i = 0; i < store.bookmarks.length; i++) {
    $('main ul').append(generateBookmarkItem(store.bookmarks[i]));
  }

  $('header').html(headerObj);
}

export default {
  render,
  bindEventListeners
}