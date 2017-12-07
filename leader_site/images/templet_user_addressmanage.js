/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-地址管理
* @author:      张静
* @date        2017.10.19
* ---------------------------------------------------------------------------*/

//判断登录
//if(!istrsidssdssotoken()){
//    jumpToLoginPage()
//}
var templet_pageNo=1;
var templet_pageSize=10;
loadUserInfoList();//获取用户地址列表

//取消弹框提示
var templet_text="确定取消添加吗？";
$('.js_addressCancel').click(function(){
    $('.js-alertTrue').off();
    $('.js-alertTrue').click(function(){
        $('.js_landClose').click();
        if($('.js_memberAddressList').find('.js_member-addresslistbox').length>0){
            $(".js_form_addAddrManagement").hide();
            $(".js_memberAddressBtn").show();
        }
    })
    globalShade(templet_text);
});
//弹框点击事件
$(".js-alertTrue").click(function(){
    $(".js_form_addAddrManagement").hide();
    $(".js_memberAddressBtn").show();

});
$(".js_memberAddressBtn").click(function(){//点击"新增地址"显示新增地址列表
    templet_text = '确定取消添加？';
    resetForm();
    $(".js_btnSubmit").attr("type",1);
    $(".js_form_addAddrManagement").show();
    $(".js_memberAddressBtn").hide();//隐藏"新增地址"按钮
})
var templet_pageNo=1;
var templet_pageSize=10;

var templet_isUpdate=false;//是否修改标识 true 是修改  false添加
//获取省份信息
var templet_select_sheng=$("#js_save").oSelect();
var templet_select_shi=$("#js_city").oSelect();
var templet_select_qu=$("#js_area").oSelect();
var templet_select_road=$("#js_road").oSelect();
function buildProvinces(){
    $.ajax({
        url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList",
        type:"get",
        dataType:"json",
        data:{"parentId":0},
        login:true,
        success_cb:function(responseT){
            if(responseT.isSuccess){
                var provinceList=responseT.data;
                $("#js_save").html("");
                $("#js_save").append('<option value="">--请选择省--</option>');
                if(provinceList!=null){
                    for(var i=0; i<provinceList.length; i++){
                        var isSelected="";
                        if(templet_isUpdate){
                            isSelected="selected";
                        }
                        var provinceEach=' <option value="'+provinceList[i].regionName+'" shengCode="'+provinceList[i].regionCode+'">'+provinceList[i].regionName+'</option>';
                        $("#js_save").append(provinceEach);
                    }

                }
                templet_select_sheng.init();
            }
        },
        error_cb:function(){}
    })
}


//获取市信息
function buildCity(){
    var shengCode=$("#js_save option:selected").attr("shengCode");
    $.ajax({
        url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList",
        type:"get",
        dataType:"json",
        data:{"parentId":shengCode},
        login:true,
        success_cb:function(responseT){
            if(responseT.isSuccess){
                var cityList=responseT.data;
                $("#js_city").html("");
                $("#js_city").append('<option value="">--请选择市--</option>');
                if(cityList!=null){
                    for(var i=0; i<cityList.length; i++){
                        var isSelected="";
                        if(templet_isUpdate){
                            isSelected="selected";
                        }
                        var cityEach='<option value="'+cityList[i].regionName+'" cityCode="'+cityList[i].regionCode+'">'+cityList[i].regionName+'</option>';
                        $("#js_city").append(cityEach);
                    }
                }
                templet_select_shi.init();
                //省变动,区一并重新初始化
                $("#js_area").html("");
                $("#js_road").html("");
                templet_select_qu.init();
                templet_select_qu.lose();
                templet_select_road.init();
                templet_select_road.lose();
            }
        },
        error_cb:function(){}
    })
}

//获取区信息
function buildArea(){
    var cityCode=$("#js_city option:selected").attr("cityCode");
    $.ajax({
        url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList",
        type:"get",
        dataType:"json",
        data:{"parentId":cityCode},
        login:true,
        success_cb:function(responseT){
            if(responseT.isSuccess){
                var areaList=responseT.data;
                $("#js_area").html("");
                $("#js_area").append('<option value="">--请选择区--</option>');
                if(areaList!=null){
                    for(var i=0; i<areaList.length; i++){
                        var isSelected="";
                        if(templet_isUpdate){
                            isSelected="selected";
                        }
                        var areaEach='<option value="'+areaList[i].regionName+'" areaCode="'+areaList[i].regionCode+'">'+areaList[i].regionName+'</option>';
                        $("#js_area").append(areaEach);
                    }
                }
                templet_select_qu.init();
                $("#js_road").html("");
                templet_select_road.init();
                templet_select_road.lose();
            }

        },
        error_cb:function(){}
    })
}

//获取街道信息
function buildRoad(){
    var areaCode=$("#js_area option:selected").attr("areaCode");
    $.ajax({
        url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList",
        type:"get",
        dataType:"json",
        data:{"parentId":areaCode},
        login:true,
        success_cb:function(responseT){
            if(responseT.isSuccess){
                var roadList=responseT.data;
                $("#js_road").html("");
                $("#js_road").append('<option value="">--请选择街道--</option>');
                if(roadList!=null){
                    for(var i=0; i<roadList.length; i++){
                        var isSelected="";
                        if(templet_isUpdate){
                            isSelected="selected";
                        }
                        var roadEach='<option value="'+roadList[i].regionName+'" roadCode="'+roadList[i].regionCode+'">'+roadList[i].regionName+'</option>';
                        $("#js_road").append(roadEach);
                    }
                }
                templet_select_road.init();
            }
        },
        error_cb:function(){}
    })
}

buildProvinces();
$("#js_save").change(function(){
    buildCity();
})

$("#js_city").change(function(){
    buildArea();
})

$("#js_area").change(function(){
    buildRoad();
})

//新增地址
var templet_isSubmiting=false;
function saveUserAddress(){
    var bool = false;
    var realnameVal=$.trim($("#realName").val());//联系人
    var mobileVal=$.trim($("#mobile").val());//手机号
    var phoneVal=$.trim($("#phone").val());//电话号
    var phonequhaoVal=$.trim($("#phonequhao").val());//区号
    var phonefenjihaoVal=$.trim($("#phonefenjihao").val());//分机号
    var provinceVal=$.trim($("#js_save").val());//省
    var cityVal=$.trim($("#js_city").val());//市
    var areaVal=$.trim($("#js_area").val());//区
    var streetVal=$.trim($("#js_road").val());//街道
    var addressVal=$.trim($("#address").val());//地址
    var provinceCodeVal=$.trim($("#js_save option:selected").attr("shengCode"));
    var cityCodeVal=$.trim($("#js_city option:selected").attr("cityCode"));
    var areaCodeVal=$.trim($("#js_area option:selected").attr("areaCode"));
    var telPhoneVal=phonequhaoVal+";"+phoneVal+";"+phonefenjihaoVal;

    var data = {
        "customerName":realnameVal,
        "provinceName":provinceVal,
        "cityName":cityVal,
        "areaName":areaVal,
        "streetName":streetVal,
        "mobilePhone":mobileVal,
        "provinceId":provinceCodeVal,
        "cityId":cityCodeVal,
        "regionId":areaCodeVal,
        "regionDetail":addressVal,
        "telPhone":telPhoneVal
    }
    templet_isSubmiting=true;
    $.ajax({
        url:siteConfig.userUrl+"/hshop-user/front/userRegion/save",
        type:"post",
        dataType:"json",
        data:data,
        login:true,
        csrf: true,
        success_cb:function(responseT){
            if(responseT.isSuccess){
                loadUserInfoList();//获取列表
                resetForm();//重置表单
                $(".js_newAddress").hide();
                /*globalShade2("添加成功",1,2000);*/
            }else{//添加地址失败
                globalShade2("添加地址失败，请稍后重试...",2,2000);
            }
            templet_isSubmiting=false;
        },
        error_cb:function(responseT){
            globalShade2(responseT.resultMsg,2,2000);
            templet_isSubmiting=false;
        }
    });
    return bool;
}

//校验表单验证，成功后保存地址
$(".js_form_addAddrManagement").Validform({
    tiptype:3,
    btnSubmit:".js_btnSubmit",//提交按钮
    callback:function(form){//验证后保存地址
        var templet_type=$(".js_btnSubmit").attr("type");//判断保存和修改
        if(templet_type==1){
            saveUserAddress();
        }else if(templet_type==2){
            updateUserAddress();
        }
        return false;
    }
});

//获取用户地址列表
function loadUserInfoList(){
    $.ajax({
        url: siteConfig.userUrl+"/hshop-user/front/userRegion/list",
        type: "post",
        dataType: "json",
        data:{
            "pageNo":templet_pageNo,
            "pageSize":templet_pageSize
        },
        login:true,
        success_cb:function(data){
            if(data.isSuccess){
                var addlist = data.data.entities;
                var count = addlist.length;
                if(count != 0){
                    $(".js_memberAddressBtn").show();//显示"新增地址"按钮
                    $(".js_lineInfo").html("");
                    var addhtml="";
                    for(var i=0;i<count;i++){
                        var id = addlist[i].id;//地址id
                        var address = addlist[i].regionDetail ;//详细地址
                        var isDefault  = addlist[i].isDefault ;//否默认地址  1:是 0:否
                        var customerName  = addlist[i].customerName ;//用户名
                        var mobilePhone  = addlist[i].mobilePhone ;//手机号
                        var province = addlist[i].provinceName ;//省
                        var cityName  = addlist[i].cityName ;//市
                        var areaName = addlist[i].areaName ;//区
                        var streetName = addlist[i].streetName ;//街道
                        if(i%2==0){
                            addhtml+='<div class="member-addressbox o_g js_memberAddressList">';
                        }
                        addhtml+='<div class="o_u o_df_1-2 o_lg_1-2 o_md_1-2 o_sm_2-2 o_xs_2-2 js_addressBox" addid="'+id+'">';
                        if(isDefault==1){
                            addhtml+='<div class="member-addresslistbox member-address-setdefault">';
                        }else{
                            addhtml+='<div class="member-addresslistbox js_member-addresslistbox">';
                        }
                        addhtml+='<div class="member-address-name">'+customerName+'</div>';
                        addhtml+='<div class="member-address-mobnumber">'+mobilePhone+'</div>';
                        addhtml+='<div class="member-address-addtext">'+address+'</div>';
                        addhtml+='<div class="member-address-btnbox">';
                        addhtml+='<i class="iconfont icon-pencil-solid"></i>';
                        addhtml+='<a href="javascript:;" onclick="getAddressInfo('+id+')" class="js_amendBtn">修改</a>';
                        addhtml+='<div class="member-address-line"></div>';
                        //addhtml+='<a href="javascript:;" onclick="deleteAddress('+id+')" addid="'+id+'">删除</a>';
                        addhtml+='<a href="javascript:;" class="deleteAddress" addid="'+id+'">删除</a>';
                        addhtml+='</div>';
                        addhtml+='<span class="l-tag-radius l-tag-blue member-address-tab">默认地址</span>';
                        addhtml+='<a href="javascript:;" class="l-btn-sm l-btn-line2 member-address-fitaddbtn js_addressSetDefault" addid="'+id+'">设为默认</a>'

                        addhtml+='</div></div>';
                        if(i%2!=0){
                            addhtml+='</div>';
                        }
                        if(i%2==0 && i==count){
                            addhtml+='</div>';
                        }
                    }
                    $(".js_lineInfo").html(addhtml);

                }else{
                    $(".js_form_addAddrManagement").show();//显示"新增地址"表单
                    $(".js_memberAddressBtn").hide();//隐藏"新增地址"按钮
                }

            }
        }
    })
};

//重置新增表单项
function resetForm(){
    $("#realName").val("");
    $("#mobile").val("");
    $("#address").val("");
    $("#phonequhao").val("");
    $("#phone").val("");
    $("#phonefenjihao").val("");
    $('#js_save').children(':selected').prop('selected',false);
    $('#js_city').children(':selected').prop('selected',false);
    $('#js_area').children(':selected').prop('selected',false);
    $('#js_road').children(':selected').prop('selected',false);
    templet_select_sheng.init();
    templet_select_shi.init();
    templet_select_qu.init();
    templet_select_road.init();
    templet_select_shi.lose();
    templet_select_qu.lose();
    templet_select_road.lose();
    $("#address").blur();
    $("#phonequhao").blur();
    $("#phone").blur();
    $("#phonefenjihao").blur();
};


//设置默认地址
$(".js_addressSetDefault").live("click",function(){
    var addressId=$(this).attr("addid");
    var $this=$(this);
    $.ajax({
        url:siteConfig.userUrl+"/hshop-user/front/userRegion/defaultRegion",
        type:"post",
        dataType: "json",
        data:{
            "id":addressId,
            "isDefault":1,
        },
        login:true,
        csrf: true,
        success_cb:function(responseT){
            if(responseT.isSuccess){
                //loadUserInfoList();//获取列表
                //设置默认成功,设置前端显示
                if(responseT.data==1){
                    if($('.member-address-setdefault')){
                        $('.member-address-setdefault').removeClass('member-address-setdefault');
                    }
                    $this.parent('.member-addresslistbox').addClass('member-address-setdefault');
                    globalShade2("设置默认地址成功",1,2000);
                }else{
                    globalShade2("设置默认地址不成功",2,2000);
                }


            }else{//添加地址失败
                globalShade2(responseT.resultMsg,2,2000);
            }
        },
        error_cb:function(){
            globalShade2("设置默认地址错误,请稍后重试...",2,2000);
        }
    });

});

//删除地址
/*function deleteAddress(addId) {

    globalShade("确定要删除吗？");
    $(".js-alertTrue").click(function(){
        var data = {id: addId};
        //是否删除提示****
        $.ajax({
            url:siteConfig.userUrl+"/hshop-user/front/userRegion/deleteRegion",
            type:"get",
            dataType: "json",
            data:data,
            success:function(responseT){

                if(responseT.isSuccess){
                    loadUserInfoList();
                    //删除成功之后进行前端元素操作
                    $(this).parents(".js_addressBox").remove();

                }else{
                    //删除失败提示*****
                    globalShade2("删除失败,请稍后重试...",2,2000);
                }


            },
            error:function(){
                //删除失败提示****
                /*globalShade2(responseT.resultMsg,2,2000);*/
            }
        })
    })

}*/
//删除地址2
$(document).on("click",".deleteAddress",function(){
    var addressId=$(this).attr("addid");
    var $this=$(this);
    globalShade("确定要删除吗？");
    // $(".js-alertTrue").click(function(){//确定删除按钮
    $(".js-alertTrue").off().on('click',function(){//确定删除按钮
        $.ajax({
            url:siteConfig.userUrl+"/hshop-user/front/userRegion/deleteRegion",
            type:"get",
            dataType: "json",
            data:{"id": addressId},
            login:true,
            csrf: true,
            success_cb:function(responseT){
                $('.js_landClose').click();
                if(responseT.isSuccess){
                    loadUserInfoList();
                    //删除成功之后进行前端元素操作
                    $this.parents(".js_addressBox").remove();
                }else{
                    //删除失败提示*****
                    globalShade2("删除失败,请稍后重试...",2,2000);
                }
            },
            error_cb:function(){
                //删除失败提示****
                /*globalShade2(responseT.resultMsg,2,2000);*/
            }
        })
    })
})
var saveId="";
//修改地址获取信息
function getAddressInfo(id){
    templet_text = '确定取消修改？';
    $('.js_addressTitle').html('修改地址');
    $('.lose').css('background-color','#ccc');
    $(window).scrollTop($('.member-security-tit').height())
    $(".js_btnSubmit").attr("type",2);
    saveId=id;
    var data = {id:id};
    $.ajax({
        url:siteConfig.userUrl+"/hshop-user/front/userRegion/show",
        type:"get",
        data:data,
        dataType: "json",
        login:true,
        csrf: true,
        success_cb:function(data){
            if(data.isSuccess){
                var info = data.data;
                var realname = info.customerName;//用户姓名
                var mobile =info.mobilePhone;//手机号码
                var province = info.provinceName;//省
                var city = info.cityName;//市
                var region = info.areaName;//区
                var street = info.streetName;//街道
                var address = info.regionDetail; //地址
                var defaultaddress =info.isDefault;//是否默认地址 1是 0否
                var id =info.id;//地址id
                var telPhone=info.telPhone;//区号 电话号 分机号
                var telPhone2=telPhone.split(";"); //字符分割

                $("#realName").val(realname);
                $("#mobile").val(mobile);
                $("#address").val(address);
                $("#phonequhao").val(telPhone2[0]);
                $("#phone").val(telPhone2[1]);
                $("#phonefenjihao").val(telPhone2[2]);
                if(templet_isUpdate){
                    $("#js_save").change();
                    $("#js_city").change();
                    $("#js_area").change();
                }
                $("#js_save").change(function(){
                    loadCityList();
                });
                $("#js_city").change(function(){
                    loadAreaList();
                });
                $("#js_area").change(function(){
                    loadRoadList();
                });
                $.ajax({
                    url: siteConfig.userUrl+"/interaction-service/regionInfo/regionList",
                    type: "get",
                    dataType: "json",
                    data: {"parentId": 0},
                    success_cb:function(responseT){
                        if(responseT.isSuccess){
                            var provinceList=responseT.data;
                            $("#js_save").html("");
                            $("#js_save").append('<option value="">--请选择省--</option>');
                            if(provinceList!=null) {
                                for (var i = 0; i < provinceList.length; i++) {
                                    var isSelected="";
                                    if(templet_isUpdate){
                                        isSelected=" selected";
                                    }
                                    var provinceEach = '<option value="'+provinceList[i].regionName+'" shengCode="'+provinceList[i].regionCode+'">'+provinceList[i].regionName+'</option>';
                                    $("#js_save").append(provinceEach);
                                }
                            }
                            var templet_shengCod="";
                            $("#js_save").find("option").each(function(){
                                var shengval = $(this).attr("value");
                                if(province == shengval){
                                    $(this).attr("selected","selected");
                                    templet_shengCod=$(this).attr("shengCode");
                                    return;
                                }
                            });
                            templet_select_sheng.init();
                            loadCityList(templet_shengCod);
                        }
                    }
                });


                function loadCityList(templet_shengCod){
                    $.ajax({
                        url:siteConfig.userUrl+ "/interaction-service/regionInfo/regionList",
                        type: "get",
                        data: {"parentId": templet_shengCod},
                        dataType: "json",
                        login:true,
                        success_cb: function (responseT) {
                            if (responseT.isSuccess) {
                                var cityList=responseT.data;
                                $("#js_city").html("");
                                $("#js_city").append('<option value="">--请选择市--</option>');
                                if (cityList != null) {
                                    for (var i = 0; i < cityList.length; i++) {
                                        var isSelected = "";
                                        if (templet_isUpdate) {
                                            isSelected = " selected";
                                        }
                                        var cityEach='<option value="'+cityList[i].regionName+'" cityCode="'+cityList[i].regionCode+'">'+cityList[i].regionName+'</option>';
                                        $("#js_city").append(cityEach);
                                    }
                                }
                                var templet_cityCode="";
                                $("#js_city").find("option").each(function(){
                                    var cityval = $(this).attr("value");
                                    if(city == cityval){
                                        $(this).attr("selected","selected");
                                        templet_cityCode=$(this).attr("cityCode");
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

                function loadAreaList(templet_cityCode){
                    $.ajax({
                        url: siteConfig.userUrl+"/interaction-service/regionInfo/regionList",
                        type: "get",
                        data: {"parentId":templet_cityCode},
                        dataType: "json",
                        login:true,
                        success_cb: function (responseT) {
                            if (responseT.isSuccess) {
                                var areaList=responseT.data;
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
                                        var areaEach='<option value="'+areaList[i].regionName+'" areaCode="'+areaList[i].regionCode+'">'+areaList[i].regionName+'</option>';
                                        $("#js_area").append(areaEach);
                                    }
                                }
                                var templet_areaCode="";
                                $("#js_area").find("option").each(function(){
                                    var regionval = $(this).attr("value");
                                    if(region == regionval){
                                        $(this).attr("selected","selected");
                                        templet_areaCode=$(this).attr("areaCode");
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

                function loadRoadList(templet_areaCode){
                    $.ajax({
                        url:siteConfig.userUrl+ "/interaction-service/regionInfo/regionList",
                        type: "get",
                        data: {"parentId":templet_areaCode},
                        dataType: "json",
                        login:true,
                        success_cb: function (responseT) {
                            if (responseT.isSuccess) {
                                var roadList=responseT.data;
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
                                        var roadEach='<option value="'+roadList[i].regionName+'" roadCode="'+roadList[i].regionCode+'">'+roadList[i].regionName+'</option>';
                                        $("#js_road").append(roadEach);
                                    }
                                }

                                $("#js_road").find("option").each(function(){
                                    var streetval = $(this).attr("value");
                                    if(street == streetval){
                                        $(this).attr("selected","selected");
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

var infotell=[];
//固定电话号码错误显示逻辑
$('.js_addressPhoneInput').find('input').blur(function(){
    var inputVal = $.trim($(this).val());
    var nubName = $(this).parents('.js_addressPhoneInput').attr('data-type');
    if($(this).siblings('.js-addressMobError').find('.js_nullMsg').length!=0){
        $(this).removeClass('Validform_error');
        infotell[nubName-1] = '';
    }else if($(this).siblings('.Validform_wrong').length!=0){
        $(this).addClass('Validform_error');
        infotell[nubName-1] = '';
    }else if($(this).siblings('.Validform_right').length!=0){
        infotell[nubName-1] = inputVal;
    }
})
//保存修改地址
function updateUserAddress(){
    var bool = false;
    var realnameVal=$.trim($("#realName").val());//联系人
    var mobileVal=$.trim($("#mobile").val());//手机号
    //var phoneVal=$.trim($("#phone").val());//电话号
    //var phonequhaoVal=$.trim($("#phonequhao").val());//区号
    //var phonefenjihaoVal=$.trim($("#phonefenjihao").val());//分机号
    var provinceVal=$.trim($("#js_save").val());//省
    var cityVal=$.trim($("#js_city").val());//市
    var areaVal=$.trim($("#js_area").val());//区
    var streetVal = $.trim($("#js_road").val());//街道
    var addressVal=$.trim($("#address").val());//地址
    /*var idVal=$.trim($(".js_addressBox").attr("addid"));//id*/
    var provinceCodeVal=$.trim($("#js_save option:selected").attr("shengCode"));
    var cityCodeVal=$.trim($("#js_city option:selected").attr("cityCode"));
    var areaCodeVal=$.trim($("#js_area option:selected").attr("areaCode"));
    if(infotell[0]&&infotell[1]){
        var telPhoneVal=infotell[0]+";"+infotell[1]+";"+infotell[2];

    }else{
        var telPhoneVal='';
    }
    if (addressVal == "尽可能详解地填写街道、楼号、楼层、门牌号") {
        addressVal = "";
    }

    var data = {
        "customerName":realnameVal,
        "provinceName":provinceVal,
        "cityName":cityVal,
        "areaName":areaVal,
        "streetName":streetVal,
        "mobilePhone":mobileVal,
        "provinceId":provinceCodeVal,
        "cityId":cityCodeVal,
        "regionId":areaCodeVal,
        "regionDetail":addressVal,
        "telPhone":telPhoneVal,
        "id":saveId
    }
    templet_isSubmiting = true;
    $.ajax({
        url:siteConfig.userUrl+ "/hshop-user/front/userRegion/update",
        type: "post",
        dataType: "json",
        data: data,
        login:true,
        csrf: true,
        success_cb: function (data) {
            if (data.isSuccess) {
                loadUserInfoList();
                $(".js_form_addAddrManagement").hide();
                globalShade2("修改地址成功",1,2000);
            } else {//添加地址失败
                globalShade2(data.resultMsg,2,2000);

            }
            templet_isSubmiting = false;
        },
        error_cb: function () {
            globalShade2("添加地址错误,请稍后重试...",1,2000);
            templet_isSubmiting = false;
        }
    });

    return bool;
}




	

