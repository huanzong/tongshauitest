/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function(){

    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        jumpToLoginPage();
    }
    if($.cookie('isAlterBind') == null ){
       document.cookie="isAlterBind=0;path=/";
    }

    //页面加载时调个人信息
    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/user/front/user/userInfo",
        data: "",
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {
                //有没有邮箱
                if (data.resultMsg == '用户未登录') {
                    window.location.href = '/ids/ts/login.jsp';
                }
                var templet_grade=10;
                var templet_emailtrim = jQuery.trim(data.data.email)
                if (templet_emailtrim == null || templet_emailtrim == "") {
                    $('.js-emailsuccessfirst').html('');
                    $('.js-emailsuccessfirst').hide();
                    $('.js-emailfalsefirst').show();
                    $('.js-emailsuccesslast').hide();
                    $('.js-emailfalselast').show();
                }
                if (templet_emailtrim != null && templet_emailtrim != "") {
                    templet_grade = templet_grade + 30;
                    var templet_email = templet_emailtrim;
                    var templet_split = templet_email.split("@");
                    var templet_hide = templet_split[0].length / 2;
                    var templet_emailnote = templet_split[0].substr(0, templet_hide) + '..' + '@' + templet_split[1];
                    $('.js-emailsuccessfirst').html(templet_emailnote);
                    $('.js-emailsuccessfirst').show();
                    $('.js-emailfalsefirst').hide();
                    $('.js-emailsuccesslast').show();
                    $('.js-emailfalselast').hide();
                }

                //有没有手机号
                var templet_mobiletrim = jQuery.trim(data.data.mobile);
                if (templet_mobiletrim == null || templet_mobiletrim == "") {
                    $('.js-mobilesuccessfirst').html('');
                    $('.js-mobilesuccessfirst').hide();
                    $('.js-mobilefalsefirst').show();
                    $('.js-mobilesuccesslast').hide();
                    $('.js-mobilefalselast').show();
                }
                if (templet_mobiletrim != null && templet_mobiletrim != "") {
                    templet_grade = templet_grade + 30;
                    var templet_mobile = templet_mobiletrim.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");//手机号加*
                    if (templet_mobile == null || templet_mobile == "") {
                        $('.js-mobilesuccessfirst').html(templet_mobile);
                        $('.js-mobilesuccessfirst').show();
                        $('.js-mobilefalsefirst').hide();
                        $('.js-mobilefalselast').hide();
                    }
                    else {
                        $('.js-mobilesuccessfirst').html(templet_mobile);
                        $('.js-mobilesuccessfirst').show();
                        $('.js-mobilefalsefirst').hide();
                        $('.js-mobilesuccesslast').show();
                        $('.js-mobilefalselast').hide();
                    }
                }

                //最后登录时间
                var templet_time = jQuery.trim(data.data.lastLoginDate);
                var templet_timechange=getLocalTime(templet_time)
                $('#js-lastlogindate').html('上次登录时间：'+ templet_timechange)


                //验证密码强度
                $.ajax({
                    url: siteConfig.userUrl+'/ids/ts/userInfoManager.jsp',
                    data:"editOperation=getPwdLevel",
                    success_cb: function (data) {
                        if(data.isSuccess){
                            if(data.pwdType=="STRONG")
                            { templet_grade=templet_grade+30; }
                            if(data.pwdType=="NORMAL")
                            {  templet_grade=templet_grade+20; }
                            if(data.pwdType=="WEAK")
                            { templet_grade=templet_grade+10; }

                            //显示个人中心安全级别
                            if(templet_grade>=0 && templet_grade<=33)
                            {
                                $('#js-slip').addClass('peril');
                                $('#js-securitysetting').addClass('member-security-safeperiltext');
                                $('#js-securitysetting').html('危险');
                            }
                            if(templet_grade>=34 && templet_grade<=66)
                            {
                                $('#js-slip').addClass('plain');
                                $('#js-securitysetting').addClass('member-security-safeplaintext');
                                $('#js-securitysetting').html('普通');
                            }
                            if(templet_grade>=67 && templet_grade<=90)
                            {
                                $('#js-slip').addClass('fine');
                                $('#js-securitysetting').addClass('member-security-safefinetext');
                                $('#js-securitysetting').html('良好');
                            }
                            if(templet_grade>=91 && templet_grade<=100)
                            {
                                $('#js-slip').addClass('excellent');
                                $('#js-securitysetting').addClass('member-security-safeexcellenttext');
                                $('#js-securitysetting').html('优秀');
                            }
                        }
                    }
                });
            }
        }
    });

    $('.js-emailsuccesslast').click(function(){//修改邮箱
        window.location.href ='/security/revisemail_96.shtml'
    })
    $('.js-emailfalselast').click(function(){//绑定邮箱
        window.location.href ='/security/bindemial_69.shtml'
    })
    $('.js-mobilesuccesslast').click(function(){//解绑手机
        window.location.href ='/security/unbindmob_51.shtml'
    })
    $('.js-mobilefalselast').click(function(){//绑定手机
        window.location.href ='/security/bindmob_68.shtml'
    })
})