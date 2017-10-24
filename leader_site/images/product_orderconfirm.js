/**
 * Created by 15610 on 2017/10/23.
 */
$(function(){
    $('#js_GiftboxSolid1 ').oSelect().init();
    $('#js_GiftboxSolid2').oSelect().init();

    $('#js_orderDate').oSelect().init();
    $('#js_orderTime').oSelect().init();

    $('#js_orderConfirmSave').oSelect().init();
    $('#js_orderConfirmCity').oSelect().init();
    $('#js_orderConfirmArea').oSelect().init();
    $('#js_orderConfirmRode').oSelect().init();

    $(".js_radio").jq_qvote();

    //配送时间
    $('.js_appointment').click(function(){
        $(this).addClass('l-btn-orange');
        $('.js_standardTime').removeClass('l-btn-orange');
        $('.js_orderconTimeBox').show();
    });
    $('.js_standardTime').click(function(){
        $(this).addClass('l-btn-orange');
        $('.js_orderconTimeBox').hide();
        $('.js_appointment').removeClass('l-btn-orange');

    })

    $('.js_appointmentClose').click(function(){
        $('.js_orderconTimeBox').hide()
    })

    //发票信息
    $('.js_orderconSetInaoice').click(function(){
        $('.js_orderconInvoiceSet').show();
        $('.js_orderconInvoiceBox').hide();
    })


    //地址新增
    $('.js_orderconBoxBtn').click(function(){
        $('.js_orderconBox').show();
    })
})