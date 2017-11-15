/**
 * Created by 15610 on 2017/10/23.
 */
 var addressServer = {
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
    regionList: function(params,callbackFun,errorFun){
        $.ajax({
            type:'GET',
            url:siteConfig.domain + '/interaction-service/regionInfo/regionList/',
            data: params,
            login:true,
            success_cb:function(data){
                if(data.isSuccess){
                    callbackFun&&callbackFun(data);
                }else{
                    errorFun&&errorFun();
                }
            }
        })
    }
}
$(function(){
    $('#js_GiftboxSolid1').oSelect().init();
    $('#js_GiftboxSolid2').oSelect().init();

    $('#js_orderDate').oSelect().init();
    $('#js_orderTime').oSelect().init();

    var addressOselete = [
        $('.js_addressProvince').oSelect(),
        $('.js_addressCity').oSelect(),
        $('.js_addressArea').oSelect(),
        $('.js_addressStreet').oSelect()
    ]
    //省市区联动
    function regionListHtml(parentId,$ele,fun){
        addressServer.regionList({
            parentId: parentId
        },function(data){
            var listData = data.data;
                str = '<option value="">请选择</option>';
            for(i in listData){
                str += '<option value="'+listData[i].regionCode+'">'+listData[i].regionName+'</option>';
            }
            $ele.html(str);
            for (var i in addressOselete){
                addressOselete[i].init();
            }
            $ele.on('change',function(){
                fun&&fun($ele.val());
            });
            fun&&fun(listData[0].regionCode);
        });
    }
    //省
    regionListHtml(0,$('.js_addressProvince'),function(parentId){
        //市
        regionListHtml(parentId,$('.js_addressCity'),function(parentId){
            //区
            regionListHtml(parentId,$('.js_addressArea'),function(parentId){
                //街道
                regionListHtml(parentId,$('.js_addressStreet'));
            });
        });
    });

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
    $('.js_addressAddBtn').click(function(){
        $('.js_productOrderTitle').after($('.js_addressAddForm'));
        $('.js_orderconBox').show();
        $('.js_addressListCont').show();
        // resetInput(userinfo,inputArr);
        
        // var userinfo=$(".js_addressAddForm" ).Validform({
        $(".js_addressAddForm" ).Validform({
            tiptype:3,
            // label:".label",
            showAllError:true,
            ajaxPost:true,
            btnSubmit:'.js_addressAddSubmit',
            btnReset:'.js_addressAddCancel',
            callback:function(form){
                var addressData = {
                    customerName:$('.js_customerName').val(),
                    mobilePhone:$('.js_mobilePhone').val(),
                    telPhone:$('.js_telPhone').val(),

                    regionDetail:$('.js_regionDetail').val(),

                    provinceId:$('.js_addressProvince').val(),
                    cityId:$('.js_addressCity').val(),
                    regionId:$('.js_addressRegion').val(),
                    streetId:$('.js_addressStreet').val(),

                    provinceName:$('.js_addressProvince').find("option:selected").text(),
                    cityName:$('.js_addressCity').find("option:selected").text(),
                    regionName:$('.js_addressRegion').find("option:selected").text(),
                    streetName:$('.js_addressStreet').find("option:selected").text()
                };

                $.ajax({
                    type:'GET',
                    url:siteConfig.domain + '/interaction-service/regionInfo/regionList/',
                    data: params,
                    login:true,
                    success_cb:function(data){
                        if(data.isSuccess){
                            callbackFun&&callbackFun(data);
                        }else{
                            errorFun&&errorFun();
                        }
                    } 
                });

                return false;
            }
        });

    });
    //修改地址
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
        objparents.append($('.js_addressAddForm'));
        $('.js_orderconBox').show();
        // userinfo.resetForm();
        $('.Validform_checktip').html('');

    });

    //初始化方法
    function resetInput(obj,input){
        obj.resetForm();
        for(var i =0; i <input.length;i++){
            input[i].blur();
        }
        $('.Validform_wrong').html(' ').removeClass('Validform_wrong').addClass('Validform_right');
        $('.Validform_error').removeClass('Validform_error');
    }

})