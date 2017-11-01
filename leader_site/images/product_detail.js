$(function() {
    
    //用来存放所有轮播
    var swiper = {};

    //文字卖点
    swiper.fontSwiper = new Swiper('.js_fontSwiper',{
        slidesPerView : 'auto',
    });

    //场景展示
    $(".js_scenePicture").each(function() {
        $(this).oPicture({}).init();
    });
    swiper.sceneSwiper = new Swiper('.js_sceneSwiper',{
        loop: true,
        autoplay: 1000,
        slidesPerView: 1,//滑动展示个数
        centeredSlides: true,
        slidesPerGroup: 1,//每次滑动移动个数
        // calculateHeight : true,//Swiper根据slides内容计算容器高度。
    });

    //核心卖点
    swiper.sellPointSwiper = new Swiper('.js_swiperSellPoint', {
        grabCursor: true,
        // loop: true,
        // autoplay: 1000,
        onFirstInit: function(swiper){
            $('.js_sellpointFont').hide();
            $('.js_sellpointFont').eq(0).show();
        },
        onSlideChangeEnd:function(swiper){
            var index = swiper.activeIndex;
            $('.js_sellpointFont').hide();
            $('.js_sellpointFont').eq(index).show();
        }
    });
    $('.js_swiperSellPointNext').on('click',function(){
        swiper.sellPointSwiper.swipeNext();
    });

    //优惠组合
    swiper.preferentialSwiper = new Swiper('.js_swiperPreferential', {
        direction: 'horizontal',
        grabCursor: true,
        loop: true,
        // autoplay: 1000,
        slidesPerView: 4,
        // 如果需要分页器
        // pagination: '.js_swiperPreferential',
        paginationType: 'bullets',

        // 如果需要前进后退按钮
        nextButton: '.js_swiper_next',
        prevButton: '.js_swiper_prev',

        // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar'
    });

    //更多选择
    swiper.moreSwiper = new Swiper('.js_swiperMore1', {
        loop: true,
        autoplay: 1000,

        slidesPerView: 3,//滑动展示个数
        centeredSlides: true,
        slidesPerGroup: 1,//每次滑动移动个数
        // calculateHeight : true,//Swiper根据slides内容计算容器高度。

    });

    $('.js_swiperMore_prev').click(function(){
        swiper.moreSwiper.swipePrev(); 
    });
    $('.js_swiperMore_next').click(function(){
        swiper.moreSwiper.swipeNext(); 
    });

    init();


    //电商拉页
    /*$('.js_foldPlus').on('click', function() {
        //电商拉页-点击加号，展示锚点定位
        var eleI = $(this).find('i').eq(0);
        if (eleI.hasClass('icon-plus')) {

            //文字列表
            $('.js_foldlist').slideDown(300);
            eleI.removeClass('icon-plus').addClass('icon-close');
            eleI.parent().css('color', '#ccc');

            //右侧图片
            $('.js_foldimg img').each(function(i, n) {
                if (i) {
                    var src = $(this).attr('data-src');
                    $(this).attr('src', src);
                }
            });

            //小屏幕文字列表-轮播
            if(document.body.offsetWidth <= 991){
                $('.js_foldoverSwiper').show();
                swiper.foldoverSwiper = new Swiper('.js_foldoverSwiper',{
                    loop: true,
                    slidesPerView : 'auto',
                });
            }
        } else {

            //文字列表
            $('.js_foldlist').slideUp(300);
            eleI.removeClass('icon-close').addClass('icon-plus');
            eleI.parent().css('color', '#e60012');

            //小屏幕文字列表-轮播
            if(document.body.offsetWidth <= 991){
                $('.js_foldoverSwiper').hide();
            }

            //右侧图片
            $('.js_foldimg img').each(function(i, n) {
                if (i) {
                    $(this).attr('src', '');
                }
            });

            $('.js_oHerlFoldover').css('height', $('.js_oHerlSizeFoldover').outerHeight());
            $('.js_center').oBoxCenter().init();

            location.href = $('.js_foldlist').find('a').eq(0).attr('href');
        }

        //锚点定位后，左侧按钮定位
        $('.js_foldoverNav').find('a').on('click',function(){
            var index = parseInt($(this).attr('data-index'));
            var top = 370;
            var topSm = 0;
            for(var i=0 ; i<index ; i++){
                if(i==index-1){
                    topSm = $('.js_foldimg').find('img').eq(i).height();
                    return;
                }
                top += $('.js_foldimg').find('img').eq(i).height();
                topSm += $('.js_foldimg').find('img').eq(i).height();
            }
            if(document.body.offsetWidth>991){
                $('.js_foldPlus').css('top',top);
                $('.js_foldoverNav').css('height',$('.js_oHerlSizeFoldover').height());
                $('.js_foldlist').css('top',top-310);
            }else{
                $('.js_foldPlus').css('top',topSm);
                // $('.js_foldoverNav').css('height',$('.js_oHerlSizeFoldover').height());
                $('.js_foldoverNav').css('height',0);
            }

        });

    });*/

    /********电商拉页*******/
    //电商拉页
    $('.js_foldPlus').on('click', function() {
        //电商拉页-点击加号，展示锚点定位
        var eleI = $(this).find('i').eq(0);
        if (eleI.hasClass('icon-plus')) {
            //文字列表
            $('.js_foldlist').slideDown(300);
            eleI.removeClass('icon-plus').addClass('icon-close');
            eleI.parent().css('color', '#ccc');

            //点击加好显示所有图片
            $('.js_foldimg .box').each(function (i) {
                $(this).removeClass("o_df-hide");
            })
            //小屏幕文字列表-轮播
            if(document.body.offsetWidth <= 991){
                $('.js_foldoverSwiper').show();
                $(this).find('span').html("");
                $(this).parent(".js_oHerlFoldover").addClass("cur").addClass("fixed");
                var html = '<a class="iconfont icon-bg-solid round js_round"></a>'
                $(this).parent(".js_foldoverNav").append(html);
            }else{
                $(this).find('span').html("收起产品介绍");
            }
            if(document.body.offsetWidth <= 991) {
                location.href = $('.js_foldoverSwiper').find('a').eq(0).attr('href');
            }else{
                location.href = $('.js_foldlist').find('a').eq(0).attr('href');
            }
        } else {

            //文字列表
            $('.js_foldlist').slideUp(300);
            eleI.removeClass('icon-close').addClass('icon-plus');
            eleI.parent().css('color', '#e60012');

            //小屏幕文字列表-轮播
            if(document.body.offsetWidth <= 991){
                $('.js_foldoverSwiper').hide();
                $(this).parent(".js_oHerlFoldover").removeClass("cur").removeClass("fixed");
                $(".js_round").remove();
            }

            //点击加号隐藏img(除了第一个)
            $('.js_foldimg .box').each(function (i) {
                $(this).addClass("o_df-hide");
                $('.js_foldimg .box').eq(0).removeClass("o_df-hide");
            })


            //$('.js_oHerlFoldover').css('height', $('.js_oHerlSizeFoldover').outerHeight());
            $('.js_center').oBoxCenter().init();
            $(this).find('span').html("详细产品介绍");
            if(document.body.offsetWidth <= 991) {
                location.href = $('.js_foldoverSwiper').find('a').eq(0).attr('href');
            }else{
                location.href = $('.js_foldlist').find('a').eq(0).attr('href');
            }
        }

    });

    //锚点定位后，左侧按钮定位
    $('.js_foldoverNav .js_foldlist').find('a').on('click',function(){
        var index = parseInt($(this).attr('data-index'));
        //点击当前锚点，添加选中状态，同类去掉选中状态
        $(this).addClass("alive").siblings().removeClass("alive");
        var btnNum = $(".js_foldlsit_btn").find("a").length;
        var top = (btnNum * 52) + 60;
        for(var i=0 ; i<index ; i++){
            top += $('.js_foldimg').find('img').eq(i).height();
        }
        if(document.body.offsetWidth>991){
            $('.js_foldPlus').css('top',top);
            $('.js_foldoverNav').css('height',$('.js_oHerlSizeFoldover').height());
            $('.js_foldlist').css('top',top-(btnNum * 52));
        }else{
            $('.js_foldoverNav').css('height',0);
        }
    });

    $(window).scroll(function () {
        var $winTop = $(window).scrollTop();
        var foldH = $(".js_detail-foldover").offset().top + $(".js_detail-foldover").height() - 70;
        if($(".js_foldoverNav").hasClass("cur")){
            if($winTop > foldH){
                $(".js_oHerlFoldover").removeClass("fixed");
            }else{
                $(".js_oHerlFoldover").addClass("fixed");
            }
        }

    });

    foldlsit();
    //电商拉页重新绘制拉页锚点
    function foldlsit() {
        $(".js_foldlsit_btn").html("");
        $(".js_foldoverNav_btn").html("");
        var num =$(".js_buyhtml .js_box").length;
        var btnhtml = '';
        var url=window.location.href.split("/")[window.location.href.split("/").length-1]
        url = url.split("/")[0];
        for(var i=0;i<num;i++){
            $(".js_buyhtml .js_box").eq(i).attr("id",i+'F').addClass("o_df-hide");
            $(".js_buyhtml .js_box").eq(0).removeClass("o_df-hide");
            var text = $(".js_buyhtml .js_box").eq(i).find(".js_tag").text();
            if(document.body.offsetWidth>991){
                if(i == 0){
                    btnhtml += '<a href="'+url+'#'+i+'F" name="'+i+'F" class="l-btn-normal alive" data-index='+i+'>'+text+'</a>';
                }else{
                    btnhtml += '<a href="'+url+'#'+i+'F" name="'+i+'F" class="l-btn-normal" data-index='+i+'>'+text+'</a>';
                }
                $(".js_foldlsit_btn").html(btnhtml);
            }else{
                if(i == 0){
                    btnhtml += '<a href="'+url+'#'+i+'F" name="'+i+'F" class="l-btn-sm l-btn-line2 alive" data-index='+i+'>'+text+'</a>';
                }else{
                    btnhtml += '<a href="'+url+'#'+i+'F" name="'+i+'F" class="l-btn-sm l-btn-line2" data-index='+i+'>'+text+'</a>';
                }
                $(".js_foldoverNav_btn").html(btnhtml);
            }


        }
        var btnNum = $(".js_foldlsit_btn").find("a").length;
        var foldPlus = (btnNum * 52) + 60;
        if(document.body.offsetWidth>991){
            $(".js_foldPlus").css("top",foldPlus+'px');
        }

    }


    /********电商拉页*********/


    //产品参数-结构图居中
    $(".js_structbg").oBgCover().init(); //激活方法
    $(".js_structbg").css('margin-left', '-424px');

    $(".js_swiperPreferential .js_checkbox").jq_qvote();

    //浏览产品细节图
    $('.js_bannerSwiperClose').on('click', function() {
        $('.js_specificsBoxShow').fadeOut(1000);
    });
    $('.js_specificsShow').on('click', function() {
        $('.js_specificsBoxShow').fadeIn(1000);
        swiper.bannerSwiper = new Swiper('.js_bannerSwiper', {
            // loop: true,
            // autoplay: 3000,
            updateOnImagesReady: true,
            centeredSlides: true,
            slidesPerView: 3,
            watchActiveIndex: true,
            onFirstInit: function(swiper) {

                // var index = swiper.activeLoopIndex;
                var index = swiper.activeIndex;

                $('.js_bannerSwiper .swiper-slide-active').find('img').animate({
                    'margin-top': '-200px',
                    'height': '400px'
                }, 500);

                $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
                    'margin-top': '-143px',
                    'height': '286px'
                });

            },
            onSlideChangeEnd: function(swiper) {
                var index = swiper.activeLoopIndex;

                $('.js_bannerSwiper .swiper-slide-active').find('img').animate({
                    'margin-top': '-200px',
                    'height': '400px'
                }, 500);

                $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
                    'margin-top': '-143px',
                    'height': '286px'
                });

                $('.js_bannerSwiperPage .pagination-box').removeClass('active');
                $('.js_bannerSwiperPage .pagination-box').eq(swiper.activeIndex).addClass('active');

            }
        });
        //分页
        $('.js_bannerSwiperPage .pagination-box').click(function() {
            var index = $(this).attr('data-index');

            swiper.bannerSwiper.swipeTo(parseInt(index), 1000, false);
            $('.js_bannerSwiper .swiper-slide-active').find('img').animate({
                'margin-top': '-200px',
                'height': '400px'
            }, 500);

            $('.js_bannerSwiper .swiper-slide').not('.swiper-slide-active').find('img').css({
                'margin-top': '-143px',
                'height': '286px'
            });

            $(this).siblings('.pagination-box').removeClass('active');
            $(this).addClass('active');
        });
        // 上一页 下一页
        $('.js_bannerSwiperPrev').on('click', function() {
            swiper.bannerSwiper.swipePrev();
        });
        $('.js_bannerSwiperNext').on('click', function() {
            swiper.bannerSwiper.swipeNext();
        });
    });


    $(window).resize(function() {
        init();
    });


    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

        var slidesPerView = 4;

        if (screenWidth <= 575) {
            slidesPerView = 1;
        } else if (screenWidth > 1199) {
            slidesPerView = 4;
        } else {
            slidesPerView = 2;
        }

        swiper.preferentialSwiper.params.slidesPerView = slidesPerView;

        setTimeout(function() {
            $('.js_oHerl').css('height', $('.js_oHerlSize').outerHeight());
            $('.js_center').oBoxCenter().init();
        }, 1000);

        //延迟加载图片
        setTimeout(function() {
            $(".o_picture").each(function() {
                $(this).oPicture({
                    //自定义节点宽度
                    //sm:544,md:700,lg:992,xl:1200,
                }).init();
            });
        }, 300);


        setTimeout(function() {

            // 更多选择
            $('.js_oHerlMore').css('height', $('.js_oHerlSizeMore').outerHeight());
            $('.js_center').oBoxCenter().init();
            //电商拉页
            if(screenWidth>991){
                $('.js_oHerlFoldover').css('height', $('.js_oHerlSizeFoldover').outerHeight());
            }


        }, 1000);

        //更多选择
        if(screenWidth>575){
            swiper.moreSwiper.reInit();
        }

    }


    //手机验证
    $('.js-bindmobinput').blur(function() {
        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if (yanzhengtrue) {
            $('.js-getinfo').removeClass('l-btn-disable').click(function() {

                yanzhengtrue = $('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');
                if (yanzhengtrue) {
                    var newMobile = $('.js-newMobile').val();

                    //  手机号发送验证码接口

                }
            });
        } else {
            $('.js-getinfo').addClass('l-btn-disable');
        }

    });

    //验证码成功后可点击提交
    $('.js-mobileCode').blur(function() {

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');

        if (yanzhengtrue) { //点击确定 个人中心绑定手机号接口
            $('.js-submintData').removeClass('l-btn-disable');
            $('.js-submintData').unbind().bind('click', function() {
                var newMobile = $('.js-newMobile').val();
                var mobileCode = $('.js-mobileCode').val();


            });
        } else {
            //    提示错误信息 验证码错误

            //禁止点击
            $('.js-submintData').unbind().bind('click', function() {
                $(this).addClass('l-btn-disable');
                return false;
            });
        }

    });
    //密码验证
    $('.js-landUserIdInput').blur(function() {
        var yanzhengtrue = $(this).parents('.land-cont-normal-input').find('.Validform_right');
        if (yanzhengtrue.length == 2) { //点击确定 个人中心绑定手机号接口

            $('.js-submintData').removeClass('l-btn-disable');
            $('.js-submintData').unbind().bind('click', function() {

            })
        } else {
            //    提示错误信息 验证码错误
            $('.js-submintData').addClass('l-btn-disable');
            //禁止点击
            $('.js-submintData').unbind().bind('click', function() {

                return false;
            })
        }
    });
    //密码验证
    $('.js-landPassWordInput').blur(function() {
        var yanzhengtrue = $(this).parents('.land-cont-normal-input').find('.Validform_right');
        if (yanzhengtrue.length == 2) { //点击确定 个人中心绑定手机号接口

            $('.js-submintData').removeClass('l-btn-disable');
            $('.js-submintData').unbind().bind('click', function() {

            })
        } else {
            //    提示错误信息 验证码错误
            $('.js-submintData').addClass('l-btn-disable');
            //禁止点击
            $('.js-submintData').unbind().bind('click', function() {

                return false;
            })
        }

    });

    //账号验证
    $('.js-landUserIdInput').blur(function() {
        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if (yanzhengtrue) {
            $('.js-getinfo').removeClass('l-btn-disable').click(function() {

                yanzhengtrue = $('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');
                if (yanzhengtrue) {
                    var newMobile = $('.js-newMobile').val();

                    //  手机号发送验证码接口

                }
            })
        } else {
            $('.js-getinfo').addClass('l-btn-disable');
        }

    });
    //手机验证
    $('.js-bindmobinput').blur(function() {
        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if (yanzhengtrue) {
            $('.js-getinfo').removeClass('l-btn-disable').click(function() {

                yanzhengtrue = $('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');
                if (yanzhengtrue) {
                    var newMobile = $('.js-newMobile').val();

                    //  手机号发送验证码接口

                }
            })
        } else {
            $('.js-getinfo').addClass('l-btn-disable');
        }

    });

    var phone = $(".js-landPhone").Validform({
        tiptype: 3,
        label: ".label",
        showAllError: true,
        ajaxPost: true

    });
    var phoneyanzheng = $(".js-landPhoneYanzheng").Validform({
        tiptype: 3,
        label: ".label",
        showAllError: true,
        ajaxPost: true

    });

    var landUserId = $(".js-landUserId").Validform({
        tiptype: 3,
        label: ".label",
        showAllError: true,
        ajaxPost: true

    });
    var landPassWord = $(".js-landPassWord").Validform({
        tiptype: 3,
        label: ".label",
        showAllError: true,
        ajaxPost: true

    });

});
