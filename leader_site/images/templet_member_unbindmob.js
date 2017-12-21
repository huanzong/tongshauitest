/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置-解绑手机
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
//option value:1--手机号 2——邮箱

$(function(){

    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/hshop-user//front/user/userInfo/",
        login:true,
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {
                var templet_email=jQuery.trim(data.data.email);
                var templet_call=jQuery.trim(data.data.mobile);
                if(templet_email==null || templet_email==""|| templet_email=="null"){
                    self.location = '/security';
                }else{
                    if( templet_call==null || templet_call==""|| templet_call=="null"){
                        self.location = '/security';
                    }
                    var templet_callphone = templet_call.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");//手机号加*
                    $("#js-logincallphone").html(templet_callphone);
                    $("#js_unbindmob").attr('autotext',"手机（"+templet_callphone+"）");
                    $("#js_unbindmob").append("<option value='1'>手机（"+templet_callphone+"）</option>");

                    var templet_split = templet_email.split("@");
                    var templet_hide = templet_split[0].length / 2;
                    var templet_emailnote = templet_split[0].substr(0,templet_hide) + '***' + '@' + templet_split[1]; //emai加.

                    $("#js_unbindmob").append("<option value='2'>邮箱（"+ templet_emailnote +"）</option>");
                    $("#js_unbindmob").oSelect().init();
                }
            }
        }
    });

//通过点击不同的下拉列表框 转换手机和邮箱
    $("#js_unbindmob").change(function() { SelectChange(); });
    function SelectChange(){
        var val=$("#js_unbindmob").val();
        if(val==1)
        {
            $('.js-send').html('短信验证');
            $('.js_phoneCodeYz').show();
            $('.js_emailCodeYz').hide();
            $('.js-sendmobile').show();
            $('.js-sendmail').hide();
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
            if($.trim($('.js_phoneCodeYz').val()).length==6){
                $('.js_subimGetUp').removeClass('l-btn-disable');
            }else{
                $('.js_subimGetUp').addClass('l-btn-disable');
            }
        }
        if(val==2)
        {
            $('.js-send').html('邮箱验证');
            $('.js_emailCodeYz').show();
            $('.js_phoneCodeYz').hide();
            $('.js-sendmobile').hide();
            $('.js-sendmail').show();
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
            if($.trim($('.js_emailCodeYz').val()).length==6){
                $('.js_subimGetUp').removeClass('l-btn-disable');
            }else{
                $('.js_subimGetUp').addClass('l-btn-disable');
            }
        }
    }
//点击发送短信验证码
    $(".js-sendmobile").click(function(){
        if($('.js-sendmobile').hasClass('l-btn-disable'))
        {
            return;
        }
        btnTimeOut($('.js-sendmobile'),'60',' 重新获取验证码');

        $.ajax({
            dataType: "text",
            url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'unbindMobileSendMobileCode'
            },
            login:true,
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {}
                    else if (jQuery.trim(data).indexOf("user_is_illegal")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送短信的手机号不是当前用户的').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("create_confirm_error")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送失败').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("请1分钟后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请1分钟后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("请24小时后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请24小时后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                }
            }
        })
    });
//点击发送邮箱验证码
    $(".js-sendmail").click(function(){
        if($('.js-sendmail').hasClass('l-btn-disable'))
        {
            return;
        }
        btnTimeOut($('.js-sendmail'),'120',' 重新获取验证码');
        $.ajax({
            dataType: "text",
            url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'unbindMobileSendEmailCode'
            },
            login:true,
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {}
                    else if (jQuery.trim(data).indexOf("user_is_illegal")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送邮件的手机号不是当前用户的').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("create_confirm_error")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送失败').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("请1分钟后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请1分钟后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("请24小时后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请24小时后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                }
            }

        })
    });

    //点击确定按钮
    $(".js_subimGetUp") .unbind().bind('click',function(){

        var templet_notclick = $(this).hasClass('l-btn-disable');

        if(!templet_notclick)
        {
            var templet_param;
            var templet_code; //验证码
            var templet_pretermit=$('#js_unbindmob').val(); //下拉的value
            if(templet_pretermit=='0' || templet_pretermit=='1'){

                templet_param='mobile';
                templet_code=$.trim($('.js_phoneCodeYz').val());
            }
            if(templet_pretermit=='2' ){
                templet_param='email';
                templet_code=$.trim($('.js_emailCodeYz').val());
            }

            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'unbindMobileVerifyCode',
                    'param':templet_param,
                    'code':templet_code
                },
                login:true,
                success_cb: function(data){
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {
                            $('.js-memberRevRateTree').addClass('member-revisemob-two').removeClass('member-revisemob-three').removeClass('member-revisemob-one');
                            $('.js-unbingfalse').hide();
                            $('.js_validateMob').show();
                        }
                        else if (jQuery.trim(data).indexOf("code_can_not_be_null")>-1){

                            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空').addClass('Validform_wrong').removeClass('Validform_right');

                        }
                        else if (jQuery.trim(data).indexOf("unbind_code_can_not_be_select")>-1 || jQuery.trim(data).indexOf("unbind_mcode_is_illegal")>-1 ){

                            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误').addClass('Validform_wrong').removeClass('Validform_right');

                        }
                    }
                }
            })
        }
    });

    //确定取消绑定
    $(".js-unbind") .unbind().bind('click',function(){
        var templet_param;
        var templet_pretermit=$('#js_unbindmob').val(); //下拉的value
        if(templet_pretermit=='0' || templet_pretermit=='1'){

            templet_param='mobile';
        }
        if(templet_pretermit=='2' ){
            templet_param='email';
        }
        var templet_code=$.trim($('.js_phoneCodeYz').val());

        if(templet_code!=''){
            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation': 'unbind',
                    'param': templet_param ,
                    'code':templet_code
                },
                login:true,
                success: function (data) {
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {
                            $('.js-memberRevRateLine').css('width','100%');
                            $('.js-memberRevRateTree').addClass('member-revisemob-No3').children('.member-revisemob-line-point03').children('div').addClass('member-revisemob-line-finishpoint');

                            $('.js_validateMob').hide();
                            $('.js-unbingsuccess').show();

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
                        else if(jQuery.trim(data).indexOf("unbind_verify_is_illegaled")>-1){
                            globalShade2('验证码不能为空',2);
                        }
                        else if(jQuery.trim(data).indexOf("403")>-1){
                            globalShade2('解除绑定失败',2);
                        }
                    }
                }
            });
        }
    });

    //取消取消绑定
    $(".js-cancelUnbind") .unbind().bind('click',function(){
        var templet_param;
        var templet_pretermit=$('#js_unbindmob').val(); //下拉的value
        if(templet_pretermit=='0' || templet_pretermit=='1'){

            templet_param='mobile';
        }
        if(templet_pretermit=='2' ){
            templet_param='email';
        }
        $.ajax({
            dataType: "text",
            url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation': 'cancelUnbind',
                'param': templet_param
            },
            login:true,
            success_cb: function (data) {
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {
                        self.location = '/security';
                    }
                    else{
                        self.location = '/security';
                    }
                }
            }
        });
    });
})

//解绑手机号验证

$('.js_phoneCodeYz').blur(function(){
    if($.trim($(this).val()).length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
        $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码');
    }
})

$('.js_phoneCodeYz').keyup(function(){
    if($.trim($(this).val()).length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
        $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
    }
})

//解绑邮箱验证

$("#js_unbindmail").oSelect().init();
$('.js_emailCodeYz').blur(function(){
    if($.trim($(this).val()).length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
        $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>验证码长度错误').addClass('Validform_wrong').removeClass('Validform_right');
    }
})
$('.js_emailCodeYz').keyup(function(){
    if($.trim($(this).val()).length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
        $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
    }
})