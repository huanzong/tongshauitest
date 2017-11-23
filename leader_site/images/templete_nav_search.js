//非空判断
function isEmpty(value) {
    if (value == null || value == undefined || value == "") {
        return true;
    }
    return false;
}

//过滤掉无法检索的符号
function filterSymbol(word) {
    if (word != null || word != undefined) {
        word = word.replace(/<[^>]+>/g, "");
    }
    return word;
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
        $('.js_searchBoxQuick_lg').show();

        $('.js_searchBox_xl').html(searchBoxInput("xl"));
        $('.js_searchBox_listShow').html(searchBoxInput("lg"));
    }
// }).on('blur', function () {
//     $('.js_searchBox').hide();
//     $('.js_searchBoxQuick_lg').show();
}).on('focus', function () {
    if (screenWidth > 1199) {
        $('.js_searchBox_xl').show();
    } else {
        $('.js_searchBox_lg').show();
    }
    $('.js_searchBoxQuick_lg').hide();
    if ($(this).val() && $(this).val() != "搜索产品、服务、帮助...") {
        $('.js_quick_search').remove();
        searchBoxWord($(this).val());
    } else {
        $('.js_searchBox_xl').html(searchBoxInput("xl"));
        $('.js_searchBox_listShow').html(searchBoxInput("lg"));
    }
});

$('body').not($(".js_searchHistory")).on('click', function () {
    $('.js_searchBox').hide();
    $('.js_searchBoxQuick_lg').show();
});

// $(".js_searchHistory").off( "click", "**" );//没有值时，xl搜索栏闪现bug

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

//点击搜索按钮全文搜索
$('.js_jumpto_product_search').on('click', function () {
    var channelId = '273690';
    var historyCookie = $.cookie('historyCookie');
    var searchWord = $.trim($('.js_searchHistory').val());
    if (!isEmpty(searchWord) && searchWord != "搜索产品、服务、帮助...") {
        if (isEmpty(historyCookie)) {
            $.cookie('historyCookie', searchWord, {path: '/'});
        } else {
            if (historyCookie.indexOf(",") == -1) {
                if (historyCookie != searchWord) {
                    historyCookie += "," + searchWord;
                }
            } else {
                var historyCookieArr = historyCookie.split(",");
                if ($.inArray(searchWord, historyCookieArr) == -1) {
                    if (historyCookieArr.length < 5) {
                        historyCookie += "," + searchWord;
                    } else {
                        historyCookieArr.shift();
                        historyCookieArr.push(searchWord);
                        historyCookie = "";
                        for (var i = 0; i < historyCookieArr.length; i++) {
                            historyCookie += "," + historyCookieArr[i];
                        }
                        historyCookie = historyCookie.substring(1);
                    }
                }
            }
            $.cookie('historyCookie', historyCookie, {path: '/'})
        }
        searchWord = encodeURIComponent(searchWord);
        window.location.href = "/was5/web/search?channelid=" + channelId + "&searchword=" + searchWord;
    }
});

//搜索框浮层检索
function searchBoxWord(word) {
    var channelId = '285710';
    var searchWord = filterSymbol(word);
    searchWord = $.trim(searchWord);
    if (!isEmpty(searchWord) && searchWord != "搜索产品、服务、帮助...") {
        searchWord = encodeURIComponent(searchWord);
        $.ajax({
            type: "GET",
            url: "/was5/web/search?channelid=" + channelId + "&searchword=" + searchWord,
            dataType: "html",
            async: true,
            success: function (data) {
                $('.js_quick_search').remove();
                $('.js_searchBox_listShow').html(data);
            },
            error: function (data) {
            }
        });
    }
}

//搜索框浮层展示
function searchBoxInput(webSize) {
    var historyCookie = $.cookie("historyCookie");
    historyCookie = filterSymbol(historyCookie);
    var searchBoxHtml = "";
    if (!isEmpty(historyCookie)) {
        if (historyCookie.indexOf(",") != -1) {
            var historyCookieArr = historyCookie.split(",");
            for (var i = 0; i < historyCookieArr.length; i++) {
                if (historyCookieArr[i].indexOf("&nbsp") != 0) {
                    searchBoxHtml += '<li><a href="/was5/web/search?channelid=273690&searchword=' + historyCookieArr[i] + '">' + historyCookieArr[i] + '</a></li>';
                }
            }
        } else {
            searchBoxHtml = '<li><a href="/was5/web/search?channelid=273690&searchword=' + historyCookie + '">' + historyCookie + '</a></li>';
        }
        if (webSize == "xl") {
            searchBoxHtml = '<div class="search-quick js_quick_search">搜索历史<a href="javascript:void(0);" class="js_delete_history">清空历史</a></div>' +
                '<ul class="search-list js_searchBox_listShow">' + searchBoxHtml + '</ul>';
        }
    } else {
        searchBoxHtml = '<li><a href = "">在线保修<a/></li>' +
            '<li><a href = "">产品注册<a/></li>' +
            '<li><a href = "">帮助中心<a/></li>' +
            '<li><a href = "">联系我们<a/></li>';
        if (webSize == "xl") {
            searchBoxHtml = '<div class="search-quick js_quick_search">快速链接</div>' +
                '<ul class="search-list js_searchBox_listShow">' + searchBoxHtml + '</ul>';
        }
    }
    return searchBoxHtml;
}

//清空搜索历史
$(".js_delete_history").on('click', function () {
    $.cookie('historyCookie', null, {path: '/'});
    $('.js_searchHistory').focus();
});