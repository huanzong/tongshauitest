/**
 * Created by 15610 on 2017/10/16.
 */
//option value:1--手机号 2——邮箱

$(function(){
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/user/front/user/userInfo",
        data: "",
        success: function(returnData){
            if(returnData.cellPhone==null || returnData.cellPhone==""){
                $('.js-unbingsuccess').show();
                $('.js-unbingfalse').hide();
            }else{
                var call=returnData.cellPhone
                var callphone = call.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");//手机号加*

                $("#js-logincallphone").html(callphone)
                $("#js_unbindmob").attr('autotext',callphone)
                $("#js_unbindmob").append("<option value='1'>手机（"+callphone+"）</option>")

                if(returnData.email==null || returnData.email==""){}
                else{
                    var email=returnData.email()
                    var c=email.split("@");
                    var ci=c[0].length/2
                    var emailnote=c[0].substr(0,ci)+'..'+'@'+c[1]; //emai加.
                    $("#js_unbindmob").append("<option value='2'>邮箱（"+callphone+"）</option>")

                }
                $("#js_unbindmob").oSelect().init();
                $('.js-unbingfalse').show();
                $('.js-unbingsuccess').hide();

            }
        }
    });


//通过点击不同的下拉列表框 转换手机和邮箱
    $("#js_unbindmob").change(function() { SelectChange(); });
    function SelectChange(){

        var val=$("#js_unbindmob").val();
        if(val==1)
        {
            $('.js_mobileCodeYz').attr('placeholder','短信验证码')
            $('.js-sendmobile').show();
            $('.js-sendmail').hide();

        }
        if(val==2)
        {
            $('.js_mobileCodeYz').attr('placeholder','邮箱验证码')
            $('.js-sendmobile').hide();
            $('.js-sendmail').show();
        }
    }
//点击发送短信验证码
    $(".js-sendmobile").click(function(){

        var param
        var pretermit=$('#js_unbindmob').val()
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
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送短信的手机号不是当前用户的')
                    }
                    else if (jQuery.trim(returnData).indexOf("create_confirm_error")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送失败')
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
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送邮件的手机号不是当前用户的')
                    }
                    else if (jQuery.trim(returnData).indexOf("create_confirm_error")>-1){
                        $('.js_subimGetUp').addClass('l-btn-disable');
                        $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>发送失败')
                    }
                }
            }

        })


    })


    //点击确定按钮
    $(".js_subimGetUp") .unbind().bind('click',function(){

        var notclick = $(this).hasClass('l-btn-disable')

        if(!notclick)
        {

            var param //下拉框的text
            var code=$('.js_mobileCodeYz').val(); //验证码
            var pretermit=$('#js_unbindmob').val(); //下拉的value
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
                    'editOperation':'verify',
                    'param':param,
                    'code':code
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                },
                success: function(returnData){
                    if (jQuery.trim(returnData).length > 0) {
                        if (jQuery.trim(returnData).indexOf("200")>-1) {
                            $('.js-unbingfalse').hide();
                            $('.js-unbingsuccess').show();
                        }
                        else if (jQuery.trim(returnData).indexOf("code_can_not_be_null")>-1){

                            $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空')

                        }
                        else if (jQuery.trim(returnData).indexOf("unbind_code_can_not_be_select")>-1 || jQuery.trim(returnData).indexOf("unbind_mcode_is_illegal")>-1 ){

                            $('.js-error').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')

                        }


                    }
                }

            })

        }

    })

})





//解绑手机号码验证
$("#js_unbindmob").oSelect().init();
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