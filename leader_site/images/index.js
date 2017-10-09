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


    swiper.entrabceSwiper = new Swiper ('.js_swiperEntrabce', {

      loop: true,
      // autoplay: 3000,

      onSlideChangeEnd: function(swiper){
        var index = swiper.activeIndex;
        var imgSrc = $('.js_swiperEntrabce .swiper-slide').eq(index).find('img').attr('src');
        $('.js_recImgSmall').attr('src',imgSrc);
      }
    });
    $('.js_swiperEntrabcePrev').on('click', function(e){
      e.preventDefault();
      swiper.entrabceSwiper.swipePrev();
    });
    $('.js_swiperEntrabceNext').on('click', function(e){
      e.preventDefault();
      swiper.entrabceSwiper.swipeNext();
    });


	  //推荐商品图片-响应式
	  $(".js_recPic").each(function(){
      $(this).oPicture({
          //自定义节点宽度
          //sm:544,md:700,lg:992,xl:1200,
      }).init();
    });

    //banner左侧高度跟随
    $('.js_bannerInfo').oHrel({
      obj:'$(this).next()'
    }).init();
    //banner左侧文字居中
    $(".js_bannnerCenter").oBoxCenter().init();

	},2000);
});



