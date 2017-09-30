/**
 * Created by Fei on 2017/9/30.
 */
//上传照片


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
    button: "js_imgUpload", // 这里设置按钮id
    action: '/comment/uploadcasartejfmallproductcommentimage/uploadImage',//这里写地址
    // 开始上传事件

    onUpload: function(data) {
        if(data){
            $('.js-uploadPhoto').hide();
            $('.js-modifyPhoto').show();
            $('.js-modifyPhotoBtn').show();
        }


        console.log(data,11111);
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

//裁剪图片
//jQuery(function($){
// Create variables (in this scope) to hold the API and image size
var jcrop_api,
    boundx,
    boundy,
// Grab some information about the preview pane
    $preview = $('#preview-pane'),
    $pcnt = $('#preview-pane .preview-container'),
    $pimg = $('#preview-pane .preview-container img'),
    xsize = $pcnt.width(),
    ysize = $pcnt.height();
$('#target').Jcrop({
    onChange: updatePreview,
    onSelect: updatePreview,
    aspectRatio: xsize / ysize,
    setSelect: [ 60, 60, 260, 260 ]
},function(){
    // Use the API to get the real image size
    var bounds = this.getBounds();
    boundx = bounds[0];
    boundy = bounds[1];
});

function updatePreview(c)
{
    if (parseInt(c.w) > 0)
    {
        var rx = xsize / c.w;
        var ry = ysize / c.h;
        $pimg.css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
    }
}
