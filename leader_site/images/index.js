$(function() {

  init();


  function init() {

    var screenWidth = document.body.offsetWidth;
    var screenHeight = document.body.offsetHeight;

  }

  var swiper = {};//用来存放所有轮播
	setTimeout(function(){

		//banner轮播
    var screenWidth = document.body.offsetWidth;
    if (screenWidth <= 991) {
      swiper.bannerSwiper = new Swiper('.js_bannerSwiper',{
        loop: true,
        // autoplay: 3000,
        slidesPerView: 3,
        watchActiveIndex: true,
        updateOnImagesReady: true,
        centeredSlides: true,
        onSlideChangeEnd: function(swiper){
          var index = swiper.activeIndex;
          // var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(index).find('img').attr('src');
          // $('.js_recImgSmall').attr('src',imgSrc);


          $('.js_bannerSwiper .swiper-slide-active').find('img').css({
            'height': 500,
            'margin-left': -455.5,
            'margin-top': -250
          });

          $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
            'height': 382,
            'margin-left': -348.5,
            'margin-top': -191
          });
        }
      });
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

      // swiper.bannerSwiper.
    } else {
      swiper.bannerSwiper = new Swiper('.js_bannerSwiper',{
        loop: true,
        // autoplay: 3000,

        onSlideChangeEnd: function(swiper){
          var index = swiper.activeIndex;
          // var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(index).find('img').attr('src');
          // $('.js_recImgSmall').attr('src',imgSrc);
        }
    });
    }


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
	    // autoplay: 3000,

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


    swiper.entrabceSwiper = new Swiper ('.js_swiperEntrabce', {

      loop: true,
      // autoplay: 3000,
      calculateHeight : true,
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



	},2000);



  $(window).resize(function() {
    init();

    var screenWidth = document.body.offsetWidth;
    if (screenWidth <= 700) {
      swiper.entrabceSwiper.params.slidesPerView = 2
      swiper.entrabceSwiper.params.watchActiveIndex = true
      swiper.entrabceSwiper.params.updateOnImagesReady = true
    } else {
      swiper.entrabceSwiper.params.slidesPerView = 1
      swiper.entrabceSwiper.reInit()
    }


    if (screenWidth <= 991) {


      swiper.bannerSwiper.params.slidesPerView = 3
      swiper.bannerSwiper.params.watchActiveIndex = true
      swiper.bannerSwiper.params.updateOnImagesReady = true
      swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
          var index = swiper.activeIndex;
          // var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(index).find('img').attr('src');
          // $('.js_recImgSmall').attr('src',imgSrc);


          $('.js_bannerSwiper .swiper-slide-active').find('img').css({
            'height': 500,
            'margin-left': -455.5,
            'margin-top': -250
          })

          $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
            'height': 382,
            'margin-left': -348.5,
            'margin-top': -191
          })
        }

      swiper.bannerSwiper.reInit()
      $(".js_bg").oBgCover().init();

      setTimeout(function(){
        $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
          'height': 382,
          'margin-left': -348.5,
          'margin-top': -191
        })

        $('.js_bannerSwiper .swiper-slide-active').find('img').css({
          'height': 500,
          'margin-left': -455.5,
          'margin-top': -250
        })
      },500)
    } else {
      swiper.bannerSwiper.params.slidesPerView = 1
      swiper.bannerSwiper.params.onSlideChangeEnd = function(swiper){
        var index = swiper.activeIndex;
        // var imgSrc = $('.js_swiperRecMain .swiper-slide').eq(index).find('img').attr('src');
        // $('.js_recImgSmall').attr('src',imgSrc);
      }
      swiper.bannerSwiper.reInit()
    }


    swiper.entrabceSwiper.reInit()

  });
});



