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
     var navH=$(".detail-nav-height").offset().top;
    $('.js_buyNow').hide();
     //~{OjGi5<:=5D~}fix~{6(N;~}
    $(window).scroll(function(){
        var currentPos = $(document).scrollTop();
        //~{5<:=6(N;~}
        if(currentPos>navH){
            $('.js_detailNav').hasClass('detail-nav-fixed')||$('.js_detailNav').addClass('detail-nav-fixed');
            $('.js_buyNow').show();
        }else{
            $('.js_detailNav').hasClass('detail-nav-fixed')&&$('.js_detailNav').removeClass('detail-nav-fixed');
            $('.js_buyNow').hide();
        }
    });
});
