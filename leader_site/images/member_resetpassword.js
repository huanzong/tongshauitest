/**
 * Created by 15610 on 2017/11/6.
 */

$("#js_resetpassword").oSelect().init();

$('.js-sendmobile').click(function(){
    btnTimeOut($(this),120,'内有效');
})

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