$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        //默认电脑登陆
        $('.js_loginType_pc').show();
        $('.js_loginType_phone').hide();

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        // var loginHeight = $('.js_center').height();

        // if (screenWidth <= 700) {
        //     setTimeout(function() {
        //         $('.js_center').css('margin-top',0);
        //     }, 10);
        // } else {
        //     setTimeout(function() {
        //         $('.js_center').css('margin-top',((screenHeight-loginHeight)/2-20)+'px');
        //     }, 10);
        // }
    }

    //表单校验
    var loginPc = $(".js_loginType_pc").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
            "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
        },
        ajaxPost:true
    });

    var loginPhone = $(".js_loginType_phone").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
            "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
        },
        ajaxPost:true
    });

    //初始化CheckBox，radio
    $(".js_checkbox,.js_radio").jq_qvote();

    // 登录方式转换
    $('.js_loginType').on('click',function(){
        var phoneType = $(this);
        if(phoneType.prop('data-login')){
            $('.js_loginType_tab').removeClass('icon-phone').addClass('icon-computer');
            $('.js_loginType_pc').show();
            $('.js_loginType_phone').hide();
            $('.js_loginType_tit').text('登录统帅');
            $('.js_loginType').prop('data-login',0);
        }else{
            $('.js_loginType_tab').removeClass('icon-computer').addClass('icon-phone');
            $('.js_loginType_phone').show();
            $('.js_loginType_pc').hide();
            $('.js_loginType_tit').text('动态密码登录');
            $('.js_loginType').prop('data-login',1);
        }
    });

});



