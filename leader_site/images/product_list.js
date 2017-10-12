$(function() {

    $(window).resize(function() {
        init();
    });

    function init() {
     	var screenWidth = document.body.offsetWidth;
		var screenHeight = document.body.offsetHeight;
		
		if(screenWidth>1199){
			$('.js_layerShowMore').hide();
		}
    }

    // banner背景平铺
    $(".js_bannerImg").oBgCover().init();
    $(".js_bannerImg").css('margin-left','-1000px');

    //导航-展开全部筛选项 
    $('.js_listNavShowMore').on('click',function(){

    	var navList = $('.js_listNavShowMore').siblings('.filter-line');
    	var flag = parseInt($('.js_listNavShowMore').attr('data-flag'));

    	if(flag){
			$('.js_listNavShowMore').find('span').text('展开全部筛选项');
			$('.js_listNavShowMore').find('i').removeClass('icon-close').addClass('icon-plus');
		}else{
			$('.js_listNavShowMore').find('span').text('收起全部筛选项');
			$('.js_listNavShowMore').find('i').removeClass('icon-plus').addClass('icon-close');
		}

    	navList.each(function(i,n){
    		if(i<4 || i >= navList.size()){
    			return;
    		}
    		if(flag){
    			$(this).addClass('o_df-hide');
    		}else{
    			$(this).removeClass('o_df-hide');
    		}
    	});

    	if(document.body.offsetWidth < 1200){
    		$('.js_layerShowMore').show();
    		$('.js_layerClose').on('click',function(){
    			$('.js_layerShowMore').hide();
    			$('.js_listNavShowMore').find('span').text('展开全部筛选项');
				$('.js_listNavShowMore').find('i').removeClass('icon-close').addClass('icon-plus');
    		});
    	}

    	$('.js_listNavShowMore').attr('data-flag',Math.abs(parseInt(flag)-1));
    }); 

    //checkbox初始化
     $(".js_proGroup,.js_radio").jq_qvote();

     /*
     * 删除筛选项
     * */

    //全部删除
    $('.js_deleteAll').on('click',function () {
        $('.js_find').empty()
    });

	//单个删除
    $('.js_delete').on('click',function () {
		$(this).parent().remove()
	});


});
