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
