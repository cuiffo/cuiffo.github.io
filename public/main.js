var cuiffo = cuiffo || {};
cuiffo.math = cuiffo.math || {};



cuiffo.math.easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};


cuiffo.math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
var cuiffo = cuiffo || {};
cuiffo.dom = cuiffo.dom || {};



cuiffo.dom.getScrollPosition = function() {
  return document.documentElement.scrollTop ||
      document.body.scrollTop;
};


cuiffo.dom.getWindowHeight = function() {
  return window.innerHeight;
};


cuiffo.dom.getWindowWidth = function() {
  return window.innerWidth;
};
cuiffo = cuiffo || {};



var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
var origSpashWidth = splashTextEl.clientWidth;
var splashHeight = splashTextEl.clientHeight;
splashTextEl.style.width = '100%';

var comingSoonEl = document.getElementsByClassName('cuiffo-page-title')[1];
var origComingSoon = comingSoonEl.clientWidth;
comingSoonEl.style.width = '100%';


var pages = document.getElementsByClassName('cuiffo-page');
var resizePages = function() {
  var pageOneEl = pages[0];
  pageOneEl.style.height = cuiffo.dom.getWindowHeight() + 'px';

  var pageTwoEl = pages[1];
  pageTwoEl.style.height = cuiffo.dom.getWindowHeight() + 'px';
};
resizePages();

var updateActivePage = function() {
  var activePage = Math.min(Math.round(percentThroughPage), 1);
  dots[activePage].classList.add('cuiffo-page-dot-active');
  for (var i = 0; i <= 1; i++) {
  console.log(activePage + ' ' + i);
    if (activePage !== i) {
      dots[i].classList.remove('cuiffo-page-dot-active');
    }
  }
};

var pager = document.getElementsByClassName('cuiffo-page-selector')[0];
var dots = document.getElementsByClassName('cuiffo-page-dot');
var handleResize = function() {
  
  // Set size of the first page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(cuiffo.dom.getWindowWidth() - 20, minTextWidth));
  var ratio = textWidth / origSpashWidth;
  splashTextEl.style.fontSize = (ratio * 100) + '%';
  splashHeight = splashTextEl.clientHeight;
  
  // Set size of the second page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(cuiffo.dom.getWindowWidth() - 20, minTextWidth));
  var ratio = textWidth / origComingSoon;
  comingSoonEl.style.fontSize = (ratio * 100) + '%';
  
  // Center the second page text vertically.
  var comingSoonHeight = comingSoonEl.clientHeight;
  comingSoonEl.style.top =
      cuiffo.dom.getWindowHeight() / 2 - comingSoonHeight / 2 + 'px';
      
  resizePages();
};
handleResize();


var numScrollsWithoutUpdate = 0;
var percentThroughPage = 0;
var isUpdated = false;
var isAnimatingText = false;
var handleScroll = function(e) {

  if (isAnimatingScroll) {
    e.preventDefault();
    return false;
  }

  var position = cuiffo.dom.getScrollPosition();
  percentThroughPage = position / cuiffo.dom.getWindowHeight();
  
  isUpdated = true;
  
  if (numScrollsWithoutUpdate > 10) {
    numScrollsWithoutUpdate = 0;
    tickAnimation();
  }
  numScrollsWithoutUpdate++;
  
  updateActivePage();
};
handleScroll();


var setCssTransform = function(element, value) {
  element.style.webkitTransform = value;
  element.style.MozTransform = value;
  element.style.msTransform = value;
  element.style.OTransform = value;
  element.style.transform = value;
};

var easeCurTime = 0;
var easeTotalTime = 150;
var easeStartPosition = 0;
var easeEndPosition = 0;
var lastStartPosition = 0;


var startTextAnimation = function() {
  easeStartPosition = lastStartPosition;
  easeCurTime = 0;
  var range = splashHeight + 30;
  easeEndPosition = percentThroughPage * range;
  isAnimatingText = true;
};


var easeScrollCurTime = 0;
var easeScrollTotalTime = 500;
var easeScrollPositionStart = 0;
var easeScrollPositionEnd = 0;
var lastStartScroll = 0;

var isAnimatingScroll = false;
var scrollToElement = function(element) {
  return function() {
    var scrollTo = element.offsetTop;
    easeScrollPositionEnd = scrollTo;
    isAnimatingScroll = true;
    easeScrollCurTime = 0;
    var top = cuiffo.dom.getScrollPosition();
    easeScrollPositionStart = top;
    lastStartScroll = top;
  };
};


var pageDots = document.getElementsByClassName('cuiffo-page-dot');
var createPageDots = function() {
  for (var i = 0; i < pageDots.length; i++) {
    var dotEl = pageDots[i];
    var page = pages[i];
    dotEl.onclick = scrollToElement(page);
  }
};
createPageDots();

var tickAnimation = function() {
  if (isUpdated) {
    startTextAnimation();
    splashTextEl.style.opacity = Math.max(1 - percentThroughPage, 0);
    isUpdated = false;
  }
  
  if (isAnimatingText) {

    easeCurTime += 20;
    if (easeCurTime > easeTotalTime) {
      lastStartPosition = easeEndPosition;
      isAnimatingText = false;
    } else {
      var calc = cuiffo.math.easeOutQuad(
          easeCurTime,
          easeStartPosition,
          easeEndPosition - easeStartPosition,
          easeTotalTime);
      lastStartPosition = calc;
    }
    var opacity = 1 - (lastStartPosition / (splashHeight + 30));
    splashTextEl.style.opacity = Math.max(opacity, 0);
    setCssTransform(splashTextEl, 'translateY(' + lastStartPosition + 'px)');
  }
  
  if (isAnimatingScroll) {
    easeScrollCurTime += 20;
    if (easeScrollCurTime > easeScrollTotalTime) {
      lastStartScroll = easeScrollPositionEnd;
      isAnimatingScroll = false;
      percentThroughPage = cuiffo.dom.getScrollPosition() / cuiffo.dom.getWindowHeight();
      startTextAnimation();
      updateActivePage();
    } else {
      var calc = cuiffo.math.easeInOutQuad(
          easeScrollCurTime,
          easeScrollPositionStart,
          easeScrollPositionEnd - easeScrollPositionStart,
          easeScrollTotalTime);
      lastStartScroll = calc;
    }
    window.scrollTo(0, lastStartScroll);
  }
};
window.setInterval(tickAnimation, 20);

// Handle resizing and scrolling, but also handle touchmove to make scrolling
// more smooth on mobile.
window.onresize = handleResize;
window.onscroll = handleScroll;
document.ontouchmove = handleScroll;

