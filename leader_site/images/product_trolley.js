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

        plus:'.icon-plus',
        minus:'.icon-minus',
        input:'input',
        preNum:1,

        callback:function(){

        }

    });
});
