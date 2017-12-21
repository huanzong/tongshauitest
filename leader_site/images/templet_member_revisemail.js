/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置-修改邮件
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function(){
    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        jumpToLoginPage();
    }

    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/hshop-user/front/user/userInfo/",
        data: "",
        login:true,
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {
                var templet_email=jQuery.trim(data.data.email);
                if(templet_email==null || templet_email==""|| templet_email=="null"){
                    self.location = '/security';
                }

                var templet_call=jQuery.trim(data.data.mobile);
                if(templet_call!=null && templet_call!=""&& templet_call!="null"){

                    var templet_callphone = templet_call.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");//手机号加*

                    $("#js_revisemail").append("<option value='1'>手机（"+templet_callphone+"）</option>");
                }

                var templet_split = templet_email.split("@");
                var templet_hide = templet_split[0].length / 2;
                var templet_emailnote = templet_split[0].substr(0,templet_hide) + '***' + '@' + templet_split[1]; //emai加.
                $("#js_revisemail").attr('autotext',"邮箱（"+templet_emailnote+"）");
                $("#js_revisemail").append("<option value='2'>邮箱（"+ templet_emailnote +"）</option>");

                $("#js_revisemail").oSelect().init();
            }
        }
    });

//通过点击不同的下拉列表框,转换手机和邮箱
    $("#js_revisemail").change(function() { SelectChange(); });
    function SelectChange(){

        var val=$("#js_revisemail").val();
        if(val==1)
        {
            $('.js-send').html('短信验证');
            $('.js_phoneCodeYz').show();
            $('.js_emailCodeYz').hide();
            $('.js-sendmobile').show();
            $('.js-sendmobile').removeClass('l-btn-disable');
            $('.js-sendmail').hide();
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
            if($.trim($('.js_phoneCodeYz').val()).length==6){
                $('.js_subimGetUp').removeClass('l-btn-disable');
            }else{
                $('.js_subimGetUp').addClass('l-btn-disable');
            }

        }
        else if(val==2)
        {
            $('.js-send').html('邮箱验证');
            $('.js_emailCodeYz').show();
            $('.js_phoneCodeYz').hide();
            $('.js-sendmobile').hide();
            $('.js-sendmail').show();
            $('.js-sendmail').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
            if($.trim($('.js_emailCodeYz').val()).length==6){
                $('.js_subimGetUp').removeClass('l-btn-disable');
            }else{
                $('.js_subimGetUp').addClass('l-btn-disable');
            }
        }
        else{
            $('.js-sendmobile').addClass('l-btn-disable');
            $('.js-sendmail').addClass('l-btn-disable');
        }
    }

    //确定亮起
    $('.js_emailCodeYz').blur(function(){
        if($(this).val().length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码');
        }
    })
    $('.js_emailCodeYz').keyup(function(){
        if($(this).val().length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');

        }
    })
    $('.js_phoneCodeYz').blur(function(){
        if($(this).val().length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码');
        }
    })
    $('.js_phoneCodeYz').keyup(function(){
        if($(this).val().length==6){
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');

        }
    })

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
                'editOperation':'beforeBindEmailSendMobileCode'
            },
            login:true,
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {}
                    else if (jQuery.trim(data).indexOf("请1分钟后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请1分钟后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("请24小时后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请24小时后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else{
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送失败').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                }
            }
        });
    })

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
                'editOperation':'beforeBindEmailSendEmailCode'
            },
            login:true,
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {}
                    else if (jQuery.trim(data).indexOf("请1分钟后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请1分钟后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else if (jQuery.trim(data).indexOf("请24小时后重试")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请24小时后重试').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                    else{
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送失败').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                }
            }
        });
    })
    //点击确定按钮
    $(".js_subimGetUp") .unbind().bind('click',function(){

        var templet_notclick = $(this).hasClass('l-btn-disable');

        if(!templet_notclick)
        {
            var templet_param;
            var templet_code; //验证码
            var templet_pretermit=$('#js_revisemail').val(); //下拉的value
            if( templet_pretermit=='1'){

                templet_param='mobile';
                templet_code=$.trim($('.js_phoneCodeYz').val());
            }
            if(templet_pretermit=='0' ||templet_pretermit=='2' ){
                templet_param='email';
                templet_code=$.trim($('.js_emailCodeYz').val());
            }

            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'beforeBindEmailVerifyCode',
                    'param':templet_param,
                    'code':templet_code
                },
                login:true,
                success_cb: function(data){
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {
                            $('.js-memberRevRateTree').addClass('member-revisemob-two').removeClass('member-revisemob-three').removeClass('member-revisemob-one');
                            $('.js-revisemailfirst').hide();
                            $('.js-bindNewEmail').show();
                        }
                        else{
                            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误').addClass('Validform_wrong').removeClass('Validform_right');
                        }
                    }
                }
            });
        }
    })

    //第二步发送验证码亮起
    var email_regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;  //邮箱正则
    $('.js-newEmail').blur(function() {
        var templet_newEmail=$.trim($('.js-newEmail').val());
        if(email_regexp.test(templet_newEmail)){
            $(this).siblings('.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right');
        }else {
            $(this).siblings('.Validform_checktip').removeClass('Validform_right').addClass('Validform_wrong');
            if (templet_newEmail.length == 0) {
                $('.js-newEmailerror').html("<i class='iconfont icon-information-solid'></i>邮箱不能为空");
            } else {
                $('.js-newEmailerror').html("<i class='iconfont icon-information-solid'></i>邮箱格式错误");
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
    });
    $('.js-newEmail').keyup(function() {
        var templet_newEmail=$.trim($('.js-newEmail').val());
        if(email_regexp.test(templet_newEmail)){
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
    });

    //第二步点击发送验证码
    $('.js-getinfo').unbind().click(function(){
        if($('.js-getinfo').hasClass('l-btn-disable'))
        {
            return;
        }
        yanzhengtrue = $('.js-newEmail').siblings('.Validform_checktip').hasClass('Validform_right');
        if(yanzhengtrue){
            var templet_newEmail=$.trim($('.js-newEmail').val());
            var templet_blur = function(){
                $('.js-newEmail').blur();
            }
            //  个人中心绑定邮箱发送验证码接口
            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'sendBindEmailCode',
                    'newEmail':templet_newEmail
                },
                login:true,
                success_cb: function(data){
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {
                            btnTimeOut($('.js-getinfo'),'120',' 重新获取验证码',templet_blur );
                        }
                        else if (jQuery.trim(data).indexOf("newEmail_can_not_be_null")>-1){
                            if($('.js-newEmailerror').hasClass('Validform_right')){
                                $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                            }
                            else{
                                $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("newEmail_type_is_illegal")>-1){
                            if($('.js-newEmailerror').hasClass('Validform_right')){
                                $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                            }
                            else{
                                $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("newEmail_is_used")>-1){
                            if($('.js-newEmailerror').hasClass('Validform_right')){
                                $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱已被占用');
                            }
                            else{
                                $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱已被占用');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("create_confirm_error")>-1){
                            if($('.js-newEmailerror').hasClass('Validform_right')){
                                $('.js-newEmailerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
                            }
                            else{
                                $('.js-newEmailerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("请1分钟后重试")>-1){
                            $('.js-newEmailerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请1分钟后重试').addClass('Validform_wrong').removeClass('Validform_right');
                        }
                        else if (jQuery.trim(data).indexOf("请24小时后重试")>-1){
                            $('.js-newEmailerror').html('<i class=\'iconfont icon-information-solid\'></i>您的操作太频繁了，请24小时后重试').addClass('Validform_wrong').removeClass('Validform_right');
                        }
                    }
                }
            });
        }
    });

    //第二步确定按钮变亮
    $('.js-emailCode').keyup(function(){
        if($.trim($(this).val()).length==6){
            $('.js-submintData').removeClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js-submintData').addClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
        }
    });
    $('.js-emailCode').blur(function(){
        if($.trim($(this).val()).length==6){
            $('.js-submintData').removeClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $('.js-submintData').addClass('l-btn-disable');
            $('.js-emailCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-emailCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码');
        }
    });

    //第二步点击确定
    $('.js-submintData').unbind().bind('click',function(){
        if($('.js-submintData').hasClass('l-btn-disable')) {
            return;
        }
        var templet_validateemail=$('.js-newEmail').siblings('.Validform_checktip').hasClass('Validform_right');
        if( templet_validateemail){
            var templet_newEmail=$.trim($('.js-newEmail').val());
            var templet_emailCode=$.trim($('.js-emailCode').val());

            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'bindNewEmail',
                    'newEmail':templet_newEmail,
                    'emailCode':templet_emailCode
                },
                login:true,
                success_cb: function(data){
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {
                            $('.js-memberRevRateTree').addClass('member-revisemob-three').removeClass('member-revisemob-two').removeClass('member-revisemob-one');
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
                        else if (jQuery.trim(data).indexOf("newEmail_can_not_be_null")>-1){
                            if($('.js-emailCodeerror').hasClass('Validform_right')){
                                $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                            }
                            else{
                                $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱不能为空');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("newEmail_type_is_illegal")>-1){
                            if($('.js-emailCodeerror').hasClass('Validform_right')){
                                $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                            }
                            else{
                                $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱格式非法');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("emailCode_can_not_be_null")>-1){
                            if($('.js-emailCodeerror').hasClass('Validform_right')){
                                $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码不能为空');
                            }
                            else{
                                $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码不能为空');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("can_not_query_this_code") >-1 || jQuery.trim(data).indexOf("code_is_illegal") >-1){
                            if($('.js-emailCodeerror').hasClass('Validform_right')){
                                $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码错误');
                            }
                            else{
                                $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>邮箱验证码错误');
                            }
                        }
                        else if (jQuery.trim(data).indexOf("绑定失败，错误码")  >-1){
                            if($('.js-emailCodeerror').hasClass('Validform_right')){
                                $('.js-emailCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败');
                            }
                            else{
                                $('.js-emailCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败');
                            }
                        }
                    }
                }
            });
        }
    });
})
