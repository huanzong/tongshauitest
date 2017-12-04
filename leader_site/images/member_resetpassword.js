/**
 * Created by 15610 on 2017/11/6.
 */

 

$(function(){

            //静态页面测试添加，正常后隐藏
        $("#js_resetpassword").attr('autotext',"邮箱（"+'1511***@163.com'+"）");
        $("#js_resetpassword").append("<option value='1'>邮箱（1511***@163.com）</option>");
        $("#js_resetpassword").append("<option value='2'>手机（"+"186****1616"+"）</option>");
        $("#js_resetpassword").oSelect().init();





    $('.js_sendmessage').click(function(){
        btnTimeOut($(this),120,'内有效');
    });

    $('.js_sendmessages').click(function(){
        btnTimeOut($(this),120,'内有效');
    });


 

$('.js_subimGetUp').click(function(){
    $('.js-validatePhone').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-one').addClass('member-revisemob-two');
    $('.js-resetpassword').show();
})

$('.js-subpassword').click(function(){
    $('.js-resetpassword').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-two').addClass('member-revisemob-three');
    $('.js-bingsuccess').show();
})



     $("#js_resetpassword").change(function() { SelectChange(); });
    function SelectChange(){
        var val=$("#js_resetpassword").val();
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


})