$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

    }

    //checkbox，radio样式初始化
    $(".js_checkbox,.js_radio").jq_qvote();//单选多选初始化

});



