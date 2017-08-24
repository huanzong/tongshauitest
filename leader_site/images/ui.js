$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

    }
    //简易导航栏
    $('.js_navShow').siblings('a').hide();
    $('.js_navShow').on('click',function(){

    });

    //checkbox，radio样式初始化
    $(".js_checkbox,.js_radio").jq_qvote();//单选多选初始化

});



