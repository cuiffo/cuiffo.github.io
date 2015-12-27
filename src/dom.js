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
