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

  //响应式图片
  $(".js_recPic").each(function(){
    $(this).oPicture({
        //自定义节点宽度
        //sm:544,md:700,lg:992,xl:1200,
    }).init();
  });

  var indexBannerInit = false;
  swiper.bannerSwiper = new Swiper('.js_bannerSwiper',{
    // loop: true,
    updateOnImagesReady : true,
    centeredSlides : true,
    calculateHeight : true,
    slidesPerView: 3,
    // initialSlide :1,
    onInit: function(swiper){
      var index = swiper.activeLoopIndex;
      $('.js_bannerSwiperFont').eq(1).fadeIn(100);
      $('.js_bannerSwiperFont1').fadeOut();
      $('.js_bannerSwiperFont1').eq(1).fadeIn(100);
      $('.js_bannerSwiper').css('height',$('.js_bannerSwiper').find('.swiper-slide').eq(2).find('img').eq(0).height());

      if (screenWidth <= 991) {
        $('.js_bannerSwiper .swiper-slide').find('a').css({
          'margin': 50
        },2000);

        $('.js_bannerSwiper .swiper-slide').stop(true);
        $('.js_bannerSwiper .swiper-slide').eq(2).find('a').animate({
          'margin': 0
        }, 500);
      }
    }
  });

  if (screenWidth <= 991) {
    var isTouch = false;
    swiper.bannerSwiper.params.slidesPerView = 3;
    swiper.bannerSwiper.params.watchActiveIndex = true;
    swiper.bannerSwiper.params.onTouchStart = function(swiper){
      isTouch = true;
      $('.js_bannerSwiper .swiper-slide').find('a').css({
        'margin': 50
      });
    };
    swiper.bannerSwiper.params.onSlideChangeStart = function(swiper){
      if (!isTouch) {
        var index = swiper.activeLoopIndex;
        if (!indexBannerInit) {
          $('.js_bannerSwiper .swiper-slide').find('a').css({
            'margin': 50
          });
        }
      }
      indexBannerInit = true;

    };

    swiper.bannerSwiper.params.onTouchEnd = function(swiper){
      isTouch = false;
      $('.js_bannerSwiper .swiper-slide').find('a').css({
        'margin': 50
      });
    };
    swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
      var index = swiper.activeLoopIndex;
      if (!isTouch) {
        $('.js_bannerSwiper .swiper-slide').find('a').css({
          'margin': 50
        });
      }

      $('.js_bannerSwiper .swiper-slide').stop(true);
      $(swiper.activeSlide()).find('a').animate({
        'margin': 0
      }, 500);

      swiper.startAutoplay();

      //文字
      $('.js_bannerSwiperFont1').hide();
      $('.js_bannerSwiperFont1').eq(index).fadeIn(500);
      //分页
      $('.js_bannerSwiperPage .page-num').removeClass('active');
      $('.js_bannerSwiperPage .page-num').eq(index).addClass('active');
    };


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

  //确保加载图片以后，重新加载轮播
  setTimeout(function(){
    swiper.bannerSwiper.reInit();
  },1000);

  setTimeout(function(){
    swiper.bannerSwiper.params.autoplay = 2000;
    swiper.bannerSwiper.stopAutoplay();
    swiper.bannerSwiper.startAutoplay();
  },2000);

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
   * 产线入口
   */
  $('.js_enterMore').on('click',function(){
    $('.js_enterShow').toggleClass('l-none');
    if($(this).attr('data-type')=='more'){
      $(this).html('展开全部产品分类 +');
      $(this).attr('data-type','');
    }else{
      $(this).html('收起全部产品分类 x');
      $(this).attr('data-type','more');
    }
  });

	/**
	 * 产品推荐
	 */
	//推荐商品图片-响应式
  // $(".js_recPic").each(function(){
  //   $(this).oPicture({
  //       //自定义节点宽度
  //       //sm:544,md:700,lg:992,xl:1200,
  //   }).init();
  // });

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
    	var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(swiper.previousIndex).find('img').attr('src');
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
  //分页
  $('.js_entrancePage').each(function(i,n){
    var htmlStr = '';

    for(var j=0;j<$('.js_entrancePage').length;j++){
      if(i==j){
        htmlStr += '<div class="page-num active" data-index='+(j+1)+'>0'+(j+1)+'</div>';
      }else{
        htmlStr += '<div class="page-num" data-index='+(j+1)+'>0'+(j+1)+'</div>';
      }
    }
    $(this).html(htmlStr);
  });
  $('.js_entrancePage1').each(function(i,n){
    var htmlStr = '';

    for(var j=0;j<$('.js_entrancePage1').length;j++){
      if(i==j){
        htmlStr += '<div class="page-num active" data-index='+(j+1)+'>0'+(j+1)+'</div>';
      }else{
        htmlStr += '<div class="page-num" data-index='+(j+1)+'>0'+(j+1)+'</div>';
      }
    }
    $(this).html(htmlStr);
  });
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
  });
  $('.js_entrancePage1 .page-num').on('click',function(){
    var pageNum = $(this).attr('data-index');
    swiper.entrabceSwiper.swipeTo(pageNum-1, 500, false);
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
      // swiper.bannerSwiper.params.slidesPerView = 3;
      // swiper.bannerSwiper.params.watchActiveIndex = true;
      // swiper.bannerSwiper.params.updateOnImagesReady = true;
      // swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
      //   var index = swiper.activeLoopIndex;

      //   // $('.js_bannerSwiper .swiper-slide-active').find('a').animate({
      //   //   'margin': 0
      //   // }, 500);

      //   // $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('a').css({
      //   //   'margin': 50
      //   // },10);

      //   console.log(index);
      //   //文字
      //   $('.js_bannerSwiperFont1').hide();
      //   $('.js_bannerSwiperFont1').eq(index).fadeIn(1);
      //   //分页
      //   $('.js_bannerSwiperPage .page-num').removeClass('active');
      //   $('.js_bannerSwiperPage .page-num').eq(index).addClass('active');
      // };

      // swiper.bannerSwiper.reInit();
      $(".js_bg").oBgCover().init();

      setTimeout(function(){
        // $('.js_bannerSwiper .swiper-slide-active').find('a').animate({
        //   'margin': 0
        // }, 500);

        // $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('a').css({
        //   'margin': 50
        // },10);
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



