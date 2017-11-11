/**
 * Created by 15610 on 2017/10/23.
 */
 var addressServer{
    //新增收货地址
    save: function(data){
        $.ajax({
            url: siteConfig.userUrl+"/front/userRegion/save",
            type: 'get',
            data: data, 
            success_cb:function(data){
                console.log(data);
            },
            error_cb:function(jqXHR, textStatus, errorThrown){
                if(jqXHR.status==401){
                    console.log('用户未登录');
                }
            }
        });
    },
        
 }
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
        $(this).addClass('l-btn-orange').removeClass('l-btn-line2');
        $('.js_standardTime').removeClass('l-btn-orange').addClass('l-btn-line2');
        $('.js_orderconTimeBox').show();
    });
    $('.js_standardTime').click(function(){
        $(this).addClass('l-btn-orange').removeClass('l-btn-line2');
        $('.js_orderconTimeBox').hide();
        $('.js_appointment').removeClass('l-btn-orange').addClass('l-btn-line2');

    });

    $('.js_appointmentClose').click(function(){
        $('.js_orderconTimeBox').hide()
    });

    //发票信息
    $('.js_orderconSetInaoice').click(function(){
        $('.js_orderconInvoiceSet').show();
        $('.js_orderconInvoiceBox').hide();
    });

    var inputArr=[$('.js_order_username'),$('.js_order_userphone'), $('.js_order_usertell')];

    //地址新增
    $('.js_orderconBoxBtn').click(function(){
        $('.js_productOrderTitle').after($('.js_orderUserInforBox'));
        $('.js_orderconBox').show();
        $('.js_addressListCont').show();
        resetInput(userinfo,inputArr);
    });



    var userinfo=$(".js_orderUserInforBox" ).Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true,
        btnSubmit:'.js_orderConfirmGetUpData',
        //btnReset:'.js_memberAddressBtn',
        //btnReset:'.js_memberAddressBtn',
        callback:function(from){
            console.log(1);
            return false;
        }
    });



    //    修改地址
    $('.js_addressListSetBtn').click(function(){
        var objparents =  $(this).parents('li');
         var userinfo = $(this).siblings('.js_orderAddressCont');
        var userinfoName = userinfo.children('.product-address-list-name').html();
        var userinfoPhone = userinfo.children('.product-address-list-phone').html();
        var userinfoAddress = userinfo.children('.product-address-list-address').html();
        $('.Validform_wrong').removeClass('Validform_wrong').addClass('Validform_right');
        $('.Validform_error').removeClass('Validform_error');

        $('.js_order_username').val(userinfoName);
        $('.js_order_userphone').val(userinfoPhone);
        $('.js_order_usertell').val(userinfoAddress);

        $('.js_addressListCont').show();
        objparents.children('.js_addressListCont').hide();
        objparents.append($('.js_orderUserInforBox'));
        $('.js_orderconBox').show();
        userinfo.resetForm();
        $('.Validform_checktip').html('');

    });

    //初始化方法
    function resetInput(obj,input){
        obj .resetForm();
        for(var i =0; i <input.length;i++){
            input[i].blur();
        }
        $('.Validform_wrong').html(' ').removeClass('Validform_wrong').addClass('Validform_right');
        $('.Validform_error').removeClass('Validform_error');
    }

})