var cuiffo = cuiffo || {};



(function() {

cuiffo.Animator = function() {
	this.callbacks = [];
  this.isTicking = false;
};


cuiffo.Animator.getInstance = function() {
  cuiffo.Animator.__instance__ =
      cuiffo.Animator.__instance__ || new cuiffo.Animator();
	return cuiffo.Animator.__instance__;
};


cuiffo.Animator.prototype.startAnimation = function(callback) {
  this.callbacks.push(callback);

  if (!this.isTicking) {
    this.isTicking = true;
    window.requestAnimationFrame(this.tick.bind(this));
  }
};


cuiffo.Animator.prototype.tick = function() {
  var currentTime = new Date().getTime();
  var isTicking = true;
  var indicesToRemove = [];
  var indicesRemoved = 0;
  for (var i = 0; i < this.callbacks.length; i++) {
    var callback = this.callbacks[i];
    var isComplete = callback(currentTime);
    if (isComplete) {
      isTicking = false;
      indicesToRemove.push(i);
    }
  }
  for (var i = 0; i < indicesToRemove.length; i++) {
    this.callbacks.splice(indicesToRemove[i] - i, 1);
  }
  if (isTicking) {
    window.requestAnimationFrame(this.tick.bind(this));
  } else {
    this.isTicking = false;
  }
};

})();
