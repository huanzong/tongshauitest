/**
 * Created by ly on 2017/10/13.
 */

$(function(){
    //前端判断是否登录

    if(!istrsidssdssotoken()){
        window.location.href ='/ids/ts/login.jsp'
    }

    //后端判断是否登录

    var grade=10
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/user/front/user/userInfo",
        data: "",
        error : function(XMLHttpRequest, textStatus, errorThrown){
        },
        success: function(returnData) {
            if (jQuery.trim(returnData).length > 0) {
                if (returnData.resultMsg == '用户未登录') {
                    window.location.href = '/ids/ts/login.jsp'
                }
            }
        }
    });

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
                //有没有邮箱
                var emailtrim = jQuery.trim(returnData.data.email)
                if (emailtrim == null || emailtrim == "") {
                    $('.js-emailsuccessfirst').html('')
                    $('.js-emailsuccessfirst').hide()
                    $('.js-emailfalsefirst').show()
                    $('.js-emailsuccesslast').hide()
                    $('.js-emailfalselast').show()
                }
                if (emailtrim != null || emailtrim != "") {
                    var grade = grade + 30
                    var email = emailtrim
                    var c = email.split("@");
                    var ci = c[0].length / 2
                    var emailnote = c[0].substr(0, ci) + '..' + '@' + c[1];
                    $('.js-emailsuccessfirst').html(emailnote)
                    $('.js-emailsuccessfirst').show()
                    $('.js-emailfalsefirst').hide()
                    $('.js-emailsuccesslast').show()
                    $('.js-emailfalselast').hide()
                }

                //有没有手机号
                var mobiletrim = jQuery.trim(returnData.data.mobile)
                if (mobiletrim == null || mobiletrim == "") {
                    $('.js-mobilesuccessfirst').html('')
                    $('.js-mobilesuccessfirst').hide()
                    $('.js-mobilefalsefirst').show()
                    $('.js-mobilesuccesslast').hide()
                    $('.js-mobilefalselast').show()
                }
                if (mobiletrim != null || mobiletrim != "") {
                    var grade = grade + 30
                    var mobile = mobiletrim.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");//手机号加*
                    if (emailtrim == null || emailtrim == "") {
                        $('.js-mobilesuccessfirst').html(mobile)
                        $('.js-mobilesuccessfirst').show()
                        $('.js-mobilefalsefirst').hide()
                        $('.js-mobilefalselast').hide()
                    }
                    else {
                        $('.js-mobilesuccessfirst').html(mobile)
                        $('.js-mobilesuccessfirst').show()
                        $('.js-mobilefalsefirst').hide()
                        $('.js-mobilesuccesslast').show()
                        $('.js-mobilefalselast').hide()
                    }
                }

                //最后登录时间
                //$('js-lastlogindate').html()

            }
        }
    });

    //验证密码强度
    $.ajax({
        type: "post",
        dataType: "json",
        url: '/ids/ts/userInfoManager.jsp',
        data:"editOperation=getPwdLevel",
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        success: function (returnData) {
            if(returnData.isSuccess){
                if(returnData.pwdType=="STRONG")
                { var grade=grade+30 }
                if(returnData.pwdType=="NORMAL")
                {  var grade=grade+20 }
                if(returnData.pwdType=="WEAK")
                { var grade=grade+10 }


            }
        }

    });

    //显示个人中心安全级别
    if(grade>=0 && grade<=33)
    {
        $('#js-slip').addClass('peril')
        $('#js-securitysetting').addClass('member-security-safeperiltext')
        $('#js-securitysetting').html('危险')
    }
    if(grade>=34 && grade<=66)
    {
        $('#js-slip').addClass('plain')
        $('#js-securitysetting').addClass('member-security-safeplaintext')
        $('#js-securitysetting').html('普通')
    }
    if(grade>=67 && grade<=90)
    {
        $('#js-slip').addClass('fine')
        $('#js-securitysetting').addClass('member-security-safefinetext')
        $('#js-securitysetting').html('良好')
    }
    if(grade>=91 && grade<=100)
    {
        $('#js-slip').addClass('excellent')
        $('#js-securitysetting').addClass('member-security-safeexcellenttext')
        $('#js-securitysetting').html('优秀')
    }

    // $('.js-emailsuccesslast').click(function(){//修改邮箱
    //     window.location.href =''
    // })
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