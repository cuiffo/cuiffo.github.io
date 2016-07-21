var Countdown = require('countdown');
var Dom = require('dom');
var Header = require('header');
var InfoCards = require('infoCards');
var ImageLoader = require('imageLoader');


var positionInPage;

var handleResize = function() {
  InfoCards.getInstance().resize();

  var splashTextEl = document.getElementsByClassName('first-page-title')[0];
  // Set size of the first page text.
  splashTextEl.style.fontSize = Dom.fitTextToScreen(
      splashTextEl.textContent.trim(), 'Damion', 500, 20);
  splashTextEl = document.getElementsByClassName('first-page-subtitle')[0];
  // Set size of the first page text.
  splashTextEl.style.fontSize = Dom.fitTextToScreen(
      splashTextEl.textContent.trim(), 'Damion', 250, 100);

  var titleElements = document.getElementsByClassName('section-title-text');
  for (let i = 0; i < titleElements.length; i++) {
    let titleEl = titleElements[i];
    titleEl.style.fontSize = Dom.fitTextToScreen(
        titleEl.textContent.trim(), 'Damion', 550, 70);

  }
};


var handleScroll = function(e) {
  var positionInPage = Dom.getScrollPosition();
  var headerEl = document.getElementsByClassName('header')[0];
  var hasScrolledCss = headerEl.classList.contains('header-scrolled');
  if (positionInPage > Dom.getWindowHeight()-40 && !hasScrolledCss) {
    headerEl.classList.add('header-scrolled');
  } else if (positionInPage < Dom.getWindowHeight()-40 && hasScrolledCss) {
    headerEl.classList.remove('header-scrolled');
  }
};


var openUrl = function(url) {
  return () => {
    var win = window.open(url, '_blank');
  }
}


var init = function() {
  ImageLoader.getInstance().init();

  Dom.addEventListener(window, 'resize', handleResize);
  Dom.addEventListener(window, 'scroll', handleScroll);

  let frontPage = document.getElementsByClassName('first-page')[0];
  frontPage.style.height = Dom.getWindowHeight() + 'px';

  $("span[src]").each(function(i, element) {
    Dom.addEventListener(
        element,
        'click',
        openUrl(element.getAttribute('src')));
  });
  $("div[src]").each(function(i, element) {
    Dom.addEventListener(
        element,
        'click',
        openUrl(element.getAttribute('src')));
  });

  Countdown.getInstance().start();
  Header.getInstance().init();
  InfoCards.getInstance().init();
  handleResize();
  handleScroll();

  window.sr = ScrollReveal();
  sr.reveal('.bridal-party-member', {duration: 400});
  sr.reveal('.info-card', {duration: 400});
};


jQuery(document).ready(function($){
  init();
  
  // Init the scroller library.
  $.Scrollax();
  $.fn.coverImage = function(contain) {
    this.each(function() {
      var $this = $(this),
        src = $this.get(0).src,
        $wrapper = $this.parent();

      if (contain) {
        $wrapper.css({
          'background': 'url(' + src + ') 50% 50%/contain no-repeat'
        });
      } else {
        $wrapper.css({
          'background': 'url(' + src + ') 50% 50%/cover no-repeat'
        });
      }

      $this.remove();
    });

    return this;
  };
  $('.cover-image').coverImage();
});
