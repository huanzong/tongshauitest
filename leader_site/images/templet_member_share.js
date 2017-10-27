/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单—晒单分享
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function () {
    var orderId = getQueryString("orderId");
    $.ajax({
        type: "get",
        dataType: "json",
        url: "",
        data: "",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        success: function (returnData) {
            if (jQuery.trim(returnData).length > 0) {
                $('.js-productName').html('产品名 <br><span>编码</span>');

            }

        }

    })
    $('.js-memberShareGetUp').unbind().click(function () {
        var $shareArr = $('.js_shareScoreImg>li');
        var templet_grade = 0;
        for (var i = 0; i < $shareArr.length; i++) {

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