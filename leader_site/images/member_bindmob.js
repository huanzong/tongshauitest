/**
 * Created by 15610 on 2017/10/13.
 */
$(function(){

    //页面加载时
    //$.ajax({
    //    type: "POST",
    //    url: "",
    //    data: "",
    //    success: function(data){
    //        if(data){
    //        //
                $('.js-bingfalse').show();
                $('.js-bingsuccess').hide();
    //        }else{
    //            $('.js-contRightContBox').show();
    //            $('.member-security-bingsuccess').hide();
    //        }
    //    }
    //});



    $('.js-bindmobinput').blur(function(){
        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if(yanzhengtrue){
            $('.js-getinfo').removeClass('l-btn-disable').click(function(){
                yanzhengtrue = $('.js-bindmobinput').siblings('.Validform_checktip').hasClass('Validform_right');
                if(yanzhengtrue){
//                    $.ajax({
////                        发送验证码
                    console.log(11111)
//                    })
                }
            })
        }

    })
    //验证码成功后可点击提交
    $('.js-bindmobinput').blur(function(){
        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if(yanzhengtrue){
            //console.log(3333);
            $('.js-submintData').unbind().bind('click',function(){
                console.log('true');

//                $.ajax({
////                        发送验证码
//                })
            })
        }else{
        //    提示错误信息 验证码错误
            console.log(2222)

            //禁止点击
            $('.js-submintData').unbind().bind('click',function(){
                console.log('false');

                return false;
            })
        }

    })



    var mobile=$(".js-bindmobform").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });



    var yanzhengma=$(".js-bindmobyanzheng").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
//                "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/,
            "mobile":/^1[3|4|5|7|8][0-9]\d{4,8}$/
        },
        ajaxPost:true
    });

})