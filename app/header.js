var Dom = require('dom');
var PageAnimation = require('pageAnimation');

class Header {
  
  init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    let headerButtons = document.getElementsByClassName('header-button');
    for (let i = 0; i < headerButtons.length; i++) {
      let headerButton = headerButtons[i];
      let scrollToClass = headerButton.getAttribute('scrollto');
      let scrollToElement = document.getElementsByClassName(scrollToClass)[0];
      Dom.addEventListener(headerButton, 'click', () => {
        PageAnimation.getInstance().scrollToElement(scrollToElement);
      });
    }
  }
}

var __instance__ = new Header();
module.exports = {
  getInstance: () => __instance__
};
