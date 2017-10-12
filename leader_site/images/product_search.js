/**
 * Created by Fei on 2017/10/9.
 */

$(function(){
    $('.js-searchXuanXK').children('a').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    })
})