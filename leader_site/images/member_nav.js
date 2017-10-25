/**
 * Created by 15610 on 2017/10/25.
 */
$(function(){
    var windowW = $(window).width();
    var windowH = $(document).height();
    var contH   = $('body').height();
    $('.js_memberNavMiddleBtn').css({'padding-top':contH/2,height:windowH});
    $('.js_memberNavLeft').height(windowH);

    if(windowW<576){
        $('.js_memberNavLeft').height('60px');
    }
    if(windowW>992){
    }else if(windowW>700&&windowW<992){
        $('.js-membercontboxs').width(windowW*0.85);
    }else if(windowW>575&&windowW<701){
        $('.js-membercontboxs').width(windowW*0.75);
    }

    $(window).resize(function() {
        var windowW = $(window).width();
        var windowH = $(document).height();
        var contH   = $('body').height();
        //$('.js_memberNavLeft').height($('.js_memberNavMiddle').height());
        $('.js_memberNavLeft').height(windowH);
        $('.js_memberNavMiddleBtn').css({'padding-top':contH/2,height:windowH});
        if(windowW>992){
            $('.js-membercontboxs').width(windowW*0.66666);
        }else if(windowW>700&&windowW<992){
            $('.js-membercontboxs').width(windowW*0.85);

        }else if(windowW>575&&windowW<701){
            $('.js-membercontboxs').width(windowW*0.75);
        }else if(windowW<576){
            $('.js-membercontboxs').width('100%');
        }
        if(windowW<576){
            //$('.js_memberNavLeft').height('60px');
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