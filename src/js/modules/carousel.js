var $ = require('jquery')
var Flickity = require('flickity')

function Carousel(el) {
  var t = this;
  t.$el = $(el);
  t.options = t.$el.data('options');
  if( t.$el.children.length > 1 ) {
    t.slider = new Flickity(el, t.options);
  }
}

module.exports = Carousel
