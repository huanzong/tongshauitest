//产品列表页js
$(function () {
    $(window).resize(function () {
        init();
    });
    //初始化
    function init() {
        var screenHeight = document.body.offsetHeight;
        var screenWidth = document.body.offsetWidth;
        if (screenWidth > 1199) {
            $('.js_layerShowMore').hide();
            $('.js_listNavShowMore').attr('data-flag',"1");
            initNavClick();
            //readXmlFile(url);

        } else {
            //mobileReadXmlFile(url);
            $('.js_listNavShowMore').find('span').text('展开全部筛选项');
            $('.js_listNavShowMore').find('i').removeClass('icon-close').addClass('icon-plus');
        }
    }

    // banner背景平铺
    $(".js_bannerImg").oBgCover().init();
    $(".js_bannerImg").css('margin-left', '-1000px');
    //初始化筛选项收起隐藏按钮事件
    //导航-展开全部筛选项
    $('.js_listNavShowMore').on('click', function () {
         initNavClick();
    });


    //筛选项-全部删除
    $('.js_deleteAll').on('click', function () {
        //删除筛选头部选项
        $('.js_filter').empty();
        $(".list-filter-select").css('display','none');
        /**
         * 全部删除筛选子项的代码写在这里
         */
         $(".sole-type.active").each(function (e,n) {
             $(this).removeClass("active");
         });
        searchWord="";
        order="";
        isSelectItemStr="";
        //重新查询
        search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, isSelectItemStr);
    });

    //checkbox初始化
    $(".js_proGroup,.js_radio").jq_qvote();


});

//导航-展开全部筛选项
function initNavClick() {

    var navList = $('.js_listNavShowMore').siblings('.filter-line');
    var flag = parseInt($('.js_listNavShowMore').attr('data-flag'));

    if (flag) {
        if(document.body.offsetWidth>575){
            $('.js_listNavShowMore').find('span').text('展开全部筛选项');
        }else{
            $('.js_listNavShowMore').find('span').text('展开筛选项');
        }
        $('.js_listNavShowMore').find('i').removeClass('icon-close').addClass('icon-plus');
    } else {
        if(document.body.offsetWidth>575){
            $('.js_listNavShowMore').find('span').text('收起全部筛选项');
        }else{
            $('.js_listNavShowMore').find('span').text('收起筛选项');
        }
        $('.js_listNavShowMore').find('i').removeClass('icon-plus').addClass('icon-close');
    }

    navList.each(function (i, n) {
        if (i < 4 || i >= navList.size()) {
            return;
        }
        if (flag) {
            $(this).addClass('o_df-hide');
        } else {
            $(this).removeClass('o_df-hide');
        }
    });

    if (document.body.offsetWidth < 1200) {
        $('.js_layerShowMore').show();
        $(document.body).css({
            "overflow-x":"hidden",
            "overflow-y":"hidden"
        });
        $('.js_layerClose').on('click', function () {
            $('.js_layerShowMore').hide();
            $('.js_listNavShowMore').find('span').text('展开筛选项');
            $('.js_listNavShowMore').find('i').removeClass('icon-close').addClass('icon-plus');
            $(document.body).css({
            "overflow-x":"scroll",
            "overflow-y":"scroll"
            });
        });
         

    }

    $('.js_listNavShowMore').attr('data-flag', Math.abs(parseInt(flag) - 1));
}