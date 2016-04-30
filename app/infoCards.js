var Dom = require('dom');

class InfoCards {
  
  init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    this.resize();
  }

  resize() {
    let cards = document.getElementsByClassName('info-card-content');
    let requiredSize = 0;
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.height = 'auto';
      let cardHeight = Dom.getSize(cards[i]).height;
      if (cardHeight > requiredSize) {
        requiredSize = cardHeight;
      }
    }
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.height = requiredSize-20 + 'px';
    }
  }
}

var __instance__ = new InfoCards();
module.exports = {
  getInstance: () => __instance__
};
