$(document).ready(function(){
    // slider init
    $('#slides').responsiveSlides({
        speed: 700,
        timeout: 3500,
        pager: true
    });
});

wow = new WOW(
    {
        animateClass: 'animated',
        mobile: false,
        offset: 100
    }
);

wow.init();