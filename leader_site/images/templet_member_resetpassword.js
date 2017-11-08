/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-修改密码
* @author:      刘悦
* @date        2017.11.7
* ---------------------------------------------------------------------------*/
$(function(){
    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        jumpToLoginPage()
    }

    //是否有邮箱 手机号
    var templet_isemail=false;
    var templet_isphone=false;
    //页面加载时调个人信息
    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/hshop-user/front/user/userInfo",
        data: "",
        login:true,
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {
                var templet_email=jQuery.trim(data.data.email);
                var templet_call=jQuery.trim(data.data.mobile);
                if ((templet_email == null || templet_email == ""|| templet_email == "null") && (templet_call == null || templet_call == "" || templet_call == "null")) {
                    self.location = '/security';
                }
                if(templet_email!=null && templet_email!=""&& templet_email!="null"){
                    templet_isemail=true;
                    var templet_split = templet_email.split("@");
                    var templet_hide = templet_split[0].length / 2;
                    var templet_emailnote = templet_split[0].substr(0,templet_hide) + '..' + '@' + templet_split[1]; //emai加.
                    $("#js_resetpassword").append("<option value='2'>邮箱（"+ templet_emailnote +"）</option>");

                    $('.js-send').html('邮箱验证');
                    $('.js_emailCodeYz').show();
                    $('.js_phoneCodeYz').hide();
                    $('.js-sendmobile').hide();
                    $('.js-sendmail').show();

                }
                if(templet_call!=null && templet_call!="" && templet_call!="null"){
                    templet_isphone=true;
                    var templet_callphone = templet_call.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");//手机号加*
                    $("#js_resetpassword").append("<option value='1'>手机（"+templet_callphone+"）</option>");

                    $('.js-send').html('短信验证');
                    $('.js_phoneCodeYz').show();
                    $('.js_emailCodeYz').hide();
                    $('.js-sendmobile').show();
                    $('.js-sendmail').hide();
                }
                $("#js_resetpassword").oSelect().init();
            }
        }
    });

    //第一步确定按钮变亮
    $('.js_phoneCodeYz').blur(function(){
        if($.trim($(this).val()).length==6){
            $(this).removeClass('Validform_error');
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $(this).addClass('Validform_error');
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码');
        }
    });
    $('.js_phoneCodeYz').keyup(function(){
        if($.trim($(this).val()).length==6){
            $(this).removeClass('Validform_error');
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $(this).addClass('Validform_error');
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
        }
    });
    $('.js_emailCodeYz').blur(function(){
        if($.trim($(this).val()).length==6){
            $(this).removeClass('Validform_error');
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $(this).addClass('Validform_error');
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码');
        }
    });
    $('.js_emailCodeYz').keyup(function(){
        if($.trim($(this).val()).length==6){
            $(this).removeClass('Validform_error');
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $(this).addClass('Validform_error');
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
        }
    });

//通过点击不同的下拉列表框 转换手机和邮箱
    $("#js_resetpassword").change(function() { SelectChange(); });
    function SelectChange(){
        var val=$("#js_resetpassword").val();
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
        if($('.js-sendmobile').hasClass('l-btn-disable')) {
            return;
        }
        btnTimeOut($('.js-sendmobile'),'60',' 重新获取验证码');

        $.ajax({
            dataType: "text",
            url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'beforeChangePwdSendMobileCode'
            },
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {}
                    else{
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送失败').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                }
            }
        });
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
                'editOperation':'beforeChangePwdSendEmailCode'
            },
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {}
                    else{
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送失败').addClass('Validform_wrong').removeClass('Validform_right');
                    }
                }
            }
        });
    });

    //点击确定按钮
    $(".js_subimGetUp") .unbind().bind('click',function(){

        var templet_notclick = $(this).hasClass('l-btn-disable');

        if(!templet_notclick)
        {
            var templet_param;
            var templet_code=$.trim($('.js_phoneCodeYz').val()); //验证码
            var templet_pretermit=$('#js_resetpassword').val(); //下拉的value
            if( templet_pretermit=='1'){

                templet_param='mobile';
            }
            if(templet_pretermit=='2' ){
                templet_param='email';
            }
            if(templet_pretermit=='0' ){
                if(templet_isphone==true){
                    templet_param='mobile';
                }else{
                    templet_param='email';
                }
            }

            $.ajax({
                dataType: "text",
                url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'beforeChangePwdVerifyCode',
                    'param':templet_param,
                    'code':templet_code
                },
                success_cb: function(data){
                    if (jQuery.trim(data).length > 0) {
                        if (jQuery.trim(data).indexOf("200")>-1) {
                            $('.js_memberRevisThree').addClass('member-revisemob-two').removeClass('member-revisemob-three').removeClass('member-revisemob-one');
                            $('.js-validatePhone').hide();
                            $('.js-resetpassword').show();
                        }
                        else{
                            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误').addClass('Validform_wrong').removeClass('Validform_right');
                        }
                    }
                }
            });
        }
    });

    //第二步确定按钮变亮

    $('.js-resetPassWord').keyup(function(){
        var errorText = checkPwdFormat($(this).val());
        if(errorText!=200){
            $(this).addClass('Validform_error');
            $(this).siblings('.js-resetPassWorderror').html(errorText).removeClass('Validform_right').addClass('Validform_wrong');
            $('.js-subpassword').addClass('l-btn-disable');
        }else{
            $(this).removeClass('Validform_error');
            $(this).siblings('.js-resetPassWorderror').removeClass('Validform_wrong').addClass('Validform_right');
            $('.js-subpassword').removeClass('l-btn-disable');
        }
    });
    //密码格式验证
    function checkPwdFormat(_sPwd) {
        var result = "200";
        if (_sPwd.length < 6) {
            //密码长度小于6
            result = "密码太短啦，还不到6位呢！";
            return result;
        } else if (_sPwd.length > 16) {
            //密码长度大于16
            result = "密码太长啦，已经超过16位啦！";
            return result;
        }
        var regqj = /[^\x00-\xff]/;   //[^\x00-\xff]全角字符   //[\u4e00-\u9fa5]汉字
        var regchina = /^[\u2E80-\uFE4F]+$/;
        var space = /[ ]/g;
        var str = _sPwd;
        if (regchina.test(str) || regqj.test(str) || space.test(str)) {
            result = "全角、中文、空格是不能用在密码中的~";
            return result;
        }
        var reghasNum = /[0-9]+/;
        var reghasABC = /[a-zA-Z]+/;
        var reghasXXX = /[_`~!@#$%^&*()+=|{}':;',\[\].<>~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]+/;
        var flag = 0;

        if (reghasNum.test(str)) {
            flag++;
        }
        if (reghasABC.test(str)) {
            flag++;
        }
        if (reghasXXX.test(str)) {
            flag++;
        }
        if (flag < 2) {
            result = "需要数字、字母或字符2种组合以上";
        }
        return result;
    }

    //第二步点击确定 修改密码
    var templet_ensureChanged = false;
    $('.js-resetPassWord').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');

        if(yanzhengtrue){
            $('.js-subpassword').unbind().bind('click',function(){
                if(templet_ensureChanged){
                    $('.js-resetPassWorderror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>上一次密码操作还未完成,请勿重复操作');
                    return;
                }
                var templet_newpassword=$('.js-resetPassWord').val();
                templet_ensureChanged=true;
                $.ajax({
                    dataType: "text",
                    url: siteConfig.userUrl+"/ids/ts/do_changePwd.jsp",
                    data: {
                        'password':templet_newpassword
                    },
                    success_cb: function(data){
                        if (jQuery.trim(data).length > 0) {
                            templet_ensureChanged = false;
                            if (jQuery.trim(data).indexOf("200")>-1) {
                                $('.js_memberRevisThree').addClass('member-revisemob-three').removeClass('member-revisemob-two').removeClass('member-revisemob-one');
                                $('.js-resetpassword').hide();
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
                            }else{
                                $('.js-resetPassWorderror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>修改密码失败');
                            }
                        }
                    },
                    error:function(data){
                        templet_ensureChanged = false
                    }
                });
            })
        }else{
            //    提示错误信息 验证码错误

            //禁止点击
            $('.js-subpassword').unbind().bind('click',function(){

                return false;
            })
        }
    })
})