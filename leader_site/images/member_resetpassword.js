/**
 * Created by 15610 on 2017/10/31.
 */
$(function(){

    //页面加载时调个人信息
    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/user/front/user/userInfo",
        data: "",
        login:true,
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {
                var templet_email=jQuery.trim(data.data.email);
                if (templet_email != null && templet_email != "") {
                    //self.location = '/security';
                }

                var templet_mobile=jQuery.trim(data.data.mobile);
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
            $(this).removeClass('Validform_error');
            $('.js_subimGetUp').removeClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_right').removeClass('Validform_wrong');
        }else{
            $(this).addClass('Validform_error');
            $('.js_subimGetUp').addClass('l-btn-disable');
            $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
            $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>请输入6位验证码')
        }
    })


    //第一步点击发送验证码
    $('.js-sendphonecode').unbind().click(function(){
        if($('.js-sendphonecode').hasClass('l-btn-disable'))
        {
            return;
        }
        btnTimeOut($('.js-sendphonecode'),'60',' 重新获取验证码');
        $.ajax({
            dataType: "text",
            url: siteConfig.userUrl+"/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'beforeBindEmailSendMobileCode'
            },
            success_cb: function(data){
                if (jQuery.trim(data).length > 0) {
                    if (jQuery.trim(data).indexOf("200")>-1) {
                    }
                    else{
                        $('.js-mobileCodeerror').addClass('Validform_wrong').removeClass('Validform_right');
                        $('.js-mobileCodeerror').html('<i class=\'iconfont icon-information-solid\'></i>发送验证码失败');
                    }
                }
            }
        })
    });


    //第二步确定按钮变亮

    $('.js-resetPassWord').blur(function(){
        var errorText = checkPwdFormat($(this).val());
        if(errorText!=200){
            $(this).addClass('Validform_error');
            $(this).siblings('.js-newEmailerror').html(errorText).removeClass('Validform_right').addClass('Validform_wrong');
            $('.js-subpassword').addClass('l-btn-disable').click(function(){
                return false;
            });
        }else{
            $(this).removeClass('Validform_error');
            $(this).siblings('.js-newEmailerror').removeClass('Validform_wrong').addClass('Validform_right');
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

})