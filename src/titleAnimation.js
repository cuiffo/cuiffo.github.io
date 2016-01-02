cuiffo = cuiffo || {};


(function() {

cuiffo.TitleAnimation = function() {
  this.TEXT_ANIM_DURATION = 200;
  this.textAnimEndTime = 0;
  this.easeStartPosition = 0;
  this.easeEndPosition = 0;
  this.lastStartPosition = 0;
};


cuiffo.TitleAnimation.getInstance = function() {
  cuiffo.TitleAnimation.__instance__ =
      cuiffo.TitleAnimation.__instance__ || new cuiffo.TitleAnimation();
  return cuiffo.TitleAnimation.__instance__;
};


cuiffo.TitleAnimation.prototype.handleScroll = function() {
  this.easeStartPosition = this.lastStartPosition;
  this.textAnimEndTime = new Date().getTime() + this.TEXT_ANIM_DURATION;
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var range = splashTextEl.clientHeight + 30;
  var positionInPage = cuiffo.dom.getScrollPosition();
  this.easeEndPosition = (positionInPage / cuiffo.dom.getWindowHeight()) * range;
  var animator = cuiffo.Animator.getInstance();
  var boundFn = this.textAnimationFn.bind(this);
  animator.startAnimation(boundFn);
};


cuiffo.TitleAnimation.prototype.textAnimationFn = function(currentTime) {
  var isComplete = false;
  if (currentTime > this.textAnimEndTime) {
    this.lastStartPosition = this.easeEndPosition;
    isComplete = true;
  } else {
    var startTime = this.textAnimEndTime - this.TEXT_ANIM_DURATION;
    // The text should always be moving, boost the current time if it's low.
    var timeDiff = Math.max(currentTime - startTime, 20);
    var calc = cuiffo.math.easeOutQuad(
        timeDiff,
        this.easeStartPosition,
        this.easeEndPosition - this.easeStartPosition,
        this.TEXT_ANIM_DURATION);
    this.lastStartPosition = calc;
  }
  var splashTextEl = document.getElementsByClassName('cuiffo-page-title')[0];
  var opacity = 1 - (this.lastStartPosition / (splashTextEl.clientHeight + 30));
  splashTextEl.style.opacity = Math.max(opacity, 0);
  cuiffo.dom.setCssTransform(splashTextEl, 'translateY(' + this.lastStartPosition + 'px)');
  return isComplete;
};


})();
