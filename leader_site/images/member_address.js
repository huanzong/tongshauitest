/**
 * Created by 15610 on 2017/10/18.
 */


 //下拉菜单初始化
//$("#js_save").oSelect().init();
//$("#js_city").oSelect().init();
//$("#js_area").oSelect().init();
//$("#js_road").oSelect().init();
//

//地址管理初始化
//var address=$(".js_memberNewAddress" ).Validform({
//    tiptype:3,
//    label:".label",
//    showAllError:false,
//    ignoreHidden:false,
//    dragonfly:false,
//    btnSubmit:'.js_btnSubmit',
//    callback:function(from){
//        console.log(1);
//        return false;
//    }
//});



//$('.js_memberAddressBtn').click(function(){
//    address.resetForm()
//})
//




//点击取消按钮
//$('.js_addressCancel').click(function(){
//    $('.js_landShade').show();
//    $('.js_landContBox').show();
//    $("body").css({overflow:"hidden"});
//    $('.js_landClose').click(function(){
//        $('.js_landContBox').hide();
//        $('.js_landShade').hide();
//       $("body").css({overflow:"auto"});
//        return false;
//    })
//    globalShade()
//})

$('#phonequhao').change(function(){
    var inputValue = $(this).val();
    if(typeof (inputValue)=='number'){
        $(this).addClass('member-address-input')
    }else{
        $(this).removeClass('member-address-input')
    }
})
$('#phonefenjihao').change(function(){
    var inputValue = $(this).val();
    if(typeof (inputValue)=='number'){
        $(this).addClass('member-address-input')
    }else{
        $(this).removeClass('member-address-input')
    }
})
$('#phone').change(function(){
    var inputValue = $(this).val();
    if(typeof (inputValue)=='number'){
        $(this).addClass('member-address-input')
    }else{
        $(this).removeClass('member-address-input')
    }
})
//,#phone,#


//点击弹窗的确认与取消按钮
$('.js-alertClose').click(function(){
    $('.js_landClose').click();
})

$('.js-alertTrue').click(function(){
    $('.js_landClose').click();
    $('.js_memberNewAddress').fadeOut('100');
})






//地址详情框选中颜色控制

$(function(){
    $('.js_inputCheck').focus(function(){
        if(!$(this).hasClass('Validform_error')){
            $(this).css('border-color','#ccc')
        }else{
            $(this).css('border-color','#f39800');
        }
        $(this).blur(function(){
            if ($(this).siblings('.Validform_wrong').length!=0){
                $(this).css('border-color','#f39800');
            }else{
                $(this).css('border-color','#ccc');
            }
        })
})

    //address.ignore('#phonequhao,#phone,#phonefenjihao');



})