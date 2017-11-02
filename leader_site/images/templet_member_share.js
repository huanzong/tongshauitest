/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单—晒单分享
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function () {

    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        jumpToLoginPage()
    }

    //根据订单传的orderId 查询商品信息
    var templet_orderId=getQueryString("orderId");
    //var templet_orderId=getQueryString("orderId");入口2需要传给我产品注册码
    var templet_productId=getQueryString("productId");
    if(templet_productId==null){
        window.location.href ='/order';
    }

    //如果订单获取为空，去查询注册产品
    if(templet_orderId==null){

    }else{
        $.ajax({
            type: "get",
            url: siteConfig.userUrl+"/buy/order/order-front/show/",
            data: {"orderId":templet_orderId},
            error : function(){
                window.location.href ='/order';
            },
            success: function(data){
                if(data.isSuccess){
                    var templet_productgoods=data.data.goods;
                    //如果没在订单里查到对应的产品，返回订单页面
                    var templet_validate=true;
                    for(var i=0;i<templet_productgoods.length;i++){
                        if(templet_productgoods[i].productId==templet_productId){
                            templet_validate=false;
                            $('.js-productName').html(templet_productgoods[i].goodsName+ '<br><span>'+templet_productgoods[i].outSkuCode+'</span>');
                            $('.js-productimg').attr('src',templet_productgoods[i].goodsPic);
                        }
                    }
                    if(templet_validate){
                        window.location.href ='/order';
                    }
                }
                else{

                }
            }
        });
    }

    //小星星点击事件
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
    });

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

    var templet_isSubmiting=false;
    $('.js-memberShareGetUp').unbind().click(function () {
        if(templet_isSubmiting){//正在提交
            globalShade2('正在提交','3');
            return;
        }
        //小星星数量
        var templet_star = $('.member-share-score-selected').length;
        if(templet_star==0){
            $('.js-star').removeClass('member-share-evaluate-right');
            return;
        }
        $('.js-star').addClass('member-share-evaluate-right');
        var templet_content=$('.js_EvaluateVal').val();
        if(templet_content==0){
            $('.js-content').removeClass('member-share-evaluate-right');
            return;
        }
        $('.js-content').addClass('member-share-evaluate-right');
        //移动端，网页端
        var templet_innerWidth=window.innerWidth;
        var templet_devSource=1;
        if(templet_innerWidth<750){
            templet_devSource=2;
        }
        templet_isSubmiting=true;
        var commentpics='';
        $(".js_sharephotobox").find('li:not(.empty)').each(function(){
            var imgurl=$(this).find("img").attr("src");
            if(imgurl!=""&&imgurl!=null&&imgurl!="null"){
                if(commentpics==""){
                    commentpics=imgurl;
                }else{
                    commentpics+=";"+imgurl;
                }
            }
        });
        commentpics=commentpics.replace(/\/tongshuaifile/g,"");

        var templet_isHavePic=0;
        if(commentpics!=''){
            templet_isHavePic=1;
        }

        if(templet_orderId!=null){
            var data={
                'pathsStr':commentpics,
                'star':templet_star,
                'content':templet_content,
                'isHavePic':templet_isHavePic,
                'devSource':templet_devSource,
                'businessId':templet_productId,
                'channelSource':'1',
                'productCategoryId':'61',
                'orderId':templet_orderId
            };
            $.ajax({
                contentType:"application/json",
                url: siteConfig.userUrl+"/interaction-comment/comment/myComment/myCommentOn/",
                data:  JSON.stringify(data),
                success_cb: function(returnData){
                    if(returnData.isSuccess){
                        $('.js_popUpBox3').show();

                        btnTimeOut($('.js_popUpTimeOver'),5,'');

                        setTimeout(function(){
                            window.location.href='/order';
                        },4000);
                    }
                    else{
                        $('.js-content').removeClass('member-share-evaluate-right').html(returnData);
                    }
                }
            });
        }else {
            //第二个入口调接口
        }
    });

//获取参数

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $('.js_share_getup_img').click(function(){

        var photoNub=$('.js_sharephotobox').children('li').length;
        if(photoNub>=10){
            globalShade2('最多可以上传10张图片',3,'2000');
            $('#js_shareimgUpload').hide();
            $('.js_share_getup_false').css('display','inline-block');
            return false;
        }
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
    $.jUploader({
        fileField: 'file',
        button: "js_shareimgUpload", // 这里设置按钮id
        action: siteConfig.domain+'/interaction-comment/comment/imageUpload/',//这里写地址
        // 开始上传事件
        onUpload: function(data) {
            share_getup_img=true;
        },
        // 上传完成事件
        onComplete: function(name, data) {
            share_getup_img=false;
            if (data.isSuccess) {
                templet_pic='/tongshuaifile'+$.trim(data.data);
                $('.js_sharephotobox').append('<li class="member-share-photo-cur"><img src='+templet_pic+' alt=""><a href="javascript:;" class="js_sharePhotoDelect member-share-photo-delect">x</a></li>');

                //上传成功后写入数量
                $('.js_sharephotoNub').html($('.js_sharephotobox').children('li').length);
                var photoNub=$('.js_sharephotobox').children('li').length;
                if(photoNub>=10) {
                    $('#js_shareimgUpload').hide();
                    $('.js_share_getup_false').css('display','inline-block');
                }else{
                    $('#js_shareimgUpload').show();
                    $('.js_share_getup_false').hide();
                }

            } else {
                globalShade2('图片上传失败','2');
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

// <li class="member-share-photo-cur"><img src="images/user_img.jpg" alt=""><a href="javascript:;" class="js_sharePhotoDelect member-share-photo-delect">x</a></li>
})
$('.js_share_getup_false').click(function(){
    globalShade2('最多可以上传10张图片', 3, '2000');
});
//        删除图片
$('.js_sharePhotoDelect').unbind().live('click',function(){

    $(this).siblings('img').attr('src',' ').parents('.member-share-photo-cur').remove();
    $('.js_sharephotoNub').html($('.js_sharephotobox').children('li').length);
    var photoNub=$('.js_sharephotobox').children('li').length;
    if(photoNub>=10) {
        $('#js_shareimgUpload').hide();
        $('.js_share_getup_false').css('display','inline-block');
    }else{
        $('#js_shareimgUpload').show();
        $('.js_share_getup_false').hide();
    }
    })
