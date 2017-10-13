// 分享晒单页面
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

var textLength =  $('.js_EvaluateVal').val().length;
$('.js_EvaluateValLength').html(textLength);
$('.js_EvaluateVal').keydown(function(e){

    var textlength = $(this).val().length;
    if( textlength>= 500){
        if(e.keyCode==8){
            $('.js_EvaluateValLength').html(textlength);
        }else{
            event.returnValue = false;
            $('.js_EvaluateValLength').html(textlength);
            $('.js_EvaluateVal').val($(this).val().substring(0,500));
        }
    }else{
        $('.js_EvaluateValLength').html(textlength);
    }
})

//        删除图片
$('.js_sharePhotoDelect').click(function(){
    $(this).siblings('img').attr('src',' ').parents('.member-share-photo-cur').remove();
    $.ajax({

    })



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
    action: '/comment/uploadcasartejfmallproductcommentimage/uploadImage',//这里写地址
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
//手机上传
$.jUploader({
    fileField: 'file',
    button: "js_shareimgUploadMb", // 这里设置按钮id
    action: '/comment/uploadcasartejfmallproductcommentimage/uploadImage',//这里写地址
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

//点击提交按钮
$('.js-memberShareGetUp').click(function(){
    var scoreNub = $('.member-share-score-selected').length;  //这个是用户的评价分数
    $.ajax()

})