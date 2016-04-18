var Dom = require('dom');
var TitleAnimation = require('titleAnimation');


var positionInPage;

var handleResize = function() {
  var splashTextEl = document.getElementsByClassName('page-title')[0];
  
  // Set size of the first page text.
  splashTextEl.style.fontSize = Dom.fitTextToScreen(
      splashTextEl.innerText, 'Damion', 650);
};


var handleScroll = function(e) {
  TitleAnimation.getInstance().handleScroll();

  var positionInPage = Dom.getScrollPosition();
  var headerEl = document.getElementsByClassName('header')[0];
  var hasScrolledCss = headerEl.classList.contains('header-scrolled');
  if (positionInPage > Dom.getWindowHeight() && !hasScrolledCss) {
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
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
