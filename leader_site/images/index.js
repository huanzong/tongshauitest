$(function() {

  init();

  $(window).resize(function() {
    init();
  });

  function init() {

    var screenWidth = document.body.offsetWidth;
    var screenHeight = document.body.offsetHeight;

  }

  var swiper = {};//用来存放所有轮播
	setTimeout(function(){

		//banner轮播
		swiper.bannerSwiper = new Swiper('.js_bannerSwiper',{
			loop: true,
	    autoplay: 3000,
	    
	    onSlideChangeEnd: function(swiper){
	    	var index = swiper.activeIndex;
	    	// var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(index).find('img').attr('src');
	     	// $('.js_recImgSmall').attr('src',imgSrc);
	    }
		});

		setTimeout(function(){

			//banner左侧高度跟随
	    $('.js_bannerInfo').oHrel({
	      obj:'$(this).next()'
	    }).init();
	    //banner左侧文字居中
	    $(".js_bannnerCenter").oBoxCenter().init();

		},1000);
	    

		//产品推荐轮播
	  swiper.recommendSwiper = new Swiper ('.js_swiperRecMain', {

	    loop: true,
	    autoplay: 3000,
	    
	    onSlideChangeEnd: function(swiper){
	    	var index = swiper.activeIndex;
	    	var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(index).find('img').attr('src');
	      $('.js_recImgSmall').attr('src',imgSrc);
	    }
		});
		$('.js_swiperRecMainPrev').on('click', function(e){
    	e.preventDefault();
	    swiper.recommendSwiper.swipePrev();
	  });
	  $('.js_swiperRecMainNext').on('click', function(e){
	    e.preventDefault();
	    swiper.recommendSwiper.swipeNext();
	  });

	  //推荐商品图片-响应式
	  $(".js_recPic").each(function(){
      $(this).oPicture({
          //自定义节点宽度
          //sm:544,md:700,lg:992,xl:1200,
      }).init();
    });

	},2000);
});



