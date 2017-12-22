$(function() {

    init();
    $('.validLink').mousedown(function(){var href = $(this).attr('href');window.location.href=href;})
    $(window).resize(function() {
        init();
    });

    function init() {
        //默认电脑登陆
        // $('.js_regType_phone').show();
        // $('.js_regType_email').hide();

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        
        // var regHeight = $('.js_center').height();

        // if (screenWidth <= 575) {
        //     setTimeout(function() {
        //         $('.js_center').css('margin-top',0);
        //     }, 10);
        // } else if(screenWidth <= 991 && screenWidth>575) {
        //     setTimeout(function() {
        //         $('.js_center').css('margin-top',((screenHeight-regHeight)/2+10)+'px');
        //     }, 10);
        // } else {
        //     setTimeout(function() {
        //         $('.js_center').css('margin-top',((screenHeight-regHeight)/2-20)+'px');
        //     }, 10);
        // }

    }
    //默认电脑登陆
    $('.js_regType_phone').show();
    $('.js_regType_email').hide();

    // 登录方式转换
    $('.js_regType').on('click',function(){
        var phoneType = $(this);
        if(phoneType.prop('data-reg')=="0"){//当前手机注册，转为邮箱注册
            $('.js_regType_tab').removeClass('icon-phone').addClass('icon-computer');
            $('.js_regType_phone').show();
            $('.js_regType_email').hide();
            $('.js_regType_tit').text('手机注册');
            $('.js_regType_float').text('使用邮箱注册');
            $('.js_regType').prop('data-reg',1);
        }else{
            $('.js_regType_tab').removeClass('icon-computer').addClass('icon-phone');
            $('.js_regType_email').show();
            $('.js_regType_phone').hide();
            $('.js_regType_tit').text('邮箱注册');
            $('.js_regType_float').text('使用手机注册');
            $('.js_regType').prop('data-reg',0);
        }
    });

    //手机大块
    //密码明文和密文切换
    $(".js_passwordSwitch_mobile").oToggle(function (self) {
        self.removeClass("icon-eye-close-solid").addClass("icon-eye-open-solid");
        var passwordVal = $("#mobilePwd").val();
        if(passwordVal == ''){
            passwordVal ='6-16位数字、字母或符号的组合';
        }
        $("#mobilePwd2").val(passwordVal).removeClass("o_df-hide").addClass("color");
        $("#mobilePwd").addClass("o_df-hide");
        self.parent().addClass("open");
    },function (self) {
        self.addClass("icon-eye-close-solid").removeClass("icon-eye-open-solid");
        $("#mobilePwd").removeClass("o_df-hide");
        $("#mobilePwd2").addClass("o_df-hide").removeClass("color");
        self.parent().removeClass("open");
        var passwordVal = $("#mobilePwd2").val();
        if(passwordVal == '6-16位数字、字母或符号的组合'){
            passwordVal = ''
        }
        $("#mobilePwd").val(passwordVal)
    });

    //密码进入事件,更改密码框类型为密码
    $("#mobilePwd2").focus(function () {

        var $parent = $(this).parent();
        if($parent.hasClass("open")){
            return;
        }
        var password = $.trim($(this).val());
        if ("" == password || "6-16位数字、字母或符号的组合" == password || null == password) {
            $(this).addClass("o_df-hide").removeClass("color");
            $("#mobilePwd").removeClass("o_df-hide").focus();
            return;
        }
    });

    //密码离开事件,更改密码框类型为文本
    $("#mobilePwd").blur(function () {
        var $parent = $(this).parent();
        if($parent.hasClass("open")){
            return;
        }
        var password = $.trim($(this).val());
        if ("" == password || "6-16位数字、字母或符号的组合" == password || null == password) {
            $("#mobilePwd").addClass("o_df-hide");
            $("#mobilePwd2").addClass("color").removeClass("o_df-hide");
        }
    });

    $('#mobilePwd2').keyup(function(){
        var passwordVal = $("#mobilePwd2").val();
        $("#mobilePwd").val(passwordVal);
    });

    //邮箱大块
    //密码明文和密文切换
    $(".js_passwordSwitch_email").oToggle(function (self) {
        self.removeClass("icon-eye-close-solid").addClass("icon-eye-open-solid");
        var passwordVal = $("#emailPwd").val();
        if(passwordVal == ''){
            passwordVal ='6-16位数字、字母或符号的组合';
        }
        $("#emailPwd2").val(passwordVal).removeClass("o_df-hide").addClass("color");
        $("#emailPwd").addClass("o_df-hide");
        self.parent().addClass("open");
    },function (self) {
        self.addClass("icon-eye-close-solid").removeClass("icon-eye-open-solid");
        $("#emailPwd").removeClass("o_df-hide");
        $("#emailPwd2").addClass("o_df-hide").removeClass("color");
        self.parent().removeClass("open");
        var passwordVal = $("#emailPwd2").val();
        if(passwordVal == '6-16位数字、字母或符号的组合'){
            passwordVal = ''
        }
        $("#emailPwd").val(passwordVal)
    });

    //密码进入事件,更改密码框类型为密码
    $("#emailPwd2").focus(function () {

        var $parent = $(this).parent();
        if($parent.hasClass("open")){
            return;
        }
        var password = $.trim($(this).val());
        if ("" == password || "6-16位数字、字母或符号的组合" == password || null == password) {
            $(this).addClass("o_df-hide").removeClass("color");
            $("#emailPwd").removeClass("o_df-hide").focus();
            return;
        }
    });

    //密码离开事件,更改密码框类型为文本
    $("#emailPwd").blur(function () {
        var $parent = $(this).parent();
        if($parent.hasClass("open")){
            return;
        }
        var password = $.trim($(this).val());
        if ("" == password || "6-16位数字、字母或符号的组合" == password || null == password) {
            $("#emailPwd").addClass("o_df-hide");
            $("#emailPwd2").addClass("color").removeClass("o_df-hide");
        }
    });

    $('#emailPwd2').keyup(function(){
        var passwordVal = $("#emailPwd2").val();
        $("#emailPwd").val(passwordVal);
    });

// 表单初始化
//    var address=$(".js_regType_phone").Validform({
//        tiptype:3,
//        showAllError:false,
//        ignoreHidden:false,
//        dragonfly:false,
//        callback:function(form){//验证后保存地址
//
//        }
//    });

    //var email=$(".js_regType_email").Validform({
    //    tiptype:3,
    //    showAllError:false,
    //    ignoreHidden:false,
    //    dragonfly:false,
    //    callback:function(form){//验证后保存地址
    //
    //    }
    //});

});



