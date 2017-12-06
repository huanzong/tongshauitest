$(function(){
	var windowHeight = $(window).height();
   $('.js_myshareAlertWindow').height(windowHeight);
   $('.js_alertWindowLeft').css({'height':windowHeight,'line-height':windowHeight+'px'});
   $('.js_alertWindowRight').css({'height':windowHeight,'line-height':windowHeight+'px'});
	$('.js_memberSharePhotoMax').live('click',function(){

		var index = $(this).index();
		// var liArr=[];
		var  liArr = $(this).parent().html();
		$('.js_myshareAlertWindow').show();
		$('.js_myshareAlertWindowPhotoBox').html(liArr);
		$('.js_myshareAlertWindow  li').addClass('swiper-slide');
 		$('.js_myshareAlertWindow li').css("max-height",windowHeight-100);


 		console.log($(this).parent().html(liArr))
 	

 	// 活动模块初始化
 		var mySwiper = new Swiper('.js_myshareAlertWindow',{
		    loop: true,
		    initialSlide:index
		    // nextButton: '.js_alertWindowLeft',
   			// prevButton: '.js_alertWindowRight',
		    //其他设置
		  });  
 	$('.js_alertWindowLeft').on('click', function (e) {
        e.preventDefault();
        mySwiper.swipeNext();

    })
    $('.js_alertWindowRight').on('click', function (e) {

        e.preventDefault();
        mySwiper.swipePrev();
    })


	});
	$('.js_alertWindowClose').click(function(){
		$('.js_myshareAlertWindow').hide();

	});




	$('.js_alertWindowLeft').css("max-height",windowHeight);
	$('.js_alertWindowRight').css("max-height",windowHeight);
});