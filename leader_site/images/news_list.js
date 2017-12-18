$(function() {

	function init() {

		var screenWidth = document.body.offsetWidth;
		var screenHeight = document.body.offsetHeight;

	}
	//响应式图片
	$(".js_recPic").each(function() {
		$(this).oPicture({
			//自定义节点宽度
			//sm:544,md:700,lg:992,xl:1200,
		}).init();
	});

});