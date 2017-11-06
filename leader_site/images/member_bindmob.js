/**
 * Created by 15610 on 2017/11/6.
 */


$("#js_unbindmob").attr('autotext',"邮箱（"+'1511***@163.com'+"）");
$("#js_unbindmob").append("<option value='1'>手机（"+15115151515+"）</option>");
$("#js_unbindmob").append("<option value='2'>手机（"+18616161616+"）</option>");
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