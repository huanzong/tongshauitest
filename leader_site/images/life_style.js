$(function () {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    if(windowWidth>1199){
        var navHeight = 120;
    }else if(windowWidth>700){
        var navHeight = 100;

    }
    var styleVideoHeight = $('.js_styleVideoCont').height();
    var styleVudeoPading = (windowHeight - navHeight - styleVideoHeight) / 2;
    var lifeCasePhotoH = windowWidth / 3 / 0.75;
    var lifeCasePhotoHMd = windowWidth / 2 / 0.75;
    if (windowWidth > 991) {
        // alert(1);
        $('.js_styleVideoBox').css('height', windowHeight - navHeight);
        $('.js_playerBox').css('height', windowHeight - navHeight);
        $('.js_styleVideoCont').css({'padding-top': styleVudeoPading, 'padding-bottom': styleVudeoPading});
        $(".js_playerBox").find(".mejs-video").css('height', windowHeight - navHeight);
        $(".js_playerBox").css('height', windowHeight - navHeight);
        $(".js_jchg_video").css('height', windowHeight - navHeight);
        $("#mep_0").css('height', windowHeight - navHeight);
    }


// xl屏幕下视频模块hover有效

    $('.js_styleVideoContRight').hover(function () {
        if (windowWidth > 1199) {
            var type = $(this).attr('data-alt');
            if (type == 'false') {
                $('.js_styleVideoContLeft').hide();
                $(this).css({'width': '50%', 'background-position': 'right top'});
                $(this).attr('data-alt', 'true');
            }
        }
    }, function () {
        if (windowWidth > 1199) {
            $('.js_styleVideoContLeft').show();
            $(this).css({'width': '25%', 'background-position': 'left top'});
            $(this).attr('data-alt', 'false');
        }
    })


    $('.js_styleVideoContLeft').hover(function () {
            if (windowWidth > 1199) {
                var type = $(this).attr('data-alt');
                if (type == 'false') {
                    $('.js_styleVideoContRight').hide();
                    $(this).css({'width': '50%', 'background-position': 'left top'});
                    $(this).attr('data-alt', 'true');
                }
            }
        }, function () {
            if (windowWidth > 1199) {
                $('.js_styleVideoContRight').show();
                $(this).css({'width': '25%', 'background-position': 'right top'});
                $(this).attr('data-alt', 'false');

            }
        }
    )

// xl屏幕下视频模块click有效

    $('.js_styleVideoContLeft').click(function () {
            // alert(1);
            if (windowWidth < 1199 && windowWidth > 991) {
                var type = $(this).attr('data-alt');
                if (type == 'false') {
                    $('.js_styleVideoContRight').hide();
                    $(this).css({'width': '33.33333337%', 'background-position': 'left top'});
                    $(this).attr('data-alt', 'true');
                } else {
                    $(this).css({'width': '16.66666667%', 'background-position': 'right top'});
                    $(this).attr('data-alt', 'false');
                    $('.js_styleVideoContRight').show();

                }
            }
        }
    )
    $('.js_styleVideoContRight').click(function () {
            // alert(1);
            if (windowWidth < 1199 && windowWidth > 991) {
                var type = $(this).attr('data-alt');
                if (type == 'false') {
                    $('.js_styleVideoContLeft').hide();
                    $(this).css({'width': '33.33333337%', 'background-position': 'left top'});
                    $(this).attr('data-alt', 'true');
                } else {
                    $(this).css({'width': '16.66666667%', 'background-position': 'right top'});
                    $(this).attr('data-alt', 'false');
                    $('.js_styleVideoContLeft').show();

                }
            }
        }
    )


// md之下设置顶部导航轮播图片宽度

    var maxImgHeight = windowWidth / 12 * 11 / 7 * 4;
// alert(maxImgHeight);
    $('.js_videoMdImgMin img').css({
        "height": maxImgHeight / 4 * 3,
        "top": maxImgHeight / 8 + 'px'
    })
    if (windowWidth > 1199) {
        $('.js_superiorityBox').height(windowWidth / 3 / 0.75);

    }


    $('.js_videoMdImgMin').height($('.js_videoMdImgMax').height())

    if (windowWidth > 1199) {
        $('.js_lifeStylePhotoCentent').height(windowWidth / 2);
        // $('.js_lifeStylePhotoLeft').children('.js_lifeStylePhotoCentent').height(windowWidth/3);
        $('.js_lifeStylePhotoLeft').children('.js_lifeStylePhotoCentent').css({
            'height': windowWidth / 3,
            'margin-top': (windowWidth / 2 - windowWidth / 3) / 2
        });
        $('.js_lifeStylePhotoRight').children('.js_lifeStylePhotoCentent').css({
            'height': windowWidth / 3,
            'margin-top': (windowWidth / 2 - windowWidth / 3) / 2
        });
        $('.js_photoRightBtn').css('line-height', windowWidth / 2 + 'px');
        $('.js_photoLeftBtn').css('line-height', windowWidth / 2 + 'px');
    } else {
        $('.js_lifeStylePhotoCentent').height(windowWidth * 0.6666666667);
        $('.js_lifeStylePhotoLeft').children('.js_lifeStylePhotoCentent').css({
            'height': windowWidth * 0.47,
            'margin-top': (windowWidth / 2 - windowWidth / 3) / 2
        });
        $('.js_lifeStylePhotoRight').children('.js_lifeStylePhotoCentent').css({
            'height': windowWidth * 0.47,
            'margin-top': (windowWidth / 2 - windowWidth / 3) / 2
        });
        $('.js_photoRightBtn').css('line-height', windowWidth * 0.6666666667 + 'px');
        $('.js_photoLeftBtn').css('line-height', windowWidth * 0.6666666667 + 'px');

    }


//核心优势

    $('.js_lifeStyleSuperiorityL').height(windowWidth / 3 / 0.75);
    $('.js_superiorityLeftMin').css({"height": windowWidth / 3, "top": (windowWidth / 3 / 0.75 - windowWidth / 3) / 2});
    $('.js_lifeStyleSuperiorityLDown').css({
        "height": windowWidth / 3,
        "top": (windowWidth / 3 / 0.75 - windowWidth / 3) / 2
    });
    $('.js_liftSuperiorityLeft').height(windowWidth / 3 / 0.75);
    $('.js_liftSuperiorityRight').height(windowWidth / 3 / 0.75);


// 设置lift-style-case 图片切换按钮高度

    // alert(lifeCasePhotoH);
    if (windowWidth > 991) {
        $('.js_lifeStyleCaseLeft').css({'height': lifeCasePhotoH, "line-height": lifeCasePhotoH + 'px'})
        $('.js_lifeStyleCaseRight').css({'height': lifeCasePhotoH, "line-height": lifeCasePhotoH + 'px'})
        //$('.js_casePhotoMinLeft').css('top',($('.js_lifeStyleCasePhoto').height()-lifeCasePhotoHMd)/2);
        //$('.js_casePhotoMinRight').css('top',($('.js_lifeStyleCasePhoto').height()-lifeCasePhotoHMd)/2);
    } else {
        $('.js_lifeStyleCaseLeft').css({'height': lifeCasePhotoHMd, "line-height": lifeCasePhotoHMd + 'px','margin-top':($('.js_lifeStyleCasePhoto').height()-lifeCasePhotoHMd)/2})
        $('.js_lifeStyleCaseRight').css({'height': lifeCasePhotoHMd, "line-height": lifeCasePhotoHMd + 'px','margin-top':($('.js_lifeStyleCasePhoto').height()-lifeCasePhotoHMd)/2})
        $('.js_casePhotoMinLeft').css('top',($('.js_lifeStyleCasePhoto').height()-lifeCasePhotoHMd)/2);
        $('.js_casePhotoMinRight').css('top',($('.js_lifeStyleCasePhoto').height()-lifeCasePhotoHMd)/2);
    }
    $('.js_lifeStyleCaseText').css({'height': lifeCasePhotoH});


    // 创造优生活title
    $('.js_lifeStyleCreateTop li').click(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        var $index = $(this).index();
        $('.js_lifeStyleCreateSwipe').eq($index).show().siblings('.js_lifeStyleCreateSwipe').hide();
        $('.js_lifeStyleCreateTitle').eq($index).show().siblings('p').hide();

    })


//视频
    $ie8 = false;

    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (trim_Version == "MSIE8.0") {
            $ie8 = true;
        }
    }


    pageScript();
    function videoMethod() {

        $('audio,video').mediaelementplayer({
            success: function (media, player, node) {
                console.log($('#' + node.id + '-mode').html('mode: ' + player.pluginType));
                $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
                //$('.mejs-overlay-button').trigger('click');
            },
            showPosterWhenEnded: true,//显示海报
            autosizeProgress: false,//根据其他元素的大小自动计算进度条的宽度
            setDimensions: true,
            defaultVideoWidth: 700,
            iPadUseNativeControls: true,//强制iPad的原生控件
            iPhoneUseNativeControls: true,//强制iPhone的本机控件
            AndroidUseNativeControls: true,//强制Android的原生控件
            usePluginFullScreen: false,//在全屏模式下激活指针事件检测的标志
            enableProgressTooltip: false,//启用/禁用在进度栏中显示时间弹出窗口的工具提示
            alwaysShowControls: false,//播放时隐藏控件，鼠标不在视频上方
            fullscreenText: '全屏',
            hideVideoControlsOnLoad: true,//显示视频控制
            hideVideoControlsOnPause: true//暂停显示控件
        });
    }

    function pageScript() {
        videoMethod();
         if (window.innerWidth == undefined || window.innerWidth > 1199) {
             var player1 = new MediaElementPlayer('#player1');

             $(".js_styleLifevideoClose ").on('click', function () {
                 // alert(1);
                 player.pause();
                 $(".js_playerBox ").hide();
                 $('.js_styleVideoBox').show();
             });

             var userAgent = navigator.userAgent;
             var player = new MediaElementPlayer('#player');
             $(".js_lifeStylePlay ").on('click', function () {
                 videoMethod();
                 var windowHeight = $(window).height();
                 var navHeight = $('l-opacity0').height();
                 $('.js_styleVideoBox').hide();


                 $(".js_playerBox ").show().find(".mejs-video ").removeClass("o_df-hide ");
                 $("#player ").removeClass("o_df-hide ");
                 setTimeout(function () {
                     $(".js_jchg_video").css('height', windowHeight - navHeight);
                     $("#mep_0 ").css('height', windowHeight - navHeight);
                     $('.mejs-overlay-play').css('height', windowHeight - navHeight);
                     // alert(windowHeight - navHeight);
                 }, 500)
                 var playerID = document.getElementById('player');
                 playerID.addEventListener('progress', onVideoProgressUpdate, false);
                 function onVideoProgressUpdate(e) {
                     var percentageBuffered = 0;
                     if (playerID.buffered.length > 0 && playerID.buffered.end && playerID.duration) {
                         percentageBuffered = playerID.buffered.end(0) / playerID.duration;
                     } else if (playerID.bytesTotal != undefined && playerID.bytesTotal > 0 && playerID.bufferedBytes != undefined) {
                         percentageBuffered = playerID.bufferedBytes / playerID.bytesTotal;
                     }
                     if (userAgent.indexOf("Macintosh ") > -1 && userAgent.indexOf("Safari ") > -1) {
                         if (percentageBuffered <= 0.4) {
                             $(".mejs-overlay-loading ").parent().css("display ", "block ");
                         } else {
                             playerID.play();
                             $(".mejs-overlay-loading ").parent().css("display ", "none ");
                         }
                     }
                 }

                 if (!$ie8) {
                     player.play();
                     var playerID = document.getElementById('player');
                     playerID.addEventListener('progress', onVideoProgressUpdate, false);
                     function onVideoProgressUpdate(e) {
                         var percentageBuffered = 0;
                         if (playerID.buffered.length > 0 && playerID.buffered.end && playerID.duration) {
                             percentageBuffered = playerID.buffered.end(0) / playerID.duration;
                         } else if (playerID.bytesTotal != undefined && playerID.bytesTotal > 0 && playerID.bufferedBytes != undefined) {
                             percentageBuffered = playerID.bufferedBytes / playerID.bytesTotal;
                         }
                         if (userAgent.indexOf("Macintosh ") > -1 && userAgent.indexOf("Safari ") > -1) {
                             if (percentageBuffered <= 0.4) {
                                 $(".mejs-overlay-loading ").parent().css("display ", "block ");
                             } else {
                                 playerID.play();
                                 $(".mejs-overlay-loading ").parent().css("display ", "none ");
                             }
                         }
                     }
                 }
             });
         }else{
             $(".js_lifeStylePlay ").on('click', function (){
                 //alert(1);
               var videoSrc =  $(this).attr('data-src');
                 $("#player").attr("src", videoSrc).removeClass("o_df-hide");

                 if(windowWidth>991){
                     $('.js_styleVideoBox').hide();

                 }else{
                     $('.js_videoMdShow').hide();

                 }



                 // $(this).hide();
                 $(".js_playerBox ").show().find(".mejs-video ").removeClass("o_df-hide ");
                 $("#player ").removeClass("o_df-hide ").css('width','100%');
                 videoMethod();
                 setTimeout(function () {
                     $("#player")[0].play();
                 }, 500);
                 $(".js_styleLifevideoClose ").on('click', function () {
                     // alert(1);
                     var player = new MediaElementPlayer('#player');

                     player.pause();
                     $(".js_playerBox ").hide();
                     $('.js_styleVideoBox').show();
                     $('.js_videoMdShow').show();

                 });

             })
         }
    }


// 优生活轮播

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 2000,
        cssWidthAndHeight: true,
        autoplayDisableOnInteraction: false, //手动滑动图片后是否停止滚动轮播
        onSlideChangeStart: function (swiper) {
            var dataType =  $('.js_lifeStylePhotoBox').attr('data-type');
            var contentNext = $('.js_lifeStyleGoodLifeSwipe .swiper-slide-active').next().children('.js_lifeStylePhotoCentent').css('background');
            var contentPrev = $('.js_lifeStyleGoodLifeSwipe .swiper-slide-active').prev().children('.js_lifeStylePhotoCentent').css('background');
            if(dataType=='left'){
                if (contentPrev == undefined) {
                    contentPrev = $('.js_lifeStyleGoodLifeSwipe').find('.swiper-slide').eq(2).children('.js_lifeStylePhotoCentent').css('background');
                    $('.js_lifeStylePhotoLeft').children('.js_lifeStylePhotoCentent').css('background', contentPrev);
                    $('.js_lifeStylePhotoRight').children('.js_lifeStylePhotoCentent').css('background', contentNext);
                } else {
                    $('.js_lifeStylePhotoRight').children('.js_lifeStylePhotoCentent').css('background', contentNext);
                    $('.js_lifeStylePhotoLeft').children('.js_lifeStylePhotoCentent').css('background', contentPrev);
                }
            }else{
                if (contentNext == undefined) {
                    contentNext = $('.js_lifeStyleGoodLifeSwipe').find('.swiper-slide').eq(2).children('.js_lifeStylePhotoCentent').css('background');
                    $('.js_lifeStylePhotoLeft').children('.js_lifeStylePhotoCentent').css('background', contentPrev);
                    $('.js_lifeStylePhotoRight').children('.js_lifeStylePhotoCentent').css('background', contentNext);
                } else {
                    $('.js_lifeStylePhotoLeft').children('.js_lifeStylePhotoCentent').css('background', contentPrev);
                    $('.js_lifeStylePhotoRight').children('.js_lifeStylePhotoCentent').css('background', contentNext);

                }
            }
            $('.js_lifeStyelGoodLifeDown').html($('.swiper-slide-active').find('.js_lifeStyelGoodLifeCont').html());

        }

    });

    // 优生活切换按钮
    $('.js_photoLeftBtn').on('click', function (e) {
        $('.js_lifeStylePhotoBox').attr('data-type','left');
        e.preventDefault();
        mySwiper.swipePrev();
    });
    $('.js_photoRightBtn').on('click', function (e) {
        $('.js_lifeStylePhotoBox').attr('data-type','right');
        e.preventDefault();
        mySwiper.swipeNext();
    });


// var superiorityNub =


// console.log(superiorityNub[1].title)


// 头部banner轮播
// $('.')
    if (windowWidth < 992) {
        var bannerSwipe = new Swiper('.js_lifeStyleVideoSwipe', {
            loop: true,
            autoplay: 5000,
            simulateTouch: false,
            cssWidthAndHeight: true,
            autoplayDisableOnInteraction: false,//手动滑动图片后是否停止滚动轮播
            onSlideChangeStart: function (swiper) {
                var bannerIndex = $('.js_lifeStyleVideoSwipe').find('.swiper-slide-active').attr('data-index');
                if (bannerIndex == 1) {
                    console.log(1);
                    $('.js_videoMdImgMin').children('img').attr('src', $('.js_videoMdImgMaxL').children('img').attr('src'));
                } else {
                    $('.js_videoMdImgMin').children('img').attr('src', $('.js_videoMdImgMaxR').children('img').attr('src'));
                    console.log(2);

                }
            }
        })
    }

    if (windowWidth > 574) {



// 核心优势 轮播
        var superioritySwiperLeft = new Swiper('.js_superioritySwiperLeft', {
            loop: true,
            autoplay: 5000,
            simulateTouch: true,

            cssWidthAndHeight: true,
            autoplayDisableOnInteraction: false,//手动滑动图片后是否停止滚动轮播
            onSlideChangeStart: function (swiper) {
                var dataType = $('.js_superiorityBox').attr('data-type');
                if (dataType == 1) {
                    // console.log(dataType);

                    $('.js_superiorityBox').attr('data-type', '2');
                    $('.js_superiorityCenter').eq(0).hide();
                    $('.js_superiorityCenter').eq(1).show();
                    $('.js_superiorityJt').eq(1).show();
                    $('.js_superiorityJt').eq(0).hide();
                    $('.js_superiorityDownText').eq(1).show();
                    $('.js_superiorityDownText').eq(0).hide();

                } else if (dataType == 2) {
                    // console.log(dataType);

                    $('.js_superiorityBox').attr('data-type', '1');
                    $('.js_superiorityCenter').eq(1).hide();
                    $('.js_superiorityCenter').eq(0).show();
                    $('.js_superiorityJt').eq(1).hide();
                    $('.js_superiorityJt').eq(0).show();
                    $('.js_superiorityDownText').eq(1).hide();
                    $('.js_superiorityDownText').eq(0).show();
                }
            }
        })
// 核心优势 轮播
        var superioritySwiperRight = new Swiper('.js_superioritySwiperRight', {
            loop: true,
            autoplay: 5000,
            simulateTouch: false,

            cssWidthAndHeight: true,
            autoplayDisableOnInteraction: false,//手动滑动图片后是否停止滚动轮播
            onSlideChangeStart: function (swiper) {


            }
        })
    }
    $('.js_superiorityRightBtn').on('click', function (e) {
        // alert(1)

        e.preventDefault();
        superioritySwiperLeft.swipeNext();
        superioritySwiperRight.swipeNext();
    })
    $('.js_superiorityLeftBtn').on('click', function (e) {
        // alert(1)

        e.preventDefault();
        superioritySwiperLeft.swipePrev();
        superioritySwiperRight.swipePrev()
    })


// 真是案例轮播图

    var caseSwiper = new Swiper('.js_lifeStyleCasePhoto', {
        loop: true,
        autoplay: 5000,
        simulateTouch: false,
        cssWidthAndHeight: true,
        autoplayDisableOnInteraction: false,//手动滑动图片后是否停止滚动轮播
        onSlideChangeStart: function (swiper) {

            var index = $('.js_lifeStyleCasePhoto').find('.swiper-slide-active').attr('data-index');
            $('.js_casePhotoNub').children('li').eq(index - 1).addClass('cur').siblings().removeClass('cur');
            $('.js_lifeStyleCaseText').children('li').eq(index - 1).addClass('cur').siblings().removeClass('cur');

            var casePhotoPrev = $('.js_lifeStyleCasePhoto').find('.swiper-slide-active').prev().children('img').attr('src');
            var casePhotoNext = $('.js_lifeStyleCasePhoto').find('.swiper-slide-active').next().children('img').attr('src');
            // var casePhoto = $('.js_lifeStyleCasePhoto').find('.swiper-slide-active').prev().attr('data-index');
            $('.js_casePhotoMinLeft').children('img').attr('src', casePhotoPrev);

            if (casePhotoNext == undefined) {
                casePhotoNext = $('.js_lifeStyleCasePhoto').find('.swiper-slide').eq(2).children('img').attr('src');
                $('.js_casePhotoMinRight').children('img').attr('src', casePhotoPrev);

            } else {
                $('.js_casePhotoMinRight').children('img').attr('src', casePhotoNext);

            }
            // console.log(casePhotoNext);
        }
    })


    $('.js_lifeStyleCaseLeftBtn').on('click', function (e) {
        e.preventDefault();
        caseSwiper.swipeNext()
    })
    $('.js_lifeStyleCaseRightBtn').on('click', function (e) {

        e.preventDefault();
        caseSwiper.swipePrev()
    })


// 创造优生活 轮播
    var CreateSwipe_1 = new Swiper('.js_lifeStyleCreateSwipe_1', {
        loop: true,
        autoplay: 5000,
        simulateTouch: false,
        cssWidthAndHeight: true,
        autoplayDisableOnInteraction: false,//手动滑动图片后是否停止滚动轮播
        onSlideChangeStart: function (swiper) {

        }
    })

    var CreateSwipe_2 = new Swiper('.js_lifeStyleCreateSwipe_2', {
        loop: true,
        autoplay: 5000,
        simulateTouch: false,
        cssWidthAndHeight: true,
        autoplayDisableOnInteraction: false,//手动滑动图片后是否停止滚动轮播
        onSlideChangeStart: function (swiper) {

        }
    })
    var CreateSwipe_3 = new Swiper('.js_lifeStyleCreateSwipe_3', {
        loop: true,
        autoplay: 5000,
        simulateTouch: false,
        cssWidthAndHeight: true,
        autoplayDisableOnInteraction: false,//手动滑动图片后是否停止滚动轮播
        onSlideChangeStart: function (swiper) {

        }
    })


    $('.js_lifeStyleCreateLeftBtn').on('click', function (e) {
        e.preventDefault();
        CreateSwipe_1.swipeNext()
        CreateSwipe_2.swipeNext()
        CreateSwipe_3.swipeNext()
    })

    $('.js_lifeStyleCreateRightBtn').on('click', function (e) {

        e.preventDefault();
        CreateSwipe_1.swipePrev()
        CreateSwipe_2.swipePrev()
        CreateSwipe_3.swipePrev()
    })


    setTimeout(function () {
        $('.js_lifeStyleCreateTop li').eq(0).click();
    }, 1000)


})
