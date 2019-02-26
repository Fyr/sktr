$(function(){
	/*** BANNER SLIDESHOW ***/
    $('.bx_slider').each(function(){
        var $this = $(this);
        $this.data('linkedEl', $this.bxSlider({
            auto: true,
            controls: true,
            pager: true,
            pause: 3500,
            autoHover: true,
            speed:500,
            adaptiveHeight: true
        }));
    });


    $('.side_lvl_1_n').click(function(e){
      e.preventDefault();
      $(this).parents('li').toggleClass('opened').find('ul').slideToggle();
    });

    $('.autocompleteOff').attr('autocompleteOff', 'off');
});
