/**
 * Created by 15610 on 2017/10/16.
 */
//解绑手机号码验证
$("#js_unbindmob").oSelect().init();
$('.js_mobileCodeYz').blur(function(){
    if($(this).val().length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js_subimGetUp').click(function(){
            console.log(1111);
            return false;
        })
    }
})

//解绑邮箱验证

$("#js_unbindmail").oSelect().init();
$('.js_emailCodeYz').blur(function(){
    if($(this).val().length==6){
        $('.js_subimGetUp').removeClass('l-btn-disable');
    }else{
        $('.js_subimGetUp').addClass('l-btn-disable');
        $('.js_subimGetUp').click(function(){
            console.log(1111);
            return false;
        })
    }
})