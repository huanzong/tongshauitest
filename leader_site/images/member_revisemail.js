/**
 * Created by 15610 on 2017/11/6.
 */
    //静态页面测试添加，正常后隐藏

 

$("#js_revisemail").attr('autotext',"邮箱（"+'1511***@163.com'+"）");
$("#js_revisemail").append("<option value='1'>邮箱（1511***@163.com）</option>");
$("#js_revisemail").append("<option value='2'>手机（"+"1861****616"+"）</option>");
$("#js_revisemail").oSelect().init();


$('.js-sendmail').click(function(){
    btnTimeOut($(this),120,'内有效');
})

$('.js-getinfo').click(function(){
    btnTimeOut($(this),120,'内有效');
})

$('.js_subimGetUp').click(function(){
    $('.js-revisemailfirst').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-one').addClass('member-revisemob-two');
    $('.js-bindNewEmail').show();
})

$('.js-submintData').click(function(){
    $('.js-bindNewEmail').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-two').addClass('member-revisemob-three');
    $('.js-bingsuccess').show();
})



//通过点击不同的下拉列表框 转换手机和邮箱
    $("#js_revisemail").change(function() { SelectChange(); });
    function SelectChange(){
        var val=$("#js_revisemail").val();
        if(val==1)
        {
            $('.js-send').html('邮箱验证');
            $('.js-sendmail ').html('发送验证邮件');
            $('.js_emailCodeYz').show();
            $('.js_phoneCodeYz').hide();
          	
        }	
        if(val==2)
        {
            $('.js-send').html('短信验证');
            $('.js-sendmail').html('发送验证短信');
            $('.js_emailCodeYz').hide();
            $('.js_phoneCodeYz').show();

           
        }
    }