$(function() {

    /**
     * 首页动画：线变化
     */
    function lineAnimate($ele,t){

        $ele.siblings().hide();

        setTimeout(function(){
            $ele.find('span').eq(0).animate({
                height: "100%"
            },t);
        },200);
        setTimeout(function(){
            $ele.find('span').eq(1).animate({
                height: "100%"
            },t);
        },400);
        setTimeout(function(){
            $ele.find('span').eq(2).animate({
                height: "100%"
            },t);
        },600);
        setTimeout(function(){
            $ele.find('span').eq(3).animate({
                height: "100%"
            },t);
        },800);
        setTimeout(function(){
            $ele.find('span').eq(4).animate({
                height: "100%"
            },t);
        },1000);
        var showTime = 200*($ele.find('span').size()+1);
        setTimeout(function(){
            $ele.find('.index_animate').css('z-index','-11');
            $ele.siblings(":not(.js_ignorAnimate)").fadeIn(1000);
            $ele.siblings(":not(.js_ignorAnimate)").css('z-index','1');
        },showTime);
    }

    lineAnimate($('.js_animateLine'),1000);



    $(window).resize(function() {
        init();
    });

    init();

    function init() {
        var screenWidth = document.body.offsetWidth;
        if(screenWidth <= 700){
            $('.js_footLink').hide();
        }else{
            $('.js_footLink').show();
            $('.js_footLink').removeClass('link_border');
        }
    }
    /**
     * 尾页 链接
     */
    $('.js_footLindBtn').on('click','a',function(){
        var $ele = $(this).parent().siblings($('.js_footLink'));
        $ele.toggle();
        $ele.toggleClass('link_border');

    });

    /**
     * 导航逻辑
     */

    //导航栏目显示隐藏
    $('.js_column').on('hover',function(){
        var index = parseInt($(this).attr('column'));
        $('.js_column_show').hide();
        $('.js_column_show').eq(index).show();
    });
    $('.js_column_show').on('mouseleave',function(){
        $(this).hide();
    });

    //搜索历史
    $('.js_searchHistory').bind('input propertychange',function(){
        var screenWidth = document.body.offsetWidth;
        if($(this).val()){
            if(screenWidth>1199){
                $('.js_searchBox_xl').show();
            }else{
                $('.js_searchBox_lg').show();
            }
            $('.js_searchBoxQuick_lg').hide();
        }else{
            $('.js_searchBox').hide();
            $('.js_searchBoxQuick_lg').show();
        }
    }).on('blur',function(){
        $('.js_searchBox').hide();
        $('.js_searchBoxQuick_lg').show();
    }).on('focus',function(){
        if($(this).val()){
            if(screenWidth>1199){
                $('.js_searchBox_xl').show();
            }else{
                $('.js_searchBox_lg').show();
            }
            $('.js_searchBoxQuick_lg').hide();
        }
    });

    //搜索--lg
    $('.js_search_lg').on('click',function(){
        $('.js_navSearchLgHide')
            .removeClass('o_lg-show')
            .removeClass('o_md-show')
            .removeClass('o_sm-show')
            .removeClass('o_xs-show');
        $('.js_navSearchLgHide').hide();
        $('.js_navSearchLg')
            .addClass('o_lg-show')
            .addClass('o_md-show')
            .addClass('o_sm-show')
            .addClass('o_xs-show');
        $('.js_navSearchLg').show();
    });

    //关闭搜索
    $('.js_navSearchClose').on('click', function(){

        $('.js_navSearchLg')
            .removeClass('o_lg-show')
            .removeClass('o_md-show')
            .removeClass('o_sm-show')
            .removeClass('o_xs-show');
        $('.js_navSearchLg').hide();

        $('.js_navSearchLgHide')
            .addClass('o_lg-show')
            .addClass('o_md-show')
            .addClass('o_sm-show')
            .addClass('o_xs-show');
        $('.js_navSearchLgHide').show();
        $('.js_navSearchLgHide.js_ignore').removeClass('o_lg-show').hide();

    });

    //展示导航菜单
    $('.js_menuShow').on('click',function(){
        if($(this).hasClass('icon-menu')){
            $(this).removeClass('icon-menu').addClass('icon-close');
            $('.js_navMdShow').show();
        }else{
            $(this).removeClass('icon-close').addClass('icon-menu');
            $('.js_navMdShow').hide();
        }
    });

    // userLoginStatus();

});
/**
 * 加载导航头的登录状态
 */
function userLoginStatus() {
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
            $("#header_logoutDiv").addClass("o_df-hide");
            $("#header_loginDiv").removeClass("o_df-hide");
            $("#header_logout").attr("href","http://tuser.tongshuai.com/ids/ts/logout.jsp?regFrom=tongshuai&returnUrl="+returnUrl)
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
                        $("#header_logoutDiv").addClass("o_df-hide");
                        $("#header_loginDiv").removeClass("o_df-hide");
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
        $("#header_login").attr("href","http://tuser.tongshuai.com/ids/ts/login.jsp?regFrom=tongshuai&returnUrl="+returnUrl);
        $("#header_reg").attr("href","http://tuser.tongshuai.com/ids/ts/reg.jsp?regFrom=tongshuai&returnUrl="+returnUrl)
    }
}
/**
 * 导航头_截取字符串，长度为字符为单位
 * @param str
 * @param len
 * @param hasDot
 * @returns {string}
 */
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
