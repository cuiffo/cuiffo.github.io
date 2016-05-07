var Dom = require('dom');
var PageAnimation = require('pageAnimation');

class Header {
  
  init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    let headerButtons = document.getElementsByClassName('header-button');
    let headerElement = document.getElementsByClassName('header')[0];
    for (let i = 0; i < headerButtons.length; i++) {
      let headerButton = headerButtons[i];
      let scrollToClass = headerButton.getAttribute('scrollto');
      let scrollToElement = document.getElementsByClassName(scrollToClass)[0];
      Dom.addEventListener(headerButton, 'click', () => {
        headerElement.classList.remove('header-maximized');
        PageAnimation.getInstance().scrollToElement(scrollToElement);
      });
    }
    
    let hamburgerButton = document.getElementsByClassName('hamburger-icon')[0];
    Dom.addEventListener(hamburgerButton, 'click', () => {
      headerElement.classList.toggle('header-maximized');
    });
  }
}

var __instance__ = new Header();
module.exports = {
  getInstance: () => __instance__
};
