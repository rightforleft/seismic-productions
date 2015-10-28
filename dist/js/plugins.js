( function( window ) {

'use strict';

// Create Fancybox 
var J = jQuery.noConflict();
J(document).ready(function() {
  if ($(window).width() <= 375) {
    J(".various").fancybox({
          maxWidth    : 900,
          maxHeight    : 520,
          minHeight  : 420,
          fitToView    : false,
          width        : '100%',
          height        : '100%',
          autoSize    : true,
          closeClick    : false,
          openEffect    : 'elastic',
          closeEffect    : 'elastic'
      });
  } else if ($(window).width() <=667) {
    J(".various").fancybox({
          maxWidth    : 600,
          maxHeight    : 320,
          minHeight  : 220,
          fitToView    : false,
          width        : '100%',
          height        : '100%',
          autoSize    : true,
          closeClick    : false,
          openEffect    : 'elastic',
          closeEffect    : 'elastic'
      });
  } else {
      J(".various").fancybox({
          maxWidth    : 900,
          maxHeight    : 800,
          minHeight  : 620,
          fitToView    : true,
          width        : '80%',
          height        : '80%',
          autoSize    : true,
          closeClick    : false,
          openEffect    : 'elastic',
          closeEffect    : 'elastic'
      });
    }

    // Contact Us Map
    J('#map-small').gMap({
     address: '7010 Sana Monica Blvd, Los Angeles, CA',
     mapTypeId: 'ROADMAP',
     zoom: 14,
     markers: [
      {
        address: "7010 Sana Monica Blvd, Los Angeles, CA",
        icon: {
          image: "images/blue.png",
          iconsize: [42, 51],
          iconanchor: [21,51]
        }             
      }
     ],
     doubleclickzoom: true,
     controls: {
       panControl: true,
       zoomControl: true,
       mapTypeControl: false,
       scaleControl: true,
       streetViewControl: true,
       overviewMapControl: false
     },            
  });
});


// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

(function() {

	var bodyEl = document.body,
		content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();