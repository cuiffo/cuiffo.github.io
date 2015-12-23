
var getScrollPosition = function() {
  return document.documentElement.scrollTop ||
      document.body.scrollTop;
}

var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
var origSpashWidth = splashTextEl.clientWidth;
var splashHeight = splashTextEl.clientHeight;
splashTextEl.style.width = '100%';

var comingSoonEl = document.getElementsByClassName('cuiffo-page-title')[1];
var origComingSoon = comingSoonEl.clientWidth;
comingSoonEl.style.width = '100%';

windowHeight = window.innerHeight;
windowWidth = window.innerWidth;
var handleResize = function() {
  // Don't do anything if the width hasn't changed.
  if (windowWidth === window.innerWidth) {
    return;
  } 
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  
  // Set size of the first page text.
  var maxTextWidth = 600;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(windowWidth - 20, minTextWidth));
  var ratio = textWidth / origSpashWidth;
  splashTextEl.style.fontSize = (ratio * 100) + '%';
  splashHeight = splashTextEl.clientHeight;
  
  // Set size of the second page text.
  var maxTextWidth = 800;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(windowWidth - 20, minTextWidth));
  var ratio = textWidth / origComingSoon;
  comingSoonEl.style.fontSize = (ratio * 100) + '%';
  
  // Center the second page text vertically.
  var comingSoonHeight = comingSoonEl.clientHeight;
  comingSoonEl.style.top =
      windowHeight / 2 - comingSoonHeight / 2 + 'px';
};
handleResize();

var bottomToSet = 0;
var isUpdated = false;
var handleScroll = function() {
  var position = getScrollPosition();
  
  var percentThroughPage = position / windowHeight;
  var range = splashHeight + 20;
  
  bottomToSet = -(percentThroughPage * range) + 20 + 'px';
  isUpdated = true;
};
handleScroll();

var tickAnimation = function() {
  if (isUpdated) {
    splashTextEl.style.bottom = bottomToSet;
    isUpdated = false;
  }
};
window.setInterval(tickAnimation, 25);

window.onresize = handleResize;
window.onscroll = handleScroll;