/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置-修改邮件
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function(){
    //前台判断是否登陆
    // if(!istrsidssdssotoken()){
    //     jumpToLoginPage()
    // }

    $.ajax({
        type: "get",
        dataType: "json",
        url: "/user/front/user/userInfo",
        data: "",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        success: function(returnData){
            if (jQuery.trim(returnData).length > 0) {
                if(returnData.resultMsg=='用户未登录'){
                    window.location.href ='/ids/ts/login.jsp';
                }
                var templet_email=jQuery.trim(returnData.data.email);
                if(templet_email==null || templet_email==""){
                    self.location = '/security';
                }

                var templet_call=jQuery.trim(returnData.data.mobile);
                if(templet_call!=null && templet_call!=""){

                    var templet_callphone = templet_call.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");//手机号加*

                    $("#js-logincallphone").html(templet_callphone);
                    $("#js_unbindmob").attr('autotext',"手机（"+templet_callphone+"）");
                    $("#js_unbindmob").append("<option value='1'>手机（"+templet_callphone+"）</option>");
                }

                var templet_split = templet_email.split("@");
                var templet_hide = templet_split[0].length / 2;
                var templet_emailnote = templet_split[0].substr(0,templet_hide) + '..' + '@' + templet_split[1]; //emai加.
                $("#js_unbindmob").append("<option value='2'>邮箱（"+ templet_emailnote +"）</option>");

                $("#js_unbindmob").oSelect().init();
                $('.js-unbingfalse').show();
                $('.js-unbingsuccess').hide();


            }
        }
    });
//通过点击不同的下拉列表框 转换手机和邮箱
    $("#js_unbindmob").change(function() { SelectChange(); });
    function SelectChange(){

        var val=$("#js_revisemail").val();
        if(val==1)
        {
            $('.js-send').html('短信验证');
            $('.js_mobileCodeYz').attr('placeholder','短信验证码');
            $('.js-sendmobile').show();
            $('.js-sendmail').hide();

        }
        if(val==2)
        {
            $('.js-send').html('邮箱验证');
            $('.js_mobileCodeYz').attr('placeholder','邮箱验证码');
            $('.js-sendmobile').hide();
            $('.js-sendmail').show();
        }
    }


    $('.js_emailCodeYz').blur(function(){
        if($(this).val().length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js_subimGetUp').click(function(){
                console.log(1111);
                return false;
            })
        }
    })

//验证邮箱
    $('.js-newEmail').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if(yanzhengtrue){
            $('.js-getinfo').removeClass('l-btn-disable').click(function(){

                yanzhengtrue = $('.js-newEmail').siblings('.Validform_checktip').hasClass('Validform_right');
                if(yanzhengtrue){
                    var newEmail=$('.js-newEmail').val();

                    //  个人中心绑定邮箱发送验证码接口
                    $.ajax({

                        type: "post",
                        dataType: "text",
                        url: "/ids/ts/userInfoManager.jsp",
                        data: {
                            'editOperation':sendBindEmailCode,
                            'newEmail':newEmail
                        },
                        error : function(XMLHttpRequest, textStatus, errorThrown){
                        },
                        success: function(returnData){
                            if (jQuery.trim(returnData).length > 0) {
                                if (jQuery.trim(returnData).indexOf("200")>-1) {}
                                else if (jQuery.trim(returnData).indexOf("newEmail_can_not_be_null")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空')
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空')
                                    }
                                }
                                else if (jQuery.trim(returnData).indexOf("newEmail_type_is_illegal")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法')
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法')
                                    }
                                }
                                else if (jQuery.trim(returnData).indexOf("newEmail_is_used")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱已被占用')
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱已被占用')
                                    }
                                }
                                else if (jQuery.trim(returnData).indexOf("create_confirm_error")>-1){
                                    if($('.js-newEmailerror').hasClass('Validform_right')){
                                        $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败')
                                    }
                                    else{
                                        $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败')
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
//验证码成功后可点击提交
    $('.js-emailCode').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');

        if(yanzhengtrue){//点击确定 个人中心绑定邮箱接口
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-submintData').unbind().bind('click',function(){

                var newEmail=$('.js-newEmail').val();
                var emailCode=$('.js-emailCode').val();

                $.ajax({
                    type: "post",
                    dataType: "text",
                    url: "/ids/ts/userInfoManager.jsp",
                    data: {
                        'editOperation':bindNewEmail,
                        'newEmail':newEmail,
                        'emailCode':emailCode
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown){
                    },
                    success: function(returnData){
                        if (jQuery.trim(returnData).length > 0) {
                            if (jQuery.trim(returnData).indexOf("200")>-1) {
                                $('.js-bingfalse').hide();
                                $('.js-bingsuccess').show();
                            }
                            else if (jQuery.trim(returnData).indexOf("newEmail_can_not_be_null")>-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空')
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空')
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("newEmail_type_is_illegal")>-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法')
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法')
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("emailCode_can_not_be_null")>-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码不能为空')
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码不能为空')
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("can_not_query_this_code") || jQuery.trim(returnData).indexOf("code_is_illegal") >-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码错误')
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码错误')
                                }
                            }
                            else if (jQuery.trim(returnData).indexOf("绑定失败，错误码")  >-1){
                                if($('.js-emailCodeerror').hasClass('Validform_right')){
                                    $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                                }
                                else{
                                    $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                                }
                            }

                        }
                    }

                })
            })
        }else{
            //    提示错误信息 验证码错误
            $('.js_subimGetUp').addClass('l-btn-disable');
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
