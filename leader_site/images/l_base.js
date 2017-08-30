$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {


    }

    /**
     * 导航逻辑
     */
    //导航栏目显示隐藏
    $('.js_column').on('hover',function(){
        $('.js_column_show').show();
    });
    $('.js_column_show').on('mouseleave',function(){
        $(this).hide();
    });
    
});



