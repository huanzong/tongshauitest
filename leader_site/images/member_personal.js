/**
 * Created by Fei on 2017/9/30.
 */
//上传照片

$(function(){

//初始化
//  var boy = $(".js_genderboy").jq_qvote();
//     var sex =   $(".js_sex").jq_qvote();
    //$('#js_genderboy').siblings('span').click();

//    用户名判定
    var nubreg =/^[0-9]*$/;
    var stringOnereg = /^[a-zA-Z]{1}/;
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    var  regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    function wrongInfo(obj,obj2,text){
        obj.addClass('personalist-wrong-box').removeClass('personalist-right');
        obj2.html(text);
    }

    $('.js_member input').blur(function(){
        var username =  $('.js_member input').val();
        if(username.length>3&&username.length<21){
            $('.js_personalistwrongbox_user').addClass('personalist-right').removeClass('personalist-wrong-box');
            if(!nubreg.test(username)){
                $('.js_personalistwrongbox_user').addClass('personalist-right').removeClass('personalist-wrong-box');
                if(stringOnereg.test(username)){
                    $('.js_personalistwrongbox_user').addClass('personalist-right').removeClass('personalist-wrong-box');
                    if(!regEn.test(username)&& !regCn.test(username)){
                        $('.js_personalistwrongbox_user').addClass('personalist-right').removeClass('personalist-wrong-box');
                    }else{
                        wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'不可以使用特殊字符');
                    }
                }else{
                    wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'第一个字符必须为字母');
                }
            }else{
                wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'用户名不可以全部是数字');
            }
        }else{
            wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'用户名长度不合格');
        }
    });






//    时间控件

    $(window).resize(function() {
        var left = $('.member-personalinfo-listiptbox').offset().left;
        $('.datetimepicker').css('left',left+50);
    })


    //用户名状态切换
    //$('.js_member').hide();
    $('.js_personalinfo-namefixed').hide();



    if (window.innerWidth ==     undefined || window.innerWidth > 1199) {
        $(".js_Date").datetimepicker({
            language: 'zh-CN',      //语言
            weekStart: 0,           //一周从哪一天开始
            todayBtn: 1,            //底部显示“今天”
            autoclose: 1,           //选择后关闭选择器
            todayHighlight: 1,      //高亮当前日期
            startView: 2,           //首先显示的视图
            minView: 2,             //视图
            forceParse: true,       //解析输入值
            format: "yyyy-mm-dd",   // 日期格式
            pickerPosition: "bottom-left",
            // startDate: new Date()     // 开始时间
        });
    }else{
        $('.js_Date').mobiscroll().date({
            preset: 'date',           //日期
            lang: "zh",               //语言
            display: 'center',
            dateFormat: 'yyyy-mm-dd', // 日期格式
            dateOrder: 'yymmdd',      //面板中日期排列格式
            // minDate:new Date()        //  最小时间
        });
    }


//    上传组件

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
    name:'multipartFile',
    button: "js_imgUpload", // 这里设置按钮id
    action: '/user/front/user/uploadHeadPic',//这里写地址
    // 开始上传事件


    onUpload: function(data) {
        console.log(11);
        if(data){
            globalShade2('图片上传中，请耐心等待,,,',4,'forever');

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

            //隐藏永恒显示弹窗
            $('.js_popUpBox2').hide();
            $("body").css({overflow:"js_popUpBox2uto"});

            $('.js-uploadPhoto').hide();
            $('.js-modifyPhoto').show();
            $('.js-modifyPhotoBtn').show();

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

////裁剪图片
////jQuery(function($){
//// Create variables (in this scope) to hold the API and image size
//var jcrop_api,
//    boundx,
//    boundy,
//// Grab some information about the preview pane
//    $preview = $('#preview-pane'),
//    $pcnt = $('#preview-pane .preview-container'),
//    $pimg = $('#preview-pane .preview-container img'),
//    xsize = $pcnt.width(),
//    ysize = $pcnt.height();
//$('#target').Jcrop({
//    onChange: updatePreview,
//    onSelect: updatePreview,
//    aspectRatio: xsize / ysize,
//    setSelect: [ 60, 60, 260, 260 ]
//},function(){
//    // Use the API to get the real image size
//    var bounds = this.getBounds();
//    boundx = bounds[0];
//    boundy = bounds[1];
//});
//
//var imgX,imgY,imgW;
//function updatePreview(c)
//{
//    if (parseInt(c.w) > 0)
//    {
//        var rx = xsize / c.w;
//        var ry = ysize / c.h;
//        $pimg.css({
//            width: Math.round(rx * boundx) + 'px',
//            height: Math.round(ry * boundy) + 'px',
//            marginLeft: '-' + Math.round(rx * c.x) + 'px',
//            marginTop: '-' + Math.round(ry * c.y) + 'px'
//        });
//    }
//
//    imgX= c.x;
//    imgY= c.y;
//    imgW= c.w;
//    console.log(imgX, imgY, imgW);
//}

$('#getupimg').click(function(){    console.log(imgX, imgY, imgW);})
//个人信息
$('.js-personalinfotab').click( function () {
    var tabNmu =$(this).index();
    $('.js-personalinfotabcont').hide();
    $('.js-personalinfotabcont').eq(tabNmu).show()
    $('.js-personalinfotab').removeClass('cur').eq(tabNmu).addClass('cur');
    $('.js-personalinfotabcont').removeClass('cur').eq(tabNmu).addClass('cur');
    $('.js-uploadPhoto').show();
    $('.js-modifyPhoto').hide();
    $('.js-modifyPhotoBtn').hide();
})



//下拉菜单初始化
// $("#js_persave").oSelect().init();
// $("#js_percity").oSelect().init();
//     $("#js_perarea").oSelect().init();
//     $("#js_save").oSelect().init();
//     $('#js_city').oSelect().init();
//     $('#js_area').oSelect().init();


//    提交按钮验证
    $('.js_personalinfoBtn').click(function(){

    })

})


