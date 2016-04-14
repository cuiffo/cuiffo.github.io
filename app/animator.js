var Singleton = require('singleton');

class Animator extends Singleton {

  constructor() {
    super();
    if (this.getInstance()) {
      return this.getInstance();
    }
    this.callbacks = {};
    this.isTicking = false;
  }

  startAnimation(callback, hash) {
    this.callbacks[hash] = callback;

    if (!this.isTicking) {
      this.isTicking = true;
      window.requestAnimationFrame(this.tick.bind(this));
    }
  }

  cancelAnimation(hash) {
    delete this.callbacks[hash];
  }

  tick() {
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
  }
}

module.exports = Animator;
