/**
 * Created by 15610 on 2017/11/6.
 */
$("#js_unbindmob").oSelect().init();

$('.js-sendphonecode').click(function(){
    btnTimeOut($(this),120,'内有效');
});

$('.js-getinfo').click(function(){
    btnTimeOut($(this),120,'内有效');
});

$('.js_subimGetUp').click(function(){
    $('.js-validatePhone').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-one').addClass('member-revisemob-two');
    $('.js-bindNewEmail').show();
})

$('.js-submintData').click(function(){
    $('.js-bindNewEmail').hide();
    $('.js_memberRevisThree').removeClass('member-revisemob-two').addClass('member-revisemob-three');
    $('.js-bingsuccess').show();
})