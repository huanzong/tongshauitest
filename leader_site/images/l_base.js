$(function () {

    /**
     * 首页动画：线变化
     */
    function lineAnimate($ele, t) {

        // $ele.siblings().hide();
        $ele.siblings().addClass('l-opacity0');

        setTimeout(function () {
            $ele.find('span').eq(0).animate({
                height: "100%"
            }, t);
        }, 200);
        setTimeout(function () {
            $ele.find('span').eq(1).animate({
                height: "100%"
            }, t);
        }, 400);
        setTimeout(function () {
            $ele.find('span').eq(2).animate({
                height: "100%"
            }, t);
        }, 600);
        setTimeout(function () {
            $ele.find('span').eq(3).animate({
                height: "100%"
            }, t);
        }, 800);
        setTimeout(function () {
            $ele.find('span').eq(4).animate({
                height: "100%"
            }, t);
        }, 1000);
        var showTime = 200 * ($ele.find('span').size() + 1);
        setTimeout(function () {
            $ele.find('.index_animate').css('z-index', '-11');
            // $ele.siblings(":not(.js_ignorAnimate)").removeClass('l-opacity0');
            $ele.siblings(":not(.js_ignorAnimate)").animate({
                'filter':'alpha(opacity=1)',
                '-moz-opacity':'1',
                '-khtml-opacity':'1',
                'opacity': '1'
            }, t);
            // $ele.siblings(":not(.js_ignorAnimate)").fadeIn(1000);
            // $ele.siblings(":not(.js_ignorAnimate)").css('z-index', '1');
        }, showTime);
    }

    lineAnimate($('.js_animateLine'), 1000);


    $(window).resize(function () {
        init();
    });

    init();

    function init() {
        var screenWidth = document.body.offsetWidth;
        if (screenWidth <= 700) {
            $('.js_footLink').hide();
            $(".js_footmenuShow").removeClass('icon-close').addClass('icon-plus');
        } else {
            $('.js_footLink').show();
            $('.js_footLink').removeClass('link_border');
        }
    }

    /**
     * 产品页-公共尾部 链接
     */
    $('.js_footLindBtn').on('click', 'a', function () {
        var $ele = $(this).parent().siblings($('.js_footLink'));
        $ele.toggle();
        $ele.toggleClass('link_border');
    });
    // 展示底部导航菜单
    $('.js_footLindBtn').on('click', 'a', function () {
        if ($(this).hasClass('icon-plus')) {
            $(this).removeClass('icon-plus').addClass('icon-close');
            // $('.js_navMdShow').show();
        } else {
            $(this).removeClass('icon-close').addClass('icon-plus');
            // $('.js_navMdShow').hide();
        }
    });

    /**
     * 导航逻辑
     */

    //导航栏目显示隐藏
    $('.js_column').on('hover', function () {
        var index = parseInt($(this).attr('column'));
        $('.js_column_show').hide();
        $('.js_column_show').eq(index).show();
    });
    $('.js_column_show').on('mouseleave', function () {
        $(this).hide();
    });

    //搜索历史
    // $('.js_searchHistory').bind('input propertychange', function () {
    //     var screenWidth = document.body.offsetWidth;
    //     if ($(this).val()) {
    //         if (screenWidth > 1199) {
    //             $('.js_searchBox_xl').show();
    //         } else {
    //             $('.js_searchBox_lg').show();
    //         }
    //         $('.js_searchBoxQuick_lg').hide();
    //     } else {
    //         $('.js_searchBox').hide();
    //         $('.js_searchBoxQuick_lg').show();
    //     }
    // }).on('blur', function () {
    //     $('.js_searchBox').hide();
    //     $('.js_searchBoxQuick_lg').show();
    // }).on('focus', function () {
    //     if ($(this).val()) {
    //         if (screenWidth > 1199) {
    //             $('.js_searchBox_xl').show();
    //         } else {
    //             $('.js_searchBox_lg').show();
    //         }
    //         $('.js_searchBoxQuick_lg').hide();
    //     }
    // });

    //隐藏搜索历史浮层-隐藏用户消息浮层xs
    $('body').on('click', function (e) {
        if(!$(e.target).hasClass('js_userMsgXs')){
            $('.js_usermsg_xs').hide();
        }
        //搜索历史浮层点击按钮确认
        if($(e.target).hasClass('js_searchHistory')){
            return false;
        }
        $('.js_searchBox').hide();
        $('.js_searchBoxQuick_lg').show();

    });

    //搜索--lg
    // $('.js_search_lg').on('click', function () {
    //     $('.js_navSearchLgHide')
    //         .removeClass('o_lg-show')
    //         .removeClass('o_md-show')
    //         .removeClass('o_sm-show')
    //         .removeClass('o_xs-show');
    //     $('.js_navSearchLgHide').hide();
    //     $('.js_navSearchLg')
    //         .addClass('o_lg-show')
    //         .addClass('o_md-show')
    //         .addClass('o_sm-show')
    //         .addClass('o_xs-show');
    //     $('.js_navSearchLg').show();
    // });

    //关闭搜索
    // $('.js_navSearchClose').on('click', function () {
    //
    //     $('.js_navSearchLg')
    //         .removeClass('o_lg-show')
    //         .removeClass('o_md-show')
    //         .removeClass('o_sm-show')
    //         .removeClass('o_xs-show');
    //     $('.js_navSearchLg').hide();
    //
    //     $('.js_navSearchLgHide')
    //         .addClass('o_lg-show')
    //         .addClass('o_md-show')
    //         .addClass('o_sm-show')
    //         .addClass('o_xs-show');
    //     $('.js_navSearchLgHide').show();
    //     $('.js_navSearchLgHide.js_ignore').removeClass('o_lg-show').hide();
    //
    // });

    //展示导航菜单
    $('.js_menuShow').on('click', function () {
        if ($(this).hasClass('icon-menu')) {
            $(this).removeClass('icon-menu').addClass('icon-close');
            $('.js_navMdShow').show();
        } else {
            $(this).removeClass('icon-close').addClass('icon-menu');
            $('.js_navMdShow').hide();
        }
    });

    //移动端，点击轻产品，展示二级菜单 ms sm xs
    $('.js_nav-md').on('click',function(){
        if($(this).attr('data-show')==1){
            $(this).siblings('.js_navMdboxSecond').show();
            $(this).attr('data-show',0).find('i').removeClass('icon-plus').addClass('icon-minus');
        }else{
            $(this).siblings('.js_navMdboxSecond').hide();
            $(this).attr('data-show',1).find('i').removeClass('icon-minus').addClass('icon-plus');
        }
        
    });

    //xs分辨率，展示用户消息列表
    $('.js_userMsgXs').on('click',function(){
        if(document.body.offsetWidth<=575){
            $('.js_usermsg_xs').show();
        }
    });

    userLoginStatus();

});
/**
 * ajax初始化
 */
jQuery.ajaxSetup({
    type: "post",
    dataType: "json",
    cache: false,
    box_obj: null,
    scroll: null,
    beforeSend: function(request) {
        //需要登录校验，且用户未登录
        if (this.login && !istrsidssdssotoken()) {
            request.abort();
        }
        //csrf校验
        if(this.csrf){
            var crm = Math.random();
            $.cookie('crm', crm);
            this.url = this.url+'?cch='+crm;
        }

        //contentType: "application/json; charset=utf-8",
        if (this.applicationType){
            console.log('888');
            request.setRequestHeader("Content-Type", "application/json; charset=utf-8")
        }
    },
    success: function(data) {
        if (data.isSuccess != undefined && istrsidssdssotoken()) {
            if (!data.isSuccess) {

            }
        }

        if (this.success_cb) {
            this.success_cb(data);
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {

        if (this.error_cb) {
            this.error_cb(jqXHR, textStatus, errorThrown);
        }
    }
});

//加载导航头的登录状态
function userLoginStatus() {
    var regFrom = "tongshuai";
    var screenWidth = document.body.offsetWidth;
    if (screenWidth < 1120) {
        regFrom = "tsmobile";
    }
    var returnUrl = window.location.href;
    //var ehaier=$.cookie("EHaierSSOToken");//商城的cookie
    var trsidssdssotoken = "ssotoken";//同域Cookie
    var sdssotoken = $.cookie(trsidssdssotoken);
    if (sdssotoken != null && sdssotoken != '') {
        var loginUserName = "tongshuaiuser";//当前登录用户
        var ck_loginUserName = $.cookie(loginUserName);
        if (ck_loginUserName != null && ck_loginUserName != '') {
            var logusername = subHZString(ck_loginUserName, 7, '...');
            //从cookie中读取当前登录用户
            $("#header_loginDiv .login span").before(logusername);
            $("#header_logoutDiv,#header_logoutA").addClass("o_df-hide");
            $("#header_loginDiv,#header_loginDiv2").removeClass("o_df-hide");
            $("#header_logout,#header_logout2").attr("href", "http://tuser.tongshuai.com/ids/ts/logout.jsp?regFrom=" + regFrom + "&returnUrl=" + returnUrl)
        } else {
            //同域cookie存在，但是 haieruser 没有取出值，去请求haier_ssosession.jsp获取当前登录用户
            var surl = "/ids/ts/ssosession.jsp";
            $.ajax({
                type: "post",
                dataType: "text",
                url: surl,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
                success: function (returnData) {
                    if ($.trim(returnData).length > 0) {
                        var loginUser = $.trim(returnData);
                        var logusername = subHZString(loginUser, 7, '...');
                        //从cookie中读取当前登录用户
                        $("#header_loginDiv .login span").before(logusername);
                        $("#header_logoutDiv,#header_logoutA").addClass("o_df-hide");
                        $("#header_loginDiv,#header_loginDiv2").removeClass("o_df-hide");
                        $("#header_logout,#header_logout2").attr("href", "http://tuser.tongshuai.com/ids/ts/logout.jsp?regFrom=" + regFrom + "&returnUrl=" + returnUrl)
                    } else {
                        // if (window.innerWidth == undefined || window.innerWidth >= 768) {
                        //     if (returnUrl.indexOf("club.casarte.com") > -1) {
                        //         var loginurl = $("#bflog").find('a:eq(1)').attr("href") + "?regFrom=casarteclub&returnUrl=" + encodeURIComponent(returnUrl);
                        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarteclub";
                        //     } else if (returnUrl.indexOf("www.casarte.com") > -1) {
                        //         var loginurl = $("#bflog").find('a:eq(1)').attr("href") + "?regFrom=casarte&returnUrl=" + encodeURIComponent(returnUrl);
                        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarte";
                        //     } else {
                        //         var loginurl = $("#bflog").find('a:eq(1)').attr("href") + "?regFrom=casarte&returnUrl=" + encodeURIComponent(returnUrl);
                        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarte";
                        //     }
                        //     $("#bflog").find('a:eq(1)').attr("href", loginurl);
                        //     $("#bflog").find('a:eq(2)').attr("href", registerurl);
                        // } else {
                        //     if (returnUrl.indexOf("club.casarte.com") > -1) {
                        //         var loginurl = $("#bflog").find('a:eq(0)').attr("href") + "?regFrom=casarteclubmobile&returnUrl=" + encodeURIComponent(returnUrl);
                        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarteclubmobile";
                        //     } else if (returnUrl.indexOf("www.casarte.com") > -1) {
                        //         var loginurl = $("#bflog").find('a:eq(0)').attr("href") + "?regFrom=camobile&returnUrl=" + encodeURIComponent(returnUrl);
                        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarte";
                        //     } else {
                        //         var loginurl = $("#bflog").find('a:eq(0)').attr("href") + "?regFrom=camobile&returnUrl=" + encodeURIComponent(returnUrl);
                        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarte";
                        //     }
                        //     $("#bflog").find('a:eq(0)').attr("href", loginurl);
                        //     $("#bflog").find('a:eq(2)').attr("href", registerurl);
                        // }
                        // $("#aflog").css("display", "none");
                        // $("#mflog").css("display", "none");
                        // $("#bflog").css("display", "inline-block");

                    }
                }
            });
        }
    } else {
        // if (ehaier != null && ehaier != '') {//商城的cookie
        //     /*0711-修改*/
        //     if (window.innerWidth == undefined || window.innerWidth >= 768) {
        //         if (returnUrl.indexOf("club.casarte.com") > -1) {
        //             window.location.href = "http://login.casarte.com/ids/login.jsp?regFrom=casarteclub&returnUrl=" + returnUrl;
        //         } else if (returnUrl.indexOf("www.casarte.com") > -1) {
        //             window.location.href = "http://login.casarte.com/ids/login.jsp?regFrom=casarte&returnUrl=" + returnUrl;
        //         } else if (returnUrl.indexOf("testuser.casarte.com") > -1) {
        //             window.location.href = "http://testuser.casarte.com/ids/login.jsp?regFrom=casarte&returnUrl=" + returnUrl;
        //         }
        //     } else {
        //         if (returnUrl.indexOf("club.casarte.com") > -1) {
        //             window.location.href = "http://login.casarte.com/ids/login.jsp?regFrom=casarteclubmobile&returnUrl=" + returnUrl;
        //         } else if (returnUrl.indexOf("www.casarte.com") > -1) {
        //             window.location.href = "http://login.casarte.com/ids/login.jsp?regFrom=camobile&returnUrl=" + returnUrl;
        //         } else if (returnUrl.indexOf("testuser.casarte.com") > -1) {
        //             window.location.href = "http://testuser.casarte.com/ids/login.jsp?regFrom=camobile&returnUrl=" + returnUrl;
        //         }
        //     }
        //
        // }
        // if (window.innerWidth == undefined || window.innerWidth >= 768) {
        //     /*0711-修改*/
        //     if (returnUrl.indexOf("club.casarte.com") > -1) {
        //         var loginurl = $("#bflog").find('a:eq(1)').attr("href") + "?regFrom=casarteclub&returnUrl=" + encodeURIComponent(returnUrl);
        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarteclub&returnUrl=" + encodeURIComponent(returnUrl);
        //     } else if (returnUrl.indexOf("www.casarte.com") > -1) {
        //         var loginurl = $("#bflog").find('a:eq(1)').attr("href") + "?regFrom=casarte&returnUrl=" + encodeURIComponent(returnUrl);
        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarte&returnUrl=" + encodeURIComponent(returnUrl);
        //     } else {
        //         var loginurl = $("#bflog").find('a:eq(1)').attr("href") + "?regFrom=casarte&returnUrl=" + encodeURIComponent(returnUrl);
        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarte&returnUrl=" + encodeURIComponent(returnUrl);
        //     }
        //     $("#bflog").find('a:eq(1)').attr("href", loginurl);
        //     $("#bflog").find('a:eq(2)').attr("href", registerurl);
        // } else {
        //     /*0711-修改*/
        //     if (returnUrl.indexOf("club.casarte.com") > -1) {
        //         var loginurl = $("#bflog").find('a:eq(0)').attr("href") + "?regFrom=casarteclubmobile&returnUrl=" + encodeURIComponent(returnUrl);
        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=casarteclubmobile&returnUrl=" + encodeURIComponent(returnUrl);
        //     } else if (returnUrl.indexOf("www.casarte.com") > -1) {
        //         var loginurl = $("#bflog").find('a:eq(0)').attr("href") + "?regFrom=camobile&returnUrl=" + encodeURIComponent(returnUrl);
        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=camobile&returnUrl=" + encodeURIComponent(returnUrl);
        //     } else {
        //         var loginurl = $("#bflog").find('a:eq(0)').attr("href") + "?regFrom=camobile&returnUrl=" + encodeURIComponent(returnUrl);
        //         var registerurl = $("#bflog").find('a:eq(2)').attr("href") + "?regFrom=camobile&returnUrl=" + encodeURIComponent(returnUrl);
        //     }
        //     $("#bflog").find('a:eq(0)').attr("href", loginurl);
        //     $("#bflog").find('a:eq(2)').attr("href", registerurl);
        // }
        // // var loginurl=$("#bflog").find('a:eq(1)').attr("href");
        //
        // $("#bflog").css("display", "inline-block");
        // $("#aflog").css("display", "none");
        // $("#mflog").css("display", "none");

        //监测是否自动登陆
        // var autologin = $.cookie("idsALInfo");
        // if (autologin != null && autologin != '') {
        //     $.ajax({
        //         type: "post",
        //         dataType: "text",
        //         url: "/ids/ts/autoLogin.jsp",
        //         error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         },
        //         success: function (returnData) {
        //             userloginstatus();
        //         }
        //     });
        // }
        $("#header_login,#header_logoutDiv .nav-chart,#header_logoutA").attr("href", "http://tuser.tongshuai.com/ids/ts/login.jsp?regFrom=" + regFrom + "&returnUrl=" + returnUrl);
        $("#header_reg").attr("href", "http://tuser.tongshuai.com/ids/ts/reg.jsp?regFrom=" + regFrom + "&returnUrl=" + returnUrl)
    }
}
//导航头_截取字符串，长度以字符为单位
function subHZString(str, len, hasDot) {
    var newLength = 0;
    var newStr = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = '';
    var strLength = str.replace(chineseRegex, '**').length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (strLength > len) {
        newStr += hasDot;
    }
    return newStr;
}


//时间戳转换日期 时间戳，选格式，时间戳类型
function getLocalTime(nS,val,type) {
    if(type==2)
    {
        var timestamp4 =new Date(parseInt(nS) * 1000);
    }
    else
    {
        var timestamp4 =new Date(parseInt(nS));
    }

    var y = timestamp4.getFullYear();
    var m = timestamp4.getMonth() + 1;
    var d = timestamp4.getDate();
    if(val == 2){
        return y + "." + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d) ;
    }else if(val == 3){
        return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) ;
    }else if(val == 4){
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) ;
    }
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + timestamp4.toTimeString().substr(0, 8);

}

//判断当前是否存在同域cookie
function istrsidssdssotoken(){
    var trsidssdssotoken = "ssotoken";//同域Cookie
    var sdssotoken = $.cookie(trsidssdssotoken);
    if(sdssotoken!=null || window.location.host.indexOf('localhost')>=0){
        return true;
    }else{
        return false;
    }
}

//跳转到登录页面
function jumpToLoginPage(){
    var returnUrl = window.location.href;
    if(!istrsidssdssotoken()){
        var returnUrl = window.location.href;
        window.location.href ='/ids/ts/login.jsp?returnUrl=' +returnUrl;
    }
}
