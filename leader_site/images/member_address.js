/**
 * Created by 15610 on 2017/10/18.
 */


// 下拉菜单初始化
$("#js_save").oSelect().init();
$("#js_city").oSelect().init();
$("#js_area").oSelect().init();
$("#js_road").oSelect().init();


//地址管理初始化
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

//点击取消按钮
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


//点击弹窗的确认与取消按钮
$('.js-alertClose').click(function(){
    $('.js_landClose').click();
})

$('.js-alertTrue').click(function(){
    $('.js_landClose').click();
    $('.js_memberNewAddress').fadeOut('100');
})



//清空数据函数
function emptyInput(obj){
    obj.val('');
    obj.blur().removeClass('Validform_error').siblings('p').addClass('Validform_right');
}


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
