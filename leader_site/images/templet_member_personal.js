/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-个人信息
* @author:      刘悦
* @date        2017.10.20
* ---------------------------------------------------------------------------*/

$(function(){

    //前台判断是否登陆
    // if(!istrsidssdssotoken()){
    //     jumpToLoginPage()；
    // }

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







            }
        }
    });



})