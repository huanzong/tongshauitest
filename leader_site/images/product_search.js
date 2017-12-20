/**
 * Created by Fei on 2017/10/9.
 */

$(function(){

    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")
    {
        //alert("IE 8.0");
        $('.js_search_input').addClass('ie8-input');
        $('.prolist-box').css('border','1px solid #eee');
    }

    $('.js_search_input').bind('input propertychange', function() {
        //进行相关操作
        var inputValue = $(this).val();
        if(inputValue.length>25){
            $(this).val(inputValue.substring(0,25));
        }
    });

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