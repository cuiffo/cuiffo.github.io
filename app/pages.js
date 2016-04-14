var Dom = require('dom');
var PageAnimation = require('pageAnimation');
var Singleton = require('singleton');

class Pages extends Singleton {

  constructor() {
    super();
    if (this.getInstance()) {
      return this.getInstance();
    }
    this.elements = Array.from(document.getElementsByClassName('cuiffo-page'));
    this.numPages = this.elements.length;
    this.currentPage = 0;
    this.xDown = null;
    this.yDown = null;
    this.activePage = -1;
    this.headingToPage = null;

    var handleTouchStart = this.handleTouchStart.bind(this);
    var handleTouchMove = this.handleTouchMove.bind(this);
    Dom.addEventListener(document, 'touchstart', handleTouchStart, false);        
    Dom.addEventListener(document, 'touchmove', handleTouchMove, false);

    this.createPageDots();
  }

  resizePages() {
    this.elements.forEach(function(pageEl) {
      pageEl.style.height = Dom.getWindowHeight() + 'px';
    });
  }

  createPageDots() {
    var pageDotsContainer = document.getElementsByClassName('cuiffo-page-selector')[0];
    for (var i = 0; i < this.numPages; i++) {
      var dotEl = document.createElement('div');
      dotEl.className += ' cuiffo-page-dot';
      pageDotsContainer.appendChild(dotEl);
      var pageEl = this.elements[i];
      Dom.addEventListener(dotEl, 'click', this.handleDotClick(pageEl));
    }
  }

  handleDotClick(element) {
    return function() {
      new PageAnimation().scrollToElement(element);
    }
  }

  handleTouchStart(e) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
    e.preventDefault();
  }

  handleTouchMove(e) {
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
        this.scrollToPage(nextPage);
      } else if (yDiff < -10) {
        var nextPage = Math.max(this.activePage - 1, 0);
        this.scrollToPage(nextPage);
      }
    }

    return false;
  }

  scrollToPage(page) {
    new PageAnimation().scrollToElement(this.elements[page]);
    this.updateActivePage();
    this.xDown = null;
    this.yDown = null;
    this.headingToPage = page;
  }

  updateActivePage() {
    var dotElements = document.getElementsByClassName('cuiffo-page-dot');
    var positionInPage = Dom.getScrollPosition();
    var percentThroughPage = positionInPage / Dom.getWindowHeight();
    this.activePage = Math.min(Math.round(percentThroughPage), this.numPages - 1);
    dotElements[this.activePage].classList.add('cuiffo-page-dot-active');
    for (var i = 0; i < this.numPages; i++) {
      if (this.activePage !== i) {
        dotElements[i].classList.remove('cuiffo-page-dot-active');
      }
    }
  }
}

module.exports = Pages;
