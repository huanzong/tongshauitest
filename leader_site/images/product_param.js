$(function() {

	init();

    $(window).resize(function() {
        init();
    });

    function init() {
     	var screenWidth = document.body.offsetWidth;
		var screenHeight = document.body.offsetHeight;
		var navH=$(".detail-nav-height").offset().top;
    }


    $(".js_structbg").css('margin-left','-424px');
    setTimeout(function(){
        $(".js_structbg").oBgCover().init();//激活方法
    },500);
    var navH=$(".detail-nav-height").offset().top;
    $('.js_buyNow').hide();
     //详情导航的fix定位
    $(window).scroll(function(){
        var currentPos = $(document).scrollTop();
        //导航定位
        if(currentPos>navH){
            $('.js_detailNav').hasClass('detail-nav-fixed')||$('.js_detailNav').addClass('detail-nav-fixed');
            $('.js_buyNow').show();
        }else{
            $('.js_detailNav').hasClass('detail-nav-fixed')&&$('.js_detailNav').removeClass('detail-nav-fixed');
            $('.js_buyNow').hide();
        }
    });
});
