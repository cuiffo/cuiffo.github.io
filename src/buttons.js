var cuiffo = cuiffo || {};



cuiffo.Buttons = function() {
  this.buttons = [];
};


cuiffo.Buttons.getInstance = function() {
  cuiffo.Buttons.__instance__ =
      cuiffo.Buttons.__instance__ || new cuiffo.Buttons();
  return cuiffo.Buttons.__instance__;
};


cuiffo.Buttons.prototype.addButton = function(element, callback) {
  var handleTouchStart = this.handleTouchStart.bind(this, element);
  var handleTouchMove = this.handleTouchMove.bind(this, element);
  var handleTouchEnd = this.handleTouchEnd.bind(this, element, callback);
  var handleClick = this.handleClick.bind(this, callback);
	cuiffo.dom.addEventListener(element, 'touchstart', handleTouchStart, false);        
	cuiffo.dom.addEventListener(element, 'touchmove', handleTouchMove, false);
	cuiffo.dom.addEventListener(element, 'touchend', handleTouchEnd, false);
	cuiffo.dom.addEventListener(element, 'click', handleClick, false);
};


cuiffo.Buttons.prototype.handleTouchStart = function(element) {
  this.touched = element;
};


cuiffo.Buttons.prototype.handleTouchMove = function(element) {
  this.touched = null;
};


cuiffo.Buttons.prototype.handleTouchEnd = function(element, callback) {
  if (this.touched == element) {
    callback();
  }
};


cuiffo.Buttons.prototype.handleClick = function(callback) {
  callback();
};
