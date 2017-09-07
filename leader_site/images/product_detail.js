$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
    }
    //轮播模板
    var mySwiper = new Swiper ('.js_swiper', {
	    direction: 'horizontal',
	    grabCursor : true,
	    loop: true,
	    autoplay: 1000,
	    
	    // 如果需要分页器
	    pagination: '.js_swiper_pagination',
	    paginationType : 'bullets',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.js_swiper_next',
	    prevButton: '.js_swiper_prev',
	    
	    // 如果需要滚动条
	    // scrollbar: '.swiper-scrollbar'
	});

	//核心卖点
    var mySwiper = new Swiper ('.js_swiperSellPoint', {
	    // direction: 'horizontal',
	    grabCursor : true,
	    loop: true,
	    autoplay: 1000,
	    
	    // 如果需要分页器
	    pagination: '.js_swiper_paginSellPoint',
	    paginationType : 'bullets',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.js_swiper_nextSellPoint',
	    // prevButton: '.js_swiper_prevSellPoint',
	});
	setTimeout(function(){
		$('.js_oHerl').css('height',$('.js_oHerlSize').outerHeight());
		$('.js_center').oBoxCenter().init();
    },1000);

    //延迟加载图片
    setTimeout(function(){
        $(".o_picture").each(function(){
            $(this).oPicture({
                //自定义节点宽度
                //sm:544,md:700,lg:992,xl:1200,
            }).init();
        });
    },300);

});