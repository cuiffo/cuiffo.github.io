var Buttons = require('buttons');
var Dom = require('dom');
var PageAnimation = require('pageAnimation');
var Pages = require('pages');
var TitleAnimation = require('titleAnimation');


var origSplashSize;
var origComingSoonSize;
var origCheckLaterSize;
var positionInPage;

var placeInfoTiles = function() {
  var windowWidth = Dom.getWindowWidth();
  var windowHeight = Dom.getWindowHeight();

  var mapEl = document.getElementsByClassName('cuiffo-map-container')[0];
  var sidebarEl = document.getElementsByClassName('cuiffo-map-sidebar')[0];
  if (windowHeight > windowWidth) {
    mapEl.classList.add('cuiffo-map-container-tall');
    sidebarEl.classList.add('cuiffo-map-sidebar-tall');
  } else {
    mapEl.classList.remove('cuiffo-map-container-tall');
    sidebarEl.classList.remove('cuiffo-map-sidebar-tall');
  }
};


var handleResize = function() {
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var secondPageTextEl = document.getElementsByClassName('cuiffo-page-cented-text')[0];
  var comingSoonEl = document.getElementsByClassName('cuiffo-more-coming-soon')[0];
  var checkLaterEl = document.getElementsByClassName('cuiffo-check-back-later')[0];

  
  // Set size of the first page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(Dom.getWindowWidth() - 20, minTextWidth));
  var ratio = textWidth / origSplashSize.width;
  splashTextEl.style.fontSize = (ratio * 100) + '%';
  //splashHeight = splashTextEl.clientHeight;
  
  // Set size of the second page text.
  var maxTextWidth = 550;
  var minTextWidth = 100;
  var textWidth = Math.min(maxTextWidth, 
      Math.max(Dom.getWindowWidth() - 20, minTextWidth));
  var ratio = textWidth / origComingSoonSize.width;
  comingSoonEl.style.fontSize = (ratio * 90) + '%';
  var ratio = textWidth / origCheckLaterSize.width;
  checkLaterEl.style.fontSize = (ratio * 90) + '%';

  // Center the coming soon page text vertically.
  var textHeight = secondPageTextEl.clientHeight;
  secondPageTextEl.style.top =
      Dom.getWindowHeight() / 2 - textHeight / 2 + 'px';
      
  var pagesInst = new Pages();
  pagesInst.resizePages();

  if (pagesInst.headingToPage) {
    pagesInst.scrollToPage(headingToPage);
  }

  placeInfoTiles();
};


var handleScroll = function(e) {

  if (new PageAnimation().isAnimating) {
    e.preventDefault();
    return false;
  }
  positionInPage = Dom.getScrollPosition();

  new TitleAnimation().handleScroll();
  new Pages().updateActivePage();
};


var initButtons = function() {
  var buttonsHelper = new Buttons();

  var openVenuePage = function() {
    window.open('http://palacesomersetpark.com/', '_blank');
  };
  var venueButton = document.getElementsByClassName('cuiffo-map-venue-info')[0];
  buttonsHelper.addButton(venueButton, openVenuePage);

  var openHotelPage = function() {
    window.open('http://www.sonesta.com/somerset', '_blank');
  };
  var hotelButton = document.getElementsByClassName('cuiffo-map-hotel-info')[0];
  buttonsHelper.addButton(hotelButton, openHotelPage);

  var openMapPage = function() {
    window.open('http://www.sonesta.com/somerset', '_blank');
  };
  var mapButton = document.getElementsByClassName('cuiffo-map-container')[0];
  buttonsHelper.addButton(hotelButton, openMapPage);
};

var init = function() {
  var splashContainer = document.getElementsByClassName('cuiffo-page-title-container')[0];
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var comingSoonEl = document.getElementsByClassName('cuiffo-more-coming-soon')[0];
  var checkLaterEl = document.getElementsByClassName('cuiffo-check-back-later')[0];
  var secondPageTextEl = document.getElementsByClassName('cuiffo-page-cented-text')[0];
  origSplashSize = Dom.getSize(splashTextEl);
  origComingSoonSize = Dom.getSize(comingSoonEl);
  origCheckLaterSize = Dom.getSize(checkLaterEl);
  splashContainer.style.width = '100%';
  splashTextEl.style.width = '100%';
  secondPageTextEl.style.width = '100%';

  var pages = new Pages();

  Dom.addEventListener(window, 'resize', handleResize);
  Dom.addEventListener(window, 'scroll', handleScroll);

  handleResize();
  handleScroll();

  initButtons();
};
document.addEventListener('DOMContentLoaded', () => {
  init();
});
