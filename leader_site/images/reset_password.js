$(function() {
    init();

    $(window).resize(function() {
        init();
    });
    function init() {
        //密码进入事件,更改密码框类型为密码
        $("#js_loginPassword2").focus(function () {
            var $parent = $(this).parent();
            if($parent.hasClass("open")){
                return;
            }
            var password = $.trim($(this).val());
            if( "" == password || "6-16位，数字，字母或符合的组合" == password || null == password){
                $(this).addClass("o_df-hide");
                $("#js_loginPassword").removeClass("o_df-hide");
                $("#js_loginPassword").focus();
                return;
            }
            $(this).addClass("o_df-hide");
            $("#js_loginPassword").removeClass("o_df-hide").focus();
        });

        //密码离开事件,更改密码框类型为文本
        $("#js_loginPassword").blur(function () {
            var $parent = $(this).parent();
            if($parent.hasClass("open")){
                return;
            }
            var password = $.trim($(this).val());
            if( "" == password || "6-16位，数字，字母或符合的组合" == password || null == password){
                $("#js_loginPassword").addClass("o_df-hide");
                $("#js_loginPassword2").removeClass("o_df-hide").val("6-16位，数字，字母或符合的组合").css('color','rgb(204, 204, 204)');
            }
        });



        //判断为空
        function isNull(val){
            if(!val){
                return true;
            }
            if(val == null || val == "" || val == "undefined" || val == "null" || val == "NULL"){
                return true;
            }
            return false;
        }
        //第一步验证
        $("#js_resetCode,#js_resetName").keyup(function () {
            var resetName = $.trim($("#js_resetName").val());
            var resetNamePh = $.trim($("#js_resetName").attr("ph"));
            var resetCode = $.trim($("#js_resetCode").val());
            var resetCodePh = $.trim($("#js_resetCode").attr("ph"));
            if(!isNull(resetName) && resetName != resetNamePh && !isNull(resetCode) && resetCode != resetCodePh){
                $(".js_resetFirst").removeClass("l-btn-disable");
            }
        });
        $(".js_resetFirst").on('click',function () {
            if(!$(this).hasClass("l-btn-disable")) {
                $(".js_firstStep").addClass("o_df-hide");
                $(".js_twoStep").removeClass("o_df-hide");
            }
        })
        //第二步验证
        $("#js_resetCode2").keyup(function () {
            var resetCode2 = $.trim($("#js_resetCode2").val());
            var resetCodePh2 = $.trim($("#js_resetCode2").attr("ph"));
            if(!isNull(resetCode2) && resetCode2 != resetCodePh2){
                $(".js_resetTwo").removeClass("l-btn-disable");
            }
        });
        $(".js_resetTwo").on('click',function () {
            if(!$(this).hasClass("l-btn-disable")) {
                $(".js_twoStep").addClass("o_df-hide");
                $(".js_threeStep").removeClass("o_df-hide");
            }
        })
        //第三步验证
        $("#js_loginPassword").keyup(function () {
            var loginPassword = $.trim($("#js_loginPassword").val());
            var loginPasswordPh = $.trim($("#js_loginPassword").attr("ph"));
            if(!isNull(loginPassword) && loginPassword != loginPasswordPh){
                $(".js_resetFinish").removeClass("l-btn-disable");
            }
        });
        $(".js_resetFinish").on('click',function () {
            if(!$(this).hasClass("l-btn-disable")) {
                $(".js_resetboxForm").addClass("o_df-hide");
                $(".js_resetboxFormSuccess").removeClass("o_df-hide");
                sendTime();//倒计时
            }
        });


    }
    //密码明文和密文切换
    $(".js_passwordSwitch").oToggle(function (self) {
        self.removeClass("icon-eye-close-solid").addClass("icon-eye-open-solid");
        var passwordVal = $("#js_loginPassword").val();
        $("#js_loginPassword2").val(passwordVal).removeClass("o_df-hide").css({"color": "rgb(102, 102, 102)"});
        $("#js_loginPassword").addClass("o_df-hide");
        self.parent().addClass("open");
    },function (self) {
        self.addClass("icon-eye-close-solid").removeClass("icon-eye-open-solid");
        $("#js_loginPassword").removeClass("o_df-hide");
        $("#js_loginPassword2").addClass("o_df-hide");
        self.parent().removeClass("open");
        var passwordVal = $("#js_loginPassword2").val();
        $("#js_loginPassword").val(passwordVal)
    });
    //下拉菜单初始化
    $("#js_selectValidate").oSelect().init();

    //
    $('.js_resgoster_hover').hover(function(){
        $(this).siblings('.l-float-tops').show();
    },function(){
        $(this).siblings('.l-float-tops').hide();
    });


    btnTimeOut($('.js_registerContTime'),120,'后可重新发送');
    //倒计时
    var wait = 5;
    function sendTime() {
        if (wait == 0) {
            //window.location.href =""
            wait = 5;
        } else {

            $("#js_time").html(wait);
            wait--;
            var activecodetime= setTimeout(function() {
                sendTime();
            },1000);
        }
    }
});