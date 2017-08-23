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
        } else {
            setTimeout(function() {

            }, 10);
        }
        $(".js_result_box").css({"height":screenHeight});
        $(".js_pic").css({"height":screenHeight,"margin-top":-screenHeight/2});
        var picWidth= $(".js_pic").width();
        $(".js_pic").css({"margin-left":-picWidth/2});
    }
});