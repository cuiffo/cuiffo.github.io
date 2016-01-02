var cuiffo = cuiffo || {};
cuiffo.math = cuiffo.math || {};



cuiffo.math.easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};


cuiffo.math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};


cuiffo.math.Rect = function(height, width) {
  this.height = height;
  this.width = width;
};
