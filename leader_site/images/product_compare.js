$(function() {

	init();

    $(window).resize(function() {
        init();
    });

 	$(".js_swiperPreferential .js_checkbox").jq_qvote();

    function init() {
     	var screenWidth = document.body.offsetWidth;
		var screenHeight = document.body.offsetHeight;
    }

	$(".js_checkbox,.js_radio").jq_qvote();

	//????
    $(window).scroll(function(){
        var currentPos = $(document).scrollTop()-100;
        //????
        if(currentPos>$('.js_navPos').offset().top){
        	if(!$('.js_compareList').hasClass('detail-nav-fixed')){
				$('.js_compareList').addClass('detail-nav-fixed').find('img').hide();
        	}
            $('.js_buyNow').show();
        }else{
        	if($('.js_compareList').hasClass('detail-nav-fixed')){
        		$('.js_compareList').removeClass('detail-nav-fixed').find('img').show();
        	}
            $('.js_buyNow').hide();
        }
    });
});
