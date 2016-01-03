cuiffo = cuiffo || {};


(function() {


cuiffo.PageAnimation = function() {
  this.HASH = 'pageAnimationHash';
  this.SCROLL_ANIM_DURATION = 500;
  this.easeScrollEndTime = 0;
  this.easeScrollPositionStart = 0;
  this.easeScrollPositionEnd = 0;
  this.lastStartScroll = 0;
  this.isAnimating = false;
  this.animatorHash =  -1;
};


cuiffo.PageAnimation.getInstance = function() {
  cuiffo.PageAnimation.__instance__ =
      cuiffo.PageAnimation.__instance__ || new cuiffo.PageAnimation();
  return cuiffo.PageAnimation.__instance__;
};


cuiffo.PageAnimation.prototype.scrollToElement = function(element) {
  var animator = cuiffo.Animator.getInstance();
  animator.cancelAnimation(this.HASH);
  var scrollTo = element.offsetTop;
  this.easeScrollPositionEnd = scrollTo;
  this.easeScrollEndTime = new Date().getTime() + this.SCROLL_ANIM_DURATION;
  var top = cuiffo.dom.getScrollPosition();
  this.easeScrollPositionStart = top;
  this.lastStartScroll = top;
  var boundFn = this.pageAnimationFn.bind(this);
  animator.startAnimation(boundFn, this.HASH);
  this.isAnimating = true;
};


cuiffo.PageAnimation.prototype.pageAnimationFn = function(currentTime) {
  var isComplete = false;
  if (currentTime > this.easeScrollEndTime) {
    this.lastStartScroll = this.easeScrollPositionEnd;
    cuiffo.TitleAnimation.getInstance().handleScroll();
    cuiffo.Pages.getInstance().updateActivePage();
    isComplete = true;
    this.isAnimating = false;
  } else {
    var startTime = this.easeScrollEndTime - this.SCROLL_ANIM_DURATION;
    var calc = cuiffo.math.easeInOutQuad(
        currentTime - startTime,
        this.easeScrollPositionStart,
        this.easeScrollPositionEnd - this.easeScrollPositionStart,
        this.SCROLL_ANIM_DURATION);
    this.lastStartScroll = calc;
  }
  window.scrollTo(0, this.lastStartScroll);
  return isComplete;
};


})();
