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
    //筛选项-全部删除
    $('.js_deleteAll').on('click',function () {
        $('.js_filter').empty();
        /**
         * 全部删除的代码写在这里
         */

    });
    //筛选项-单个删除
    $('.js_delete').on('click',function () {
        $(this).parent().remove();
        /**
         * 单个删除的代码写在这里
         */
    });

    //checkbox初始化
     $(".js_proGroup,.js_radio").jq_qvote();

    /**
     * 产品对比
     */
    //对比栏显示隐藏
    $('.js_compareBoxShow').on('click',function(){

        if(parseInt($(this).attr('data-show'))){
            $('.js_compareBox').hide();
            $(this).attr('data-show',0);
            $(this).html('展开<i class="iconfont icon-arrow-line-up"></i>');
        }else{

            $('.js_compareBox').show();
            $(this).attr('data-show',1);
            $(this).html('隐藏<i class="iconfont icon-arrow-line-down"></i>');
        }
    });
    //删除单个对比产品
    $('.js_compareClose').on('click',function(){
        $(this).parent().remove();
    });
    //添加对比商品
    $('.js_compareAddProduct').on('click',function(){

        //显示对比栏
        $('.js_compareBox').show();
        $('.js_compareBoxShow').attr('data-show',1);
        $('.js_compareBoxShow').html('隐藏<i class="iconfont icon-arrow-line-down"></i>');

        //加入商品对比列表的模板,
        var temp = '<li>'+
                        '<div class="compare-product-img">'+
                            '<img src="images/compare_goods.PNG">'+
                        '</div>'+
                        '<div class="compare-product-info">'+
                           ' <p>双开门双</p>'+
                            '<p class="leaveout">双开门双开门双开门双开门</p>'+
                            '<span>GHEGEGJ-GHEIGO</span>'+
                        '</div>'+
                       ' <i class="iconfont icon-close compare-close js_compareClose"></i>'+
                    '</li>';
        $('.js_compareBox').prepend(temp);

    });

});
