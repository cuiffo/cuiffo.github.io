var Countdown = require('countdown');
var Dom = require('dom');
var Header = require('header');
var TitleAnimation = require('titleAnimation');


var positionInPage;

var handleResize = function() {
  var splashTextEl = document.getElementsByClassName('page-title')[0];
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
  TitleAnimation.getInstance().handleScroll();

  var positionInPage = Dom.getScrollPosition();
  var headerEl = document.getElementsByClassName('header')[0];
  var hasScrolledCss = headerEl.classList.contains('header-scrolled');
  if (positionInPage > Dom.getWindowHeight()-40 && !hasScrolledCss) {
    headerEl.classList.add('header-scrolled');
  } else if (positionInPage < Dom.getWindowHeight() && hasScrolledCss) {
    headerEl.classList.remove('header-scrolled');
  }
};


var init = function() {
  Dom.addEventListener(window, 'resize', handleResize);
  Dom.addEventListener(window, 'scroll', handleScroll);

  handleResize();
  handleScroll();

  Countdown.getInstance().start();
  Header.getInstance().init();
};


document.addEventListener('DOMContentLoaded', () => {init();});
