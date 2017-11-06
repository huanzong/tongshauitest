/**
 * Created by 15610 on 2017/10/25.
 */
$(function(){
    var windowW = $(window).width();
    var documenHeight,documenHeights;
    var homeMemberContBox = $('.js-membercontboxs-2');
    documenHeight = $('.js-membercontboxs').height();
    if(!homeMemberContBox){
        $('.js_memberNavLeft').height(documenHeight+60 );
        $('.js_memberNavMiddle').css({'height':documenHeight+60});
        $('.js_memberNavMiddleBtn').css({height:documenHeight+60});
    } else{
        $('.js_memberNavLeft').height(documenHeight+180);
        $('.js_memberNavMiddle').css({'height':documenHeight+60});
        $('.js_memberNavMiddleBtn').css({height:documenHeight+60});
    }

    //$('.js_memberNavLeft').height(windowH);

    //个人中心侧导航高度设定
    var time_height = setInterval(function(){
        if(windowW<576){
            $('.js_memberNavLeft').height('60px');
            $('.js_memberNavMiddleBtn').css({height:'60px'});

        }else{
            documenHeight = $('.js-membercontboxs').height();
                if(documenHeight!=documenHeights&&documenHeight>762){
                    $('.js_memberNavMiddle').css({'height':documenHeight+60});
                    $('.js_memberNavMiddleBtn').css({height:documenHeight+60});
                    if(!homeMemberContBox){
                        $('.js_memberNavLeft').height(documenHeight+60);
                    }else{
                        if(windowW>990){
                            $('.js_memberNavLeft').height(documenHeight+180);
                        }else{
                            $('.js_memberNavLeft').height(documenHeight+60);
                        }
                    }
                }else{

                    $('.js_memberNavMiddle').css({'height':762+60});
                    $('.js_memberNavMiddleBtn').css({height:762+60});
                    if(!homeMemberContBox){
                        $('.js_memberNavLeft').height(762+60);
                    }else{
                        if(windowW>990){
                            $('.js_memberNavLeft').height(762+60);
                        }else{
                            $('.js_memberNavLeft').height(762+60);
                        }
                    }
                }
        }
    },500);


    if(windowW<576){
        $('.js_memberNavLeft').height('60px');
    }
    if(windowW>992){
        $('.js-membercontboxs').width(windowW*0.66666);

    }else if(windowW>700&&windowW<992){
        if($('js-membercontboxs-2')){
            $('.js-membercontboxs').width(windowW*0.86);
        }else{
            $('.js-membercontboxs').width(windowW*0.85);
        }

    }else if(windowW>575&&windowW<701){

        if($('js-membercontboxs-2')){
            $('.js-membercontboxs').width(windowW*0.761);
        }else{
            $('.js-membercontboxs').width(windowW*0.75);
        }
    }

    $(window).resize(function() {
        var windowW = $(window).width();
        if(windowW>992){
            $('.js-membercontboxs').width(windowW*0.66666);
        }else if(windowW>700&&windowW<992){
            if($('js-membercontboxs-2')){
                $('.js-membercontboxs').width(windowW*0.86);
            }else{
                $('.js-membercontboxs').width(windowW*0.85);
            }
        }else if(windowW>575&&windowW<701){
            if($('js-membercontboxs-2')){
                $('.js-membercontboxs').width(windowW*0.761);
            }else{
                $('.js-membercontboxs').width(windowW*0.75);
            }
        }else if(windowW<576){
            $('.js-membercontboxs').width('100%');
        }
        if(windowW<576){
            $('.js_memberNavLeft').css('height','60px');
        }
    });


    //       xs模式 导航按钮点击时间
    $('.js_memberNavMiddleBtn').click(function(){


        var dataType = $(this).attr('data-alt');
        if(dataType==1){
            $(this).children('span').removeClass('icon-menu1').addClass('icon-close');
            $(this).attr('data-alt',2);
            $('.js_memberNavMiddle').animate({'margin-left':'0'}).css('position','absolute');
            $('.js_navshade').show();
            $('.js-membercontboxs').css({'position':'absolute','top':0,'right':0});
            //
            //if($('.js-membercontboxs').hasClass('js-membercontboxs-2')){
            //    $('.js-membercontboxs').css({'position':'absolute','top':0,'right':0,'padding-top':'120px'});
            //}else{
            //    $('.js-membercontboxs').css({'position':'absolute','top':0,'right':0});
            //}
        }else{
            $(this).children('span').removeClass('icon-close').addClass('icon-menu1');
            $(this).attr('data-alt',1);
            windowW = $(window).width();
            if(windowW>700&&windowW<992){
                $('.js_memberNavMiddle').animate({'margin-left':'-27.6%'});
                $('.js_navshade').hide();
                setTimeout(function(){
                    $('.js-membercontboxs').css('position','relative');
                    $('.js_memberNavMiddle').css('position','relative');
                },200);
            }else if(windowW>575&&windowW<701){

                $('.js_memberNavMiddle').animate({'margin-left':'-34.5%'});
                $('.js_navshade').hide();
                setTimeout(function(){
                    $('.js-membercontboxs').css('position','relative');
                    $('.js_memberNavMiddle').css('position','relative');
                },200);
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