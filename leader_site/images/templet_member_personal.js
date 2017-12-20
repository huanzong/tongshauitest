/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-个人信息
* @author:      刘悦
* @date        2017.10.20
* ---------------------------------------------------------------------------*/

$(function(){
    var templet_orderId=getQueryString("to");
    if('header'==templet_orderId){
        var tabNmu =$('.js-personalPicuure').index();
        $('.js-personalinfotabcont').hide();
        $('.js-personalinfotabcont').eq(tabNmu).show()
        $('.js-personalinfotab').removeClass('cur').eq(tabNmu).addClass('cur');
        $('.js-personalinfotabcont').removeClass('cur').eq(tabNmu).addClass('cur');
        $('.js-uploadPhoto').show();
        $('.js-modifyPhoto').hide();
        $('.js-modifyPhotoBtn').hide();
    }

    var templet_select_sheng=$("#js_save").oSelect();
    var templet_select_shi=$("#js_city").oSelect();
    var templet_select_qu=$("#js_area").oSelect();
    $(".js_sex").jq_qvote();

    var template_sex;//性别
    //省市区
    var template_provinceName;
    var template_city;
    var template_areaName;
    var template_birthday;
    var template_loginName;

    //页面加载时调个人信息。
    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/hshop-user/front/user/userInfo/",
        data: "",
        login:true,
        success_cb: function(data){
            if (jQuery.trim(data).length > 0) {


                //loginName 需要在这里判断一下他是不是之前修改过 如果没修改过就是TEXT 修改过是不能填写的
                var loginName_regexp=/^ts\d{6}$/;

                template_loginName=jQuery.trim(data.data.loginName);
                $('#js_loginName').val(template_loginName);
                $('.js_personalinfo-namefixed').html('<p>'+template_loginName+'</p>');

                if(loginName_regexp.test(template_loginName)){
                    $('.js_member').show();
                    $('.js_personalinfo-namefixed').hide();
                }else{
                    $('.js_member').hide();
                    $('.js_personalinfo-namefixed').show();
                }

                //性别
                template_sex=jQuery.trim(data.data.sex);
                if(template_sex=="1"){//男
                    $("#js_genderboy").attr("checked",true);
                    $("#js_gendergirl").attr("checked",false);
                }else if(template_sex=="2"){//女
                    $("#js_gendergirl").attr("checked",true);
                    $("#js_genderboy").attr("checked",false);
                }else{//其它情况
                    $("#js_genderboy").attr("checked",true);
                    $("#js_gendergirl").attr("checked",false);
                }



                //生日放进去
                template_birthday=jQuery.trim(data.data.birthday);
                $('.js_Date').val(template_birthday);


                //居住地
                template_provinceName=jQuery.trim(data.data.provinceName);
                template_city=jQuery.trim(data.data.city);
                template_areaName=jQuery.trim(data.data.areaName);
                //省
                $.ajax({
                    url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
                    type:"get",
                    data:{"parentId":'0'},
                    success_cb:function(data){
                        if(data.isSuccess){
                            var provinceList=data.data;
                            $("#js_save").html("");
                            $("#js_save").append('<option value="">省</option>');
                            if(provinceList!=null){
                                for(var i=0; i<provinceList.length; i++){
                                    var isSelected="";
                                    if(template_provinceName==provinceList[i].regionName){
                                        isSelected="selected";
                                    }

                                    var provinceEach=' <option value="' + provinceList[i].regionCode + '" '+isSelected+'>' + provinceList[i].regionName + '</option>';
                                    $("#js_save").append(provinceEach);
                                }

                            }
                            templet_select_sheng.init();
                            //如果省不为空，肯定有市，区，个人信息里市区显示
                            if(template_provinceName!=null && template_provinceName!=""&& template_provinceName!="null"){
                                var shengVal=$("#js_save").val();
                                $.ajax({
                                    url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
                                    type:"get",
                                    data:{"parentId":shengVal},
                                    success_cb:function(data){
                                        if(data.isSuccess){
                                            var provinceList=data.data;
                                            $("#js_city").html("");
                                            $("#js_city").append('<option value="">市</option>');
                                            if(provinceList!=null){
                                                for(var i=0; i<provinceList.length; i++){
                                                    var isSelected="";
                                                    if(template_city==provinceList[i].regionName){
                                                        isSelected="selected";
                                                    }
                                                    var provinceEach=' <option value="' + provinceList[i].regionCode + '" '+isSelected+'>' + provinceList[i].regionName + '</option>';
                                                    $("#js_city").append(provinceEach);
                                                }

                                            }
                                            templet_select_shi.init();
                                            var quVal=$("#js_city").val();
                                            $.ajax({
                                                url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
                                                type:"get",
                                                data:{"parentId":quVal},
                                                success_cb:function(data){
                                                    if(data.isSuccess){
                                                        var provinceList=data.data;
                                                        $("#js_area").html("");
                                                        $("#js_area").append('<option value="">区</option>');
                                                        if(provinceList!=null){
                                                            for(var i=0; i<provinceList.length; i++){
                                                                var isSelected="";
                                                                if(template_areaName==provinceList[i].regionName){
                                                                    isSelected="selected";
                                                                }
                                                                var provinceEach=' <option value="' + provinceList[i].regionCode + '" '+isSelected+'>' + provinceList[i].regionName + '</option>';
                                                                $("#js_area").append(provinceEach);
                                                            }

                                                        }
                                                        templet_select_qu.init();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
                //头像放进去
                if(data.data.headUrl==null || data.data.headUrl=='' || data.data.headUrl=='null'){
                    $("#js-imgleft").attr("src",'/images/user_img.jpg');
                    $("#js-img700").attr("src",'/images/user_img.jpg');
                }
                else{
                    $("#js-imgleft").attr("src",data.data.headUrl);
                    $("#js-img700").attr("src",data.data.headUrl);
                }
            }
        }
    });
    //省改变，市区变为空
    $("#js_save").change(function(){
        $("#js_city").html("");
        templet_select_shi.init();
        templet_select_shi.lose();
        var shengVal=$("#js_save").val();
        $.ajax({
            url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
            type:"get",
            data:{"parentId":shengVal},
            login:true,
            success_cb:function(data){
                if(data.isSuccess){
                    var provinceList=data.data;
                    $("#js_city").html("");
                    $("#js_city").append('<option value="">市</option>');
                    if(provinceList!=null){
                        for(var i=0; i<provinceList.length; i++){
                            var provinceEach=' <option value="'+provinceList[i].regionCode+'">'+provinceList[i].regionName+'</option>';
                            $("#js_city").append(provinceEach);
                        }

                    }
                    templet_select_shi.init();

                    //省变动,区一并重新初始化
                    $("#js_area").html("");
                    templet_select_qu.init();
                    templet_select_qu.lose();
                }
            }
        });
    });

    //市改变，区跟着变动
    $("#js_city").change(function(){
        $("#js_area").html("");
        templet_select_qu.init();
        templet_select_qu.lose();
        var shiVal=$("#js_city").val();
        $.ajax({
            url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
            type:"get",
            data:{"parentId":shiVal},
            login:true,
            success_cb:function(data){
                if(data.isSuccess){
                    var provinceList=data.data;
                    $("#js_area").html("");
                    $("#js_area").append('<option value="">区</option>');
                    if(provinceList!=null){
                        for(var i=0; i<provinceList.length; i++){
                            var provinceEach=' <option value="'+provinceList[i].regionCode+'">'+provinceList[i].regionName+'</option>';
                            $("#js_area").append(provinceEach);
                        }
                    }
                    templet_select_qu.init();
                }
            }
        });
    });

    //点击取消按钮
    $(".js-cancel").unbind().click(function () {
        $('#js_loginName').val(template_loginName);

        if(template_sex=="1"){//男
            $('#js_genderboy').siblings('span').click();
        }else if(template_sex=="2"){//女
            $('#js_gendergirl').siblings('span').click();
        }else{//其它情况
            $('#js_genderboy').siblings('span').click();
        }

        $('.js_Date').val(template_birthday);
        $("#js_save").html("");
        templet_select_sheng.init();
        // templet_select_sheng.lose();
        $("#js_city").html("");
        templet_select_shi.init();
        templet_select_shi.lose();
        $("#js_area").html("");
        templet_select_qu.init();
        templet_select_qu.lose();

        $.ajax({
            url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
            type:"get",
            data:{"parentId":'0'},
            login:true,
            success_cb:function(data){
                if(data.isSuccess){
                    var provinceList=data.data;
                    $("#js_save").html("");
                    $("#js_save").append('<option value="">省</option>');
                    if(provinceList!=null){
                        for(var i=0; i<provinceList.length; i++){
                            var isSelected="";
                            if(template_provinceName==provinceList[i].regionName){
                                isSelected="selected";
                            }
                            var provinceEach=' <option value="' + provinceList[i].regionCode + '" '+isSelected+'>' + provinceList[i].regionName + '</option>';
                            $("#js_save").append(provinceEach);
                        }
                    }
                    templet_select_sheng.init();
                    //如果省不为空，肯定有市，区，个人信息里市区显示
                    if(template_provinceName!=null && template_provinceName!="" && template_provinceName!="null"){
                        var shengVal=$("#js_save").val();
                        $.ajax({
                            url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
                            type:"get",
                            data:{"parentId":shengVal},
                            success_cb:function(data){
                                if(data.isSuccess){
                                    var provinceList=data.data;
                                    $("#js_city").html("");
                                    $("#js_city").append('<option value="">市</option>');
                                    if(provinceList!=null){
                                        for(var i=0; i<provinceList.length; i++){
                                            var isSelected="";
                                            if(template_city==provinceList[i].regionName){
                                                isSelected="selected";
                                            }
                                            var provinceEach=' <option value="' + provinceList[i].regionCode + '" '+isSelected+'>' + provinceList[i].regionName + '</option>';
                                            $("#js_city").append(provinceEach);
                                        }

                                    }
                                    templet_select_shi.init();
                                    var quVal=$("#js_city").val();
                                    $.ajax({
                                        url:siteConfig.userUrl+"/interaction-service/regionInfo/regionList/",
                                        type:"get",
                                        data:{"parentId":quVal},
                                        success_cb:function(data){
                                            if(data.isSuccess){
                                                var provinceList=data.data;
                                                $("#js_area").html("");
                                                $("#js_area").append('<option value="">区</option>');
                                                if(provinceList!=null){
                                                    for(var i=0; i<provinceList.length; i++){
                                                        var isSelected="";
                                                        if(template_areaName==provinceList[i].regionName){
                                                            isSelected="selected";
                                                        }
                                                        var provinceEach=' <option value="' + provinceList[i].regionCode + '" '+isSelected+'>' + provinceList[i].regionName + '</option>';
                                                        $("#js_area").append(provinceEach);
                                                    }
                                                }
                                                templet_select_qu.init();
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        })

    });

    //点击确定
    var templet_isSubmiting=false;
    $(".js-preserve").unbind().click(function () {
        if(templet_isSubmiting){//正在提交
            globalShade2('正在提交，请稍后','3');
            return;
        }

        var templet_loginName=$.trim($('#js_loginName').val());
        var templet_sex=$.trim($('input[name="cc"]:checked').attr("data"));
        var templet_birthday=$.trim($('.js_Date').val());

        var templet_provinceName=$.trim($("#js_save  option:selected").text());
        var templet_provinceId=$.trim($("#js_save  option:selected").val());
        var templet_city=$.trim($("#js_city  option:selected").text());
        var templet_cityId=$.trim($("#js_city  option:selected").val());
        var templet_areaName=$.trim($("#js_area  option:selected").text());
        var templet_areaId=$.trim($("#js_area  option:selected").val());
        if(templet_provinceName.indexOf("请选择")>-1){
            templet_provinceName='';
        }
        if(templet_city.indexOf("请选择")>-1){
            templet_city='';
        }
        if(templet_areaName.indexOf("请选择")>-1){
            templet_areaName='';
        }


        if( $('.js_personalistwrongbox_user').hasClass('personalist-wrong-box') || templet_loginName==''){
            return;
        }

        //判断生日是否超出现在日期
        var myDate = new Date();
        var birthdayArr=templet_birthday.split("-");
        var templet_yearU=birthdayArr[0];
        var templet_monthU=birthdayArr[1];
        var templet_dayU=birthdayArr[2];
        var templet_monthT=myDate.getMonth()+1;

        if(templet_yearU>myDate.getFullYear()){
            wrongInfo($('.js_personalistwrongbox_data'),$('.js_personawrong_data'),'请填写正确日期');
            return;
        }
        if(templet_yearU==myDate.getFullYear() && templet_monthU>templet_monthT){
            wrongInfo($('.js_personalistwrongbox_data'),$('.js_personawrong_data'),'请填写正确日期');
            return;
        }
        if(templet_yearU==myDate.getFullYear() && templet_monthU==templet_monthT && templet_dayU>myDate.getDate()){
            wrongInfo($('.js_personalistwrongbox_data'),$('.js_personawrong_data'),'请填写正确日期');
            return;
        }

        var templet_data={
            "loginName":templet_loginName,
            "sex":templet_sex,
            "provinceId":templet_provinceId,
            "provinceName":templet_provinceName,
            "city":templet_city,
            "cityId":templet_cityId,
            "areaName":templet_areaName,
            "areaId":templet_areaId,
            "birthday":templet_birthday
        }
        templet_isSubmiting=true;
        $.ajax({
            type: "post",
            url: siteConfig.userUrl+"/hshop-user/front/user/updateUserInfo/",
            data:templet_data,
            login:true,
            csrf:true,
            error_cb: function (data) {
                templet_isSubmiting=false;
            },
            success_cb: function (data) {
                if(data.isSuccess){
                    document.cookie="isAlterBind=1;path=/";
                    globalShade2('保存成功','1');

                    template_sex=templet_sex;
                    template_provinceName=templet_provinceName;
                    template_city=templet_city;
                    template_areaName=templet_areaName;
                    template_birthday=templet_birthday;
                    template_loginName=templet_loginName;
                }
                else{

                    globalShade2(data.resultMsg,'2');
                }
                templet_isSubmiting=false;
            }
        });
    });
})

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
