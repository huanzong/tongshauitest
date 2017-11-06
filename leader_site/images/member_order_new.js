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


        //查看物流信息
    $('.check_logistics').click(function(){
        $('.js_addShadeTop').show();
        $('.js_logisticsContBox').show();



        //激活滚动条 在数据写入完成后执行
        var bar=$('.js_logisticsCont').oScrollBar();//创建滚动条
        bar.init();//初始化激活滚动条

    });

})