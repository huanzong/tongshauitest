/**
 * Created by Fei on 2017/9/30.
 */
//上传照片

$(function(){


//    用户名判定
    var templet_pic;
    var imgX,imgY,imgW;

    $('.js_member input').blur(function(){
        var loginAccountName = $.trim($('.js_member input').val());
        if ("" == loginAccountName) {
            wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'请填写用户名');
            return;
        }
        //把全部符合\x00-\xff条件的字符用**替换，然后计算长度，即遇到一个中文就用**替换，计算为两位
        var _sUserName_length = loginAccountName.replace(/[^\x00-\xff]/g, "**").length;
        if (_sUserName_length <= 3) {
            wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'还不足4个字符哦！');
            return;
        }
        if (_sUserName_length >= 19) {
            wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'已经超过18个字符啦！');
            return;
        }

        var pattern2 = "\\·[+《》\"`~!@#$^&*()%=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？] ";
        var rs = "";
        var rsArray = new Array();
        var j = 0;
        for (var i = 0; i < loginAccountName.length; i++) {
            var special_index = pattern2.indexOf(loginAccountName.substr(i, 1));
            if (special_index > 0) {
                rs += "\"" + loginAccountName.substr(i, 1) + "\"、";
                rsArray[j] = loginAccountName.substr(i, 1);
                j++;
            }
        }
        if (rs.length == 0) {
            //验证用户名是否全部由数字组成
            var number = /^\d{4,}$/;
            if (number.test(loginAccountName)) {
                //用户名不能以数字开头，这样避免了userNmae 和 mobile 区分不开的问题
                wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'用户名不能全为数字');
            } else {
                if (loginAccountName.indexOf("trs_") > -1 || loginAccountName.indexOf("TRS_") > -1) {
                    wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),'用户名不能包含trs_等关键字');
                }else {
                    $('.js_personalistwrongbox_user').addClass('personalist-right').removeClass('personalist-wrong-box');
                }
            }
        }else {
            $.unique(rsArray);
            var special = "";
            if (3 < rsArray.length) {
                special = "\"" + rsArray[0] + "\"、\"" + rsArray[1] + "\"、\"" + rsArray[2] + "\" 等";
            } else if (1 == rsArray.length) {
                special = "\"" + rsArray[0] + "\"";
            } else {
                for (var i = 0; i < rsArray.length; i++) {
                    special += "\"" + rsArray[i] + "\"、";
                }
                special = special.substr(0, special.length - 1);

                //如果是对的就
            }
            //用户名中含有特殊字符
            wrongInfo( $('.js_personalistwrongbox_user'),$('.js_personawrong_user'),"用户名中含有特殊字符" + special);
        }
    });


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
    var imgs = new Image();
    var imgsW,imgsH,imgsWb,imgsHnow,imgsWnow,nowX,nowY,nowImgW;
            $('#target').Jcrop({
                    onChange: updatePreview,
                    onSelect: updatePreview,
                    aspectRatio: xsize / ysize,
                    boxWidth:300,
                    boxHeight:300,
                    setSelect: [ 60, 60, 260, 260 ]
                }
                ,function(){
                    // Use the API to get the real image size

                    // Store the API in the jcrop_api variable
                    var bounds = this.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];
                    // Store the API in the jcrop_api variable
                    jcrop_api = this;
                    // Move the preview into the jcrop container for css positioning

                }
            );
            function updatePreview(c){
                if (parseInt(c.w) > 0) {
                    var rx = 180 / c.w;
                    var ry = 180 / c.h;
                    $('#js-imgsplit').css({
                        //width: Math.round(rx * boundx) + 'px',
                        //height: Math.round(ry * boundy) + 'px',
                        //
                        ////    width: Math.round(rx * imgsW) + 'px',
                        ////height: Math.round(ry * imgsH) + 'px',
                        ////'max-width':'300px',
                        ////'max-height':'300px',
                        ////width: Math.round($('.js-rightimg').width()) + 'px',
                        ////height: Math.round($('.js-rightimg').height()) + 'px',
                        //    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                        //    marginTop: '-' + Math.round(ry * c.y) + 'px'
                        width:Math.round(rx *imgsW) + "px",	//预览图片宽度为计算比例值与原图片宽度的乘积
                        height:Math.round(rx * imgsH) + "px",  //预览图片高度为计算比例值与原图片高度的乘积
                        marginLeft:"-" + Math.round(rx * c.w) + "px",
                        marginTop:"-" + Math.round(ry *c.y) + "px"
                        }
                    );
                }
            };

//    时间控件

    $(window).resize(function() {
        var left = $('.member-personalinfo-listiptbox').offset().left;
        $('.datetimepicker').css('left',left+50);
    })

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


//   用户名状态切换
    //$('.js_member').hide();
    //$('.js_personalinfo-namefixed').hide();


//    上传组件

$.jUploader.setDefaults({
    cancelable: true, // 可取消上传
    allowedExtensions: ['jpg', 'png','jpeg'], // 只允许上传图片
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
    fillsize:'2',
    button: "js_imgUpload", // 这里设置按钮id
    action: '/hshop-user/front/user/uploadHeadPic',//这里写地址
    // 开始上传事件

    onUpload: function(data) {
        if(data){
            globalShade2('图片上传中，请耐心等待....',4,'forever');
        }

    },
//      上传完成事件
    onComplete: function(name, data) {

        if (data.isSuccess) {

//      隐藏永恒显示弹窗
            $('.js_popUpBox2').hide();
            $("body").css({overflow:"js_popUpBox2uto"});

            $('.js-uploadPhoto').hide();
            $('.js-modifyPhoto').show();
            $('.js-modifyPhotoBtn').show();
            templet_pic='/tongshuaifile'+$.trim(data.data);

            //图片加载完成后获取图片信息

             imgs.src = '/tongshuaifile'+$.trim(data.data);
            imgs.onload = function(){
                imgsW=imgs.width;
                imgsH = imgs.height;
                //bounds=[imgsW,imgsH];
                if(imgsW>imgsH){
                    imgsWb = 300/imgsW;
                    imgsHnow = imgsH*imgsWb;
//      初始化更改选择框内图片
                    jcrop_api.setImage(templet_pic, function(){
                        this.setOptions({
                            outerImage: templet_pic,
                            setSelect: [ 60, 60, 260, 260 ]
                        })
                    });

                    $(".jcrop-preview").attr("src",templet_pic);

                }else{
                    imgsWb = 300/imgsH;
                    imgsWnow = imgsW*imgsWb;
//      初始化更改选择框内图片
                    jcrop_api.setImage(templet_pic, function(){
                        this.setOptions({
                            outerImage: templet_pic,
                            setSelect: [ 60, 60, 260, 260 ]
                        })
                    });

                    $(".jcrop-preview").attr("src",templet_pic);

                }
            };

        } else {
//      上传头像失败出现弹窗
//            alert(111);
            globalShade2(data.resultMsg,2);
        }

    },
//      系统信息显示（例如后缀名不合法）
    showMessage: function(message) {
        alert(message);
    },
//      取消上传事件
    onCancel: function(fileName) {},
    debug: true
});


//      个人信息
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

//      点击取消
    $('.js-imgcancel').unbind().click( function () {
        var tabNmu =$('.js-personalPicuure').index();
        $('.js-personalinfotabcont').hide();
        $('.js-personalinfotabcont').eq(tabNmu).show()
        $('.js-personalinfotab').removeClass('cur').eq(tabNmu).addClass('cur');
        $('.js-personalinfotabcont').removeClass('cur').eq(tabNmu).addClass('cur');
        $('.js-uploadPhoto').show();
        $('.js-modifyPhoto').hide();
        $('.js-modifyPhotoBtn').hide();
    })

//      点击上传图片
    $('#getupimg').unbind().click( function () {

        var imgSize = jcrop_api.tellSelect();
        $.ajax({
            url: siteConfig.userUrl+"/hshop-user/front/user/updateHeadPic",
            type: "get",
            data: {
                    "picX": parseInt(imgSize.x),
                    "picY": parseInt(imgSize.y),
                     "width": parseInt(imgSize.w),
                     "height": parseInt(imgSize.h),
                     "userHeadPic": imgs.src
            },
            login:true,
            success_cb: function (data) {
                if (data.isSuccess) {
                    globalShade2('保存成功','1');
                    location.reload();
                }
                else{
//      上传头像失败出现弹窗
                }
            }
        });
    })

})

function wrongInfo(obj,obj2,text){
    obj.addClass('personalist-wrong-box').removeClass('personalist-right');
    obj2.html(text);
}




