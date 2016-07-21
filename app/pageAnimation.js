var Animator = require('animator');
var Dom = require('dom');
var Maths = require('maths');

class PageAnimation {

  constructor() {
    this.HASH = 'pageAnimationHash';
    this.SCROLL_ANIM_DURATION = 500;
    this.easeScrollEndTime = 0;
    this.easeScrollPositionStart = 0;
    this.easeScrollPositionEnd = 0;
    this.lastStartScroll = 0;
    this.isAnimating = false;
    this.animatorHash =  -1;
  }

  scrollToElement(element) {
    var animator = Animator.getInstance();
    animator.cancelAnimation(this.HASH);
    var scrollTo = element.offsetTop;
    this.easeScrollPositionEnd = scrollTo;
    this.easeScrollEndTime = new Date().getTime() + this.SCROLL_ANIM_DURATION;
    var top = Dom.getScrollPosition();
    this.easeScrollPositionStart = top;
    this.lastStartScroll = top;
    var boundFn = this.pageAnimationFn.bind(this);
    animator.startAnimation(boundFn, this.HASH);
    this.isAnimating = true;
  }

  pageAnimationFn(currentTime) {
    var isComplete = false;
    if (currentTime > this.easeScrollEndTime) {
      this.lastStartScroll = this.easeScrollPositionEnd;
      isComplete = true;
      this.isAnimating = false;
    } else {
      var startTime = this.easeScrollEndTime - this.SCROLL_ANIM_DURATION;
      var calc = Maths.easeInOutQuad(
          currentTime - startTime,
          this.easeScrollPositionStart,
          this.easeScrollPositionEnd - this.easeScrollPositionStart,
          this.SCROLL_ANIM_DURATION);
      this.lastStartScroll = calc;
    }
    window.scrollTo(0, this.lastStartScroll);
    return isComplete;
  }
}

var __instance__ = new PageAnimation();
module.exports = {
  getInstance: () => __instance__
};
