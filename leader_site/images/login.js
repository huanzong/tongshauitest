$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;

        // $('.js-o-scale').each(function() {
        //     $(this).oScale().init();
        // });

        if (screenWidth <= 767) {
            
        } else if (screenWidth > 767 && screenWidth <= 992) {
            
        } else if (screenWidth > 992 && screenWidth <= 1190) {
            
        } else if (screenWidth > 1190) {
            
        }

        
        setTimeout(function() {
            $(".js_center").oBoxCenter().init();
        }, 300);
    }

});



