/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置-绑定手机
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function(){

    //前台判断是否登陆
    // if(!istrsidssdssotoken()){
    //     jumpToLoginPage();
    // }


    //页面加载时调个人信息
    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/user/front/user/userInfo/",
        data: {},
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {

                var templet_mobile=jQuery.trim(data.data.mobile);
                if (templet_mobile != null && templet_mobile != "") {
                    self.location = '/security';
                }

                var templet_email=jQuery.trim(data.data.email);
                var templet_split = templet_email.split("@");
                var templet_hide = templet_split[0].length / 2;
                var templet_emailnote = templet_split[0].substr(0,templet_hide) + '..' + '@' + templet_split[1]; //emai加.

                $("#js_unbindmob").attr('autotext',"邮箱（"+templet_emailnote+"）");
                $("#js_unbindmob").append("<option value='1'>邮箱（"+templet_emailnote+"）</option>");
                $("#js_unbindmob").oSelect().init();
            }
        }
    });

    //第一步确定按钮变亮
    $('.js_emailCodeYz').blur(function(){
        console.log($(this).val());
        if($(this).val().length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-emailCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码')
        }
    })

    //第一步点击发送验证码
    $('.js-sendemailcode').unbind().click(function(){

        $.ajax({
            url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'beforeBindMobileSendEmailCode'
            },
            success_cb: function(returnData){
                if (jQuery.trim(returnData).length > 0) {
                    if (jQuery.trim(returnData).indexOf("200")>-1) {

                    }
                    else{
                        $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
                        $('.js-emailCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送验证码失败')
                    }
                }
            }
        })
    });

    //第一步点击确定
    $('.js_subimGetUp').unbind().click(function () {
        if(!$('.js_subimGetUp').hasClass('l-btn-disable')){
            var templet_code=$('.js_emailCodeYz').val();

            $.ajax({
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
                            globalShade2('验证失败，请重试','2');
                        }
                    }
                }
            })
        }
    });

    //第二步手机号码失去焦点 格式正确 发送验证码亮起
    $('.js-newMobile').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');

        if(yanzhengtrue){
            $('.js-getinfo').removeClass('l-btn-disable').unbind().click(function(){

                yanzhengtrue = $('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');
                if(yanzhengtrue){
                    var templet_newMobile=$('.js-newMobile').val();

                    //  个人中心绑定手机号发送验证码接口
                    $.ajax({
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

                    })
                }
            })
        }
        else{
            $('.js-getinfo').addClass('l-btn-disable');
        }
    })

    //第二步点确定以前验证手机号的验证码是否正确
    $('.js-mobileCode').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        var templet_validatemobile=$('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');

        //点击确定 个人中心绑定手机号接口
        if(yanzhengtrue && templet_validatemobile){
            $('.js-submintData').unbind().bind('click',function(){
                var templet_newMobile=$('.js-newMobile').val();
                var templet_mobileCode=$('.js-mobileCode').val();
                $.ajax({
                    url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                    data: {
                        'editOperation':'changeMobile',
                        'newMobile':templet_newMobile,
                        'mobileCode':templet_mobileCode
                    },
                    success_cb: function(data){
                        if (jQuery.trim(data).length > 0) {
                            if (jQuery.trim(data).indexOf("200")>-1) {
                                $('.js_memberRevisThree').addClass('member-revisemob-three').removeClass('member-revisemob-two').removeClass('member-revisemob-one');
                                $('.js-bindNewMob').hide();
                                $('.js-bingsuccess').show();
                                document.cookie="isAlterBind=1;path=/";

                                var templet_time = 4;
                                var templet_change = setInterval(function(){
                                    if (templet_time == 0) {
                                        clearInterval(templet_change);
                                        window.location.href ='/security'
                                        return;
                                    }
                                    document.getElementById("js-countdown").innerHTML = templet_time;
                                    templet_time--;
                                }, 1000);
                            }
                            else if (jQuery.trim(data).indexOf("newMobile_can_not_be_null")>-1){
                                if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                    $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                                }
                                else{
                                    $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                                }
                            }
                            else if (jQuery.trim(data).indexOf("newMobile_type_is_illegal")>-1){
                                if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                    $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                                }
                                else{
                                    $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                                }
                            }
                            else if (jQuery.trim(data).indexOf("mobileCode_can_not_be_null")>-1){
                                if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                    $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空')
                                }
                                else{
                                    $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空')
                                }
                            }
                            else if (jQuery.trim(data).indexOf("can_not_query_this_code")>-1 || jQuery.trim(returnData).indexOf("code_is_illegal")>-1){
                                if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                    $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')
                                }
                                else{
                                    $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')
                                }
                            }
                            else if (jQuery.trim(data).indexOf("绑定失败，错误码")>-1){
                                if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                    $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                                }
                                else{
                                    $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                                }
                            }

                        }
                    }

                })
            })
        }else{
            //    提示错误信息 验证码错误

            //禁止点击
            $('.js-submintData').unbind().bind('click',function(){

                return false;
            })
        }

    })



    var email=$(".js-bindEmailform").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });
    var emailyanzheng=$(".js-bindEmailyanzheng").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });

    var yanzhengma=$(".js-bindmobyanzheng").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
//                "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/,
            "mobile":/^1[3|4|5|7|8][0-9]\d{4,8}$/
        },
        ajaxPost:true
    });


})