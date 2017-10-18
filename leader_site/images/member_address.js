/**
 * Created by 15610 on 2017/10/18.
 */

//地址管理初始化
//var addressMobile=$(".js-addressMobile ").Validform({
//    tiptype:3,
//    label:".label",
//    showAllError:true,
//    ajaxPost:true,
//    btnSubmit:'.js-alertTrue',
//    btnReset:'.js_memberAddressBtn',
//    callback:function(from){
//        console.log(1);
//        return false;
//
//    }
//
//
//});

//var addressMobile=$(".js-addressMobile").Validform();




var address=$(".js_memberNewAddress" ).Validform({
    tiptype:3,
    label:".label",
    showAllError:true,
    ajaxPost:true,
    btnSubmit:'.js_addressGetUpData',
    //btnReset:'.js_memberAddressBtn',
    //btnReset:'.js_memberAddressBtn',
    callback:function(from){
        console.log(1);
        return false;

    }


});

$('.js_addressCancel').click(function(){
    $('.js_landShade').show();
    $('.js_landContBox').show();
    $("body").css({overflow:"hidden"});
    $('.js_landClose').click(function(){
        $('.js_landContBox').hide();
        $('.js_landShade').hide();
        $("body").css({overflow:"auto"});
        return false;
    })
})


function emptyInput(obj){
    obj.val('');
    obj.blur().removeClass('Validform_error').siblings('p').addClass('Validform_right');
}
$('.js-alertClose').click(function(){
    $('.js_landClose').click();
    $('.js_memberNewAddress').fadeOut('100');
})

//点击新增地址按钮时 清空输入框内的值
$('.js_memberAddressBtn').click(function(){
    $('.js_memberNewAddress').fadeIn();
    emptyInput( $('.js-bindmobinput'));
    emptyInput( $('.js_addressDetailedCont'));
    emptyInput( $('.js_addressTellNub'));
    emptyInput( $('.js_addressTellNub').find('input'));
})


$('.js_addressGetUpData').click(function(){
    //if()
})
