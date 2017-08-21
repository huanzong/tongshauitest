$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        var loginHeight = $('.js_center').height();

        if (screenWidth <= 767) {
            
        } else if (screenWidth > 767 && screenWidth <= 992) {
            
        } else if (screenWidth > 992 && screenWidth <= 1190) {
            
        } else if (screenWidth > 1190) {
            
        }

        setTimeout(function() {
            $('.js_center').css('margin-top',((screenHeight-loginHeight)/2-20)+'px');
        }, 10);
    }

});



