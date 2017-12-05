/**
 * Created by 15610 on 2017/10/18.
 */

$(function(){
    //限制自定义字符长度
    $('.js_EvaluateVal5').keydown(function(e){
        var textlength = $(this).val().length;
          if( textlength>= 5){
            if(e.keyCode!==8){
                event.returnValue = false;
                $('.js_EvaluateVal5').val($(this).val().substring(0,5));
            }
        }
    })
    $('.js_EvaluateVal5').blur(function(e){
        var textlength = $(this).val().length;
        if( textlength>= 5){
            $('.js_EvaluateVal5').val($(this).val().substring(0, 5));
        }
    })

    //function textLengthLimit(obj,nub,nubShow){
    //    obj.bind('input propertychange', function() {
    //        //进行相关操作
    //        var textLength = obj.val().length;
    //        if(textLength >= nub){
    //            event.returnValue = false;
    //            $('.js_EvaluateVal').val($(this).val().substring(0,nub));
    //            nubShow.html(textLength);
    //        }else{
    //            $('.js_EvaluateVal').val($(this).val().substring(0,nub));
    //            nubShow.html(textLength);
    //        }
    //    });
    //}
    //textLengthLimit($('.js_EvaluateVal'),500,$('.js_EvaluateValLength'));
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


//    自定义按钮显示开关

    $('.js_commentImpressAddShow').click(function(){
        var nowType = $(this).hasClass('addselect');
        //console.log(nowType);
        if(nowType){
            $('.js_commentImpressAddBox').hide();
            $(this).removeClass('addselect');
        }else{
            $('.js_commentImpressAddBox').show();
            $(this).addClass('addselect');

        }

    })
    $('.js_commentImpressAddClose').click(function(){
        $('.js_commentImpressAddBox').hide();
        $('.js_commentImpressAddShow ').removeClass('addselect');
    })
//    整体评价选中控制
    $('.js_commentImpressBtns>a').click(function(){
        var selectLengt = $('.js_commentImpressBtns').children('.select').length;
        if(selectLengt>=5){
            if($(this).hasClass('select')){
                $(this).removeClass('select')
            }else{
                console.log(1231321);
            }
        }else{
            $(this).addClass('select');
        }
    })

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


})

    //添加自定义标签
    $('.js_commentImpressAddBtn').click(function(){
        var btnCont  =  $('.js_EvaluateVal5').val();
        var selectLengt = $('.js_commentImpressBtns').children('.select').length;
        if(btnCont=='最大长度5'){
            // alert(1);
            //TODO 添加内容不能为空的弹窗
            globalShade2('内容不能为空',2,2000);
        }else{
            if(btnCont>5){
            globalShade2('字符长度错误',2,2000);
                
            }else{

                if(selectLengt>5){
                    var newBtn = '<a href="javascript:;" class="l-btn-sm l-btn-line2">'+btnCont+'</a>';
                    $('.js_commentImpressAddShow').before(newBtn);
                }else{
                    var newBtnSelect = '<a href="javascript:;" class="l-btn-sm l-btn-line2 select">'+btnCont+'</a>';
                    $('.js_commentImpressAddShow').before(newBtnSelect);
                }
            }
        }


    })