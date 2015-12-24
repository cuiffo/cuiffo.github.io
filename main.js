(function() {
'use strict';


var getScrollPosition = function() {
  return document.documentElement.scrollTop ||
      document.body.scrollTop;
}

var mobileAndTabletCheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
var origSpashWidth = splashTextEl.clientWidth;
var splashHeight = splashTextEl.clientHeight;
splashTextEl.style.width = '100%';

var comingSoonEl = document.getElementsByClassName('cuiffo-page-title')[1];
var origComingSoon = comingSoonEl.clientWidth;
comingSoonEl.style.width = '100%';


var pages = document.getElementsByClassName('cuiffo-page');
var resizePages = function(ignoreChecks) {
  if (ignoreChecks || !mobileAndTabletCheck()) {
    var pageOneEl = pages[0];
    pageOneEl.style.height = windowHeight + 'px';
  }

  var pageTwoEl = pages[1];
  pageTwoEl.style.height = windowHeight + 'px';
};
resizePages(true);

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
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  
  // Set size of the first page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(windowWidth - 20, minTextWidth));
  var ratio = textWidth / origSpashWidth;
  splashTextEl.style.fontSize = (ratio * 100) + '%';
  splashHeight = splashTextEl.clientHeight;
  
  // Set size of the second page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(windowWidth - 20, minTextWidth));
  var ratio = textWidth / origComingSoon;
  comingSoonEl.style.fontSize = (ratio * 100) + '%';
  
  // Center the second page text vertically.
  var comingSoonHeight = comingSoonEl.clientHeight;
  comingSoonEl.style.top =
      windowHeight / 2 - comingSoonHeight / 2 + 'px';
      
  // Center the page selector vertically.
  var pagerHeight = pager.clientHeight;
  pager.style.top = windowHeight / 2 - pagerHeight / 2 + 'px';
      
  // Only resize sizes of pages if not on mobile.
  resizePages(false);
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

  var position = getScrollPosition();
  percentThroughPage = position / windowHeight;
  
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


var easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};

var easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
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
var easeScrollTotalTime = 200;
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
    var top = getScrollPosition();
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
      var calc = easeOutQuad(easeCurTime, easeStartPosition,
          easeEndPosition - easeStartPosition, easeTotalTime);
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
      percentThroughPage = getScrollPosition() / windowHeight;
      startTextAnimation();
      updateActivePage();
    } else {
      var calc = easeInOutQuad(easeScrollCurTime, easeScrollPositionStart,
          easeScrollPositionEnd - easeScrollPositionStart, easeScrollTotalTime);
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

})(); // End scoping.