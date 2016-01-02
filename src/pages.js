var cuiffo = cuiffo || {};



cuiffo.Pages = function(elements) {
	this.elements = elements;
	this.numPages = elements.lenth;
	this.currentPage = 0;
	this.xDown = null;
	this.yDown = null;
	this.activePage = -1;

	cuiffo.dom.addEventListener(window, 'resize', this.handleResize);
	cuiffo.dom.addEventListener(window, 'scroll', this.handleScroll);
	cuiffo.dom.addEventListener(document, 'touchstart', this.handleTouchStart, false);        
	cuiffo.dom.addEventListener(document, 'touchmove', this.handleTouchMove, false);

	this.createPageDots();
};


cuiffo.Page.prototype.resizePages = function() {
	this.elements.forEach(function(pageEl) {
		pageEl.style.height = cuiffo.dom.getWindowHeight() + 'px';
	});
};


cuiffo.Page.prototype.createPageDots = function() {
	var pageDotsContainer = document.getElementsByClassName('cuiffo-page-selector')[0];
  for (var i = 0; i < this.numPages; i++) {
  	var dotEl = document.createElement('div');
  	dotEl.className += ' cuiffo-page-dot';
  	pagesDotsContainer.appendChild(dotEl);
    cuiffo.dom.addEventListener(dotEl, 'click', this.scrollToPage(i));
  }
};


cuiffo.Page.prototype.handleTouchStart = function(e) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
    e.preventDefault();
};


cuiffo.Page.prototype.handleTouchMove = function(e) {
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
      var nextPage = Math.min(this.activePage + 1, pages.length - 1);
      this.scrollToPage(nextPage);
      updateActivePage();
      this.xDown = null;
      this.yDown = null; 
    } else if (yDiff < -10) {
      var nextPage = Math.max(this.activePage - 1, 0);
      this.scrollToPage(nextPage);
      updateActivePage();
      this.xDown = null;
      this.yDown = null; 
    }
  }

  return false;
};



var updateActivePage = function() {
	var dotElements = document.getElementsByClassName('cuiffo-page-dot');
  this.activePage = Math.min(Math.round(percentThroughPage), 1);
  dotElements[this.activePage].classList.add('cuiffo-page-dot-active');
  for (var i = 0; i <= 1; i++) {
    if (this.activePage !== i) {
      dotElements[i].classList.remove('cuiffo-page-dot-active');
    }
  }
};


cuiffo.Page.prototype.scrollToPage = function(pageIndex) {
	cuiffo.dom.scrollToElement(this.elements[pageIndex]);
};