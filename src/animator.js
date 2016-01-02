var cuiffo = cuiffo || {};

(function() {

var instance;
cuiffo.Animator.getInstance = function() {
	return instance || new cuiffo.Animator();
};

cuiffo.Animator = function() {
	this.callbacks = [];
};


cuiffo.Animator.prototype.addFn = function(callback) {
	this.callbacks.add(callback);
};


cuiffo.Animator.prototype.tick = function() {
	this.callbacks.forEach(function(callback) {
		var currentTime = new Date.getTime();
		callback(currentTime);
	});
};

})();