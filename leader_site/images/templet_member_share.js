/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单—晒单分享
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function () {

    //前台判断是否登陆
    // if(!istrsidssdssotoken()){
    //     jumpToLoginPage()
    // }

    $.ajax({
        type: "get",
        dataType: "json",
        url: siteConfig.userUrl+"/user/front/user/userInfo",
        data: "",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        success: function (returnData) {
            if (jQuery.trim(returnData).length > 0) {
                if (returnData.resultMsg == '用户未登录') {
                    window.location.href = '/ids/ts/login.jsp';
                }
            }
        }
    });

    var orderId=getQueryString("orderId");
    $.ajax({
        type: "get",
        dataType: "json",
        url: "",
        data: "",
        error : function(XMLHttpRequest, textStatus, errorThrown){
        },
        success: function(returnData){
            if (jQuery.trim(returnData).length > 0) {
                $('.js-productName').html('产品名 <br><span>编码</span>');
                $('.js-productimg').attr('src','');
            }
        }
    })
    //小星星数量
    var templet_isSubmiting=false;
    $('.js-memberShareGetUp').unbind().click(function () {
        if(templet_isSubmiting){//正在提交
            globalShade2('正在提交','3');
            return;
        }

    })
    $('.js-memberShareGetUp').unbind().click(function () {
        var $shareArr = $('.js_shareScoreImg>li');
        var templet_grade = 0;
        for (var i = 0; i < $shareArr.length; i++) {

        var templet_star = $('.member-share-score-selected').length;

        var templet_content=$('.js_EvaluateVal').val();
        //移动端，网页端
        var templet_innerWidth=window.innerWidth;
        var templet_devSource=1;
        if(templet_innerWidth<750){
            templet_devSource=2;
        }
        templet_isSubmiting=true;
        $.ajax({
            type: "post",
            dataType: "json",
            url: siteConfig.userUrl+"/interaction-comment/comment/myComment/myCommentOn/",
            data: {
                'star':templet_star,
                'content':templet_content,
                'isHavePic':'0',
                'devSource':templet_devSource,
                'businessId':'23',
                'channelSource':'1',
                'productCategoryId':'61',
                'orderId':'1'

            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
            },
            success: function(returnData){
                if(returnData.isSuccess){
                    globalShade2('成功分享','1');
                }

            }
        })
    });

});
//获取参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
            if ($shareArr.eq(i).hasClass('member-share-score-selected')) {
                templet_grade++;
            }
        }

    })
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $('.js_share_getup_img').click(function(){
      var photoNub=   $('.js_sharephotobox').children('li').length;
        if(photoNub>=10){
            globalShade2('最多可以上传10张图片',3,'2000');
        }else{
            $.jUploader.setDefaults({
                cancelable: true, // 可取消上传
                allowedExtensions: ['jpg', 'png', 'gif'], // 只允许上传图片
                messages: {
                    upload: '上传',
                    cancel: '取消',
                    emptyFile: "{file} 为空，请选择一个文件.",
                    //invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
                    invalidExtension: "只能上传后缀名是 {extensions} 的图片。",
                    onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
                }
            });
            $.jUploader({
                fileField: 'file',
                button: "js_shareimgUpload", // 这里设置按钮id
                action: siteConfig.domain+'',//这里写地址
                // 开始上传事件
                onUpload: function(data) {
                    // $.jUploader.defaults.otherArgs = {
                    //   // activityId: activityId,
                    //   proportion: proportion,
                    //   slotId: minSizeSlotId
                    // };
                },
                // 上传完成事件
                onComplete: function(name, data) {
                    if (data.isSuccess) {
                        console.log('上传成功');
                        console.log(data);

                        //上传成功后写入数量
                        $('.js_sharephotoNub').html($('.js_sharephotobox').children('li').length);

                    } else {
                        console.log('上传失败');
                    }

                },
                // 系统信息显示（例如后缀名不合法）
                showMessage: function(message) {
                    alert(message);
                },
                // 取消上传事件
                onCancel: function(fileName) {},
                debug: true
            });
        }

    });

// <li class="member-share-photo-cur"><img src="images/user_img.jpg" alt=""><a href="javascript:;" class="js_sharePhotoDelect member-share-photo-delect">x</a></li>
})