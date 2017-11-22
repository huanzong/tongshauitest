$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
    }

    //默认电脑登陆
    $('.js_loginType_phone').hide();
    //表单校验
    $('.js_demo').validShowError('我是错误提示<a href="javascript:;" class="validLink">我是链接</a>');
    // $('.js_demo').validHideError();
    
    //密码密文明文转化
    //$('.js_password').validPassword();
    
    //初始化CheckBox，radio
    $(".js_checkbox,.js_radio").jq_qvote();

    //初始化下拉列表
    $("#js_select").oSelect().init();

});



