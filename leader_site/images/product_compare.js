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
});
