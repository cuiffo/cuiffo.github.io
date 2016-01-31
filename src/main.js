var cuiffo = cuiffo || {};



var origSplashSize;
var origComingSoonSize;
var origCheckLaterSize;
var positionInPage;

var handleResize = function() {
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var secondPageTextEl = document.getElementsByClassName('cuiffo-page-cented-text')[0];
  var comingSoonEl = document.getElementsByClassName('cuiffo-more-coming-soon')[0];
  var checkLaterEl = document.getElementsByClassName('cuiffo-check-back-later')[0];

  
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
  comingSoonEl.style.fontSize = (ratio * 90) + '%';
  var ratio = textWidth / origCheckLaterSize.width;
  checkLaterEl.style.fontSize = (ratio * 90) + '%';

  
  // Center the second page text vertically.
  var textHeight = secondPageTextEl.clientHeight;
  secondPageTextEl.style.top =
      cuiffo.dom.getWindowHeight() / 2 - textHeight / 2 + 'px';
      
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
  var splashContainer = document.getElementsByClassName('cuiffo-page-title-container')[0];
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var comingSoonEl = document.getElementsByClassName('cuiffo-more-coming-soon')[0];
  var checkLaterEl = document.getElementsByClassName('cuiffo-check-back-later')[0];
  var secondPageTextEl = document.getElementsByClassName('cuiffo-page-cented-text')[0];
  origSplashSize = cuiffo.dom.getSize(splashTextEl);
  origComingSoonSize = cuiffo.dom.getSize(comingSoonEl);
  origCheckLaterSize = cuiffo.dom.getSize(checkLaterEl);
  splashContainer.style.width = '100%';
  splashTextEl.style.width = '100%';
  secondPageTextEl.style.width = '100%';

  var pages = cuiffo.Pages.getInstance();

  cuiffo.dom.addEventListener(window, 'resize', handleResize);
  cuiffo.dom.addEventListener(window, 'scroll', handleScroll);

  handleResize();
  handleScroll();
};
ready(init);
