/**
 * Created by 15610 on 2017/11/1.
 */
$(function(){
    $('.js_orderListMove').hover(function(){
        $(this).siblings('.l-float-tops').show();
    },function(){
        $(this).siblings('.l-float-tops').hide();
    });

    $('.js_orderList>li').click(function(){
       $(this).addClass('cur').siblings().removeClass('cur');
    });

})