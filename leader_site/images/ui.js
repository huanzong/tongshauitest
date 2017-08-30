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
    $('.js_navShow').on('mouseover',function(){
        $(this).siblings('li').fadeIn();
    });
    $('.js_navShow').siblings('li').on('click',function(){
        $('.js_navShow').siblings('li').fadeOut();
    });
    $('.js_navShow').parent('ul').on('mouseleave',function(){
        $('.js_navShow').siblings('li').fadeOut();
    });

    //checkbox，radio样式初始化
    $(".js_checkbox,.js_radio").jq_qvote();//单选多选初始化

    //下拉菜单:下拉菜单初始化
    $("#js_select").oSelect().init();

    /**
     * 表单验证
     */
    var demo=$(".js_ui_validForm").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
            "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
        },
        ajaxPost:true
    });
    
});



