/**
 * Created by Fei on 2017/9/30.
 */
//上传照片

$(function(){

    $('.lose').css('background-color','#ccc');

    var windowWidth = $(window).width();
    if(windowWidth>1199){
      var photoBoxWidth = 350;
    }else if(windowWidth<1200&&windowWidth>991){
        var photoBoxWidth = 300;

    }else if(windowWidth<992) {
        var photoBoxWidth = 250;

    }

//    用户名判定
    var nubreg =/^[0-9]*$/;
    var stringOnereg = /^[a-zA-Z]{1}/;
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    var  regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    var templet_pic;
    var imgX,imgY,imgW;

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




    function isIE()
    {
        if(!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    }


    if (isIE()) {
        //是IE浏览器
        createJCrop(1);
    } else {
        ////单独判断IE10
        //if (document.documentMode == 10) {
        //    createJCrop(1);
        //} else
        //非IE浏览器
            createJCrop(0);
    }


    function createJCrop(flag) {
        if (flag == 0) {
            //非IE下创建
          $('#target').Jcrop({
                    onChange: updatePreview,
                    onSelect: updatePreview,
                    aspectRatio: 1,
                    boxWidth:photoBoxWidth,
                    boxHeight:photoBoxWidth,
                    setSelect: [ photoBoxWidth*0.2, photoBoxWidth*0.2, photoBoxWidth*0.85, photoBoxWidth*0.85 ]
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
        } else {
            //IE下创建

             jcrop_api = $('#target').Jcrop({
                    onChange: updatePreview,
                    onSelect: updatePreview,
                    aspectRatio: 1,
                    boxWidth:photoBoxWidth,
                    boxHeight:photoBoxWidth,
                    setSelect: [ photoBoxWidth*0.2, photoBoxWidth*0.2, photoBoxWidth*0.85, photoBoxWidth*0.85 ]
                }
            //    ,function(){
            //        // Use the API to get the real image size
            //
            //// Store the API in the jcrop_api variable
            //var bounds = this.getBounds();
            //boundx = bounds[0];
            //boundy = bounds[1];
            //// Store the API in the jcrop_api variable
            //jcrop_api = this;
            // Move the preview into the jcrop container for css positioning

        //}
    );
        }
    }
    function updatePreview(coords){
        if (parseInt(coords.w) > 0) {
            var rx = 180 / coords.w;
            var ry = 180 / coords.h;
            $('#js-imgsplit').css({
                    //width: Math.round(rx * boundx) + 'px',
                    //height: Math.round(ry * boundy) + 'px',
                    ////    width: Math.round(rx * imgsW) + 'px',
                    ////height: Math.round(ry * imgsH) + 'px',
                    ////'max-width':'300px',
                    ////'max-height':'300px',
                    ////width: Math.round($('.js-rightimg').width()) + 'px',
                    ////height: Math.round($('.js-rightimg').height()) + 'px',
                    //    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    //    marginTop: '-' + Math.round(ry * c.y) + 'px'
                    width:Math.round(rx *photoBoxWidth) + "px",	//预览图片宽度为计算比例值与原图片宽度的乘积
                    height:Math.round(rx * photoBoxWidth) + "px",  //预览图片高度为计算比例值与原图片高度的乘积
                    marginLeft:"-" + Math.round(rx * coords.x)+ "px",
                    marginTop:"-" + Math.round(ry *coords.y) + "px"
                }
            );
        }
    };

//    时间控件

    $(window).resize(function() {
        var left = $('.member-personalinfo-listiptbox').offset().left;
        $('.datetimepicker').css('left',left+50);
    })

    if (window.innerWidth == undefined || window.innerWidth > 1199) {
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
    $('.js_personalinfo-namefixed').hide();


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
            // console.log(data,111);
            if(data){
                globalShade2('图片上传中，请耐心等待....',4,'forever');
            }

        },
//      上传完成事件
        onComplete: function(name, data) {

            if (data.isSuccess) {
//      隐藏永恒显示弹窗
                $('.js_popUpBox2').hide();
                $("body").css({overflow:"auto"});
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
                    //if(imgsW>imgsH){
                    //    imgsWb = photoBoxWidth/imgsW;
                    //    imgsHnow = imgsH*imgsWb;
//      初始化更改选择框内图片

                        if(!isIE()){
                            jcrop_api.setImage(templet_pic, function(){
                                jcrop_api.setOptions({
                                    outerImage: templet_pic,
                                    //setSelect: [ 60, 60, 260, 260 ]
                                    setSelect: [ photoBoxWidth*0.2, photoBoxWidth*0.2, photoBoxWidth*0.85, photoBoxWidth*0.85 ]

                                })
                            });
                            $(".jcrop-preview").attr("src",templet_pic);

                        }else{
                            $('.js-rightimg').attr('src',templet_pic).css({'height':photoBoxWidth*0.85,'width':photoBoxWidth*0.85})
                            $(".jcrop-preview").attr("src",templet_pic);

                            //jcrop_api.setImage(templet_pic, function(){
                                jcrop_api.setOptions({
                                    //outerImage: templet_pic,
                                    //setSelect: [ 60, 60, 260, 260 ]
                                    setSelect: [ photoBoxWidth*0.2, photoBoxWidth*0.2, photoBoxWidth*0.85, photoBoxWidth*0.85 ]

                                //})
                            });

                        }


                     var photoBoxHeight = $('.jcrop-holder').parent('li').height();
                     $('.jcrop-holder').css('margin-top', (photoBoxHeight-photoBoxWidth)/2+'px');
//                    }else{
//                        imgsWb = photoBoxWidth/imgsH;
//                        imgsWnow = imgsW*imgsWb;
////      初始化更改选择框内图片
////                        jcrop_api.setImage(templet_pic, function(){
//                            jcrop_api.setOptions({
//                                outerImage: templet_pic
//                                //setSelect: [ 60, 60, 260, 260 ]
//                                //setSelect: [ photoBoxWidth*0.2, photoBoxWidth*0.2, photoBoxWidth*0.85, photoBoxWidth*0.85 ]
//
//                            //})
//                        });
//                         var photoBoxHeight = $('.jcrop-holder').parent('li').height();
//                        $('.jcrop-holder').css('margin-top', (photoBoxHeight-photoBoxWidth)/2+'px');
//                        console.log(photoBoxWidth-photoBoxHeight)
//                        $(".jcrop-preview").attr("src",templet_pic);
//
//                    }
                };

            } else {
//      上传头像失败出现弹窗
//            alert(111);
                globalShade2('图片上传失败，请稍后再试',2);
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

        if(!isIE()){
            var imgSize = jcrop_api.tellSelect();
        }else{
            var imgSize = {
                'x':$(".jcrop-holder >div").position().left,
                'y':$(".jcrop-holder >div").position().top,
                'w':$(".jcrop-holder >div").width(),
                'h':$(".jcrop-holder >div").height()
            }
        }


        // console.log(imgSize);
        $.ajax({
            url: siteConfig.userUrl+"/hshop-user/front/user/updateHeadPic",
            type: "get",
            data: {
                "picX": parseInt(imgSize.x),
                "picY": parseInt(imgSize.y),
                "width": parseInt(imgSize.w*(imgsW/photoBoxWidth)),
                "height": parseInt(imgSize.h*(imgsH/photoBoxWidth)),

                "userHeadPic": imgs.src
            },
            success_cb: function (data) {
                if (data.isSuccess) {

                    var tabNmu =$('.js-personalPicuure').index();
                    $('.js-personalinfotabcont').hide();
                    $('.js-personalinfotabcont').eq(tabNmu).show()
                    $('.js-personalinfotab').removeClass('cur').eq(tabNmu).addClass('cur');
                    $('.js-personalinfotabcont').removeClass('cur').eq(tabNmu).addClass('cur');
                    $('.js-uploadPhoto').show();
                    $('.js-modifyPhoto').hide();
                    $('.js-modifyPhotoBtn').hide();
                    $("#js-imgleft").attr("src",data.data);
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


