$(function() {

  init();


  function init() {

    var screenWidth = document.body.offsetWidth;
    var screenHeight = document.body.offsetHeight;

  }

  var swiper = {};//用来存放所有轮播
  
	// setTimeout(function(){

	/**
	 * banner
	 */
	//banner轮播
  var screenWidth = document.body.offsetWidth;

  swiper.bannerSwiper = new Swiper('.js_bannerSwiper',{
    loop: true,
    autoplay: 3000,
    updateOnImagesReady : true,
    centeredSlides : true,
    // initialSlide :1,
    onFirstInit: function(swiper){
      var index = swiper.activeLoopIndex;
      $('.js_bannerSwiperFont').eq(1).fadeIn(100);
      $('.js_bannerSwiperFont1').fadeOut();
      $('.js_bannerSwiperFont1').eq(1).fadeIn(100);
    }
  });

  if (screenWidth <= 991) {
    swiper.bannerSwiper.params.slidesPerView = 3,
    swiper.bannerSwiper.params.watchActiveIndex = true,
    swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
      var index = swiper.activeLoopIndex;
      
      $('.js_bannerSwiper .swiper-slide-active').find('img').animate({
        'height': 500,
        'margin-left': -455.5,
        'margin-top': -250
      }, 500);

      $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
        'height': 382,
        'margin-left': -348.5,
        'margin-top': -191
      });

      console.log(index);
      //文字
      $('.js_bannerSwiperFont1').hide();
      $('.js_bannerSwiperFont1').eq(index).fadeIn(500);
      //分页
      $('.js_bannerSwiperPage .page-num').removeClass('active');
      $('.js_bannerSwiperPage .page-num').eq(index).addClass('active');
    }
    
    $(".js_bg").oBgCover().init();

    $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
      'height': 382,
      'margin-left': -348.5,
      'margin-top': -191
    });

    $('.js_bannerSwiper .swiper-slide-active').find('img').css({
      'height': 500,
      'margin-left': -455.5,
      'margin-top': -250
    });

    

  } else {
  	swiper.bannerSwiper.params.slidesPerView = 1;
    swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
      var index = swiper.activeLoopIndex;
      //文字
      $('.js_bannerSwiperFont').hide();
      $('.js_bannerSwiperFont').eq(index).fadeIn(500);
      //分页
      $('.js_bannerSwiperPage .page-num').removeClass('active');
      $('.js_bannerSwiperPage .page-num').eq(index).addClass('active');
    };
  }

  $('.js_bannerSwiperPage .page-num').on('click',function(){
    var pageNum = $(this).attr('data-index');
    swiper.bannerSwiper.swipeTo(pageNum-1, 100, false);

    $('.js_bannerSwiperPage .page-num').removeClass('active');
    $(this).addClass('active');

    $('.js_bannerSwiperFont').fadeOut();
    $('.js_bannerSwiperFont').eq(pageNum-1).fadeIn(100);
  });

	setTimeout(function(){

		//banner左侧高度跟随
    $('.js_bannerInfo').oHrel({
      obj:'$(this).next()'
    }).init();
    //banner左侧文字居中
    $(".js_bannnerCenter").oBoxCenter().init();

	},1000);


	/**
	 * 产品推荐
	 */
	//推荐商品图片-响应式
  $(".js_recPic").each(function(){
    $(this).oPicture({
        //自定义节点宽度
        //sm:544,md:700,lg:992,xl:1200,
    }).init();
  });
	
	//产品推荐轮播
  swiper.recommendSwiper = new Swiper ('.js_swiperRecMain', {

    loop: true,
    autoplay: 3000,
    
    onFirstInit: function(swiper){
      var index = swiper.activeLoopIndex;
      $('.js_recommendFont').fadeOut(1);
      $('.js_recommendFont').eq(index).fadeIn(500);
      $('.js_recommendFont1').fadeOut(1);
      $('.js_recommendFont1').eq(index).fadeIn(500);
    },

    onSlideChangeEnd: function(swiper){
    	var index = swiper.activeLoopIndex;
    	var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(swiper.activeIndex).find('img').attr('src');
      $('.js_recImgSmall').attr('src',imgSrc);

      //文字
      $('.js_recommendFont').fadeOut(1);
      $('.js_recommendFont').eq(index).fadeIn(500);
      $('.js_recommendFont1').fadeOut(1);
      $('.js_recommendFont1').eq(index).fadeIn(500);
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


  /**
   * 首页入口
   */
  swiper.entrabceSwiper = new Swiper ('.js_swiperEntrabce', {

    loop: true,
    autoplay: 3000,
    calculateHeight : true,
    autoplayDisableOnInteraction : false,//用户操作之后，不禁止autoplay
    updateOnImagesReady : true,
    onSlideChangeStart: function(swiper){
      var index = swiper.activeIndex;
      $('.js_swiperEntrabce .swiper-slide').find('.entrance-fontbox').css({
        'filter':'alpha(opacity=0)',  
			  '-moz-opacity':'0',
			  '-khtml-opacity': '0',
			  'opacity': '0'
      });
      $('.js_swiperEntrabce .swiper-slide').eq(index).find('.entrance-fontbox').animate({
        'filter':'alpha(opacity=1)',  
			  '-moz-opacity':'1',
			  '-khtml-opacity': '1',  
			  'opacity': '1'
      }, 1000);

      //分页
      console.log(swiper.activeLoopIndex);
      $('.js_entrancePage .page-num').removeClass('active');
      $('.js_entrancePage').find('.page-num').eq(swiper.activeLoopIndex).addClass('active');
    }
  });

  if (screenWidth <= 700) {
  	swiper.entrabceSwiper.params.slidesPerView = 2;
    swiper.entrabceSwiper.params.watchActiveIndex = true;
    swiper.entrabceSwiper.params.calculateHeight = true;
  } else {
  	swiper.entrabceSwiper.params.slidesPerView = 1;
    swiper.entrabceSwiper.params.calculateHeight = true;
  }

  $('.js_swiperEntrabcePrev').on('click', function(e){
    e.preventDefault();
    swiper.entrabceSwiper.swipePrev();
  });
  $('.js_swiperEntrabceNext').on('click', function(e){
    e.preventDefault();
    swiper.entrabceSwiper.swipeNext();
  });
  //分页
  $('.js_entrancePage .page-num').on('click',function(){
    var pageNum = $(this).attr('data-index');
    swiper.entrabceSwiper.swipeTo(pageNum-1, 500, false);
    $('.js_entrancePage .page-num').removeClass('active');
    $(this).addClass('active');
  });

  swiper.entrabceSwiper.reInit();



	// },2000);



  $(window).resize(function() {
    init();

    var screenWidth = document.body.offsetWidth;
    if (screenWidth <= 700) {
      swiper.entrabceSwiper.params.slidesPerView = 2;
      swiper.entrabceSwiper.params.watchActiveIndex = true;
      swiper.entrabceSwiper.params.updateOnImagesReady = true;
    } else {
      swiper.entrabceSwiper.params.slidesPerView = 1;
      // swiper.entrabceSwiper.reInit();
    }

    swiper.entrabceSwiper.reInit();


    if (screenWidth <= 991) {
      swiper.bannerSwiper.params.slidesPerView = 3;
      swiper.bannerSwiper.params.watchActiveIndex = true;
      swiper.bannerSwiper.params.updateOnImagesReady = true;
      swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
        var index = swiper.activeLoopIndex;

        $('.js_bannerSwiper .swiper-slide-active').find('img').animate({
          'height': 500,
          'margin-left': -455.5,
          'margin-top': -250
        }, 500);
        
        $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
          'height': 382,
          'margin-left': -348.5,
          'margin-top': -191
        });

        console.log(index);
        //文字
        $('.js_bannerSwiperFont1').hide();
        $('.js_bannerSwiperFont1').eq(index).fadeIn(1);
        //分页
        $('.js_bannerSwiperPage .page-num').removeClass('active');
        $('.js_bannerSwiperPage .page-num').eq(index).addClass('active');
      };

      swiper.bannerSwiper.reInit();
      $(".js_bg").oBgCover().init();

      setTimeout(function(){
        $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
          'height': 382,
          'margin-left': -348.5,
          'margin-top': -191
        });

        $('.js_bannerSwiper .swiper-slide-active').find('img').css({
          'height': 500,
          'margin-left': -455.5,
          'margin-top': -250
        });
      },500);
    } else {
      swiper.bannerSwiper.params.slidesPerView = 1;
      swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
        var index = swiper.activeLoopIndex;
        //文字
        $('.js_bannerSwiperFont').hide();
        $('.js_bannerSwiperFont').eq(index).fadeIn(500);
        //分页
        $('.js_bannerSwiperPage .page-num').removeClass('active');
        $('.js_bannerSwiperPage .page-num').eq(index).addClass('active');
        };
        swiper.bannerSwiper.reInit();
    }

  });
});



