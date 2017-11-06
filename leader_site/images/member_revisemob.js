/**
 * Created by 15610 on 2017/11/6.
 */
$(function(){
    $('.js_truerevisebtn').click(function(){
        $('.js_validateMobTrue').hide();
        $('.js_validateMob').show();





        //静态页面测试添加，正常后隐藏
        $("#js_unbindmob").attr('autotext',"手机（"+'15115151515'+"）");
        $("#js_unbindmob").append("<option value='1'>手机（"+15115151515+"）</option>");
        $("#js_unbindmob").append("<option value='2'>手机（"+18616161616+"）</option>");
        $("#js_unbindmob").oSelect().init();

    });

    $('.js_bindmobgetbtn').click(function(){
        $('.js_validateMob').hide();
        $('.js_bindNewMob').show();
        $('.js-memberRevRateTree').removeClass('member-revisemob-one').addClass('member-revisemob-two');
    })


    $('.js_sendmessage').click(function(){
        btnTimeOut($(this),120,'内有效');
    });

    $('.js_getewmobBtn').click(function(){
        $('.js_bindNewMob').hide();
        $('.js_revisemobsuccess').show();
        $('.js-memberRevRateTree').removeClass('member-revisemob-two').addClass('member-revisemob-three');

    });




    //$('.js-bindmobinput').blur(function(){
    //    var inputCont = $(this).val();
    //    if(inputCont.length){
    //
    //    }
    //})
});