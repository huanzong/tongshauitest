/**
 * Created by 15610 on 2017/11/6.
 */

$(function(){

$("#js_unbindmob").attr('autotext',"邮箱（"+'1511***@163.com'+"）");
$("#js_unbindmob").append("<option value='1'>邮箱（1511***@163.com）</option>");
$("#js_unbindmob").oSelect().init();



$('.js-sendemailcode').click(function(){
    btnTimeOut($(this),120,'内有效');
});
$('.js-getinfo').click(function(){
    btnTimeOut($(this),120,'内有效');
});


$('.js_subimGetUp').click(function(){
    $('.js-validateEmail').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-one').addClass('member-revisemob-two');
    $('.js-bindNewMob').show();
})

$('.js-submintData').click(function(){
    $('.js-bindNewMob').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-two').addClass('member-revisemob-three');
    $('.js-bingsuccess').show();

})



//通过点击不同的下拉列表框 转换手机和邮箱
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
})