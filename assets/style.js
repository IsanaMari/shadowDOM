function headerNavBar() {
    let btn = document.querySelector('.menu_btn'),
        header = document.querySelector('header')
    btn.addEventListener('click', function (e) {
        this.classList.toggle('active');
        header.classList.toggle('open')
    })
}
headerNavBar()

function opa() {
    let items = document.querySelectorAll('.carousel--items img'),
        selected = document.querySelector('.carousel--selected div');
    items.forEach(function (currentValue, index) {
        let url = currentValue.src;
        currentValue.addEventListener('click', function (e) {
            // selected.style.background = `url(${this.src})`;
          selected.style = `
            background-image: url("${this.src}");
            background-repeat: no-repeat;
            background-size: 100%;
          `
        })
    })
}
opa();

function Slider( element ) {
    this.el = document.querySelector( element );
    this.init();
}

Slider.prototype = {
    init: function() {
        this.links = this.el.querySelectorAll( "#slider-nav a" );
        this.wrapper = this.el.querySelector( "#slider-wrapper" );
        this.navigate();
    },
    navigate: function() {

        for( var i = 0; i < this.links.length; ++i ) {
            var link = this.links[i];
            this.slide( link );
        }
    },

    animate: function( slide ) {
        var parent = slide.parentNode;
        var caption = slide.querySelector( ".caption" );
        var captions = parent.querySelectorAll( ".caption" );
        for( var k = 0; k < captions.length; ++k ) {
            var cap = captions[k];
            if( cap !== caption ) {
                cap.classList.remove( "visible" );
            }
        }
        caption.classList.add( "visible" );
    },

    slide: function( element ) {
        var self = this;
        element.addEventListener( "click", function( e ) {
            e.preventDefault();
            var a = this;
            self.setCurrentLink( a );
            var index = parseInt( a.getAttribute( "data-slide" ), 10 ) + 1;
            var currentSlide = self.el.querySelector( ".slide:nth-child(" + index + ")" );

            self.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
            self.animate( currentSlide );

        }, false);
    },
    setCurrentLink: function( link ) {
        var parent = link.parentNode;
        var a = parent.querySelectorAll( "a" );

        link.className = "current";

        for( var j = 0; j < a.length; ++j ) {
            var cur = a[j];
            if( cur !== link ) {
                cur.className = "";
            }
        }
    }
};

document.addEventListener( "DOMContentLoaded", function() {
    var aSlider = new Slider( "#slider" );

});

/***/
let el = document.querySelectorAll('.animated');
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
el.forEach(function (current, index) {
})
var myEfficientFn = debounce(function () {
  el.forEach(function (current, index) {
    current.getBoundingClientRect().y <= window.scrollY ? current.classList.add('bounceInUp') : null
  })

}, 150);
window.addEventListener('scroll', myEfficientFn);