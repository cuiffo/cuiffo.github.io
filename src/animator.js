var cuiffo = cuiffo || {};



(function() {

cuiffo.Animator = function() {
  this.callbacks = {};
  this.isTicking = false;
};


cuiffo.Animator.getInstance = function() {
  cuiffo.Animator.__instance__ =
      cuiffo.Animator.__instance__ || new cuiffo.Animator();
	return cuiffo.Animator.__instance__;
};


cuiffo.Animator.prototype.startAnimation = function(callback, hash) {
  this.callbacks[hash] = callback;

  if (!this.isTicking) {
    this.isTicking = true;
    window.requestAnimationFrame(this.tick.bind(this));
  }
};


cuiffo.Animator.prototype.cancelAnimation = function(hash) {
  delete this.callbacks[hash];
}


cuiffo.Animator.prototype.tick = function() {
  var currentTime = new Date().getTime();
  for (var hash in this.callbacks) {
    var callback = this.callbacks[hash];
    var isComplete = callback(currentTime);
    if (isComplete) {
      this.cancelAnimation(hash);
    }
  }
  if (Object.keys(this.callbacks).length) {
    window.requestAnimationFrame(this.tick.bind(this));
  } else {
    this.isTicking = false;
  }
};

})();
