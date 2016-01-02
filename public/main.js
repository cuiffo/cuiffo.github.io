// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());var cuiffo = cuiffo || {};
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


cuiffo.dom.addEventListener = function(element, type, callback, opt_isCapturing) {
	var ieType = 'on' + type;
	if (element.addEventListener) {
	  element.addEventListener(type, callback, opt_isCapturing);
	} else {
    element.attachEvent(ieType, callback);
	}
};var cuiffo = cuiffo || {};



var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
var origSpashWidth = splashTextEl.clientWidth;
var splashHeight = splashTextEl.clientHeight;
splashTextEl.style.width = '100%';

var comingSoonEl = document.getElementsByClassName('cuiffo-page-title')[1];
var origComingSoon = comingSoonEl.clientWidth;
comingSoonEl.style.width = '100%';


var pages = document.getElementsByClassName('cuiffo-page');
var activePage = -1;
var resizePages = function() {
  var pageOneEl = pages[0];
  pageOneEl.style.height = cuiffo.dom.getWindowHeight() + 'px';

  var pageTwoEl = pages[1];
  pageTwoEl.style.height = cuiffo.dom.getWindowHeight() + 'px';
};
resizePages();

var updateActivePage = function() {
  activePage = Math.min(Math.round(percentThroughPage), 1);
  dots[activePage].classList.add('cuiffo-page-dot-active');
  for (var i = 0; i <= 1; i++) {
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

var TEXT_ANIM_DURATION = 200;
var textAnimEndTime = 0;
var easeStartPosition = 0;
var easeEndPosition = 0;
var lastStartPosition = 0;


var startTextAnimation = function() {
  easeStartPosition = lastStartPosition;
  textAnimEndTime = new Date().getTime() + TEXT_ANIM_DURATION;
  var range = splashHeight + 30;
  easeEndPosition = percentThroughPage * range;
  isAnimatingText = true;
};


var SCROLL_ANIM_DURATION = 500;
var easeScrollEndTime = 0;
var easeScrollPositionStart = 0;
var easeScrollPositionEnd = 0;
var lastStartScroll = 0;

var isAnimatingScroll = false;
var scrollToElement = function(element) {
  return function() {
    var scrollTo = element.offsetTop;
    easeScrollPositionEnd = scrollTo;
    isAnimatingScroll = true;
    easeScrollEndTime = new Date().getTime() + SCROLL_ANIM_DURATION;
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
    cuiffo.dom.addEventListener(dotEl, 'click', scrollToElement(page));
  }
};
createPageDots();

var tickAnimation = function() {
  // Note: Cannot use the passed in argument for currentTime 
  var currentTime = new Date().getTime();
  if (isUpdated) {
    startTextAnimation();
    splashTextEl.style.opacity = Math.max(1 - percentThroughPage, 0);
    isUpdated = false;
  }
  
  if (isAnimatingText) {
    if (currentTime > textAnimEndTime) {
      lastStartPosition = easeEndPosition;
      isAnimatingText = false;
    } else {
      var startTime = textAnimEndTime - TEXT_ANIM_DURATION;
      var calc = cuiffo.math.easeOutQuad(
          currentTime - startTime,
          easeStartPosition,
          easeEndPosition - easeStartPosition,
          TEXT_ANIM_DURATION);
      lastStartPosition = calc;
    }
    var opacity = 1 - (lastStartPosition / (splashHeight + 30));
    splashTextEl.style.opacity = Math.max(opacity, 0);
    setCssTransform(splashTextEl, 'translateY(' + lastStartPosition + 'px)');
  }
  
  if (isAnimatingScroll) {
    if (currentTime > easeScrollEndTime) {
      lastStartScroll = easeScrollPositionEnd;
      isAnimatingScroll = false;
      percentThroughPage = cuiffo.dom.getScrollPosition() / cuiffo.dom.getWindowHeight();
      startTextAnimation();
      updateActivePage();
    } else {
      var startTime = easeScrollEndTime - SCROLL_ANIM_DURATION;
      var calc = cuiffo.math.easeInOutQuad(
          currentTime - startTime,
          easeScrollPositionStart,
          easeScrollPositionEnd - easeScrollPositionStart,
          SCROLL_ANIM_DURATION);
      lastStartScroll = calc;
    }
    window.scrollTo(0, lastStartScroll);
  }

  window.requestAnimationFrame(tickAnimation);
};
window.requestAnimationFrame(tickAnimation);


var xDown = null;
var yDown = null;

var handleTouchStart = function(e) {
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    e.preventDefault();
};

var handleTouchMove = function(e) {
  e.preventDefault();
  if (!xDown || !yDown) {
    return false;
  }

  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) < Math.abs(yDiff)) {
    if (yDiff > 10) {
      var nextPage = Math.min(activePage + 1, pages.length - 1);
      scrollToElement(pages[nextPage])();
      updateActivePage();
      xDown = null;
      yDown = null; 
    } else if (yDiff < -10) {
      var nextPage = Math.max(activePage - 1, 0);
      scrollToElement(pages[nextPage])();
      updateActivePage();
      xDown = null;
      yDown = null; 
    }
  }

  return false;
};


// Handle resizing and scrolling, but also handle touchmove to make scrolling
// more smooth on mobile.
cuiffo.dom.addEventListener(window, 'resize', handleResize);
cuiffo.dom.addEventListener(window, 'scroll', handleScroll);
cuiffo.dom.addEventListener(document, 'touchstart', handleTouchStart, false);        
cuiffo.dom.addEventListener(document, 'touchmove', handleTouchMove, false);