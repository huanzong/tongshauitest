$(function() {

    $(window).resize(function() {
        init();
    });
    init();

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

        // if (screenWidth > 1199) {
        	$('.js_paySystem').find('a').on('click',function(){

                //内容
                var index = parseInt($(this).attr('pay-index'))-1;
                console.log(index);
                $('.js_paySystemBox').addClass('l-none');
                $('.js_paySystemBox').eq(index).removeClass('l-none');

                //按钮
        		$('.js_paySystem').find('a').removeClass('active');
        		$(this).addClass('active');
        	});
        // }
    }
});