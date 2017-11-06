$(function () {

    //前台判断是否登陆
    if (!istrsidssdssotoken()) {
        jumpToLoginPage()
    }

    //计算账号安全 读取用户信息
    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/user/front/user/userInfo",
        data: "",
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {

                //名字
                var templet_loginName=jQuery.trim(data.data.loginName);
                $('.js_navUserId').html(templet_loginName);

                //头像
                if(data.data.headUrl==null || data.data.headUrl=='' || data.data.headUrl=='null'){
                    $(".js-imghead").attr("src",'/images/user_img.jpg');
                }
                else{
                    $(".js-imghead").attr("src",data.data.headUrl);
                }




                //有没有邮箱
                var templet_grade=10;
                var templet_emailtrim = jQuery.trim(data.data.email);
                if (templet_emailtrim != null && templet_emailtrim != "" && templet_emailtrim != "null") {
                    templet_grade = templet_grade + 30;
                }

                //有没有手机号
                var templet_mobiletrim = jQuery.trim(data.data.mobile);
                if (templet_mobiletrim != null && templet_mobiletrim != ""&& templet_mobiletrim != "null") {
                    templet_grade = templet_grade + 30;
                }

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
                                $('#js-securitysetting').addClass('member-security-safeperiltext').removeClass('member-security-safeplaintext').removeClass('member-security-safefinetext').removeClass('member-security-safeexcellenttext');
                                $('#js-securitysetting').html('危险');
                            }
                            if(templet_grade>=34 && templet_grade<=66)
                            {
                                $('#js-securitysetting').addClass('member-security-safeplaintext').removeClass('member-security-safeperiltext').removeClass('member-security-safefinetext').removeClass('member-security-safeexcellenttext');
                                $('#js-securitysetting').html('普通');
                            }
                            if(templet_grade>=67 && templet_grade<=90)
                            {
                                $('#js-securitysetting').addClass('member-security-safefinetext').removeClass('member-security-safeperiltext').removeClass('member-security-safeplaintext').removeClass('member-security-safeexcellenttext');
                                $('#js-securitysetting').html('良好');
                            }
                            if(templet_grade>=91 && templet_grade<=100)
                            {
                                $('#js-securitysetting').addClass('member-security-safeexcellenttext').removeClass('member-security-safeperiltext').removeClass('member-security-safeplaintext').removeClass('member-security-safefinetext');;
                                $('#js-securitysetting').html('优秀');
                            }
                        }
                    }
                });
            }
        }
    });

})
