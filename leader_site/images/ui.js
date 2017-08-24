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
    $('.js_navShow').siblings('li').fadeOut();
    $('.js_navShow').on('click',function(){
        if($(this).siblings('li').eq(0).css('display')=='none'){
            $(this).siblings('li').fadeIn();
        }else{
            $(this).siblings('li').fadeOut();
        }
        
    });

    //checkbox，radio样式初始化
    $(".js_checkbox,.js_radio").jq_qvote();//单选多选初始化

});



