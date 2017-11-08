/**
 * Created by 15610 on 2017/10/19.
 */
$(function(){
    $("#js_orderConfirmSave").oSelect().init();
    $("#js_orderConfirmCity").oSelect().init();
    $("#js_orderConfirmArea").oSelect().init();
    $("#js_orderConfirmRode").oSelect().init();
    $("#js_orderTime").oSelect().init();
    $("#js_orderDate").oSelect().init();
    $(".js_checkbox,.js_radio").jq_qvote();

//点击配送时间按钮判定是否滑出
    $('.js_orderconTime').find('.l-btn-normal').click(function(){
        $(this).addClass('l-btn-orange').siblings().removeClass('l-btn-orange');
        var btnType = $(this).index();
        if(btnType==1) {
            $('.js_orderconTimeBox').show();
        }else{
            $('.js_orderconTimeBox').hide();
        }
    });

    $('.js_orderconSetInaoice').click(function(){
        $('.js_orderconInvoiceBox').hide();
        $('.js_orderconInvoiceSet').show();
    });
    $('.js_orderconSetBtnClose').click(function(){
        $('.js_orderconInvoiceSet').hide();
        $('.js_orderconInvoiceBox').show();


    });

});