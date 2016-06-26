var Countdown = require('countdown');
var Dom = require('dom');
var Header = require('header');
var InfoCards = require('infoCards');
var TitleAnimation = require('titleAnimation');


var positionInPage;

var handleResize = function() {
  InfoCards.getInstance().resize();

  var splashTextEl = document.getElementsByClassName('first-page-title')[0];
  // Set size of the first page text.
  splashTextEl.style.fontSize = Dom.fitTextToScreen(
      splashTextEl.textContent.trim(), 'Damion', 600, 20);

  var titleElements = document.getElementsByClassName('section-title-text');
  for (let i = 0; i < titleElements.length; i++) {
    let titleEl = titleElements[i];
    titleEl.style.fontSize = Dom.fitTextToScreen(
        titleEl.textContent.trim(), 'Damion', 550, 70);

  }
};


var handleScroll = function(e) {
  //TitleAnimation.getInstance().handleScroll();


  var positionInPage = Dom.getScrollPosition();
  var headerEl = document.getElementsByClassName('header')[0];
  var hasScrolledCss = headerEl.classList.contains('header-scrolled');
  if (positionInPage > Dom.getWindowHeight()-40 && !hasScrolledCss) {
    headerEl.classList.add('header-scrolled');
  } else if (positionInPage < Dom.getWindowHeight()-40 && hasScrolledCss) {
    headerEl.classList.remove('header-scrolled');
  }
};


var openUrl = function(url) {
  return () => {
    var win = window.open(url, '_blank');
  }
}


var init = function() {
  Dom.addEventListener(window, 'resize', handleResize);
  Dom.addEventListener(window, 'scroll', handleScroll);

  let frontPage = document.getElementsByClassName('first-page')[0];
  frontPage.style.height = Dom.getWindowHeight() + 'px';

  var buttons = document.getElementsByClassName('info-card-link');
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    Dom.addEventListener(button, 'click', openUrl(button.getAttribute('src')));
  }
  buttons = document.getElementsByClassName('rsvp-button');
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    Dom.addEventListener(button, 'click', openUrl(button.getAttribute('src')));
  }

  Countdown.getInstance().start();
  Header.getInstance().init();
  InfoCards.getInstance().init();
  handleResize();
  handleScroll();
};


jQuery(document).ready(function($){
  'use strict';
  $.Scrollax();
});
document.addEventListener('DOMContentLoaded', () => {init();});
