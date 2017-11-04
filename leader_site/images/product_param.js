$(function() {

	init();

    $(window).resize(function() {
        init();
    });

    function init() {
     	var screenWidth = document.body.offsetWidth;
		var screenHeight = document.body.offsetHeight;
    }

    $(".js_structbg").oBgCover().init();//激活方法
	$(".js_structbg").css('margin-left','-424px');
});
