$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

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

    //优惠组合
	   var mySwiper = new Swiper ('.js_swiperPreferential', {
		    direction: 'horizontal',
		    grabCursor : true,
		    loop: true,
		    // autoplay: 1000,
				slidesPerView : 4,
		    // 如果需要分页器
		    // pagination: '.js_swiperPreferential',
		    paginationType : 'bullets',

		    // 如果需要前进后退按钮
		    nextButton: '.js_swiper_next',
		    prevButton: '.js_swiper_prev',

		    // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar'
		});

 		$(".js_swiperPreferential .js_checkbox").jq_qvote();

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

	    //电商拉页
	    setTimeout(function(){
			$('.js_oHerlFoldover').css('height',$('.js_oHerlSizeFoldover').outerHeight());
			$('.js_center').oBoxCenter().init();
	    },1000);

	    $('.js_foldPlus').on('click',function(){
	    	if($(this).hasClass('icon-plus')){

	    		//文字列表
	    		$('.js_foldlist').slideDown(300);
	    		$(this).removeClass('icon-plus').addClass('icon-close');
	    		$(this).parent().css('color','#ccc');

	    		//右侧图片
	    		$('.js_foldimg img').each(function(i,n){
	    			if(i){
	    				var src = $(this).attr('data-src');
	    				$(this).attr('src',src);
	    			}
	    		});
	    		$('.js_oHerlFoldover').css('height',$('.js_oHerlSizeFoldover').outerHeight());
				// $('.js_foldoverNav').css({
				// 	'position':'fixed',
				// 	'top':'0',
				// 	'left':'0',
				// });
	    	}else{

	    		//文字列表
	    		$('.js_foldlist').slideUp(300);
	    		$(this).removeClass('icon-close').addClass('icon-plus');
	    		$(this).parent().css('color','#e60012');

	    		//右侧图片
	    		$('.js_foldimg img').each(function(i,n){
	    			if(i){
	    				$(this).attr('src','');
	    			}
	    		});
	    		$('.js_oHerlFoldover').css('height',$('.js_oHerlSizeFoldover').outerHeight());
				$('.js_center').oBoxCenter().init();
	    	}

	    });
	    $('.js_foldMinus').on('click',function(){
	    	$('.js_foldlist').hide();
	    	$(this).hide();
	    	$('.js_foldPlus').show();
	    });

	    //延迟加载图片
	    setTimeout(function(){
	        $(".o_picture").each(function(){
	            $(this).oPicture({
	                //自定义节点宽度
	                //sm:544,md:700,lg:992,xl:1200,
	            }).init();
	        });
	    },300);
    }


});
