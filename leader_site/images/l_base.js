$(function() {

    /**
     * 首页动画：线变化
     */
    function lineAnimate($ele,t){

        $ele.siblings().hide();

        setTimeout(function(){
            $ele.find('span').eq(0).animate({ 
                height: "100%"
            },t);
        },200);
        setTimeout(function(){
            $ele.find('span').eq(1).animate({ 
                height: "100%"
            },t);
        },400);
        setTimeout(function(){
            $ele.find('span').eq(2).animate({ 
                height: "100%"
            },t);
        },600);
        setTimeout(function(){
            $ele.find('span').eq(3).animate({ 
                height: "100%"
            },t);
        },800);
        setTimeout(function(){
            $ele.find('span').eq(4).animate({ 
                height: "100%"
            },t);
        },1000);
        var showTime = 200*($ele.find('span').size()+1);
        setTimeout(function(){
            $ele.find('.index_animate').css('z-index','-11');
            $ele.siblings(":not(.js_ignorAnimate)").fadeIn(1000);
            $ele.siblings(":not(.js_ignorAnimate)").css('z-index','1');
        },showTime);
    }

    lineAnimate($('.js_animateLine'),1000);

    

    $(window).resize(function() {
        init();
    });

    init();

    function init() {
        var screenWidth = document.body.offsetWidth;
        if(screenWidth <= 700){
            $('.js_footLink').hide();
        }else{
            $('.js_footLink').show();
            $('.js_footLink').removeClass('link_border');
        }
    }
    /**
     * 尾页 链接
     */
    $('.js_footLindBtn').on('click','a',function(){
        var $ele = $(this).parent().siblings($('.js_footLink'));
        $ele.toggle();
        $ele.toggleClass('link_border');

    });

    /**
     * 导航逻辑
     */
    
    //导航栏目显示隐藏
    $('.js_column').on('hover',function(){
        var index = parseInt($(this).attr('column'));
        $('.js_column_show').hide();
        $('.js_column_show').eq(index).show();
    });
    $('.js_column_show').on('mouseleave',function(){
        $(this).hide();
    });

    //搜索历史
    $('.js_searchHistory').bind('input propertychange',function(){
        var screenWidth = document.body.offsetWidth;
        if($(this).val()){
            if(screenWidth>1199){
                $('.js_searchBox_xl').show();
            }else{
                $('.js_searchBox_lg').show();
            }
            $('.js_searchBoxQuick_lg').hide();
        }else{
            $('.js_searchBox').hide();
            $('.js_searchBoxQuick_lg').show();
        }
    }).on('blur',function(){
        $('.js_searchBox').hide();
        $('.js_searchBoxQuick_lg').show();
    }).on('focus',function(){
        if($(this).val()){
            if(screenWidth>1199){
                $('.js_searchBox_xl').show();
            }else{
                $('.js_searchBox_lg').show();
            }
            $('.js_searchBoxQuick_lg').hide();
        }
    });

    //搜索--lg
    $('.js_search_lg').on('click',function(){
        $('.js_navSearchLgHide')
            .removeClass('o_lg-show')
            .removeClass('o_md-show')
            .removeClass('o_sm-show')
            .removeClass('o_xs-show');
        $('.js_navSearchLgHide').hide();
        $('.js_navSearchLg')
            .addClass('o_lg-show')
            .addClass('o_md-show')
            .addClass('o_sm-show')
            .addClass('o_xs-show');
        $('.js_navSearchLg').show();
    });

    //关闭搜索
    $('.js_navSearchClose').on('click', function(){

        $('.js_navSearchLg')
            .removeClass('o_lg-show')
            .removeClass('o_md-show')
            .removeClass('o_sm-show')
            .removeClass('o_xs-show');
        $('.js_navSearchLg').hide();

        $('.js_navSearchLgHide')
            .addClass('o_lg-show')
            .addClass('o_md-show')
            .addClass('o_sm-show')
            .addClass('o_xs-show');
        $('.js_navSearchLgHide').show();
        $('.js_navSearchLgHide.js_ignore').removeClass('o_lg-show').hide();

    });

    //展示导航菜单
    $('.js_menuShow').on('click',function(){
        if($(this).hasClass('icon-menu')){
            $(this).removeClass('icon-menu').addClass('icon-close');
            $('.js_navMdShow').show();
        }else{
            $(this).removeClass('icon-close').addClass('icon-menu');
            $('.js_navMdShow').hide();
        }
    });
    
});