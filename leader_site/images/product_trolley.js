$(function() {

    var swiper = {
    }; //用来存放所有轮播

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
    }

    $(".js_checkbox,.js_radio").jq_qvote();

});
