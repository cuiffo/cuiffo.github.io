var cuiffo = cuiffo || {};



//var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=40.530909,-74.534008&visible=40.5333006,-74.5249027&key=AIzaSyDqrE8Ak3eMHlu--MtvD7m27-7iVvT8JgE';
var origSplashSize;
var origComingSoonSize;
var origCheckLaterSize;
var positionInPage;


var placeInfoTiles = function() {
  var windowWidth = cuiffo.dom.getWindowWidth();
  var windowHeight = cuiffo.dom.getWindowHeight();

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

  // Center the coming soon page text vertically.
  var textHeight = secondPageTextEl.clientHeight;
  secondPageTextEl.style.top =
      cuiffo.dom.getWindowHeight() / 2 - textHeight / 2 + 'px';
      
  var pagesInst = cuiffo.Pages.getInstance();
  pagesInst.resizePages();

  if (pagesInst.headingToPage) {
    pagesInst.scrollToPage(headingToPage);
  }

  placeInfoTiles();

  // Regenerate map URL and set it.
  //var mapEl = document.getElementsByClassName('cuiffo-map-container')[0];
  //var mapSize = cuiffo.dom.getSize(mapEl);
  //var fullMapUrl = mapUrl + '&size=' + mapSize.width + 'x' + mapSize.height;
  //mapEl.style.backgroundImage = 'url(' + fullMapUrl + ')';
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


var initButtons = function() {
  var buttonsHelper = cuiffo.Buttons.getInstance();

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

  initButtons();
};
ready(init);
