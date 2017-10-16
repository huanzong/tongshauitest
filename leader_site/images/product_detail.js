$(function() {

	var swiper = {
		// preferentialSwiper:'',
		// mySwiper:'',
		// preferentialSwiper:'',
	};//用来存放所有轮播

	setTimeout(function(){
    	//优惠组合
	    swiper.preferentialSwiper = new Swiper ('.js_swiperPreferential', {
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

	    //轮播模板
	    swiper.mySwiper = new Swiper ('.js_swiper', {
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
	    swiper.sellPointSwiper = new Swiper ('.js_swiperSellPoint', {
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

	    //更多选择
		swiper.moreSwiper = new Swiper ('.js_swiperMore', {
		    direction: 'horizontal',
		    grabCursor : true,
		    loop: true,
		    autoplay: 1000,

		    //分组
		    slidesPerView : 3,
			slidesPerGroup : 1,

		    // 如果需要分页器
		    pagination: '.js_swiper_paginationMore',
		    paginationType : 'bullets',

		    // 如果需要前进后退按钮
		    nextButton: '.js_swiper_nextMore',
		    prevButton: '.js_swiper_prevMore',

		    // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar'
		});

    	init();
    },1000);

    $(window).resize(function() {
        init();
    });

    //产品参数-结构图居中
    $(".js_structbg").oBgCover().init();//激活方法
	$(".js_structbg").css('margin-left','-424px');

 	$(".js_swiperPreferential .js_checkbox").jq_qvote();

    function init() {
     	var screenWidth = document.body.offsetWidth;
		var screenHeight = document.body.offsetHeight;

		var slidesPerView = 4;

		if (screenWidth <= 575) {
		  slidesPerView = 1;
		} else if (screenWidth > 1199) {
		  slidesPerView = 4;
		} else {
		  slidesPerView = 2;
		}

		swiper.preferentialSwiper.params.slidesPerView = slidesPerView;

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
	    
	    // 更多选择
	    setTimeout(function(){
			$('.js_oHerlMore').css('height',$('.js_oHerlSizeMore').outerHeight());
			$('.js_center').oBoxCenter().init();
	    },1000);

    }

	//登陆框验证
	$('.js-bindmobinput').blur(function(){
		var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
		if(yanzhengtrue){
			$('.js-getinfo').removeClass('l-btn-disable').click(function(){

				yanzhengtrue = $('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');
				if(yanzhengtrue){
					var newMobile=$('.js-newMobile').val();

					//  手机号发送验证码接口

				}
			})
		}
		else{
			$('.js-getinfo').addClass('l-btn-disable');
		}

	})

});
