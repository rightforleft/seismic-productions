$(window).resize(function(){
// Style Responsive Category Menu
    $(function categoryMenu() {
        var $dropdown = $('#filter');
        if ($(window).width() <=667) {
            if ($dropdown.hasClass('dropdown-menu')) {
                return false;
            } else {
                $dropdown.addClass('dropdown-menu');
                document.getElementById("categoryDropdown").style.display = "inline";
            }
        } else {
            if ($dropdown.hasClass('dropdown-menu')) {
                $dropdown.removeClass('dropdown-menu');
                document.getElementById("categoryDropdown").style.display = "none";
            } else {
                return false;
            }
        }
    });
});

$(document).ready( function() {
// Style Responsive Category Menu
    $(function categoryMenu() {
        var $dropdown = $('#filter');
        if ($(window).width() <=667) {
            if ($dropdown.hasClass('dropdown-menu')) {
                return false;
            } else {
                $dropdown.addClass('dropdown-menu');
                document.getElementById("categoryDropdown").style.display = "inline";
            }
        } else {
            if ($dropdown.hasClass('dropdown-menu')) {
                $dropdown.removeClass('dropdown-menu');
                document.getElementById("categoryDropdown").style.display = "none";
            } else {
                return false;
            }
        }
    });

  // init Isotope

    $(function() {

        var $container = $('#container');

            $('#container').imagesLoaded()

              .always( function( instance ) {
                console.log('all images loaded');
                $container.addClass('display-block');
              })

              .done( function( instance ) {
                console.log('all images successfully loaded');

                var $grid = $('.grid').isotope({
                    sortBy: 'random',
                    sortAscending: false,
                    itemSelector: '.grid-item',
                    layoutMode: 'masonry',
                    transitionDuration: '0.8s',
                    masonry: {
                        columnWidth: '.grid-sizer',
                        gutter: 10
                    },
                    getSortData: {
                        alphabetical: '.name'
                    }
                });

                  // bind sort button click
                  $('.sort-by-button-group').on( 'click', 'button', function() {
                    var sortValue = $(this).attr('data-sort-value');
                    $grid.isotope({ sortBy: sortValue });
                  });
                
              })

              .fail( function() {
                console.log('all images loaded, at least one is broken');
            });
              /*.progress( function( instance, image ) {
                var result = image.isLoaded ? 'loaded' : 'broken';
                console.log( 'image is ' + result + ' for ' + image.img.src );*/

        $('.grid').isotope({
            filter: '.theatrical'
        });

        var $optionSets = $('#options .option-set'),
            $optionLinks = $optionSets.find('a');

        $optionLinks.click(function() {
            var $this = $(this);
            // don't proceed if already selected
            /*if ($this.hasClass('selected')) {
                return false;
            }*/
            var $optionSet = $this.parents('.option-set');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                // changes in layout modes need extra logic
                changeLayoutMode($this, options);
            } else {
                // otherwise, apply new options
                $container.isotope(options);
            }

            return false;
        });
    });
});

//  Theatrical order function
    function alphasortT() {
        $(function() {

            var $container = $('#container');

            $('.grid').isotope({
                masonry: {
                    columnWidth: 'grid-sizer',
                    gutter: 'gutter-sizer',
                    sortBy: ['number', 'alphabetical'],
                    sortAscending: false,
                    getSortData: {
                        number: function($elem) {
                            var number = $elem.hasClass('grid-item') ?
                                $elem.find('.number').text() :
                                $elem.attr('data-number');
                            return parseInt(number, 10);
                        },
                        alphabetical: function($elem) {
                            var name = $elem.find('.name'),
                                itemText = name.length ? name : $elem;
                            return itemText.text();
                        }
                    }
                }

            });
            $('#container').isotope({
                filter: '.theatrical'
            });

            var $optionSets = $('#options .option-set'),
                $optionLinks = $optionSets.find('a');

            $optionLinks.click(function() {
                var $this = $(this);
                // don't proceed if already selected
                if ($this.hasClass('selected')) {
                    return false;
                }
                var $optionSet = $this.parents('.option-set');
                $optionSet.find('.selected').removeClass('selected');
                $this.addClass('selected');

                // make option object dynamically, i.e. { filter: '.my-filter-class' }
                var options = {},
                    key = $optionSet.attr('data-option-key'),
                    value = $this.attr('data-option-value');
                // parse 'false' as false boolean
                value = value === 'false' ? false : value;
                options[key] = value;
                if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                    // changes in layout modes need extra logic
                    changeLayoutMode($this, options);
                } else {
                    // otherwise, apply new options
                    $container.isotope(options);
                }
                return false;
            });
        });
    }

//  Alpha Sort HE
    function alphasortHE() {
        $(function() {

            var $container = $('#container');

            $container.isotope({
                masonry: {
                    columnWidth: 'grid-sizer'

                },
                sortBy: 'alphabetical',
                sortAscending: true,
                getSortData: {
                    number: function($elem) {
                        var number = $elem.hasClass('grid-item') ?
                            $elem.find('.number').text() :
                            $elem.attr('data-number');
                        return parseInt(number, 10);
                    },
                    alphabetical: function($elem) {
                        var name = $elem.find('.name'),
                            itemText = name.length ? name : $elem;
                        return itemText.text();
                    }
                }

            });
            $('#container').isotope({
                filter: '.home-entertainment'
            });

            var $optionSets = $('#options .option-set'),
                $optionLinks = $optionSets.find('a');

            $optionLinks.click(function() {
                var $this = $(this);
                // don't proceed if already selected
                if ($this.hasClass('selected')) {
                    return false;
                }
                var $optionSet = $this.parents('.option-set');
                $optionSet.find('.selected').removeClass('selected');
                $this.addClass('selected');

                // make option object dynamically, i.e. { filter: '.my-filter-class' }
                var options = {},
                    key = $optionSet.attr('data-option-key'),
                    value = $this.attr('data-option-value');
                // parse 'false' as false boolean
                value = value === 'false' ? false : value;
                options[key] = value;
                if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                    // changes in layout modes need extra logic
                    changeLayoutMode($this, options)
                } else {
                    // otherwise, apply new options
                    $container.isotope(options);
                }

                return false;
            });
        });
    }

// BACKGROUNDS
var j = jQuery;

function cbBlank()
{
j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/blank.jpg')"}
    }
},});    
}

function cb22()
{
j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/22-jump-street-bg.jpg')"}
    }
},});    
}

function cbALaMala()
{
j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/a-la-mala-bg.jpg')"}
    }
},});    
}

function cbAmericanSniper()
{
j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/american-sniper-feature.jpg')"}
    }
},});    
}

function cbAOA()
{
j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/age-of-adaline-bg.jpg')"}
    }
},});    
}

function cbwAnnie () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/annie-title-bg.jpg')"}
    }
},});
}

function cbAboutLastNight() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/about-last-night-feature.jpg')"}
    }
},});
  }

function cbBlank () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/blank.jpg')"}
    }
},});
}



function cb22()
{
j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/22-jump-street-bg.jpg')"}
    }
},});    
}

function cbAlexander()
{
j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/alexander-bg.jpg')"}
    }
},});    
}

function cbwAnnie () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/annie-title-bg.jpg')"}
    }
},});
}


  
function cbBlended() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/blended-feature.jpg')"}
    }
},});
  }
function cbChef () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/chef-bg.jpg')"}
    }
},});
}
function cbCinderella() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/cinderella-bg.jpg')"}
    }
},});
  }
 function cbDanny() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/danny-collins-bg.jpg')"}
    }
},});
  }
function cbDER () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/eleanor-rigby-bg.jpg')"}
    }
},});
}
function cbDUFE() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/dufe-feature.jpg')"}
    }
},});
  }

function cbFocus() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/focus-bg.jpg')"}
    }
},});
  }
  
function cbGetHard()  {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/get-hard-feature1.jpg')"}
    }
},});
  }
 
function cbGIJoe() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/gi-joe-retaliation-feature.jpg')"}
    }
},});
  }
function cbHanselAndGretel() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/hansel-and-gretel-feature.jpg')"}
    }
},});
  }
function cbH3() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/hangover-part-3-feature.jpg')"}
    }
},});
  }
function cbHIFR() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/heaven-is-for-real-feature.jpg')"}
    }
},});
  }
function cbIdentityThief() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/identity-thief-feature.jpg')"}
    }
},});
  }
 function cbIfIStay() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/if-i-stay-bg.jpg')"}
    }
},});
  }

function cbLesMiserables() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/les-miserables-feature.jpg')"}
    }
},});
  }
function cbJersey () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/jersey-boys-bg.jpg')"}
    }
},});
}
function cbMDA() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/million-dollar-arm-feature.jpg')"}
    }
},});
  }
 function cbMort() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/mortdecai-bg.jpg')"}
    }
},});
  }
function cbNGD () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/no-good-deed-bg.jpg')"}
    }
},});
}
function cbNJ() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/nut-job-feature.jpg')"}
    }
},});
  }
function cbOneDirection() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/one-direction-feature.jpg')"}
    }
},});
  }
function cbOW() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/other-woman-feature.jpg')"}
    }
},});
  }
 function cbPBMC() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/paul-blart-2-bg.jpg')"}
    }
},});
  }
function cbPeeples() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/peeples-feature.jpg')"}
    }
},});
  }
function cbResidentEvil() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/backgrounds/resident-evil-bg.jpg')"}
    }
},});
  }
function cbSafeHaven() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/safe-haven-feature.jpg')"}
    }
},});
  }
function cbSkeleton() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/skeleton-twins-bg.jpg')"}
    }
},});
  }
function cbTemptation() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/temptation-feature.jpg')"}
    }
},});
  }
  
function cbTheInterview() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/the-interview-feature.jpg')"}
    }
},});
  }  
  
function cbThePossession() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/the-possession-feature.jpg')"}
    }
},});
  }
function cbTLAM2() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/think-like-a-man-2-feature.jpg')"}
    }
},});
  }
function cbTIWILY() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/this-is-where-i-leave-you-bg.jpg')"}
    }
},});
  }
function cbTopFive() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/top-five-bg.jpg')"}
    }
},});
  }
function cbAHauntedHouse() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/a-haunted-house-feature.jpg')"}
    }
},});
  }
function cbGU2() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/grown-ups-2-feature.jpg')"}
    }
},});
  }
function cbWetlands() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/wetlands-feature.jpg')"}
    }
},});
  }
function cbWHD() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/white-house-down-feature.jpg')"}
    }
},});
  }
function cbWR () {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/wedding-ringer-bg.jpg')"}
    }
},});
}
function cbThanks() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/thanks-for-sharing-feature.jpg')"}
    }
},});
  }
function cbBC() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/baggage-claim-feature.jpg')"}
    }
},});
  }
function cbRA() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/ride-along-feature.jpg')"}
    }
},});
  }  
function cbDM() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/delivery-man-feature.jpg')"}
    }
},});
  }
function cbBMH() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/best-man-holiday-feature.jpg')"}
    }
},});
  }
function cbI2() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/insidious2-feature.jpg')"}
    }
},});
  }
function cbLAM() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/love-and-mercy-bg.jpg')"}
    }
},});
  }
function cbLTD() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/learning-to-drive-bg.jpg')"}
    }
},});
  }
function cbLB() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/little-boy-bg.jpg')"}
    }
},});
  }
function cbTB() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/the-butler-feature.jpg')"}
    }
},});
  }
function cbMK() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/machete-kills-feature.jpg')"}
    }
},});
  }
function cbWild() {
  j(".fancybox").fancybox({
helpers:{
    overlay:{
        css:{'background':"url('images/productions/featured/wild-bg.jpg')"}
    }
},});
  }