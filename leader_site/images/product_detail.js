$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

        //轮播模板
	    var mySwiper = new Swiper ('.js_swiper', {
		    direction: 'horizontal',
		    grabCursor : true,
		    loop: true,
		    autoplay: 1000,
		    
		    // 如果需要分页器
		    pagination: '.js_swiper_pagination',
		    paginationType : 'bullets',
		    
		    // 如果需要前进后退按钮
		    nextButton: '.js_swiper_next',
		    prevButton: '.js_swiper_prev',
		    
		    // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar'
		});

		//核心卖点
	    var mySwiper = new Swiper ('.js_swiperSellPoint', {
		    // direction: 'horizontal',
		    grabCursor : true,
		    loop: true,
		    autoplay: 1000,
		    
		    // 如果需要分页器
		    pagination: '.js_swiper_paginSellPoint',
		    paginationType : 'bullets',
		    
		    // 如果需要前进后退按钮
		    nextButton: '.js_swiper_nextSellPoint',
		    // prevButton: '.js_swiper_prevSellPoint',
		});
		setTimeout(function(){
			$('.js_oHerl').css('height',$('.js_oHerlSize').outerHeight());
			$('.js_center').oBoxCenter().init();
	    },1000);

	    //电商拉页
	    setTimeout(function(){
			$('.js_oHerlFoldover').css('height',$('.js_oHerlSizeFoldover').outerHeight());
			$('.js_center').oBoxCenter().init();
	    },1000);

	    $('.js_foldPlus').on('click',function(){
	    	if($(this).hasClass('icon-plus')){

	    		//文字列表
	    		$('.js_foldlist').slideDown(300);
	    		$(this).removeClass('icon-plus').addClass('icon-close');
	    		$(this).parent().css('color','#ccc');

	    		//右侧图片
	    		$('.js_foldimg img').each(function(i,n){
	    			if(i){
	    				var src = $(this).attr('data-src');
	    				$(this).attr('src',src);
	    			}
	    		});
	    		$('.js_oHerlFoldover').css('height',$('.js_oHerlSizeFoldover').outerHeight());
				// $('.js_foldoverNav').css({
				// 	'position':'fixed',
				// 	'top':'0',
				// 	'left':'0',
				// });
	    	}else{

	    		//文字列表
	    		$('.js_foldlist').slideUp(300);
	    		$(this).removeClass('icon-close').addClass('icon-plus');
	    		$(this).parent().css('color','#e60012');

	    		//右侧图片
	    		$('.js_foldimg img').each(function(i,n){
	    			if(i){
	    				$(this).attr('src','');
	    			}
	    		});
	    		$('.js_oHerlFoldover').css('height',$('.js_oHerlSizeFoldover').outerHeight());
				$('.js_center').oBoxCenter().init();
	    	}
	    	
	    });
	    $('.js_foldMinus').on('click',function(){
	    	$('.js_foldlist').hide();
	    	$(this).hide();
	    	$('.js_foldPlus').show();
	    });

	    //延迟加载图片
	    setTimeout(function(){
	        $(".o_picture").each(function(){
	            $(this).oPicture({
	                //自定义节点宽度
	                //sm:544,md:700,lg:992,xl:1200,
	            }).init();
	        });
	    },300);




	    // 更多选择
	    logoChange();

	    $(".main_header").hover(function(){
	      $(this).addClass("hover");
	      // $(".header_cont .logo img").attr("src",casarteUrl+"c_logo_black.png");
	    },function(){
	      $(this).removeClass("hover");
	      logoChange();
	    });



		function logoChange(){
		var winW=$(window).width();
		if(winW>991){
			// $(".header_cont .logo img").attr("src",casarteUrl+"c_logo_white.png");
		if($(".js_vipactivityC_menu").hasClass("show")){
			$(".main_header").addClass("hover");
		}else{
			$(".main_header").removeClass("hover");
		}
		}else{
			// $(".header_cont .logo img").attr("src",casarteUrl+"c_logo_black.png");
		}

		}

		function otherScript() {
	        // loadSrc("images/c_member.js");

	        $(".js_indexbannerbg").oBgCover().init();
	        $(".js_clubEntrance_bg").oBgCover().init();
	        $(".js_powerInfo_bg").oBgCover().init();

	        var powerInfo_list = $(".js_powerInfo_list").oSlider({
	            loop: true
	        });
	        powerInfo_list.init();

	        // $.ajax({
	        //     type: "post",
	        //     dataType: "json",
	        //     url: "http://testuser.casarte.com/CasarteFramework/shopRightsList/getShopRightsList?type=1",
	        //     success: function(returnData) {
	        //         if (returnData.isSuccess) {
	        //             // var goodsList = '';
	        //             // for (var i = 0; i < returnData.data.resultlist.length; i++) {

	        //             //     var goodsItem = returnData.data.resultlist[i]
	        //             //     goodsList += '<li class="o_u o_df_1-3 o_sm_2-2 o_xs_2-2">' +
	        //             //         '<div class="box o_animate">' +
	        //             //         '<img class="pro_img o_animate" src="' + goodsItem.image + '" alt="">' +
	        //             //         '<h2 class="o_animate leaveout">' + goodsItem.productName + '</h2>' +
	        //             //         '<div class="info _animate">' +
	        //             //         '<p>积分: <span>' + goodsItem.credits + '</span> <i></i> 市场价: <span>￥' + goodsItem.marketPrice + '</span></p>' +
	        //             //         '<div>' +
	        //             //         '<a href="' + goodsItem.docpubUrl + '" class="o_bgbtn1 o_btn_df-df o_btn_xs-sm"><span>立即兑换</span></a>' +
	        //             //         '</div>' +
	        //             //         '</div>' +
	        //             //         '</div>' +
	        //             //         '</li>';
	        //             // }

	        //             // $(".js_powerInfo_banner ul").html(goodsList)

	                    
	        //         }
	        //     }
	        // });
	        // 
	        var powerInfo_banner = $(".js_powerInfo_banner").oSlider({
	                        nextFn: function() {
	                            powerInfo_banner_change()
	                        },
	                        prevFn: function() {
	                            powerInfo_banner_change()
	                        },
	                        playFn: function() {
	                            powerInfo_banner_change()
	                        },
	                        loop: true
	                    });
	                    powerInfo_banner.init();

	                    $(".js_powerInfo_banner").on("click", "li", function() {
	                        var winW = $(window).width();
	                        if (winW >= 992) {
	                            if (powerInfo_banner.clickI == powerInfo_banner.i + 2 || powerInfo_banner.clickI == powerInfo_banner.i + 2 - powerInfo_banner.amount_yuan) {
	                                powerInfo_banner.nextBtn.click();
	                            } else if (powerInfo_banner.clickI == powerInfo_banner.i) {
	                                powerInfo_banner.prevBtn.click();
	                            }
	                        }
	                    })

	                    function powerInfo_banner_change() {
	                        // if(isIe8){
	                        //     $(".js_powerInfo_banner li .box").stop().animate({"marginTop":"139px","padding":"15px 15px 0","width":"180px","background":"url(member_zz_bg.png)"},400);
	                        // }else{
	                        var i = powerInfo_banner.i,
	                            winW = $(window).width();
	                        if (winW >= 992) {
	                            i++;
	                        }

	                        $(".js_powerInfo_banner li").removeClass("big");
	                        $(".js_powerInfo_banner li").eq(i).addClass("big")
	                        $(".js_powerInfo_banner li").eq(i + powerInfo_banner.amount_yuan).addClass("big");
	                        $(".js_powerInfo_banner li").eq(i + (powerInfo_banner.amount_yuan * 2)).addClass("big");
	                        //}

	                    }
	                    $(window).resize(function() {
	                        powerInfo_banner_change();
	                    });
	                    powerInfo_banner_change();

	    }
	    otherScript();
    }


});