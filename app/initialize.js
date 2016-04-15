var Dom = require('dom');
var TitleAnimation = require('titleAnimation');


var origSplashSize;
var positionInPage;

var placeInfoTiles = function() {
  var windowWidth = Dom.getWindowWidth();
  var windowHeight = Dom.getWindowHeight();
};


var handleResize = function() {
  var splashTextEl = document.getElementsByClassName('page-title')[0];
  
  // Set size of the first page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(Dom.getWindowWidth() - 20, minTextWidth));
  var ratio = textWidth / origSplashSize.width;
  splashTextEl.style.fontSize = (ratio * 100) + '%';
};


var handleScroll = function(e) {
  TitleAnimation.getInstance().handleScroll();

  var positionInPage = Dom.getScrollPosition();
  var headerEl = document.getElementsByClassName('header')[0];
  var hasScrolledCss = headerEl.classList.contains('header-scrolled');
  if (positionInPage > 40 && !hasScrolledCss) {
    headerEl.classList.add('header-scrolled');
  } else if (positionInPage < 40 && hasScrolledCss) {
    headerEl.classList.remove('header-scrolled');
  }
};


var init = function() {
  var splashContainer = document.getElementsByClassName('page-title-container')[0];
  var splashTextEl = document.getElementsByClassName('page-title')[0];
  origSplashSize = Dom.getSize(splashTextEl);
  splashContainer.style.width = '100%';
  splashTextEl.style.width = '100%';

  Dom.addEventListener(window, 'resize', handleResize);
  Dom.addEventListener(window, 'scroll', handleScroll);

  handleResize();
  handleScroll();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
