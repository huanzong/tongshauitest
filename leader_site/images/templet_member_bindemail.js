/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置-绑定手机
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function(){

    //前台判断是否登陆
    // if(!istrsidssdssotoken()){
    //     jumpToLoginPage()；
    // }

    $('.js-memberRevRateLine').css('width','25%');
    //页面加载时调个人信息
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/user/front/user/userInfo",
        data: "",
        error : function(XMLHttpRequest, textStatus, errorThrown){
        },
        success: function(returnData){
            if (jQuery.trim(returnData).length > 0) {
                if(returnData.resultMsg=='用户未登录'){
                    window.location.href ='/ids/ts/login.jsp';
                }

                var templet_email=jQuery.trim(returnData.data.email);
                if (templet_email != null && templet_email != "") {
                    self.location = '/security';
                }

                var templet_mobile=jQuery.trim(returnData.data.mobile);
                var templet_callphone = templet_mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");//手机号加*

                $("#js_unbindmob").attr('autotext',"手机（"+templet_callphone+"）");
                $("#js_unbindmob").append("<option value='1'>手机（"+templet_callphone+"）</option>");
                $("#js_unbindmob").oSelect().init();


            }
        }
    });

    //第一步确定按钮变亮
    $('.js_phoneCodeYz').blur(function(){
        if($(this).val().length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js_subimGetUp').click(function(){

                return false;
            })
        }
    })

    //第一步点击发送验证码
    $('.js-sendphonecode').unbind().click(function(){

        $.ajax({
            type: "post",
            dataType: "text",
            url: "",
            data: {
                'editOperation':'XXXXXX',
                'XXXXXXX':'XXXXXX'
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
            },
            success: function(returnData){
                if (jQuery.trim(returnData).length > 0) {
                    if (jQuery.trim(returnData).indexOf("200")>-1) {

                    }

                }
            }

        })
    });

    //第一步点击确定
    $('.js_subimGetUp').unbind().click(function () {
        if(!$('.js_subimGetUp').hasClass('l-btn-disable')){
            $.ajax({
                type: "post",
                dataType: "text",
                url: "",
                data: {
                    'editOperation':'XXXXXX',
                    'XXXXXXX':'XXXXXX'
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                },
                success: function(returnData){
                    if (jQuery.trim(returnData).length > 0) {
                        if (jQuery.trim(returnData).indexOf("200")>-1) {
                            $('.js-memberRevRateLine').css('width','75%');
                            $('.js-memberRevRateTree').addClass('member-revisemob-No2').children('.member-revisemob-line-point02').children('div').addClass('.member-revisemob-line-finishpoint');
                            $('.js-memberRevRateTree').children('.member-revisemob-line-point03').children('div').addClass('.member-revisemob-line-finishpoint');
                            $('.js-validatePhone').hide();
                            $('.js-bindNewEmail').show();
                        }

                    }
                }

            })
        }
    });

    //第二步邮箱失去焦点 格式正确 发送验证码亮起
    $('.js-newEmail').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');

        if(yanzhengtrue){
            $('.js-getinfo').removeClass('l-btn-disable').unbind().click(function(){

                yanzhengtrue = $('.js-newEmail').siblings('.Validform_checktip').hasClass('Validform_right');
                if(yanzhengtrue){
                    var templet_newEmail=$('.js-newEmail').val();

                    //  个人中心绑定邮箱发送验证码接口
                    $.ajax({

                        type: "post",
                        dataType: "text",
                        url: "/ids/ts/userInfoManager.jsp",
                        data: {
                            'editOperation':'sendBindEmailCode',
                            'newEmail':templet_newEmail
                        },
                        error : function(XMLHttpRequest, textStatus, errorThrown){
                        },
                        success: function(returnData){
                            if (jQuery.trim(returnData).length > 0) {
                                if (jQuery.trim(returnData).indexOf("200")>-1) {}
                                else if (jQuery.trim(returnData).indexOf("newEmail_can_not_be_null")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                                    }
                                }
                                else if (jQuery.trim(returnData).indexOf("newEmail_type_is_illegal")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                                    }
                                }
                                else if (jQuery.trim(returnData).indexOf("newEmail_is_used")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱已被占用');
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱已被占用');
                                    }
                                }
                                else if (jQuery.trim(returnData).indexOf("create_confirm_error")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
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

    //第二步点确定以前验证邮箱 验证码是否正确
    $('.js-emailCode').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        var templet_validateemail=$('.js-newEmail').siblings('.Validform_checktip').hasClass('Validform_right');

        //点击确定 个人中心绑定手机号接口
        if(yanzhengtrue && templet_validateemail){
            $('.js-submintData').unbind().bind('click',function(){
                var templet_newEmail=$('.js-newEmail').val();
                var templet_emailCode=$('.js-emailCode').val();

                $.ajax({
                    type: "post",
                    dataType: "text",
                    url: "/ids/ts/userInfoManager.jsp",
                    data: {
                        'editOperation':'bindNewEmail',
                        'newEmail':templet_newEmail,
                        'emailCode':templet_emailCode
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown){
                    },
                    success: function(returnData){
                        if (jQuery.trim(returnData).length > 0) {
                            if (jQuery.trim(returnData).indexOf("200")>-1) {
                                $('.js-bindNewEmail').hide();
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
                            else if (jQuery.trim(returnData).indexOf("newEmail_can_not_be_null")>-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("newEmail_type_is_illegal")>-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("emailCode_can_not_be_null")>-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码不能为空');
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码不能为空');
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("can_not_query_this_code") >-1 || jQuery.trim(returnData).indexOf("code_is_illegal") >-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码错误');
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码错误');
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("绑定失败，错误码")  >-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败');
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败');
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


})