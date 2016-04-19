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

  static fitTextToScreen(text, fontName, maxWidth, padding) {
    var screenWidth = this.getWindowWidth();
    var desiredTextWidth = screenWidth > maxWidth ? maxWidth : screenWidth;
    desiredTextWidth -= padding;
    return this.getFontHeightForWidth(text, fontName, desiredTextWidth);
  }

  static getFontHeightForWidth(text, fontName, desiredWidth) {
    var canvas = document.body.getElementsByClassName('text-fitter')[0];
    var context = canvas.getContext('2d');
    context.font = '16px ' + fontName;
    var width = context.measureText(text).width;
    var height = 16;
    var idealRatio = height/width;
    
    return (idealRatio * desiredWidth) + 'px';
  }
}

module.exports = Dom;
