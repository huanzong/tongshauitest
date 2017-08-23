$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        //默认电脑登陆
        $('.js_regType_phone').show();
        $('.js_regType_email').hide();

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        var regHeight = $('.js_center').height();

        if (screenWidth <= 700) {
            setTimeout(function() {
                $('.js_center').css('margin-top',0);
            }, 10);
        } else {
            setTimeout(function() {
                $('.js_center').css('margin-top',((screenHeight-regHeight)/2-20)+'px');
            }, 10);
        }

    }

    // 登录方式转换
    $('.js_regType').on('click',function(){
        var phoneType = $(this);
        if(phoneType.prop('data-reg')){//当前手机注册，转为邮箱注册
            $('.js_regType_tab').removeClass('icon-phone').addClass('icon-computer');
            $('.js_regType_phone').show();
            $('.js_regType_email').hide();
            $('.js_regType_tit').text('手机注册');
            $('.js_regType_float').text('使用邮箱注册');
            $('.js_regType').prop('data-reg',0);
        }else{
            $('.js_regType_tab').removeClass('icon-computer').addClass('icon-phone');
            $('.js_regType_email').show();
            $('.js_regType_phone').hide();
            $('.js_regType_tit').text('邮箱注册');
            $('.js_regType_float').text('使用手机注册');
            $('.js_regType').prop('data-reg',1);
        }
    });

});



