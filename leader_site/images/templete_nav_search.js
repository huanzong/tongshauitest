//非空判断
function isEmpty(value) {
    if (value == null || value == undefined || value == "") {
        return true;
    }
    return false;
}

var screenWidth = document.body.offsetWidth;
//搜索历史
$('.js_searchHistory').bind('input propertychange', function () {
    if ($(this).val() && $(this).val() != "搜索产品、服务、帮助...") {
        if (screenWidth > 1199) {
            $('.js_searchBox_xl').show();
        } else {
            $('.js_searchBox_lg').show();
        }
        $('.js_searchBoxQuick_lg').hide();
        searchBoxWord($(this).val());
    } else {
        $('.js_searchBox').hide();
        $('.js_searchBoxQuick_lg').show();
        var staSearchBoxHtml = '<li><a href = "">在线保修<a/></li>' +
            '<li><a href = "">产品注册<a/></li>' +
            '<li><a href = "">帮助中心<a/></li>' +
            '<li><a href = "">联系我们<a/></li>'
        $('.js_searchBox_listShow').html(staSearchBoxHtml);
    }
}).on('blur', function () {
    $('.js_searchBox').hide();
    $('.js_searchBoxQuick_lg').show();
}).on('focus', function () {
    if (screenWidth > 1199) {
        $('.js_searchBox_xl').show();
    } else {
        $('.js_searchBox_lg').show();
    }
    $('.js_searchBoxQuick_lg').hide();
    if ($(this).val() && $(this).val() != "搜索产品、服务、帮助...") {
        searchBoxWord($(this).val());
    } else {
        var staSearchBoxHtml = '<li><a href = "">在线保修<a/></li>' +
            '<li><a href = "">产品注册<a/></li>' +
            '<li><a href = "">帮助中心<a/></li>' +
            '<li><a href = "">联系我们<a/></li>'
        $('.js_searchBox_listShow').html(staSearchBoxHtml);
    }
});

//搜索--lg
$('.js_search_lg').on('click', function () {
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
$('.js_navSearchClose').on('click', function () {

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
$('.js_menuShow').on('click', function () {
    if ($(this).hasClass('icon-menu')) {
        $(this).removeClass('icon-menu').addClass('icon-close');
        $('.js_navMdShow').show();
    } else {
        $(this).removeClass('icon-close').addClass('icon-menu');
        $('.js_navMdShow').hide();
    }
});

//点击搜索按钮
$('.js_jumpto_product_search').on('click', function () {
    var channelId = '273690';
    var searchWord = $.trim($('.js_searchHistory').val());
    if (!isEmpty(searchWord) && searchWord != "搜索产品、服务、帮助...") {
        searchWord = encodeURIComponent(searchWord);
        window.location.href = "/was5/web/search?channelid=" + channelId + "&searchword=" + searchWord;
    }
});

//搜索框提示浮层
function searchBoxWord(word) {
    var channelId = '285710';
    var searchWord = $.trim(word);
    if (!isEmpty(searchWord) && searchWord != "搜索产品、服务、帮助...") {
        searchWord = encodeURIComponent(searchWord);
        $.ajax({
            type: "GET",
            url: "/was5/web/search?channelid=" + channelId + "&searchword=" + searchWord,
            dataType: "html",
            async: true,
            success: function (data) {
                $('.js_searchBox_listShow').html(data);
            },
            error: function (data) {
            }
        });
    }

}



