/**
 * Created by 15610 on 2017/11/6.
 */
$(function(){
            //静态页面测试添加，正常后隐藏
        $("#js_unbindmob").attr('autotext',"邮箱（"+'1511***@163.com'+"）");
        $("#js_unbindmob").append("<option value='1'>邮箱（1511***@163.com）</option>");
        $("#js_unbindmob").append("<option value='2'>手机（"+"186****1616"+"）</option>");
        $("#js_unbindmob").oSelect().init();

    $('.js_truerevisebtn').click(function(){
        $('.js_validateMobTrue').hide();
        $('.js_validateMob').show();


 



    });

    $('.js_bindmobgetbtn').click(function(){
        $('.js_validateMob').hide();
        $('.js_bindNewMob').show();
        $('.js-memberRevRateTree').removeClass('member-revisemob-one').addClass('member-revisemob-two');
    })


    $('.js_sendmessage').click(function(){
        btnTimeOut($(this),120,'内有效');
    });

    $('.js_sendmessages').click(function(){
        btnTimeOut($(this),120,'内有效');
    });

    $('.js_getewmobBtn').click(function(){
        $('.js_bindNewMob').hide();
        $('.js_revisemobsuccess').show();
        $('.js-memberRevRateTree').removeClass('member-revisemob-two').addClass('member-revisemob-three');

    });


     $("#js_unbindmob").change(function() { SelectChange(); });
    function SelectChange(){
        var val=$("#js_unbindmob").val();
        if(val==1)
        {
            $('.js-send').html('邮箱验证');
            $('.js-sendemailcode').html('发送验证邮件');
            $('.js_emailCodeYz').show();
            $('.js_phoneCodeYz').hide();
            
        }   
        if(val==2)
        {
            $('.js-send').html('短信验证');
            $('.js-sendemailcode').html('发送验证短信');
            $('.js_emailCodeYz').hide();
            $('.js_phoneCodeYz').show();

           
        }
    }



    //$('.js-bindmobinput').blur(function(){
    //    var inputCont = $(this).val();
    //    if(inputCont.length){
    //
    //    }
    //})
});