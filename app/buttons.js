var Dom = require('dom');

class Buttons {

  constructor() {
    this.buttons = [];
  }
  
  addButton(element, callback) {
    var handleTouchStart = this.handleTouchStart.bind(this, element);
    var handleTouchMove = this.handleTouchMove.bind(this, element);
    var handleTouchEnd = this.handleTouchEnd.bind(this, element, callback);
    var handleClick = this.handleClick.bind(this, callback);
    Dom.addEventListener(element, 'touchstart', handleTouchStart, false);        
    Dom.addEventListener(element, 'touchmove', handleTouchMove, false);
    Dom.addEventListener(element, 'touchend', handleTouchEnd, false);
    Dom.addEventListener(element, 'click', handleClick, false);
  }

  handleTouchStart(element) {
    this.touched = element;
  }

  handleTouchMove(element) {
    this.touched = null;
  }

  handleTouchEnd(element, callback) {
    if (this.touched == element) {
      callback();
    }
  }

  handleClick(callback) {
    callback();
  }
}

var __instance__ = new Buttons();
module.exports = {
  getInstance: () => __instance__
};
