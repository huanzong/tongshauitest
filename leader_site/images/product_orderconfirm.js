/**
 * Created by 15610 on 2017/10/23.
 */
$(function () {
    $('#js_GiftboxSolid1 ').oSelect().init();
    $('#js_GiftboxSolid2').oSelect().init();

    $('#js_orderDate').oSelect().init();
    $('#js_orderTime').oSelect().init();
    $('#js_order_address').oSelect().init();

    // $('#js_orderConfirmSave').oSelect().init();
    // $('#js_orderConfirmCity').oSelect().init();
    // $('#js_orderConfirmArea').oSelect().init();
    // $('#js_orderConfirmRode').oSelect().init();


    //获取省份信息
    var templet_select_sheng = $("#js_orderConfirmSave").oSelect();
    var templet_select_shi = $("#js_orderConfirmCity").oSelect();
    var templet_select_qu = $("#js_orderConfirmArea").oSelect();
    var templet_select_road = $("#js_orderConfirmRode").oSelect();


    //配送时间
    $('.js_appointment').click(function () {
        $(this).addClass('l-btn-orange').removeClass('l-btn-line2');
        $('.js_standardTime').removeClass('l-btn-orange').addClass('l-btn-line2');
        $('.js_orderconTimeBox').show();
    });
    $('.js_standardTime').click(function () {
        $(this).addClass('l-btn-orange').removeClass('l-btn-line2');
        $('.js_orderconTimeBox').hide();
        $('.js_appointment').removeClass('l-btn-orange').addClass('l-btn-line2');

    });

    $('.js_appointmentClose').click(function () {
        $('.js_orderconTimeBox').hide()
    });

    /**
     * 发票
     */

    // 编辑
    $('.js_orderconSetInaoice').live('click', function () {
        $('.js_orderconInvoiceSet').show();
        $('.js_orderconInvoiceBox').hide();

        $('.js-invoice-head').val($('.js_orderconInvoiceBox').find('p').eq(1).find('span').text())
    });

    // 取消编辑
    $('.js_orderconSetBtnClose').on('click', function(){
        $('.js-alertClose').off().on('click', function(){
            $('.js_landClose').click()
        })

        $('.js-alertTrue').off().on('click',function(){
            $('.js_landClose').click()
            $('.js_orderconInvoiceSet').hide();
            $('.js_orderconInvoiceBox').show();
        })
    })

    // 保存发票修改
    $('.js-save-invoice').on('click', function(){
        var invoiceHead = {
            invoiceCode: $('.js-invoice-code').val() == '请填写税号' ? '' : $('.js-invoice-code').val(),
            invoiceHead: $('.js-invoice-head').val(),
            invoiceType: $("input[name='invoicetop']:checked").val() == '公司' ? 2 : 1
        }

        userServer.invoiceSave(invoiceHead)
    })

    

    var inputArr = [$('.js_order_username'), $('.js_order_userphone'), $('.js_order_usertell')];


    //地址新增
    $('.js_orderconBoxBtn').click(function () {
        $('.js_productOrderTitle').after($('.js_orderUserInforBox'));
        $('.js_orderconBox').show();
        $('.js_addressListCont').show();
        resetInput(userinfo, inputArr);

        buildProvinces();
        $("#js_orderConfirmSave").change(function () {
            buildCity();
        })

        $("#js_orderConfirmCity").change(function () {
            buildArea();
        })

        $("#js_orderConfirmArea").change(function () {
            buildRoad();
        })

    });


    var userinfo = $(".js_orderUserInforBox").Validform({
        tiptype: 3,
        label: ".label",
        showAllError: true,
        ajaxPost: true,
        btnSubmit: '.js_orderConfirmGetUpData',
        //btnReset:'.js_memberAddressBtn',
        //btnReset:'.js_memberAddressBtn',
        callback: function (from) {
            saveUserAddress()
            return false;
        }
    });
    userinfo.ignore('#phonequhao,#phone,#phonefenjihao');

    //    修改地址
    $('.js_addressListSetBtn').click(function () {
        var objparents = $(this).parents('li');
        var userinfo = $(this).siblings('.js_orderAddressCont');
        var userinfoName = userinfo.children('.product-address-list-name').html();
        var userinfoPhone = userinfo.children('.product-address-list-phone').html();
        var userinfoAddress = userinfo.children('.product-address-list-address').html();
        $('.Validform_wrong').removeClass('Validform_wrong').addClass('Validform_right');
        $('.Validform_error').removeClass('Validform_error');

        $('.js_order_username').val(userinfoName);
        $('.js_order_userphone').val(userinfoPhone);
        $('.js_order_address').val(userinfoAddress);

        $('.js_addressListCont').show();
        objparents.children('.js_addressListCont').hide();
        objparents.append($('.js_orderUserInforBox'));
        $('.js_orderconBox').show();
        userinfo.resetForm();
        $('.Validform_checktip').html('');

    });

    //初始化方法
    function resetInput(obj, input) {
        obj.resetForm();
        for (var i = 0; i < input.length; i++) {
            input[i].blur();
        }
        $('.Validform_wrong').html(' ').removeClass('Validform_wrong').addClass('Validform_right');
        $('.Validform_error').removeClass('Validform_error');
    }

    /**
     * 获取用户地址
     */
    userServer.list()




    /**
     * 获取订单信息
     */
    if ($.cookie('orderCode' + getRequest().code)) {
        var orderList = JSON.parse($.cookie('orderCode' + getRequest().code))
        var cartIds = []
        var skuCodes = []
        for (let i = 0; i < orderList.length; i++) {
            cartIds.push(orderList[i].cartId)
            skuCodes.push(orderList[i].inSkuCode)
        }
        cartIds = cartIds.join(',')
        console.log(orderList)
        var skuData = {
            // skuCodes: skuCodesArray.join(','),
            skuCodes: skuCodes.join(','),
            regionCode: 2450
        }
        skuServer.getSkuByCodes(skuData, orderList)
    }


    console.log(cartIds)
    /**
     * 提交订单
     */
    $('.js-sub-order').on('click', function () {

        var orderParams = {
            "cartIds": cartIds,
            "goods": orderList,
            "clientRemark": "",
            // "invoiceHead": "张三",
            "invoiceId": $('.js_orderconInvoiceBox').attr('invoiceId'),
            "invoiceType": 2,
            "orderRemark": "",
            "orderTerminal": getOS(), // 1pc 2移动端
            "payType": 1,
            "recipientsId": $('.product-address-list-select').attr('recipientsId'),
            "regionCode": "string"
        }
        orderServer.save(orderParams)
    })


    /**
     * 发票
     */




    var infotell = [];
    //固定电话号码错误显示逻辑
    $('.js_addressPhoneInput').find('input').blur(function () {
        var inputVal = $.trim($(this).val());
        var nubName = $(this).parents('.js_addressPhoneInput').attr('data-type');
        if ($(this).siblings('.js-addressMobError').find('.js_nullMsg').length != 0) {
            $(this).removeClass('Validform_error');
            infotell[nubName - 1] = '';
        } else if ($(this).siblings('.Validform_wrong').length != 0) {
            $(this).addClass('Validform_error');
            infotell[nubName - 1] = '';
        } else if ($(this).siblings('.Validform_right').length != 0) {
            infotell[nubName - 1] = inputVal;
        }
    })


    //地址取消弹框提示
    var templet_text = "确定取消添加吗？";
    $('.js_orderConfirmClose').click(function () {
        $('.js-alertTrue').off();
        $('.js-alertTrue').click(function () {
            $('.js_orderconBox').hide();
            $('.js_landClose').click();
            if ($('.js_memberAddressList').find('.js_member-addresslistbox').length > 0) {
                $(".js_form_addAddrManagement").hide();
                $(".js_memberAddressBtn").show();
            }
        })
        globalShade(templet_text);
    });

    //弹框点击事件
    $(".js-alertTrue").click(function () {
        $(".js_form_addAddrManagement").hide();
        $(".js_memberAddressBtn").show();
    });

    $(".js_memberAddressBtn").click(function () {//点击"新增地址"显示新增地址列表
        templet_text = '确定取消添加？';
        $(".js_btnSubmit").attr("type", 1);
        $(".js_form_addAddrManagement").show();
        resetForm();
        $('.lose').css('background-color', '#fff');
        $(".js_memberAddressBtn").hide();//隐藏"新增地址"按钮
    })


    var templet_pageNo = 1;
    var templet_pageSize = 10;

    var templet_isUpdate = false;//是否修改标识 true 是修改  false添加
    function buildProvinces() {
        $.ajax({
            url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
            type: "get",
            dataType: "json",
            data: { "parentId": 0 },
            login: true,
            success_cb: function (responseT) {
                if (responseT.isSuccess) {
                    var provinceList = responseT.data;
                    $("#js_orderConfirmSave").html("");
                    $("#js_orderConfirmSave").append('<option value="">--请选择省--</option>');
                    if (provinceList != null) {
                        for (var i = 0; i < provinceList.length; i++) {
                            var isSelected = "";
                            if (templet_isUpdate) {
                                isSelected = "selected";
                            }
                            var provinceEach = ' <option value="' + provinceList[i].regionName + '" shengCode="' + provinceList[i].regionCode + '">' + provinceList[i].regionName + '</option>';
                            $("#js_orderConfirmSave").append(provinceEach);
                        }

                    }
                    templet_select_sheng.init();
                }
            },
            error_cb: function () { }
        })
    }


    //获取市信息
    function buildCity() {
        var shengCode = $("#js_orderConfirmSave option:selected").attr("shengCode");
        $.ajax({
            url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
            type: "get",
            dataType: "json",
            data: { "parentId": shengCode },
            login: true,
            success_cb: function (responseT) {
                if (responseT.isSuccess) {
                    var cityList = responseT.data;
                    $("#js_orderConfirmCity").html("");
                    $("#js_orderConfirmCity").append('<option value="">--请选择市--</option>');
                    if (cityList != null) {
                        for (var i = 0; i < cityList.length; i++) {
                            var isSelected = "";
                            if (templet_isUpdate) {
                                isSelected = "selected";
                            }
                            var cityEach = '<option value="' + cityList[i].regionName + '" cityCode="' + cityList[i].regionCode + '">' + cityList[i].regionName + '</option>';
                            $("#js_orderConfirmCity").append(cityEach);
                        }
                    }
                    templet_select_shi.init();
                    //省变动,区一并重新初始化
                    $("#js_orderConfirmArea").html("");
                    $("#js_orderConfirmRode").html("");
                    templet_select_qu.init();
                    templet_select_qu.lose();
                    templet_select_road.init();
                    templet_select_road.lose();
                }
            },
            error_cb: function () { }
        })
    }

    //获取区信息
    function buildArea() {
        var cityCode = $("#js_orderConfirmCity option:selected").attr("cityCode");
        $.ajax({
            url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
            type: "get",
            dataType: "json",
            data: { "parentId": cityCode },
            login: true,
            success_cb: function (responseT) {
                if (responseT.isSuccess) {
                    var areaList = responseT.data;
                    $("#js_orderConfirmArea").html("");
                    $("#js_orderConfirmArea").append('<option value="">--请选择区--</option>');
                    if (areaList != null) {
                        for (var i = 0; i < areaList.length; i++) {
                            var isSelected = "";
                            if (templet_isUpdate) {
                                isSelected = "selected";
                            }
                            var areaEach = '<option value="' + areaList[i].regionName + '" areaCode="' + areaList[i].regionCode + '">' + areaList[i].regionName + '</option>';
                            $("#js_orderConfirmArea").append(areaEach);
                        }
                    }
                    templet_select_qu.init();
                    $("#js_orderConfirmRode").html("");
                    templet_select_road.init();
                    templet_select_road.lose();
                }

            },
            error_cb: function () { }
        })
    }

    //获取街道信息
    function buildRoad() {
        var areaCode = $("#js_orderConfirmArea option:selected").attr("areaCode");
        $.ajax({
            url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
            type: "get",
            dataType: "json",
            data: { "parentId": areaCode },
            login: true,
            success_cb: function (responseT) {
                if (responseT.isSuccess) {
                    var roadList = responseT.data;
                    $("#js_orderConfirmRode").html("");
                    $("#js_orderConfirmRode").append('<option value="">--请选择街道--</option>');
                    if (roadList != null) {
                        for (var i = 0; i < roadList.length; i++) {
                            var isSelected = "";
                            if (templet_isUpdate) {
                                isSelected = "selected";
                            }
                            var roadEach = '<option value="' + roadList[i].regionName + '" roadCode="' + roadList[i].regionCode + '">' + roadList[i].regionName + '</option>';
                            $("#js_orderConfirmRode").append(roadEach);
                        }
                    }
                    templet_select_road.init();
                }
            },
            error_cb: function () { }
        })
    }

    //新增地址
    function saveUserAddress() {
        var templet_isSubmiting = false;
        if (templet_isSubmiting) {//正在提交
            globalShade2('正在提交，请稍后', '3');
            return;
        }
        var bool = false;
        var realnameVal = $.trim($(".js_order_username").val());//联系人
        var mobileVal = $.trim($(".js_order_userphone").val());//手机号
        // var phoneVal=$.trim($("#phone").val());//电话号
        // var phonequhaoVal=$.trim($("#phonequhao").val());//区号
        // var phonefenjihaoVal=$.trim($("#phonefenjihao").val());//分机号
        var phonequhaoVal = infotell[0];//区号
        var phoneVal = infotell[1];//电话号
        var phonefenjihaoVal = infotell[2];//分机号

        var provinceVal = $.trim($("#js_orderConfirmSave").val());//省
        var cityVal = $.trim($("#js_orderConfirmCity").val());//市
        var areaVal = $.trim($("#js_orderConfirmArea").val());//区
        var streetVal = $.trim($("#js_orderConfirmRode").val());//街道
        var addressVal = $.trim($("#js_order_address").val());//地址
        var provinceCodeVal = $.trim($("#js_orderConfirmSave option:selected").attr("shengCode"));
        var cityCodeVal = $.trim($("#js_orderConfirmCity option:selected").attr("cityCode"));
        var areaCodeVal = $.trim($("#js_orderConfirmArea option:selected").attr("areaCode"));

        if (phonequhaoVal && phoneVal) {
            var telPhoneVal = phonequhaoVal + ";" + phoneVal + ";" + phonefenjihaoVal;
        } else {
            var telPhoneVal = '';
        }

        var data = {
            "customerName": realnameVal,
            "provinceName": provinceVal,
            "cityName": cityVal,
            "areaName": areaVal,
            "streetName": streetVal,
            "mobilePhone": mobileVal,
            "provinceId": provinceCodeVal,
            "cityId": cityCodeVal,
            "regionId": areaCodeVal,
            "regionDetail": addressVal,
            "telPhone": telPhoneVal
        }
        templet_isSubmiting = true;
        $.ajax({
            url: siteConfig.userUrl + "/hshop-user/front/userRegion/save",
            type: "post",
            dataType: "json",
            data: data,
            login: true,
            csrf: true,
            success_cb: function (responseT) {
                if (responseT.isSuccess) {
                    userServer.list() // 获取地址列表
                    resetForm();//重置表单
                    $(".js_orderUserInforBox").hide();
                    /*globalShade2("添加成功",1,2000);*/
                } else {//添加地址失败
                    globalShade2(responseT.resultMsg, 2, 2000);
                }
                templet_isSubmiting = false;

                // 新增地址成功 关闭弹层
                $('.js_orderconBox').show();
            },
            error_cb: function (responseT) {
                var responseT = JSON.parse(responseT.responseText); //由JSON字符串转换为JSON对象
                globalShade2(responseT.resultMsg, 2, 2000);
                templet_isSubmiting = false;
            }
        });
        return bool;
    }

    //校验表单验证，成功后保存地址
    var address = $(".js_form_addAddrManagement").Validform({
        tiptype: 3,
        btnSubmit: ".js_btnSubmit",//提交按钮
        showAllError: false,
        ignoreHidden: false,
        dragonfly: false,
        callback: function (form) {//验证后保存地址
            var templet_type = $(".js_btnSubmit").attr("type");//判断保存和修改
            if (templet_type == 1) {
                saveUserAddress();
            } else if (templet_type == 2) {
                updateUserAddress();
            }
            return false;
        }
    });


    //重置新增表单项
    function resetForm() {
        $("#realName").val("");
        $("#mobile").val("");
        $("#address").val("");
        $("#phonequhao").val("");
        $("#phone").val("");
        $("#phonefenjihao").val("");
        $('#js_save').children(':selected').prop('selected', false);
        $('#js_city').children(':selected').prop('selected', false);
        $('#js_area').children(':selected').prop('selected', false);
        $('#js_road').children(':selected').prop('selected', false);
        templet_select_sheng.init();
        templet_select_shi.init();
        templet_select_qu.init();
        templet_select_road.init();
        templet_select_shi.lose();
        templet_select_qu.lose();
        templet_select_road.lose();
        $("#realName").blur();
        $("#mobile").blur();
        $("#address").blur();
        $("#phonequhao").blur();
        $("#phone").blur();
        $("#phonefenjihao").blur();
        $('.js-addressMobError').html(' ');
        $('.Validform_error').removeClass('Validform_error');
    };

    var saveId = "";
    //修改地址获取信息
    function getAddressInfo(id) {
        templet_text = '确定取消修改？';
        $('.js_addressTitle').html('修改地址');
        $('.lose').css('background-color', '#fff');
        $(window).scrollTop($('.member-security-tit').height())
        $(".js_btnSubmit").attr("type", 2);
        saveId = id;
        var data = { id: id };
        $.ajax({
            url: siteConfig.userUrl + "/hshop-user/front/userRegion/show",
            type: "get",
            data: data,
            dataType: "json",
            login: true,
            csrf: true,
            success_cb: function (data) {
                if (data.isSuccess) {
                    var info = data.data;
                    var realname = info.customerName;//用户姓名
                    var mobile = info.mobilePhone;//手机号码
                    var province = info.provinceName;//省
                    var city = info.cityName;//市
                    var region = info.areaName;//区
                    var street = info.streetName;//街道
                    var address = info.regionDetail; //地址
                    var defaultaddress = info.isDefault;//是否默认地址 1是 0否
                    var id = info.id;//地址id
                    var telPhone = info.telPhone;//区号 电话号 分机号
                    var telPhone2 = telPhone.split(";"); //字符分割

                    $("#realName").val(realname);
                    $("#mobile").val(mobile);
                    $("#address").val(address);
                    $("#phonequhao").val(telPhone2[0]);
                    $("#phone").val(telPhone2[1]);
                    $("#phonefenjihao").val(telPhone2[2]);
                    if (templet_isUpdate) {
                        $("#js_save").change();
                        $("#js_city").change();
                        $("#js_area").change();
                    }
                    $("#js_save").change(function () {
                        loadCityList();
                    });
                    $("#js_city").change(function () {
                        loadAreaList();
                    });
                    $("#js_area").change(function () {
                        loadRoadList();
                    });
                    $.ajax({
                        url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
                        type: "get",
                        dataType: "json",
                        data: { "parentId": 0 },
                        success_cb: function (responseT) {
                            if (responseT.isSuccess) {
                                var provinceList = responseT.data;
                                $("#js_save").html("");
                                $("#js_save").append('<option value="">--请选择省--</option>');
                                if (provinceList != null) {
                                    for (var i = 0; i < provinceList.length; i++) {
                                        var isSelected = "";
                                        if (templet_isUpdate) {
                                            isSelected = " selected";
                                        }
                                        var provinceEach = '<option value="' + provinceList[i].regionName + '" shengCode="' + provinceList[i].regionCode + '">' + provinceList[i].regionName + '</option>';
                                        $("#js_save").append(provinceEach);
                                    }
                                }
                                var templet_shengCod = "";
                                $("#js_save").find("option").each(function () {
                                    var shengval = $(this).attr("value");
                                    if (province == shengval) {
                                        $(this).attr("selected", "selected");
                                        templet_shengCod = $(this).attr("shengCode");
                                        return;
                                    }
                                });
                                templet_select_sheng.init();
                                loadCityList(templet_shengCod);
                            }
                        }
                    });


                    function loadCityList(templet_shengCod) {
                        $.ajax({
                            url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
                            type: "get",
                            data: { "parentId": templet_shengCod },
                            dataType: "json",
                            login: true,
                            success_cb: function (responseT) {
                                if (responseT.isSuccess) {
                                    var cityList = responseT.data;
                                    $("#js_city").html("");
                                    $("#js_city").append('<option value="">--请选择市--</option>');
                                    if (cityList != null) {
                                        for (var i = 0; i < cityList.length; i++) {
                                            var isSelected = "";
                                            if (templet_isUpdate) {
                                                isSelected = " selected";
                                            }
                                            var cityEach = '<option value="' + cityList[i].regionName + '" cityCode="' + cityList[i].regionCode + '">' + cityList[i].regionName + '</option>';
                                            $("#js_city").append(cityEach);
                                        }
                                    }
                                    var templet_cityCode = "";
                                    $("#js_city").find("option").each(function () {
                                        var cityval = $(this).attr("value");
                                        if (city == cityval) {
                                            $(this).attr("selected", "selected");
                                            templet_cityCode = $(this).attr("cityCode");
                                            return;
                                        }
                                    });
                                    templet_select_shi.init();
                                    $("#js_area").html("");
                                    templet_select_qu.init();
                                    templet_select_qu.lose();
                                    $("#js_road").html("");
                                    templet_select_road.init();
                                    templet_select_road.lose();
                                    loadAreaList(templet_cityCode);
                                }
                            },
                            error_cb: function () {
                            }
                        });
                    }

                    function loadAreaList(templet_cityCode) {
                        $.ajax({
                            url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
                            type: "get",
                            data: { "parentId": templet_cityCode },
                            dataType: "json",
                            login: true,
                            success_cb: function (responseT) {
                                if (responseT.isSuccess) {
                                    var areaList = responseT.data;
                                    $("#js_area").html("");
                                    $("#js_area").append('<option value="">--请选择区--</option>');
                                    if (areaList != null) {
                                        for (var i = 0; i < areaList.length; i++) {
                                            var areaEach = areaList[i];
                                            if (areaEach == "" || areaEach == null) {
                                                continue;
                                            }
                                            var isSelected = "";
                                            if (templet_isUpdate) {
                                                isSelected = " selected";
                                            }
                                            var areaEach = '<option value="' + areaList[i].regionName + '" areaCode="' + areaList[i].regionCode + '">' + areaList[i].regionName + '</option>';
                                            $("#js_area").append(areaEach);
                                        }
                                    }
                                    var templet_areaCode = "";
                                    $("#js_area").find("option").each(function () {
                                        var regionval = $(this).attr("value");
                                        if (region == regionval) {
                                            $(this).attr("selected", "selected");
                                            templet_areaCode = $(this).attr("areaCode");
                                            return;
                                        }
                                    });
                                    templet_select_qu.init();
                                    $("#js_road").html("");
                                    templet_select_road.init();
                                    templet_select_road.lose();
                                    loadRoadList(templet_areaCode);
                                }
                            },
                            error_cb: function () {
                            }
                        });
                    }

                    function loadRoadList(templet_areaCode) {
                        $.ajax({
                            url: siteConfig.userUrl + "/interaction-service/regionInfo/regionList",
                            type: "get",
                            data: { "parentId": templet_areaCode },
                            dataType: "json",
                            login: true,
                            success_cb: function (responseT) {
                                if (responseT.isSuccess) {
                                    var roadList = responseT.data;
                                    $("#js_road").html("");
                                    $("#js_road").append('<option value="">--请选择街道--</option>');
                                    if (roadList != null) {
                                        for (var i = 0; i < roadList.length; i++) {
                                            var roadEach = roadList[i];
                                            if (roadEach == "" || roadEach == null) {
                                                continue;
                                            }
                                            var isSelected = "";
                                            if (templet_isUpdate) {
                                                isSelected = " selected";
                                            }
                                            var roadEach = '<option value="' + roadList[i].regionName + '" roadCode="' + roadList[i].regionCode + '">' + roadList[i].regionName + '</option>';
                                            $("#js_road").append(roadEach);
                                        }
                                    }

                                    $("#js_road").find("option").each(function () {
                                        var streetval = $(this).attr("value");
                                        if (street == streetval) {
                                            $(this).attr("selected", "selected");
                                            return;
                                        }
                                    });
                                    templet_select_road.init();
                                }
                            },
                            error_cb: function () {
                            }
                        });
                    }

                    $(".js_form_addAddrManagement").show();

                }
            }
        });
    }


    //保存修改地址
    function updateUserAddress() {
        var bool = false;
        var realnameVal = $.trim($("#realName").val());//联系人
        var mobileVal = $.trim($("#mobile").val());//手机号
        //var phoneVal=$.trim($("#phone").val());//电话号
        //var phonequhaoVal=$.trim($("#phonequhao").val());//区号
        //var phonefenjihaoVal=$.trim($("#phonefenjihao").val());//分机号
        var phonequhaoVal = infotell[0];//区号
        var phoneVal = infotell[1];//电话号
        var phonefenjihaoVal = infotell[2];//分机号
        var telPhoneVal = phonequhaoVal + ";" + phoneVal + ";" + phonefenjihaoVal;
        var provinceVal = $.trim($("#js_save").val());//省
        var cityVal = $.trim($("#js_city").val());//市
        var areaVal = $.trim($("#js_area").val());//区
        var streetVal = $.trim($("#js_road").val());//街道
        var addressVal = $.trim($("#address").val());//地址
        /*var idVal=$.trim($(".js_addressBox").attr("addid"));//id*/
        var provinceCodeVal = $.trim($("#js_save option:selected").attr("shengCode"));
        var cityCodeVal = $.trim($("#js_city option:selected").attr("cityCode"));
        var areaCodeVal = $.trim($("#js_area option:selected").attr("areaCode"));
        if (phonequhaoVal && phoneVal) {
            var telPhoneVal = phonequhaoVal + ";" + phoneVal + ";" + phonefenjihaoVal;
        } else {
            var telPhoneVal = '';
        }
        if (addressVal == "尽可能详解地填写街道、楼号、楼层、门牌号") {
            addressVal = "";
        }

        var data = {
            "customerName": realnameVal,
            "provinceName": provinceVal,
            "cityName": cityVal,
            "areaName": areaVal,
            "streetName": streetVal,
            "mobilePhone": mobileVal,
            "provinceId": provinceCodeVal,
            "cityId": cityCodeVal,
            "regionId": areaCodeVal,
            "regionDetail": addressVal,
            "telPhone": telPhoneVal,
            "id": saveId
        }
        templet_isSubmiting = true;
        $.ajax({
            url: siteConfig.userUrl + "/hshop-user/front/userRegion/update",
            type: "post",
            dataType: "json",
            data: data,
            login: true,
            csrf: true,
            success_cb: function (data) {
                if (data.isSuccess) {
                    loadUserInfoList();
                    $(".js_form_addAddrManagement").hide();
                    globalShade2("修改地址成功", 1, 2000);
                } else {//添加地址失败
                    globalShade2(data.resultMsg, 2, 2000);

                }
                templet_isSubmiting = false;
            },
            error_cb: function () {
                globalShade2("添加地址错误,请稍后重试...", 1, 2000);
                templet_isSubmiting = false;
            }
        });

        return bool;
    }



})



//订单服务
var orderServer = {
    //修改购物车商品数量
    save: function (data) {
        $.ajax({
            url: siteConfig.apiUrl + "/order/order-front/save",
            csrf: true,
            data: JSON.stringify(data),
            applicationType: true,
            success_cb: function (data) {
                if (data.isSuccess) {
                    var orderInfo = {
                        userinfo: $('.js-product-orderconfirm-address').find('p').eq(1).text(),
                        address: $('.js-product-orderconfirm-address').find('p').eq(0).text(),
                        price: $('.js-sumPayable').text()
                    }
                    $.cookie('payCode' + data.data[0], JSON.stringify(orderInfo), {
                        'path':'/',
                        // 'domain':'.tongshuai.com'
                    });

                    window.location.href = "./product_pay.shtml?code=" + data.data[0]
                    return false;
                }
                return true;//终止购物车商品数量增减
            },
            error_cb: function (jqXHR, textStatus, errorThrown) {
                // if(jqXHR.status==401){
                //     console.log('用户未登录');
                // }
                return true;//终止购物车商品数量增减
            }
        });
    }
};

//sku服务
var skuServer = {
    //根据inskucode集合查询SKU相关信息
    getSkuByCodes: function (data, orderList) {
        $.ajax({
            url: siteConfig.apiUrl + "/sku/front/sku/getSkuByCodes/",
            type: 'get',
            data: data,
            success_cb: function (data) {
                if (data.isSuccess) {
                    console.log(data)
                    //测试数据
                    var orderInfo = ''
                    for (let i = 0; i < data.data.length; i++) {
                        orderInfo += '<div class="product-orderconfirm-prolist-cont">' +
                            '<div class="o_u o_df_1-10 o_lg_2-10 o_md_2-12 o_sm_2-12 o_xs_2-12 order-prolist-cont-img">' +
                            '<img src="images/compare_goods.PNG" alt="">' +
                            '</div>' +
                            '<div class="o_u o_df_4-10 o_lg_3-10 o_md_3-12 o_sm_3-12 o_xs_5-12  order-prolist-cont-title">' +
                            '<p>' + data.data[i].productShowVO.goodsName + '</p>' +
                            '<span>' + data.data[i].productShowVO.modelNo + '</span>' +
                            '</div>' +
                            '<div class="o_u o_df_2-10  o_lg_2-10 o_md_3-12 o_sm_3-12 o_xs_6-12 order-prolist-cont-nub">' +
                            '<span>¥ ' + data.data[i].skuShowVO.salePrice + '</span>x<span>' + orderList[i].buyNum + '</span>' +
                            '</div>' +
                            '<div class="o_u o_df_1-10  o_lg_1-10 o_md_2-12 o_sm_4-12 o_xs_2-12 order-prolist-cont-productno">地区无货</div>' +
                            '<div class="o_u o_df_2-10  o_lg_1-10 o_md_2-12 o_sm_4-12 o_xs_2-12 order-prolist-cont-total">' +
                            '<i>¥ ' + parseFloat(data.data[i].skuShowVO.salePrice) * parseInt(orderList[i].buyNum) + ' </i>' +
                            '</div>' +
                            '</div>'
                    }

                    $('.js-orderconfirm-prolist').html(orderInfo)
                    
                    $('.js-count').find('span').text($('.product-orderconfirm-prolist-cont').length)

                    var countPrice = 0
                    $('.order-prolist-cont-total').each(function(){
                        countPrice += parseInt($(this).find('i').html().substring(2,10))
                    })

                    // 合计
                    $('.js-count').next('i').html('&yen; ' + countPrice)
                    // 应付总额
                    $('.js-sumPayable').html('&yen; ' + countPrice)

                }

            },
            error_cb: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    console.log('用户未登录');
                }
            }
        });
    }
};

// 用户中心服务
var userServer = {
    // 分页查询用户收获地址
    list: function () {
        $.ajax({
            url: siteConfig.domain + "/hshop-user/front/userRegion/list",
            applicationType: true,
            login: true,
            success_cb: function (data) {
                if (data.isSuccess) {
                    var addressList = ''
                    for (var i = 0; i < data.data.entities.length; i++) {

                        address = {
                            provinceName: data.data.entities[i].provinceName || '',
                            cityName: data.data.entities[i].cityName || '',
                            areaName: data.data.entities[i].areaName || '',
                            streetName: data.data.entities[i].streetName || ''
                        }

                        addressList += '<li class="">' +
                            '<div recipientsId="' + data.data.entities[i].id + '" class="product-address-list o_g js_addressListCont'

                        if (data.data.entities[i].isDefault == 1) {
                            addressList += ' product-address-list-select'
                        }

                        addressList += '">' +
                            '<div class="l-radio">' +
                            '<input  type="radio" class="js_radio" name="cc"'

                        if (data.data.entities[i].isDefault == 1) {
                            addressList += ' checked'
                        }

                        addressList += ' value="">' +
                            '</div>' +
                            '<p class="o_u o_sm_9-12 o_xs_8-12 js_orderAddressCont">' +
                            '<i class="product-address-list-name">' + data.data.entities[i].customerName + '</i>' +
                            '<i class="product-address-list-phone">' + data.data.entities[i].mobilePhone + '</i>' +
                            '<i class="product-address-list-address o_u o_sm_2-2 o_xs_2-2">' + address.provinceName + ' ' + address.cityName + ' ' + address.areaName + ' ' + address.streetName + '</i>' +
                            '</p>' +
                            '<a href="javascript:;" class="o_u o_sm_2-12 o_xs_2-12 iconfont icon-pencil-solid js_addressListSetBtn order-address-set-btn">修改</a>' +
                            '</div>' +
                            '</li>'
                    }

                    $('.js-product-address-list').html(addressList)
                    $(".js_radio").jq_qvote();

                    $('.js-product-orderconfirm-address').find('p').eq(0).text($('.product-address-list-select .product-address-list-address').text())
                    $('.js-product-orderconfirm-address').find('p').eq(1).html($('.product-address-list-select .product-address-list-name').text() + '&emsp;' +$('.product-address-list-select .product-address-list-phone').text() )

                    $('.c_ipt_cr').click(function () {
                        var select = $(this).hasClass('c_ipt_cr_rs');
                        if (select) {
                            $(this).parents('.js_addressListCont').addClass('product-address-list-select');
                            $(this).parents('li').siblings().find('.js_addressListCont').removeClass('product-address-list-select');
                        }

                        $('.js-product-orderconfirm-address').find('p').eq(0).text($('.product-address-list-select .product-address-list-address').text())
                        $('.js-product-orderconfirm-address').find('p').eq(1).html($('.product-address-list-select .product-address-list-name').text() + '&emsp;' +$('.product-address-list-select .product-address-list-phone').text() )
                    })

                    // 查询发票头信息
                    userServer.queryUserInvoiceHead()
                }
            },
            error_cb: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    console.log('用户未登录');
                }
            }
        });
    },
    // 保存用户发票抬头
    invoiceSave: function (data) {
        $.ajax({
            url: siteConfig.domain + "/hshop-user/front/userInvoiceHead/save",
            login: true,
            data: data,
            success_cb: function (data) {
                if (data.isSuccess) {
                    console.log(data)

                    var invoiceHead = ''
                    invoiceHead += '<div class="o_u o_sm_2-3 o_xs_2-3 ">' +
                    '<p class="o_u o_sm_2-2 o_xs_2-2">发票类型：<span>'

                    if (data.data.invoiceType == 1) {
                        invoiceHead += '电子发票（个人）'
                    } else {
                        invoiceHead += '电子发票（公司）'
                    }

                    invoiceHead += '</span></p>' +
                    '<p class="o_u o_sm_2-2 o_xs_2-2">发票抬头： <span>' + data.data.invoiceHead + '</span></p>' +
                    '<p class="o_u o_sm_2-2 o_xs_2-2">发票内容： <span>商品明细</span></p>' +
                    '</div>' +
                    '<a href="javascript:;" class="js_orderconSetInaoice iconfont icon-pencil-solid"> <span>修改</span> </a>' 

                    $('.js_orderconInvoiceBox').html(invoiceHead).attr('invoiceId', data.data.id)

                    $('.js_orderconInvoiceSet').hide();
                    $('.js_orderconInvoiceBox').show();
                }
            },
            error_cb: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    console.log('用户未登录');
                }
            }
        });
    },
    // 查询用户发票抬头
    queryUserInvoiceHead: function (invoiceType) {
        $.ajax({
            url: siteConfig.domain + "/hshop-user/front/userInvoiceHead/userInvoiceHead",
            type: 'get',
            login: true,
            data: {invoiceType: invoiceType || 1},
            success_cb: function (data) {
                if (data.isSuccess) {
                    // 如果没有发票头信息则使用当前收获地址创建发票头信息
                    if (!data.data) {
                        var invoiceHead = {
                            invoiceCode: '',
                            invoiceHead: $('.product-address-list-select .product-address-list-name').text(),
                            invoiceType: 1
                        }

                        userServer.invoiceSave(invoiceHead)
                    } else {
                        var invoiceHead = ''
                        invoiceHead += '<div class="o_u o_sm_2-3 o_xs_2-3 ">' +
                        '<p class="o_u o_sm_2-2 o_xs_2-2">发票类型：<span>'

                        if (data.data.invoiceType == 1) {
                            invoiceHead += '电子发票（个人）'
                        } else {
                            invoiceHead += '电子发票（公司）'
                        }

                        invoiceHead += '</span></p>' +
                        '<p class="o_u o_sm_2-2 o_xs_2-2">发票抬头： <span>' + data.data.invoiceHead + '</span></p>' +
                        '<p class="o_u o_sm_2-2 o_xs_2-2">发票内容： <span>商品明细</span></p>' +
                        '</div>' +
                        '<a href="javascript:;" class="js_orderconSetInaoice iconfont icon-pencil-solid"> <span>修改</span> </a>' 

                        $('.js_orderconInvoiceBox').html(invoiceHead).attr('invoiceId', data.data.id)
                    }
                }
            },
            error_cb: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    console.log('用户未登录');
                }
            }
        });
    },
}

/**
 * 
 * 获取操作系统类型
 */
function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 1
    if (/win/i.test(appVersion)) return 1
    if (/linux/i.test(appVersion)) return 1
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 2
    if (/android/i.test(userAgent)) return 2
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 2
}