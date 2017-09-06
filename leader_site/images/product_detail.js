$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
    }

    var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'horizontal',
	    grabCursor : true,
	    loop: true,
	    
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    paginationType : 'bullets',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    
	    // 如果需要滚动条
	    scrollbar: '.swiper-scrollbar',
	    autoplay: 1000
	  });

});



