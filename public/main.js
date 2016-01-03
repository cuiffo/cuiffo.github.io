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
}());// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}


// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else      
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}var cuiffo = cuiffo || {};
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


cuiffo.math.Rect = function(height, width) {
  this.height = height;
  this.width = width;
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


cuiffo.dom.getSize = function(element) {
  return new cuiffo.math.Rect(element.clientHeight, element.clientWidth);
}

cuiffo.dom.setCssTransform = function(element, value) {
  element.style.webkitTransform = value;
  element.style.MozTransform = value;
  element.style.msTransform = value;
  element.style.OTransform = value;
  element.style.transform = value;
};


cuiffo.dom.addEventListener = function(element, type, callback, opt_isCapturing) {
	var ieType = 'on' + type;
	if (element.addEventListener) {
	  element.addEventListener(type, callback, opt_isCapturing);
	} else {
    element.attachEvent(ieType, callback);
	}
};
var cuiffo = cuiffo || {};



(function() {

cuiffo.Animator = function() {
  this.callbacks = {};
  this.isTicking = false;
};


cuiffo.Animator.getInstance = function() {
  cuiffo.Animator.__instance__ =
      cuiffo.Animator.__instance__ || new cuiffo.Animator();
	return cuiffo.Animator.__instance__;
};


cuiffo.Animator.prototype.startAnimation = function(callback, hash) {
  this.callbacks[hash] = callback;

  if (!this.isTicking) {
    this.isTicking = true;
    window.requestAnimationFrame(this.tick.bind(this));
  }
};


cuiffo.Animator.prototype.cancelAnimation = function(hash) {
  delete this.callbacks[hash];
};


cuiffo.Animator.prototype.tick = function() {
  var currentTime = new Date().getTime();
  for (var hash in this.callbacks) {
    var callback = this.callbacks[hash];
    var isComplete = callback(currentTime);
    if (isComplete) {
      this.cancelAnimation(hash);
    }
  }
  if (Object.keys(this.callbacks).length) {
    window.requestAnimationFrame(this.tick.bind(this));
  } else {
    this.isTicking = false;
  }
};

})();
cuiffo = cuiffo || {};



(function() {

cuiffo.TitleAnimation = function() {
  this.HASH = 'titleAnimationHash';
  this.TEXT_ANIM_DURATION = 200;
  this.textAnimEndTime = 0;
  this.easeStartPosition = 0;
  this.easeEndPosition = 0;
  this.lastStartPosition = 0;
};


cuiffo.TitleAnimation.getInstance = function() {
  cuiffo.TitleAnimation.__instance__ =
      cuiffo.TitleAnimation.__instance__ || new cuiffo.TitleAnimation();
  return cuiffo.TitleAnimation.__instance__;
};


cuiffo.TitleAnimation.prototype.handleScroll = function() {
  var animator = cuiffo.Animator.getInstance();
  animator.cancelAnimation(this.HASH);
  this.easeStartPosition = this.lastStartPosition;
  this.textAnimEndTime = new Date().getTime() + this.TEXT_ANIM_DURATION;
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var range = splashTextEl.clientHeight + 30;
  var positionInPage = cuiffo.dom.getScrollPosition();
  this.easeEndPosition = (positionInPage / cuiffo.dom.getWindowHeight()) * range;
  var boundFn = this.textAnimationFn.bind(this);
  animator.startAnimation(boundFn, this.HASH);
};


cuiffo.TitleAnimation.prototype.textAnimationFn = function(currentTime) {
  var isComplete = false;
  if (currentTime > this.textAnimEndTime) {
    this.lastStartPosition = this.easeEndPosition;
    isComplete = true;
  } else {
    var startTime = this.textAnimEndTime - this.TEXT_ANIM_DURATION;
    // The text should always be moving, boost the current time if it's low.
    var timeDiff = Math.max(currentTime - startTime, 20);
    var calc = cuiffo.math.easeOutQuad(
        timeDiff,
        this.easeStartPosition,
        this.easeEndPosition - this.easeStartPosition,
        this.TEXT_ANIM_DURATION);
    this.lastStartPosition = calc;
  }
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var opacity = 1 - (this.lastStartPosition / (splashTextEl.clientHeight + 30));
  splashTextEl.style.opacity = Math.max(opacity, 0);
  cuiffo.dom.setCssTransform(splashTextEl, 'translateY(' + this.lastStartPosition + 'px)');
  return isComplete;
};

})();
cuiffo = cuiffo || {};


(function() {


cuiffo.PageAnimation = function() {
  this.HASH = 'pageAnimationHash';
  this.SCROLL_ANIM_DURATION = 500;
  this.easeScrollEndTime = 0;
  this.easeScrollPositionStart = 0;
  this.easeScrollPositionEnd = 0;
  this.lastStartScroll = 0;
  this.isAnimating = false;
  this.animatorHash =  -1;
};


cuiffo.PageAnimation.getInstance = function() {
  cuiffo.PageAnimation.__instance__ =
      cuiffo.PageAnimation.__instance__ || new cuiffo.PageAnimation();
  return cuiffo.PageAnimation.__instance__;
};


cuiffo.PageAnimation.prototype.scrollToElement = function(element) {
  var animator = cuiffo.Animator.getInstance();
  animator.cancelAnimation(this.HASH);
  var scrollTo = element.offsetTop;
  this.easeScrollPositionEnd = scrollTo;
  this.easeScrollEndTime = new Date().getTime() + this.SCROLL_ANIM_DURATION;
  var top = cuiffo.dom.getScrollPosition();
  this.easeScrollPositionStart = top;
  this.lastStartScroll = top;
  var boundFn = this.pageAnimationFn.bind(this);
  animator.startAnimation(boundFn, this.HASH);
  this.isAnimating = true;
};


cuiffo.PageAnimation.prototype.pageAnimationFn = function(currentTime) {
  var isComplete = false;
  if (currentTime > this.easeScrollEndTime) {
    this.lastStartScroll = this.easeScrollPositionEnd;
    cuiffo.TitleAnimation.getInstance().handleScroll();
    cuiffo.Pages.getInstance().updateActivePage();
    isComplete = true;
    this.isAnimating = false;
  } else {
    var startTime = this.easeScrollEndTime - this.SCROLL_ANIM_DURATION;
    var calc = cuiffo.math.easeInOutQuad(
        currentTime - startTime,
        this.easeScrollPositionStart,
        this.easeScrollPositionEnd - this.easeScrollPositionStart,
        this.SCROLL_ANIM_DURATION);
    this.lastStartScroll = calc;
  }
  window.scrollTo(0, this.lastStartScroll);
  return isComplete;
};


})();
var cuiffo = cuiffo || {};


(function() {

cuiffo.Pages = function() {
  this.elements = Array.from(document.getElementsByClassName('cuiffo-page'));
	this.numPages = this.elements.length;
	this.currentPage = 0;
	this.xDown = null;
	this.yDown = null;
	this.activePage = -1;

  var handleTouchStart = this.handleTouchStart.bind(this);
  var handleTouchMove = this.handleTouchMove.bind(this);
	cuiffo.dom.addEventListener(document, 'touchstart', handleTouchStart, false);        
	cuiffo.dom.addEventListener(document, 'touchmove', handleTouchMove, false);

	this.createPageDots();
};


cuiffo.Pages.getInstance = function() {
  cuiffo.Pages.__instance__ =
      cuiffo.Pages.__instance__ || new cuiffo.Pages();
  return cuiffo.Pages.__instance__;
};


cuiffo.Pages.prototype.resizePages = function() {
	this.elements.forEach(function(pageEl) {
		pageEl.style.height = cuiffo.dom.getWindowHeight() + 'px';
	});
};


cuiffo.Pages.prototype.createPageDots = function() {
	var pageDotsContainer = document.getElementsByClassName('cuiffo-page-selector')[0];
  for (var i = 0; i < this.numPages; i++) {
  	var dotEl = document.createElement('div');
  	dotEl.className += ' cuiffo-page-dot';
  	pageDotsContainer.appendChild(dotEl);
    var pageEl = this.elements[i];
    cuiffo.dom.addEventListener(dotEl, 'click', this.handleDotClick(pageEl));
  }
};


cuiffo.Pages.prototype.handleDotClick = function(element) {
  return function() {
    cuiffo.PageAnimation.getInstance().scrollToElement(element);
  }
};


cuiffo.Pages.prototype.handleTouchStart = function(e) {
  this.xDown = e.touches[0].clientX;
  this.yDown = e.touches[0].clientY;
  e.preventDefault();
};


cuiffo.Pages.prototype.handleTouchMove = function(e) {
  e.preventDefault();
  if (!this.xDown || !this.yDown) {
    return false;
  }

  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;
  var xDiff = this.xDown - xUp;
  var yDiff = this.yDown - yUp;

  if (Math.abs(xDiff) < Math.abs(yDiff)) {
    if (yDiff > 10) {
      var nextPage = Math.min(this.activePage + 1, this.numPages - 1);
      cuiffo.PageAnimation.getInstance().scrollToElement(
          this.elements[nextPage]);
      this.updateActivePage();
      this.xDown = null;
      this.yDown = null; 
    } else if (yDiff < -10) {
      var nextPage = Math.max(this.activePage - 1, 0);
      cuiffo.PageAnimation.getInstance().scrollToElement(
          this.elements[nextPage]);
      this.updateActivePage();
      this.xDown = null;
      this.yDown = null; 
    }
  }

  return false;
};


cuiffo.Pages.prototype.updateActivePage = function() {
	var dotElements = document.getElementsByClassName('cuiffo-page-dot');
  var positionInPage = cuiffo.dom.getScrollPosition();
  var percentThroughPage = positionInPage / cuiffo.dom.getWindowHeight();
  this.activePage = Math.min(Math.round(percentThroughPage), 1);
  dotElements[this.activePage].classList.add('cuiffo-page-dot-active');
  for (var i = 0; i <= 1; i++) {
    if (this.activePage !== i) {
      dotElements[i].classList.remove('cuiffo-page-dot-active');
    }
  }
};

})();
var cuiffo = cuiffo || {};



var origSplashSize;
var origComingSoonSize;
var positionInPage;

var handleResize = function() {
  var pageTitles = document.getElementsByClassName('cuiffo-page-title');
  var splashTextEl = pageTitles[0];
  var comingSoonEl = pageTitles[1];
  
  // Set size of the first page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(cuiffo.dom.getWindowWidth() - 20, minTextWidth));
  var ratio = textWidth / origSplashSize.width;
  splashTextEl.style.fontSize = (ratio * 100) + '%';
  splashHeight = splashTextEl.clientHeight;
  
  // Set size of the second page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(cuiffo.dom.getWindowWidth() - 20, minTextWidth));
  var ratio = textWidth / origComingSoonSize.width;
  comingSoonEl.style.fontSize = (ratio * 100) + '%';
  
  // Center the second page text vertically.
  var comingSoonHeight = comingSoonEl.clientHeight;
  comingSoonEl.style.top =
      cuiffo.dom.getWindowHeight() / 2 - comingSoonHeight / 2 + 'px';
      
  cuiffo.Pages.getInstance().resizePages();
};


// TODO(cuiffo): Place the numScrollsWithoutUpdate hack again?
var handleScroll = function(e) {

  if (cuiffo.PageAnimation.getInstance().isAnimating) {
    e.preventDefault();
    return false;
  }
  positionInPage = cuiffo.dom.getScrollPosition();

  cuiffo.TitleAnimation.getInstance().handleScroll();
  cuiffo.Pages.getInstance().updateActivePage();
};


var init = function() {
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var comingSoonEl = document.getElementsByClassName('cuiffo-page-title')[1];
  origSplashSize = cuiffo.dom.getSize(splashTextEl);
  origComingSoonSize = cuiffo.dom.getSize(comingSoonEl);
  splashTextEl.style.width = '100%';
  comingSoonEl.style.width = '100%';

  var pages = cuiffo.Pages.getInstance();

  cuiffo.dom.addEventListener(window, 'resize', handleResize);
  cuiffo.dom.addEventListener(window, 'scroll', handleScroll);

  handleResize();
  handleScroll();
};
init();
