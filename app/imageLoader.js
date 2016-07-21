
class ImageLoader {

  constructor() {
  }

  init() {
    let spinner = $('.uil-ring-css');
    spinner.css('margin-left', spinner.offset().left + 'px');
    let fakeSrcs = $('img[src]');
    let numSrcs = fakeSrcs.length;
    let srcsLoaded = 0;
    fakeSrcs.each(function(i, element) {
      var fakeImage = new Image();
      fakeImage.onload = function(){
        srcsLoaded++;
        if (srcsLoaded >= numSrcs) {
          $('.loading-container').fadeOut(500);
          document.body.style.overflow = 'auto';
        }
      };
      fakeImage.src = element.src;
    });

  }
}

var __instance__ = new ImageLoader();
module.exports = {
  getInstance: () => __instance__
}
