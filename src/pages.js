var cuiffo = cuiffo || {};


(function() {

cuiffo.Pages = function() {
  this.elements = Array.from(document.getElementsByClassName('cuiffo-page'));
	this.numPages = this.elements.length;
	this.currentPage = 0;
	this.xDown = null;
	this.yDown = null;
	this.activePage = -1;
  this.headingToPage = -1;

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
      this.scrollToPage(nextPage);
    } else if (yDiff < -10) {
      var nextPage = Math.max(this.activePage - 1, 0);
      this.scrollToPage(nextPage);
    }
  }

  return false;
};


cuiffo.Pages.prototype.scrollToPage = function(page) {
  cuiffo.PageAnimation.getInstance().scrollToElement(this.elements[page]);
  this.updateActivePage();
  this.xDown = null;
  this.yDown = null;
  this.headingToPage = page;
}


cuiffo.Pages.prototype.updateActivePage = function() {
	var dotElements = document.getElementsByClassName('cuiffo-page-dot');
  var positionInPage = cuiffo.dom.getScrollPosition();
  var percentThroughPage = positionInPage / cuiffo.dom.getWindowHeight();
  this.activePage = Math.min(Math.round(percentThroughPage), this.numPages - 1);
  dotElements[this.activePage].classList.add('cuiffo-page-dot-active');
  for (var i = 0; i < this.numPages; i++) {
    if (this.activePage !== i) {
      dotElements[i].classList.remove('cuiffo-page-dot-active');
    }
  }
};

})();
