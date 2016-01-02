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