$(function() {
    init();

    $(window).resize(function() {
        init();
    });
    function init() {

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        var loginHeight = $('.js_center').height();
        if (screenWidth <= 700) {
            setTimeout(function() {
                $('.js_center').css('margin-top',0);
            }, 10);
        } else  if (screenWidth <= 991 && screenWidth > 700) {
            setTimeout(function() {
                $('.js_center').css('margin-top',((screenHeight-loginHeight)/2-50)+'px');
            }, 10);
        } else {
            setTimeout(function() {
                $('.js_center').css('margin-top',((screenHeight-loginHeight)/2-30)+'px');
            }, 10);
        }

        //密码进入事件,更改密码框类型为密码
        $("#login_password2").focus(function () {
            $(this).addClass("o_df-hide");
            $("#login_password").removeClass("o_df-hide").focus();
        });
        //密码离开事件,更改密码框类型为文本
        $("#login_password").blur(function () {
            var password = $.trim($(this).val());
            if( "" == password || "6-16位，数字，字母或符合的组合" == password || null == password){
                $("#login_password").addClass("o_df-hide");
                $("#login_password2").removeClass("o_df-hide")
            }
        });
    }
})