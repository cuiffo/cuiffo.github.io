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

  static fitTextToScreen(text, fontName, opt_maxWidth) {
    var canvas = document.body.getElementsByClassName('text-fitter')[0];
    var context = canvas.getContext('2d');
    context.font = '16px ' + fontName;
    var width = context.measureText(text).width;
    var height = 16;
    var idealRatio = height/width;
    
    var finalWidth = this.getWindowWidth();
    if (opt_maxWidth && opt_maxWidth < finalWidth) {
      finalWidth = opt_maxWidth;
    }
    return (idealRatio * finalWidth) + 'px';
  }
}

module.exports = Dom;
