/**
 * Created by 15610 on 2017/10/13.
 */
$(function(){
    //前端判断是否登录

    if(!istrsidssdssotoken()){
        window.location.href ='/ids/ts/login.jsp'
    }


    //后端判断是否登录
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/user/front/user/userInfo",
        data: "",
        error : function(XMLHttpRequest, textStatus, errorThrown){
        },
        success: function(returnData){

            if(returnData.resultMsg=='用户未登录'){
                window.location.href ='/ids/ts/login.jsp'
            }
        }

    });

    //页面加载时调个人信息 是否已经绑定过手机号
    $.ajax({
       type: "get",
       dataType: "json",
       url: "/user/front/user/userInfo",
       data: "",
        error : function(XMLHttpRequest, textStatus, errorThrown){
        },
       success: function(returnData){
           if(returnDate.data.mobile==null || returnData.data.mobile==""){


           }else{
               self.location='/security';
           }
       }
    });



    //验证手机号
    $('.js-newMobile').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');
        if(yanzhengtrue){
            $('.js-getinfo').removeClass('l-btn-disable').unbind().click(function(){

                yanzhengtrue = $('.js-newMobile').siblings('.Validform_checktip').hasClass('Validform_right');
                if(yanzhengtrue){
                    var newMobile=$('.js-newMobile').val();

                    //  个人中心绑定手机号发送验证码接口
                   $.ajax({

                       type: "post",
                       dataType: "text",
                       url: "/ids/ts/userInfoManager.jsp",
                       data: {
                           'editOperation':'sendBindMobileCode',
                           'newMobile':newMobile
                       },
                       error : function(XMLHttpRequest, textStatus, errorThrown){
                       },
                       success: function(returnData){
                           if (jQuery.trim(returnData).length > 0) {
                               if (jQuery.trim(returnData).indexOf("200")>-1) {

                               }
                               else if (jQuery.trim(returnData).indexOf("newMobile_can_not_be_null")>-1){
                                   if($('.js-newMobileerror').hasClass('Validform_right')){
                                       $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                                   }
                                   else{
                                       $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                                   }
                               }
                               else if (jQuery.trim(returnData).indexOf("newMobile_type_is_illegal")>-1){
                                   if($('.js-newMobileerror').hasClass('Validform_right')){
                                       $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                                   }
                                   else{
                                       $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                                   }
                               }
                               else if (jQuery.trim(returnData).indexOf("newMobile_is_used")>-1){
                                   if($('.js-newMobileerror').hasClass('Validform_right')){
                                       $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号已被占用')
                                   }
                                   else{
                                       $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号已被占用')
                                   }
                               }
                               else if (jQuery.trim(returnData).indexOf("create_confirm_error")>-1){
                                   if($('.js-newMobileerror').hasClass('Validform_right')){
                                       $('.js-newMobileerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败')
                                   }
                                   else{
                                       $('.js-newMobileerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>发送失败')
                                   }
                               }
                           }
                       }

                   })
                }
            })
        }
        else{
            $('.js-getinfo').addClass('l-btn-disable');
        }

    })
    //验证码成功后可点击提交
    $('.js-mobileCode').blur(function(){

        var yanzhengtrue = $(this).siblings('.Validform_checktip').hasClass('Validform_right');

        if(yanzhengtrue){//点击确定 个人中心绑定手机号接口
            $('.js-submintData').unbind().bind('click',function(){

                var newMobile=$('.js-newMobile').val();
                var mobileCode=$('.js-mobileCode').val();

               $.ajax({
                   type: "post",
                   dataType: "text",
                   url: "/ids/ts/userInfoManager.jsp",
                   data: {
                       'editOperation':'changeMobile',
                       'newMobile':newMobile,
                       'mobileCode':mobileCode
                   },
                   error : function(XMLHttpRequest, textStatus, errorThrown){
                   },
                   success: function(returnData){
                       if (jQuery.trim(returnData).length > 0) {
                           if (jQuery.trim(returnData).indexOf("200")>-1) {
                               $('.js-bingfalse').hide();
                               $('.js-bingsuccess').show();

                               var i = 4;
                               var t = setInterval(function(){
                                   if (i == 0) {
                                       clearInterval(t);
                                       return;
                                   }
                                   document.getElementById("js-countdown").innerHTML = i;
                                   i--;
                               }, 1000)
                           }
                           else if (jQuery.trim(returnData).indexOf("newMobile_can_not_be_null")>-1){
                               if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                   $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                               }
                               else{
                                   $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号不能为空')
                               }
                           }
                           else if (jQuery.trim(returnData).indexOf("newMobile_type_is_illegal")>-1){
                               if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                   $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                               }
                               else{
                                   $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>手机号格式非法')
                               }
                           }
                           else if (jQuery.trim(returnData).indexOf("mobileCode_can_not_be_null")>-1){
                               if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                   $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空')
                               }
                               else{
                                   $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码不能为空')
                               }
                           }
                           else if (jQuery.trim(returnData).indexOf("can_not_query_this_code")>-1 || jQuery.trim(returnData).indexOf("code_is_illegal")>-1){
                               if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                   $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')
                               }
                               else{
                                   $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>验证码错误')
                               }
                           }
                           else if (jQuery.trim(returnData).indexOf("绑定失败，错误码")>-1){
                               if($('.js-mobileCodeerror').hasClass('Validform_right')){
                                   $('.js-mobileCodeerror').removeClass('Validform_right').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                               }
                               else{
                                   $('.js-mobileCodeerror').addClass('Validform_wrong').html('<i class=\'iconfont icon-information-solid\'></i>绑定失败')
                               }
                           }

                       }
                   }

               })
            })
        }else{
        //    提示错误信息 验证码错误

            //禁止点击
            $('.js-submintData').unbind().bind('click',function(){

                return false;
            })
        }

    })



    var mobile=$(".js-bindmobform").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });


    var email=$(".js-bindEmailform").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });
    var emailyanzheng=$(".js-bindEmailyanzheng").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });


    var yanzhengma=$(".js-bindmobyanzheng").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
//                "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/,
            "mobile":/^1[3|4|5|7|8][0-9]\d{4,8}$/
        },
        ajaxPost:true
    });

})