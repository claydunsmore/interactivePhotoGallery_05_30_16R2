/**
 * Created by User on 12/29/2016.
 */

$(function() {
// Search box functionality

    $(".search__input--searchBarTop").on("keyup", function(){
        var searchQuery = $(".search__input--searchBarTop").val();

        //show images for each iteration, otherwise they will be hidden
        $('.body__div--single-image').show();
        $('.body__div--single-image').each(function(){
            //get  the alt attribute
            var thisAlt = $(this).find("img").attr("alt");
            $this = $(this)
            //if thisAlt does not contain searchQuery, hide
            if(thisAlt.indexOf(searchQuery) === -1){
                $(this).hide();
            }
        });
    });


    // global vars
    var current, size;

    $('.lightbox__a--lightboxTrigger').click(function(e) {

        // prevent default click
        e.preventDefault();

        // find index of clicked trigger
        var slideNum = $('.lightbox__a--lightboxTrigger').index(this);

        // find if #lightbox exists
        if ($('#lightbox').length > 0) {
            // if #lightbox exists
            $('#lightbox').fadeIn(300);
            // if #lightbox does not exist - create and insert #lightbox
        } else {
            // make HTML markup for the lightbox window
            var lightbox =
                '<div id="lightbox">' +
                '<p>Click to close</p>' +
                '<div id="slideshow">' +
                '<ul></ul>' +
                '<div class="nav__div--nav">' +
                '<a href="#prev" class="nav__a--prev nav__a--slide-nav"><i class="fa fa-angle-left  fa-3x" aria-hidden="true"></i></a>' +
                '<a href="#next" class="nav__a--next nav__a--slide-nav"><i class="fa fa-angle-right  fa-3x" aria-hidden="true"></i></a>' +
                '</div>' +
                '</div>' +
                '</div>';

            //append the lightbox HTML to page
            $('body').append(lightbox);

            // fill lightbox with .lightboxTrigger hrefs inside #imageSet
            $('#imageSet').find('.lightbox__a--lightboxTrigger').each(function() {
                var $href = $(this).attr('href');
                var $caption = $(this).find("img").attr("alt");
                $('#slideshow ul').append(
                        '<li>' +
                        '<img src="' + $href + '" alt="' + $caption + '">' +
                        '<p class="center">"' + $caption + '"</p>'
                        + '</li>'
                );
            });

        }

        // set the size based on number of slideshow objects
        size = $('#slideshow ul > li').length;

        // hide all slides, show selected slide
        $('#slideshow ul > li').hide();
        $('#slideshow ul > li:eq(' + slideNum + ')').show();
        // set var current to selected slide
        current = slideNum;
    });

    //Click on #lightbox to remove lightbox window
    $('body').on('click', '#lightbox', function() {
        $('#lightbox').fadeOut(300);
    });

    // toggle navigation while hovering over #lightbox
    $('body').on(
        { mouseenter: function() {
            $('.nav__div--nav').fadeIn(300);
        }, mouseleave: function() {
            $('.nav__div--nav').fadeOut(300);
        }
        },'#lightbox');

    // navigation prev/next angle buttons
    $('body').on('click', '.nav__a--slide-nav', function(e) {

        // prevent default click event & event bubbling to prevent closing of lightbox
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);
        var dest;

        // find .prev
        if ($this.hasClass('nav__a--prev')) {
            dest = current - 1;
            if (dest < 0) {
                dest = size - 1;
            }
        } else {
            // assume .next
            dest = current + 1;
            if (dest > size - 1) {
                dest = 0;
            }
        }

        // fadeOut current slide, FadeIn next or prev slide
        $('#slideshow ul > li:eq(' + current + ')').fadeOut(750);
        $('#slideshow ul > li:eq(' + dest + ')').fadeIn(750);

        // update current
        current = dest;
    });
});
