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
     //���鵼����fix��λ
    $(window).scroll(function(){
        var currentPos = $(document).scrollTop();
        //������λ
        if(currentPos>navH){
            $('.js_detailNav').hasClass('detail-nav-fixed')||$('.js_detailNav').addClass('detail-nav-fixed');
            $('.js_buyNow').show();
        }else{
            $('.js_detailNav').hasClass('detail-nav-fixed')&&$('.js_detailNav').removeClass('detail-nav-fixed');
            $('.js_buyNow').hide();
        }
    });
});
