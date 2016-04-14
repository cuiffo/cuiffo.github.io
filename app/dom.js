class Dom {

  static getScrollPosition() {
    return document.documentElement.scrollTop ||
        document.body.scrollTop;
  }

  static getWindowHeight() {
    return window.innerHeight;
  }

  static getWindowWidth() {
    return window.innerWidth;
  }

  static getSize(element) {
    return element && element.getBoundingClientRect();
  }

  static setCssTransform(element, value) {
    element.style.webkitTransform = value;
    element.style.MozTransform = value;
    element.style.msTransform = value;
    element.style.OTransform = value;
    element.style.transform = value;
  }

  static addEventListener(element, type, callback, opt_isCapturing) {
    var ieType = 'on' + type;
    if (element.addEventListener) {
      element.addEventListener(type, callback, opt_isCapturing);
    } else {
      element.attachEvent(ieType, callback);
    }
  }
}

module.exports = Dom;
