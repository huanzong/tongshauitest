/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置-绑定手机
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function(){

    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        jumpToLoginPage();
    }

    //页面加载时调个人信息
    // $.ajax({
    //     type: "get",
    //     url: siteConfig.userUrl+"/hshop-user/front/user/userInfo/",
    //     data: {},
    //     login:true,
    //     success_cb: function(data){
    //         if (jQuery.trim(data).length > 0) {
    //             var templet_mobile=jQuery.trim(data.data.mobile);
    //             if (templet_mobile != null && templet_mobile != "" && templet_mobile != "null") {
    //                 self.location = '/security';
    //             }
    //
    //             var templet_email=jQuery.trim(data.data.email);
    //             var templet_split = templet_email.split("@");
    //             var templet_hide = templet_split[0].length / 2;
    //             var templet_emailnote = templet_split[0].substr(0,templet_hide) + '..' + '@' + templet_split[1]; //emai加.
    //
    //             $("#js_unbindmob").attr('autotext',"邮箱（"+templet_emailnote+"）");
    //             $("#js_unbindmob").append("<option value='1'>邮箱（"+templet_emailnote+"）</option>");
    //             $("#js_unbindmob").oSelect().init();
    //         }
    //     }
    // });

    //第一步确定按钮变亮
    $('.js_emailCodeYz').blur(function(){
        if($.trim($(this).val()).length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-emailCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码')
        }
    })
    $('.js_emailCodeYz').keyup(function(){
        if($.trim($(this).val()).length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
        }
    })

    //第一步点击发送验证码
    $('.js-sendemailcode').unbind().click(function(){
        if($('.js-sendemailcode').hasClass('l-btn-disable')) {
            return;
        }
        btnTimeOut($('.js-sendemailcode'),'120','重新获取验证码');
        $.ajax({
            dataType: "text",
            url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'beforeBindMobileSendEmailCode'
            },
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {}
                    else{
                        $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
                        $('.js-emailCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送验证码失败');
                    }
                }
            }
        });
    });

    //第一步点击确定
    $('.js_subimGetUp').unbind().click(function () {
        if(!$('.js_subimGetUp').hasClass('l-btn-disable')){
            var templet_code=$.trim($('.js_emailCodeYz').val());
            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'beforeBindMobileVerifyCode',
                    'code':templet_code,
                    'param':'email'
                },
                success_cb: function(data){
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {
                            $('.js_memberRevisThree').addClass('member-revisemob-two').removeClass('member-revisemob-three').removeClass('member-revisemob-one');
                            $('.js-validateEmail').hide();
                            $('.js-bindNewMob').show();
                        }
                        else{
                            $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
                            $('.js-emailCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')
                        }
                    }
                }
            });
        }
    });

    //第二步发送验证码亮起
    var mobile_regexp = /^[1][2-8][0-9]{9}$/;
    $('.js-newMobile').blur(function(){
        var templet_newPhone=$.trim($('.js-newMobile').val());
        if(mobile_regexp.test(templet_newPhone)){
            $(this).siblings('.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right');
        }else {
            $(this).siblings('.Validform_checktip').removeClass('Validform_right').addClass('Validform_wrong');
            if (templet_newPhone.length == 0) {
                $('.js-newMobileerror').html("<i class='iconfont icon-information-solid'></i>手机不能为空");
            } else {
                $('.js-newMobileerror').html("<i class='iconfont icon-information-solid'></i>手机格式错误");
            }
        }
        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        var timeOut = $('.js-getinfo').attr('data-type');

        if(yanzhengtrue&&1!=timeOut){
            $('.js-getinfo').attr('data-type','2');
            $('.js-getinfo').removeClass('l-btn-disable');
        }
        else{
            $('.js-getinfo').addClass('l-btn-disable');
        }
    })
    $('.js-newMobile').keyup(function(){
        var templet_newPhone=$.trim($('.js-newMobile').val());
        if(mobile_regexp.test(templet_newPhone)){
            $(this).siblings('.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right');
        }else {
            $(this).siblings('.Validform_checktip').removeClass('Validform_right').addClass('Validform_wrong');
        }

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        var timeOut = $('.js-getinfo').attr('data-type');

        if(yanzhengtrue&&1!=timeOut){
            $('.js-getinfo').attr('data-type','2');
            $('.js-getinfo').removeClass('l-btn-disable');
        }
        else{
            $('.js-getinfo').addClass('l-btn-disable');
        }
    })

    //第二步点击发送验证码
    $('.js-getinfo').unbind().click(function(){
        if($('.js-getinfo').hasClass('l-btn-disable')) {
            return;
        }
        yanzhengtrue = $('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');
        if(yanzhengtrue){
            var templet_newMobile=$('.js-newMobile').val();
            var templet_blur = function(){
                $('.js-newMobile').blur();
            }
            btnTimeOut($('.js-getinfo'),'10',' 重新获取验证码',templet_blur );
            //  个人中心绑定手机号发送验证码接口
            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'sendBindMobileCode',
                    'newMobile':templet_newMobile
                },
                success_cb: function(data){
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {

                        }
                        else if (jQuery.trim(data).indexOf("newMobile_can_not_be_null")>-1){
                            if($('.js-newMobileerror').hasClass('Validform_right')){
                                $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空');
                            }
                            else{
                                $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("newMobile_type_is_illegal")>-1){
                            if($('.js-newMobileerror').hasClass('Validform_right')){
                                $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法');
                            }
                            else{
                                $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("newMobile_is_used")>-1){
                            if($('.js-newMobileerror').hasClass('Validform_right')){
                                $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号已被占用');
                            }
                            else{
                                $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号已被占用');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("create_confirm_error")>-1){
                            if($('.js-newMobileerror').hasClass('Validform_right')){
                                $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
                            }
                            else{
                                $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
                            }
                        }
                    }
                }
            });
        }
    });
    //第二步确定按钮变亮
    $('.js-mobileCode').keyup(function(){
        if($.trim($(this).val()).length==6){
            $('.js-submintData').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js-submintData').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
        }
    });
    $('.js-mobileCode').blur(function(){
        if($.trim($(this).val()).length==6){
            $('.js-submintData').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js-submintData').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码');
        }
    });

    //第二步点击确定
    $('.js-submintData').unbind().bind('click',function(){

        if($('.js-submintData').hasClass('l-btn-disable')) {
            return;
        }
        var templet_validatemobile=$('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');

        if( templet_validatemobile) {
            var templet_newMobile = $('.js-newMobile').val();
            var templet_mobileCode = $('.js-mobileCode').val();
            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl + "/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation': 'changeMobile',
                    'newMobile': templet_newMobile,
                    'mobileCode': templet_mobileCode
                },
                success_cb: function (data) {
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200") > -1) {
                            $('.js_memberRevisThree').addClass('member-revisemob-three').removeClass('member-revisemob-two').removeClass('member-revisemob-one');
                            $('.js-bindNewMob').hide();
                            $('.js-bingsuccess').show();
                            document.cookie = "isAlterBind=1;path=/";

                            var templet_time = 4;
                            var templet_change = setInterval(function () {
                                if (templet_time == 0) {
                                    clearInterval(templet_change);
                                    window.location.href = '/security'
                                    return;
                                }
                                document.getElementById("js-countdown").innerHTML = templet_time;
                                templet_time--;
                            }, 1000);
                        }
                        else if (jQuery.trim(data).indexOf("newMobile_can_not_be_null") > -1) {
                            if ($('.js-mobileCodeerror').hasClass('Validform_right')) {
                                $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                            }
                            else {
                                $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                            }
                        }
                        else if (jQuery.trim(data).indexOf("newMobile_type_is_illegal") > -1) {
                            if ($('.js-mobileCodeerror').hasClass('Validform_right')) {
                                $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                            }
                            else {
                                $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                            }
                        }
                        else if (jQuery.trim(data).indexOf("mobileCode_can_not_be_null") > -1) {
                            if ($('.js-mobileCodeerror').hasClass('Validform_right')) {
                                $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空')
                            }
                            else {
                                $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空')
                            }
                        }
                        else if (jQuery.trim(data).indexOf("can_not_query_this_code") > -1 || jQuery.trim(data).indexOf("code_is_illegal") > -1) {
                            if ($('.js-mobileCodeerror').hasClass('Validform_right')) {
                                $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')
                            }
                            else {
                                $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')
                            }
                        }
                        else if (jQuery.trim(data).indexOf("绑定失败，错误码") > -1) {
                            if ($('.js-mobileCodeerror').hasClass('Validform_right')) {
                                $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                            }
                            else {
                                $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                            }
                        }
                    }
                }
            });
        }
    });
})