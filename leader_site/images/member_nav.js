/**
 * Created by 15610 on 2017/10/25.
 */
$(function(){
    var windowW = $(window).width();
    var windowH = $(window).height();
    var documenHeight,documenHeights;
    var homeMemberContBox = $('.js-membercontboxs-2').length;
    documenHeight = $('.js-membercontboxs').height();
    if(!homeMemberContBox){
        $('.js_memberNavLeft').height(documenHeight);
        $('.js_memberNavMiddle').css({'height':documenHeight});
        $('.js_memberNavMiddleBtn').css({height:documenHeight});
    } else{
        $('.js_memberNavLeft').height(documenHeight+120);
        $('.js_memberNavMiddle').css({'height':documenHeight});
        $('.js_memberNavMiddleBtn').css({height:documenHeight});
    }

    //个人中心侧导航高度设定
    var time_height = setInterval(function(){
        if(windowW<576){
            $('.js_memberNavLeft').height('60px');
            $('.js_memberNavMiddleBtn').css({height:'60px'});

        }else{
            documenHeight = $('.js-membercontboxs').height();
                if(documenHeight>windowH&&documenHeight>762){
                    $('.js_memberNavMiddle').css({'height':documenHeight});
                    $('.js_memberNavMiddleBtn').css({height:documenHeight});
                    if(!homeMemberContBox){
                        $('.js_memberNavLeft').height(documenHeight);
                    }else{
                        if(windowW>990){
                            $('.js_memberNavLeft').height(documenHeight+120);
                        }else{
                            $('.js_memberNavLeft').height(documenHeight);
                        }
                    }
                }else if(windowH<762){

                    $('.js_memberNavMiddle').css({'height':762});
                    $('.js_memberNavMiddleBtn').css({height:762});
                    if(!homeMemberContBox){
                        $('.js_memberNavLeft').height(762);
                    }else{
                        if(windowW>990){
                            $('.js_memberNavLeft').height(762+120);
                        }else{
                            $('.js_memberNavLeft').height(762);
                        }
                    }
                }else{
                    $('.js_memberNavMiddleBtn').css({height:windowH-$('.footer').height()});

                    if($('.js_memberNavMiddleBtn').attr('data-alt')==2){
                        $('.js_memberNavMiddle').css({'height':windowH});
                        $('.js_memberNavLeft').height(windowH);
                    }else{
                        $('.js_memberNavMiddle').css({'height':windowH-$('.footer').height()});
                        $('.js_memberNavLeft').height(windowH-$('.footer').height());
                        //$('.js_memberNavMiddle').css({'height':windowH});
                    }
                    if(windowW>990){
                        $('.js_memberNavLeft').height(windowH-$('.footer').height());
                    }else{
                        //var dataType =
                        if($('.js_memberNavMiddleBtn').attr('data-alt')==2){
                            $('.js_memberNavLeft').height(windowH);
                        }else{
                            $('.js_memberNavLeft').height(windowH-$('.footer').height());

                        }

                    }
                }
        }
    },500);
    $('.js_memberNavMiddleBtn span').css({'height':$(window).height()+'px','line-height':$(window).height()+'px'})

    if(windowW<992&&windowW>574){
        $(window).scroll(function(){
            if((($(document).height()- $(window).scrollTop()-$('.footer').height())/2)>($(window).height()-$('.footer').height())){
                $('.js_memberNavMiddleBtn span').css({'top':$(window).scrollTop(),'height':$(window).height()+'px','line-height':$(window).height()+'px'})

            }
        })
        //$('.js_memberNavMiddleBtn').css('line-height', $(window).height()+'px')
    }

    if(windowW<576){
        $('.js_memberNavLeft').height('60px');
    }
    if(windowW>992){
        var rightBoxWidth = windowW-240-$('.js_memberNavLeft').width()-20;
        $('.js-membercontboxs').width(rightBoxWidth);

    }else{
        $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-20);
    }
    //else if(windowW>700&&windowW<992){
    //    if($('js-membercontboxs-2')){
    //        //$('.js-membercontboxs').width(windowW*0.86);
    //        $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-5);
    //
    //    }else{
    //        $('.js-membercontboxs').width(windowW*0.85);
    //    }
    //
    //}else if(windowW>575&&windowW<701){
    //
    //    if($('js-membercontboxs-2')){
    //        //$('.js-membercontboxs').width(windowW*0.761);
    //        $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-5);
    //
    //    }else{
    //        $('.js-membercontboxs').width(windowW*0.75);
    //    }
    //}

    $(window).resize(function() {
        var windowW = $(window).width();
        if(windowW>575){
            $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-20);
        }else{
            $('.js-membercontboxs').width('100%');
            $('.js_memberNavLeft').css('height','60px');
        }
        //if(windowW>992){
        //    //$('.js-membercontboxs').width(windowW*0.66666);
        //    $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-5);
        //}else if(windowW>700&&windowW<992){
        //    if($('js-membercontboxs-2')){
        //        //$('.js-membercontboxs').width(windowW*0.86);
        //        $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-5);
        //    }else{
        //        //$('.js-membercontboxs').width(windowW*0.85);
        //        $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-5);
        //    }
        //}else if(windowW>575&&windowW<701){
        //    if($('js-membercontboxs-2')){
        //        //$('.js-membercontboxs').width(windowW*0.761);
        //        $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-5);
        //    }else{
        //        //$('.js-membercontboxs').width(windowW*0.75);
        //        $('.js-membercontboxs').width(windowW-$('.js_memberNavLeft').width()-$('.js_memberNavMiddleBtn').width()-5);
        //    }
        //}else if(windowW<576){
        //    $('.js-membercontboxs').width('100%');
        //}
        //if(windowW<576){
        //    $('.js_memberNavLeft').css('height','60px');
        //}
    });


    //       xs模式 导航按钮点击时间
    $('.js_memberNavMiddleBtn').click(function(){


        var dataType = $(this).attr('data-alt');
        if(dataType==1){
            $(this).children('span').removeClass('icon-menu1').addClass('icon-close');
            $(this).attr('data-alt',2);
            $('.js_memberNavMiddle').css({'position':'absolute','height':windowH+'px'})
            $('.js_memberNavLeft').css({'height':windowH+'px'})
            $('.js_memberNavMiddle').animate({'margin-left':'0'});
            $('.js_navshade').show();
            $('.js-membercontboxs').css({'position':'absolute','top':0,'right':0});
            $('.footer').hide();
        }else{
            $(this).children('span').removeClass('icon-close').addClass('icon-menu1');
            $(this).attr('data-alt',1);
            windowW = $(window).width();
            //$(".js-membercontboxs").css({overflow:"auto"});
            $('.footer').show();

            if(windowW>700&&windowW<992){
                $('.js_memberNavMiddle').animate({'margin-left':'-27.6%'});
                $('.js_navshade').hide();
                //setTimeout(function(){
                    //$('.js-membercontboxs').css('position','relative');
                    //$('.js_memberNavMiddle').css('position','relative');
                //},200);
            }else if(windowW>575&&windowW<701){

                $('.js_memberNavMiddle').animate({'margin-left':'-34.5%'});
                $('.js_navshade').hide();
                //setTimeout(function(){
                //$('.js_memberNavMiddle').css('position','relative');
                //
                //$('.js-membercontboxs').css('position','relative');
                //},0);
            }
        }
    });

//       非xs模式 导航按钮点击效果
    $('.js_navxsbtn').click(function(){
        if($(this).attr('data-alt')==1){
            $('.js_memberNavMiddle').animate({'right':0});
            $(this).attr('data-alt',2);
            $('.js_navshade').show();
        }else{
            $('.js_memberNavMiddle').animate({'right':'-50%'});
            $(this).attr('data-alt',1);
            $('.js_navshade').hide();
        }

    });
})