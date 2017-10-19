/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-安全设置-解绑手机
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
//option value:1--手机号 2——邮箱

$(function(){
    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        jumpToLoginPage()
    }

    $.ajax({
        type: "get",
        dataType: "json",
        url: "/user/front/user/userInfo",
        data: "",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        success: function(returnData){
            if (jQuery.trim(returnData).length > 0) {
                if(returnData.resultMsg=='用户未登录'){
                    window.location.href ='/ids/ts/login.jsp';
                }

                var templet_call=jQuery.trim(returnData.data.mobile);
                if(templet_call==null || templet_call==""){
                    self.location = '/security';
                }else{

                    var templet_callphone = templet_call.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");//手机号加*

                    $("#js-logincallphone").html(templet_callphone);
                    $("#js_unbindmob").attr('autotext',"手机（"+templet_callphone+"）");
                    $("#js_unbindmob").append("<option value='1'>手机（"+templet_callphone+"）</option>");

                    var templet_email=jQuery.trim(returnData.data.email);
                    if(templet_email==null || templet_email==""){
                        self.location = '/security';
                    }
                    else{
                        var templet_split = templet_email.split("@");
                        var templet_hide = templet_split[0].length / 2;
                        var templet_emailnote = templet_split[0].substr(0,templet_hide) + '..' + '@' + templet_split[1]; //emai加.
                        $("#js_unbindmob").append("<option value='2'>邮箱（"+ templet_emailnote +"）</option>");
                    }
                    $("#js_unbindmob").oSelect().init();
                    $('.js-unbingfalse').show();
                    $('.js-unbingsuccess').hide();

                }
            }
        }
    });


//通过点击不同的下拉列表框 转换手机和邮箱
    $("#js_unbindmob").change(function() { SelectChange(); });
    function SelectChange(){

        var val=$("#js_unbindmob").val();
        if(val==1)
        {
            $('.js_mobileCodeYz').attr('placeholder','短信验证码');
            $('.js-sendmobile').show();
            $('.js-sendmail').hide();

        }
        if(val==2)
        {
            $('.js_mobileCodeYz').attr('placeholder','邮箱验证码');
            $('.js-sendmobile').hide();
            $('.js-sendmail').show();
        }
    }
//点击发送短信验证码
    $(".js-sendmobile").click(function(){

        var param;
        var pretermit=$('#js_unbindmob').val();
        if(pretermit==0){

            param=$('#js_unbindmob option[value=1]').text();
        }
        else{
            param=$('#js_unbindmob').find("option:selected").text();
        }


        $.ajax({

            type: "post",
            dataType: "text",
            url: "/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'sendUnbindMobileCode',
                'param':param
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
            },
            success: function(returnData){
                if (jQuery.trim(returnData).length > 0) {
                    if (jQuery.trim(returnData).indexOf("200")>-1) {}
                    else if (jQuery.trim(returnData).indexOf("user_is_illegal")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送短信的手机号不是当前用户的');
                    }
                    else if (jQuery.trim(returnData).indexOf("create_confirm_error")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
                    }
                }
            }

        })


    })
//点击发送邮箱验证码
    $(".js-sendmail").click(function(){
        param=$('#js_unbindmob').find("option:selected").text();
        $.ajax({

            type: "post",
            dataType: "text",
            url: "/ids/ts/userInfoManager.jsp",
            data: {
                'editOperation':'sendUnbindEmailCode',
                'param':param
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
            },
            success: function(returnData){
                if (jQuery.trim(returnData).length > 0) {
                    if (jQuery.trim(returnData).indexOf("200")>-1) {}
                    else if (jQuery.trim(returnData).indexOf("user_is_illegal")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送邮件的手机号不是当前用户的');
                    }
                    else if (jQuery.trim(returnData).indexOf("create_confirm_error")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送失败');
                    }
                }
            }

        })


    })


    //点击确定按钮
    $(".js_subimGetUp") .unbind().bind('click',function(){

        var templet_notclick = $(this).hasClass('l-btn-disable');

        if(!templet_notclick)
        {

            var templet_param;
            var templet_code=$('.js_mobileCodeYz').val(); //验证码
            var templet_pretermit=$('#js_unbindmob').val(); //下拉的value
            if(templet_pretermit=='0' || templet_pretermit=='1'){

                templet_param='mobile';
            }
            if(templet_pretermit=='2' ){
                templet_param='email';
            }

            $.ajax({
                type: "post",
                dataType: "text",
                url: "/ids/ts/userInfoManager.jsp",
                data: {
                    'editOperation':'verify',
                    'param':templet_param,
                    'code':templet_code
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                },
                success: function(returnData){
                    if (jQuery.trim(returnData).length > 0) {
                        if (jQuery.trim(returnData).indexOf("200")>-1) {
                            $('.js-unbingfalse').hide();
                            $('.js-unbingsuccess').show();
                            document.cookie="isAlterBind=1";

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
                        else if (jQuery.trim(returnData).indexOf("code_can_not_be_null")>-1){

                            $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空');

                        }
                        else if (jQuery.trim(returnData).indexOf("unbind_code_can_not_be_select")>-1 || jQuery.trim(returnData).indexOf("unbind_mcode_is_illegal")>-1 ){

                            $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误');

                        }


                    }
                }

            })

        }

    })

})





//解绑手机号码验证

$('.js_mobileCodeYz').blur(function(){

    if($(this).val().length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
        $('.js-error').html('');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js-error').html('');
        $('.js_subimGetUp').click(function(){
            console.log(1111);
            return false;
        })
    }
})

//解绑邮箱验证

$("#js_unbindmail").oSelect().init();
$('.js_emailCodeYz').blur(function(){
    if($(this).val().length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js_subimGetUp').click(function(){
            console.log(1111);
            return false;
        })
    }
})