$(function() {
    var screenWidth = document.body.offsetWidth;
    var navMinHeight = document.body.offsetHeight;

    init();



    $(window).resize(function() {
        init();
    });



    function init() {

        // var screenHeight = document.body.offsetHeight;

        // var nvawidthXl = document.body.offsetWidth/6+240;
        // var nvawidthLg = document.body.offsetWidth/12+240;
        // var nvawidthMd = document.body.offsetWidth/12+40;
        // var nvawidthSm = document.body.offsetWidth/6+40;
        //
        // var contwidthXl = document.body.offsetWidth - nvawidthXl;
        // var contwidthLg = document.body.offsetWidth - nvawidthLg;
        // var contwidthMd = document.body.offsetWidth - nvawidthMd;
        // var contwidthSm = document.body.offsetWidth - nvawidthSm;

        var subMenuHeight = $('.member-menucont').height();
        var sxMenuHeight = $('.o_body').height();
        var contHeight = $('.js-securityheight').height();

        if(contHeight > navMinHeight){
            if(screenWidth>= 576){
                $('.js-nav').css('height',contHeight);
                $('.js-membercontbox').css('height',contHeight);
                $('.js-submenu').css('height',contHeight);
                $('.js-submenucount').css('height',contHeight);
                $('.js-submenubtn').css('height',contHeight);
            }

        }

        if(screenWidth>= 1200){
            $('.js-nav').css('min-height',navMinHeight);
            if(subMenuHeight>navMinHeight){
                $('.js-personal').css('min-height',subMenuHeight+52);
            }else{
                $('.js-personal').css('min-height',navMinHeight);
            }
            $('.js-submenu').css('min-height',navMinHeight);
            $('.js-submenucount').css('min-height',navMinHeight);

        }else if(screenWidth>= 992 && screenWidth<= 1199){
            if(subMenuHeight>navMinHeight){
                $('.js-nav').css('min-height',subMenuHeight+52);
                $('.js-personal').css('min-height',subMenuHeight+52);
            }else{
                $('.js-nav').css('min-height',navMinHeight);
                $('.js-personal').css('min-height',navMinHeight);
            }
            $('.js-submenu').css('min-height',navMinHeight);
            $('.js-submenucount').css('min-height',navMinHeight);

        }else if(screenWidth>= 701 && screenWidth<= 991){
            if(subMenuHeight>navMinHeight){
                $('.js-nav').css('min-height',subMenuHeight+52);
                $('.js-personal').css('min-height',subMenuHeight+52);
                $('.js-submenubtn').css('min-height',subMenuHeight+52);
            }else{
                $('.js-nav').css('min-height',navMinHeight);
                $('.js-personal').css('min-height',navMinHeight);
                $('.js-submenubtn').css('min-height',navMinHeight);
            }
            $('.js-submenu').css('min-height',navMinHeight);
            $('.js-submenucount').css('min-height',navMinHeight);

        }else if(screenWidth>= 576 && screenWidth<= 700){
            if(subMenuHeight>navMinHeight){
                $('.js-nav').css('min-height',subMenuHeight+52);
                $('.js-personal').css('min-height',subMenuHeight+52);
                $('.js-submenubtn').css('min-height',subMenuHeight+52);
            }else{
                $('.js-nav').css('min-height',navMinHeight);
                $('.js-personal').css('min-height',navMinHeight);
                $('.js-submenubtn').css('min-height',navMinHeight);

            }
            $('.js-submenu').css('min-height',navMinHeight);
            $('.js-submenucount').css('min-height',navMinHeight);

        }else if(screenWidth<= 575){
            $('.js-submenucount').css('height',sxMenuHeight-60);
        }



        // var slidesPerView = 4;
        //
        // if (screenWidth <= 575) {
        //   slidesPerView = 1;
        // } else if (screenWidth > 1199) {
        //   slidesPerView = 4;
        // } else {
        //   slidesPerView = 2;
        // }

        // swiper.preferentialSwiper.params.slidesPerView = slidesPerView;
        //
        // setTimeout(function(){
        // $('.js_oHerl').css('height',$('.js_oHerlSize').outerHeight());
        // $('.js_center').oBoxCenter().init();
        // },1000);



        //延迟加载图片
        setTimeout(function(){
            $(".o_picture").each(function(){
                $(this).oPicture({
                    //自定义节点宽度
                    //sm:544,md:700,lg:992,xl:1200,
                }).init();
            });
        },300);

    }

    if(screenWidth<= 991 && screenWidth>= 576){
        $('.js-submenubtn').toggle( function () {
                $('.js-submenu').animate({'right':'-280px'},300);
                $('.js-openbtn').css('display','none');
                $('.js-closebtn').css('display','block');
                $('.js-menushade').css('display','block');
            },function () {
                $('.js-submenu').animate({'right':'-40px'},300);
                $('.js-openbtn').css('display','block');
                $('.js-closebtn').css('display','none');
                $('.js-menushade').css('display','none');
            }
        );
    }else if(screenWidth<= 575){
        $('.js-submenubtn').toggle( function () {
                $('.js-submenucount').animate({'left':'-132px'},300);
                $('.js-xsopenbtn').css('display','none');
                $('.js-closebtn').css('display','block');
                $('.js-menushade').css('display','block');
            },function () {
                $('.js-submenucount').animate({'left':'48px'},300);
                $('.js-xsopenbtn').css('display','block');
                $('.js-closebtn').css('display','none');
                $('.js-menushade').css('display','none');
            }
        );
    }

//下拉菜单初始化
    $("#js_unbindmob").oSelect().init();
    $("#js_save").oSelect().init();
    $("#js_city").oSelect().init();
    $("#js_area").oSelect().init();
    $("#js_persave").oSelect().init();
    $("#js_percity").oSelect().init();
    $("#js_perarea").oSelect().init();
    //个人信息
    $('.js-personalinfotab').click( function () {
        var tabNmu =$(this).index();
        $('.js-personalinfotab').removeClass('cur').eq(tabNmu).addClass('cur');
        $('.js-personalinfotabcont').removeClass('cur').eq(tabNmu).addClass('cur');
        $('.js-uploadPhoto').show();
        $('.js-modifyPhoto').hide();
        $('.js-modifyPhotoBtn').hide();
    })
    $(".js_sex").jq_qvote();

//上传照片
//    $('.meber-personalinfo-photo').


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
    jQuery(function($){

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

        console.log('init',[xsize,ysize]);
        $('#target').Jcrop({
            onChange: updatePreview,
            onSelect: updatePreview,
            aspectRatio: xsize / ysize
        },function(){
            // Use the API to get the real image size
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            // Store the API in the jcrop_api variable
            jcrop_api = this;

            // Move the preview into the jcrop container for css positioning
            $preview.appendTo(jcrop_api.ui.holder);
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
        };

    });

});

