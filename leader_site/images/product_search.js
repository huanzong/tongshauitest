/**
 * Created by Fei on 2017/10/9.
 */

$(function(){
    $('.js-searchXuanXK').children('a').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    $('.js-searchProduBtn').click(function(){
        $('.js_searchService').hide();
        $('.js_searchNews').hide();
        $('.js_searchProduct').show();
    });

    $('.js-searchServeBtn').click(function(){
        $('.js_searchService').show();
        $('.js_searchNews').hide();
        $('.js_searchProduct').hide();
    });

    $('.js-searchNewsBtn').click(function(){
        $('.js_searchService').hide();
        $('.js_searchNews').show();
        $('.js_searchProduct').hide();
    });

})