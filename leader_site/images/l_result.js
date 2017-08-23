$(function() {
    init();

    $(window).resize(function() {
        init();
    });
    function init() {

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        if (screenWidth <= 700) {
            setTimeout(function() {
                $('.js_center').css('margin-top',0);
            }, 10);
        } else  if (screenWidth <= 991 && screenWidth > 700) {
            setTimeout(function() {
                $('.js_center').css('margin-top',((screenHeight-loginHeight)/2-50)+'px');
            }, 10);
        } else {
            setTimeout(function() {
                $('.js_center').css('margin-top',((screenHeight-loginHeight)/2-60)+'px');
            }, 10);
        }
        $(".js_result_box").css({"height":screenHeight});
    }
});