'use strict';

import $ from 'jquery';

import store from './store';
import api from './api';

// TEMPLATING FUNCTIONS

const generateTopMenu = function() {
  return $(`
    <h1>Bookmarks</h1>
    <form class="wrapper group">
      <div class="group filter">
        <select class="bookmark-importance item">
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button type="submit" class="filter-btn item">Filter by Importance</button>
      </div>
    </form>
    <form class="wrapper">
      <div class="group add-area">
        <label for="title">Title:</label>
          <input id="title" type="text" name="title" class="title item form-item" required></input>
        <label for="url">URL:</label>
          <input id="url" type="text" name="url" class="url item form-item" placeholder="http(s)://" required></input>
        <label for="desc">Description:</label>
          <input id="desc" type="text" name="desc" class="desc item form-item"></input>
        <label for="rating">Rating:</label>
          <select id="rating" name="rating" class="rating item form-item">
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        <button type="submit" class="add-new item">Add New Bookmark</button>
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
    <li class="item bookmark" id=${bookmark.id} tabindex="0">
      <div class="group">
        <h3 class="inline-block item">${bookmark.title}</h3>
        <p class="inline-block item">${generateStars(bookmark.rating)}</p>
        <div class="${bookmark.id} hidden group">
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
  $('header').on('click', '.filter-btn', function(evt) {
    evt.preventDefault();
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

    try {
      validateInput(title, url);

      api.addBookmark(title, url, desc, rating)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('Error adding bookmark, please try again');
        }
      })
      .then(response => {
        store.addNewBookmark(store.bookmarks, response);
        render();
      })
    }
    catch (e) {
      alert(e.message);
    }
    finally {
      $('.title').empty();
      $('.url').empty();
      $('.desc').empty();
    }
  });
}

const handleDeleteBookmark = function () {
  $('main').on('click', '.remove', function(evt) {
    evt.preventDefault();

    let currentID = $(this).closest('li').attr('id');

    api.deleteBookmark(currentID)
      .then(response => response.ok ? response.json() : new Error('Error deleting bookmark, please try again'))
      .then(response => {
        store.removeBookmark(store.bookmarks, currentID);
        render();
      })
      .catch(e => alert(e.message))
  })
}

const handleExpandDetails = function ()  {
  $('main').on('click', '.bookmark', function(evt) {
    let currentID = $(this).closest('li').attr('id');

    store.updateExpanded(currentID);

    renderExpanded($(this), currentID);
  })
  $('main').on('keypress', '.bookmark', function(evt) {
    if (evt.which === 13) {
        $(this).closest('li').click();
    }
  })
}

const bindEventListeners = function () {
  handleAddNewBookmark();
  handleFilter();
  handleDeleteBookmark();
  handleExpandDetails();
}

// INPUT VALIDATOR

const validateInput = function (title, url) {
  if (title.length === 0) {
    throw new Error('Title cannot be empty');
  }
  if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
    throw new Error('URL must begin with http:// or https://');
  }
}

// RENDER FUNCTIONS

const renderConditionally = function (rating) {
  for (let i = 0; i < store.bookmarks.length; i++) {
    if (store.bookmarks[i].rating < rating) {
      $(`#${store.bookmarks[i].id}`).css('display', 'none');
    } else {
      $(`#${store.bookmarks[i].id}`).css('display', 'block');
    }
  }
}

const renderExpanded = function (jObj, id) {
  if (store.getIsExpanded(id)) {
    $(jObj).find('.hidden').css('display', 'block');
  } else {
    $(jObj).find('.hidden').css('display', 'none');
  }
}

const renderHeader = function () {
  const headerObj = generateTopMenu();
  $('header').html(headerObj);
}

const render = function () {
  $('main').empty();
  $('main').append($('<ul></ul>'));
  $('main ul').addClass('group');

  for (let i = 0; i < store.bookmarks.length; i++) {
    $('main ul').append(generateBookmarkItem(store.bookmarks[i]));
  }
}

export default {
  render,
  renderHeader,
  bindEventListeners
}