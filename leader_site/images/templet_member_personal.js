/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-个人信息
* @author:      刘悦
* @date        2017.10.20
* ---------------------------------------------------------------------------*/

$(function(){

    //前台判断是否登陆
    // if(!istrsidssdssotoken()){
    //     jumpToLoginPage();
    // }

    var templet_select_sheng=$("#js_save").oSelect();
    var templet_select_shi=$("#js_city").oSelect();
    var templet_select_qu=$("#js_area").oSelect();

    //页面加载时调个人信息
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/user/front/user/userInfo",
        data: "",
        error : function(XMLHttpRequest, textStatus, errorThrown){
        },
        success: function(returnData){
            if (jQuery.trim(returnData).length > 0) {
                if(returnData.resultMsg=='用户未登录'){
                    window.location.href ='/ids/ts/login.jsp';
                }

                //性别
                var template_sex=jQuery.trim(returnData.data.sex);
                if(template_sex=="1"){//男
                    $("#js_genderboy").attr("checked",true);
                }else if(template_sex=="2"){//女
                    $("#js_gendergirl").attr("checked",true);
                }else{//其它情况
                    $("#js_genderboy").attr("checked",true);
                }

                $(".js_sex").jq_qvote();

                //生日放进去
                var template_birthday=jQuery.trim(returnData.data.birthday);
                if(template_birthday!=null && template_birthday!=''){
                    var template_birthdayArr=template_birthday.split("-");
                    var yearU=template_birthdayArr[0];
                    var monthU=template_birthdayArr[1];
                    var dayU=template_birthdayArr[2];

                    $('#js_persave').attr('autotext',yearU);
                    $('#js_percity').attr('autotext',monthU);
                    $('#js_perarea').attr('autotext',dayU);
                }


                //年月日往里放值待定

                $("#js_persave").oSelect().init();
                $("#js_percity").oSelect().init();
                $("#js_perarea").oSelect().init();

                //居住地
                var template_provinceName=jQuery.trim(returnData.data.provinceName);
                var template_city=jQuery.trim(returnData.data.city);
                var template_areaName=jQuery.trim(returnData.data.areaName);
                //省
                $.ajax({
                    url:"/interaction-service/regionInfo/regionList",
                    type:"get",
                    dataType:"json",
                    data:{"parentId":'0'},
                    success:function(responseT){
                        if(responseT.isSuccess){
                            var provinceList=responseT.data;
                            $("#js_save").html("");
                            $("#js_save").append('<option value="">--请选择省份--</option>');
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
                            if(template_provinceName!=null && template_provinceName!=""){
                                var shengVal=$("#js_save").val();
                                $.ajax({
                                    url:"/interaction-service/regionInfo/regionList",
                                    type:"get",
                                    dataType:"json",
                                    data:{"parentId":shengVal},
                                    success:function(responseT){
                                        if(responseT.isSuccess){
                                            var provinceList=responseT.data;
                                            $("#js_city").html("");
                                            $("#js_city").append('<option value="">--请选择城市--</option>');
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
                                                url:"/interaction-service/regionInfo/regionList",
                                                type:"get",
                                                dataType:"json",
                                                data:{"parentId":quVal},
                                                success:function(responseT){
                                                    if(responseT.isSuccess){
                                                        var provinceList=responseT.data;
                                                        $("#js_area").html("");
                                                        $("#js_area").append('<option value="">--请选择区--</option>');
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
                                                },
                                                error:function(){}
                                            });
                                        }
                                    },
                                    error:function(){}
                                });
                            }
                        }
                    },
                    error:function(){}
                })


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
            url:"/interaction-service/regionInfo/regionList",
            type:"get",
            dataType:"json",
            data:{"parentId":shengVal},
            success:function(responseT){
                if(responseT.isSuccess){
                    var provinceList=responseT.data;
                    $("#js_city").html("");
                    $("#js_city").append('<option value="">--请选择城市--</option>');
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
            },
            error:function(){}
        });
    });

    //省改变，市区变为空
    $("#js_city").change(function(){
        $("#js_area").html("");
        templet_select_qu.init();
        templet_select_qu.lose();
        var shiVal=$("#js_city").val();
        $.ajax({
            url:"/interaction-service/regionInfo/regionList",
            type:"get",
            dataType:"json",
            data:{"parentId":shiVal},
            success:function(responseT){
                if(responseT.isSuccess){
                    var provinceList=responseT.data;
                    $("#js_city").html("");
                    $("#js_city").append('<option value="">--请选择城市--</option>');
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
            },
            error:function(){}
        });
    });
})


