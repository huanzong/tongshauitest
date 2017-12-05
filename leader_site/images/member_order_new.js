/**
 * Created by 15610 on 2017/11/1.
 */
$(function(){

        $('.js_orderListMove').click(function(){
            $(this).find('.l-float-tops').show();
            $(this).attr('data-click','2');
           
        })

        $(document).click(function (e) { 
            var attrAlts = $(e.target).attr('data-click'); 
            var attrAlt = $(e.target).parents('.order_list_more');

            if(!attrAlts||!attrAlt){
               $('.l-float-tops').hide(); 
            }else if(attrAlt){
                $('.l-float-tops').hide(); 
                attrAlt.find('.l-float-tops').show(); 
            }else{
                $('.l-float-tops').hide(); 
               $(e.target).find('.l-float-tops').show(); 

            }
         } )




    $('.l-float-tops').find('a').click(function(){
            $(this).parents('li').find('input').focus();

             var dataAlts = $(this).parents('li').attr('data-alt');
             console.log(dataAlts)
             if(dataAlts==2){
                 $('.l-float-tops').hide()
             }
             return false;
    })



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