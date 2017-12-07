/**
 * Created by 15610 on 2017/10/18.
 */


// 下拉菜单初始化
//$("#js_save").oSelect().init();
//$("#js_city").oSelect().init();
//$("#js_area").oSelect().init();
//$("#js_road").oSelect().init();


//地址管理初始化
var address=$(".js_memberNewAddress" ).Validform({
    tiptype:3,
    label:".label",
    showAllError:false,
    //showAllError:true
    ignoreHidden:false,
    dragonfly:false,
    //ajaxPost:true,
    btnSubmit:'.js_btnSubmit',
    //btnReset:'.js_addressGetUpData',
    //btnReset:'.js_memberAddressBtn',
    callback:function(from){
        //console.log(1);
        return false;
    }
});
$(function(){
    address.ignore('#phonequhao,#phone,#phonefenjihao');

})


$('.js_memberAddressBtn').click(function(){
    address.resetForm()
})
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
    globalShade()
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
    //obj.blur().removeClass('Validform_error').siblings('p').addClass('Validform_right');
}


//点击新增地址按钮时 清空输入框内的值
//$('.js_memberAddressBtn').click(function(){
//    $('.js_memberNewAddress').fadeIn();
//    emptyInput( $('.js-bindmobinput'));
//    emptyInput( $('.js_addressDetailedCont'));
//    emptyInput( $('.js_addressTellNub'));
//    emptyInput( $('.js_addressTellNub').find('input'));
//})


//$('.js_addressGetUpData').click(function(){
//    //if()
//})
//点击设置默认地址按钮
//$('.js_addressSetDefault').click(function(){
//    $('.member-address-setdefault').removeClass('member-address-setdefault');
//   //$(this).parents('.member-addressrightbox').find('.member-addresslistbox').siblings().removeClass('member-address-setdefault');
//    $(this).parents('.member-addresslistbox').addClass('member-address-setdefault');
//
//})

$(function(){
    $('.js_inputCheck').focus(function(){
    $(this).css('border-color','#f39800');
        $(this).blur(function(){
            if ($(this).siblings('.Validform_wrong').length!=0){
                $(this).css('border-color','#f39800');
            }else{
                $(this).css('border-color','#ccc');
            }
        })
})





    // 点击修改和新增按钮标题更换  添加到  getAddressInfo()内
    $('.js_memberAddressBtn').click(function(){
        $('.js_addressTitle').html('添加新地址');
        //点击新增按钮时省市区选项变灰色hover后取消的BUG
        $('.lose').css('background-color','#ccc');
    })
    $('js_amendBtn').click(function(){
        $('.js_addressTitle').html('修改地址');
        //点击修改按钮时省市区选项变灰色hover后取消的BUG
        $('.lose').css('background-color','#ccc');
    })

            //点击修改按钮屏幕滚到到顶部
            $(window).scrollTop($('.member-security-tit').height())







//该数组获取电话号码 tellArr[0]:区号 tellArr[1]:电话  tellArr[2]:分机号
    //固定电话号码错误显示逻辑
    //var infotell=[];
    //$('.js_addressPhoneInput').find('input').blur(function(){
    //    var inputVal = $.trim($(this).val());
    //    var nubName = $(this).parents('.js_addressPhoneInput').attr('data-type');
    //    if($(this).siblings('.js-addressMobError').find('.js_nullMsg').length!=0){
    //       $(this).removeClass('Validform_error');
    //        infotell[nubName-1] = '';
    //    }else if($(this).siblings('.Validform_wrong').length!=0){
    //        $(this).addClass('Validform_error');
    //        infotell[nubName-1] = '';
    //    }else if($(this).siblings('.Validform_right').length!=0){
    //        infotell[nubName-1] = inputVal;
    //
    //    }
    //})
    //



})