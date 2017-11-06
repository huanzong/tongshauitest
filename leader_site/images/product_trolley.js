$(function() {

    var swiper = {
    }; //用来存放所有轮播

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
    }

    $(".js_checkbox").jq_qvote();
    // $(".js_checkbox ")
    
    /**
     * 商品数量加减
     */
    $('.js_trolleyNumber').numberRule({

        // plus:'.icon-plus',
        // minus:'.icon-minus',
        // input:'input',
        // preNum:1,

        callback:function(num){
            // console.log(num);
        }

    });
    $('.js_edit').on('click',function(){
        // var parent = $(this).parent().parent();
        var parent = $(this).parentsUntil('.trolley-prolist');
        if($(this).attr('data-oppo')=='edit'){
            parent.find('.js_trolleyNumber').removeClass('opacity-0');
            parent.find('.js_trolleyFont').addClass('opacity-0');
            parent.find('.js_trolleyPrice').addClass('opacity-0');
            $(this).attr('data-oppo','finish').html('完成');
            $(this).siblings('.js_deleteXs').removeClass('opacity-0');
        }else{
            parent.find('.js_trolleyNumber').addClass('opacity-0');
            parent.find('.js_trolleyFont').removeClass('opacity-0');
            parent.find('.js_trolleyPrice').removeClass('opacity-0');
            $(this).attr('data-oppo','edit').html('编辑');
            $(this).siblings('.js_deleteXs').addClass('opacity-0');
        }
        
    });


    /** 
     *   服务对接
     */
    $
});
