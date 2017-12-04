// 分享晒单页面
$(function(){
    $('.js_shareScoreImg>li').click(function(){
        var $shareArr=$('.js_shareScoreImg>li');
        var shareImgIndex = $(this).index();
        for(var i=0;i<$shareArr.length;i++){

            if(i > shareImgIndex){
                $shareArr.eq(i).removeClass('member-share-score-selected');

            }else{
                $shareArr.eq(i).addClass('member-share-score-selected');
            }
        }
    })

    //整体评价内容字数验证
    var textLength =  $('.js_EvaluateVal').val().length;
    $('.js_EvaluateValLength').html(textLength);
    $('.js_EvaluateVal').keydown(function(e){

        var textlength = $(this).val().length;
        if( textlength>= 500){
            if(e.keyCode==8){
                $('.js_EvaluateValLength').html(textlength);
            }else{
                event.returnValue = false;
                $('.js_EvaluateValLength').html(500);
                $('.js_EvaluateVal').val($(this).val().substring(0,500));
            }
        }else{
            $('.js_EvaluateValLength').html(textlength);
        }
    })

    $('.js_EvaluateVal').blur(function(){
        var textlength = $(this).val().length;
        if( textlength>= 500){
            $('.js_EvaluateVal').val($(this).val().substring(0,500));
            $('.js_EvaluateValLength').html(500);

        }else{
            $('.js_EvaluateValLength').html(textlength);

        }
    })



        //删除图片
    $('.js_sharePhotoDelect').unbind().live('click',function(){
        $(this).siblings('img').attr('src',' ').parents('.member-share-photo-cur').remove();
        $('.js_sharephotoNub').html($('.js_sharephotobox').children('li').length);
        //图片删除成功后执行
        var photoNub =  $('.js_sharephotobox>li').length();
        if(photoNub<10){
            $('#js_shareimgUpload').show();
            $('.js_share_getup_false').hide();
        }else{
            $('#js_shareimgUpload').hide();
            $('.js_share_getup_false').show();
        }
    })

//本地上传
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
        button: "js_shareimgUploadPC", // 这里设置按钮id
        action: siteConfig.userUrl+'/interaction-comment/comment/imageUpload/',//这里写地址
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
                $('.js-img').append('<li class="member-share-photo-cur"><img src="'+s+'" alt=""><a href="javascript:;" class="js_sharePhotoDelect member-share-photo-delect">x</a></li>');
            } else {
                globalShade2('图片上传失败','2');
            }

                //上传成功后运行函数
            var photoNub =  $('.js_sharephotobox>li').length();
            if(photoNub>=10){
                $('#js_shareimgUpload').hide();
                $('.js_share_getup_false').show();
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

 //点击提交按钮
 $('.js-memberShareGetUp').click(function(){
     var scoreNub = $('.member-share-score-selected').length;  //这个是用户的评价分数
     $.ajax()

 })



//提交成功弹出层
//  $('.js_popUpBox3').show();

//  btnTimeOut($('.js_popUpTimeOver'),5,'');

//  setTimeout(function(){
//     window.location.href='http://www.baidu.com';
//  },4000);
})
