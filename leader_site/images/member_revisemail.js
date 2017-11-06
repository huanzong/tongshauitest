/**
 * Created by 15610 on 2017/11/6.
 */
    //静态页面测试添加，正常后隐藏
$("#js_revisemail").attr('autotext',"邮箱（"+'151151515115115151515151151515155@163.com'+"）");
$("#js_revisemail").append("<option value='1'>手机（"+15115151515+"）</option>");
$("#js_revisemail").append("<option value='2'>手机（"+18616161616+"）</option>");
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