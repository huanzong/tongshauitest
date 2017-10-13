/**
 * Created by 15610 on 2017/10/13.
 */
$(function(){
    $('.js-bindmobinput').blur(function(){
        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if(yanzhengtrue){
            $('.js-getinfo').removeClass('l-btn-disable').click(function(){
                yanzhengtrue = $('.js-bindmobinput').siblings('.Validform_checktip').hasClass('Validform_right');
                if(yanzhengtrue){
                    $.ajax({
//                        发送验证码
                    })
                }
            })
        }

    })
    var mobile=$(".js-bindmobform").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        beforeCheck:function(curform){
            alert(2);
        },
        beforeSubmit:function(curform){
            alert(1);
        },
        ajaxPost:true

    });
    console.log(mobile);
    if(mobile==true){
        alert(5555);
    }

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