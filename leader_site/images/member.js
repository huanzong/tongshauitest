$(function() {
    var navMinHeight = document.body.offsetHeight;
    //var navMinHeight = $('.js-contRightContBox').height();
    var windowHeight = $(window).height();
    var navListHeight = $('.js-submenucount').height();
    var screenWidth = document.body.offsetWidth;
    init();
    $(window).resize(function() {
        screenWidth = document.body.offsetWidth;
        //console.log('www',screenWidth);
        init();
        var btnData = $('.js-submenubtn').attr('data-alt');
        if (screenWidth < 576) {
            $('.js-openbtn').hide();
            if(btnData==1){
                $('.js-closebtn').hide();
                $('.js-xsopenbtn').css('display','inline-block');
                $('.js-submenucount').css('left','48px');
            }else{
                $('.js-submenubtn').show();
                $('.js-closebtn').css('display','inline-block');
                $('.js-submenucount').css('left','-132px');
                $('.js-xsopenbtn').hide();
            }
            $('.js-submenu').css({'right': '0px'});
        }else if(screenWidth <= 991 && screenWidth >= 576){
            $('.js-xsopenbtn').hide();
            if(btnData==1){
                $('.js-submenu').css({'right': '-40px'});
                $('.js-openbtn').show();
                $('.js-closebtn').hide();

            }else{
                $('.js-submenu').css({'right': '-280px'});
                $('.js-openbtn').css('display','none');
                $('.js-closebtn').css('display','inline-block');
            }
        }
    });


    var sxMenuHeight = $('.o_body').height();
        $('.js-submenubtn').click(function() {
            //console.log(screenWidth, 1111);
            var btnData = $(this).attr('data-alt');
            if (screenWidth <= 991 && screenWidth >= 576) {
                if (btnData == 1) {
                    $(this).attr('data-alt', '2');
                    $('.js-submenu').animate({'right': '-280px'}, 300);
                    $('.js-openbtn').css('display', 'none');
                    $('.js-closebtn').css('display', 'block');
                    $('.js-menushade').css('display', 'block');
                } else {
                    $(this).attr('data-alt', '1');
                    $('.js-submenu').animate({'right': '-40px'}, 300);
                    $('.js-openbtn').css('display', 'inline-block');
                    $('.js-closebtn').css('display', 'none');
                    $('.js-menushade').css('display', 'none');
                }
            } else if (screenWidth < 576) {

                if (btnData == 1) {
                    $(this).attr('data-alt', '2');
                    $('.js-submenucount').animate({'left': '-132px'}, 300);
                    $('.js-xsopenbtn').css('display', 'none');
                    $('.js-closebtn').css('display', 'block');
                    $('.js-menushade').css('display', 'block');
                    return false;
                } else {
                    $(this).attr('data-alt', '1');
                    $('.js-submenucount').animate({'left': '48px'}, 300);
                    $('.js-xsopenbtn').css('display', 'inline-block');
                    $('.js-closebtn').css('display', 'none');
                    $('.js-menushade').css('display', 'none');
                    return false;
                }
            }
        });


    function init(){
        var contRightHeight = $('.js-securityheight').height();
        var navListHeight = $('.js-submenucount').height();
        var contHeight = contRightHeight>navListHeight?contRightHeight+70:navListHeight+70;
        var windowWidth = $(window).width();


        $('.js-personal').height(contHeight);
        $('.js-submenu').height(contHeight);
        $('.js-submenubtn').height(contHeight);
        $('.js-membercontbox').height(contHeight);
        //console.log(contHeight);
        if(windowWidth<576){
            $('.js-personal').height('auto');
            $('.js-submenubtn').height('auto');
            $('.js-submenu').height('auto');
            $('.js-membercontbox').height(contRightHeight+100);
        }

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
    //function init() {
    //    var subMenuHeight = $('.js-contRightContBox').height();
    //    var contHeight =  $('.js-contRightContBox').height();
    //    if(contHeight > navMinHeight){
    //
    //        if(screenWidth>= 576){
    //
    //            $('.js-nav').css('height',contHeight+100);
    //            //$('.js-membercontbox').css('height',contHeight+100);
    //            $('.js-submenu').css('height',contHeight+100);
    //
    //            $('.js-submenucount').css('height',contHeight+100);
    //            $('.js-submenubtn').css('height',contHeight+100);
    //        }
    //
    //    }
    //
    //
    //
    //    if(screenWidth>= 1200){
    //        //$('.js-nav').css('height',navMinHeight+100);
    //        $('.js-nav').css('height',contHeight+100);
    //        //$('.js-membercontbox').css('height',contHeight+100);
    //        $('.js-submenu').css('height',contHeight+100);
    //
    //
    //        if(subMenuHeight>navMinHeight){
    //            $('.js-personal').css('height',subMenuHeight+100);
    //
    //
    //        }else{
    //            //$('.js-personal').css('height',navMinHeight+100);
    //            //
    //            ////alert(55)
    //            //$('.js-nav').css('height',navMinHeight+100);
    //            //
    //            //$('.js-submenu').css('height',navMinHeight+100);
    //            $('.js-nav').css('height',navMinHeight+100);
    //            //$('.js-membercontbox').css('height',contHeight+100);
    //            $('.js-submenu').css('height',navMinHeight+100);
    //            $('.js-submenucount').css('height',navMinHeight+100);
    //            $('.js-submenubtn').css('height',navMinHeight+100)
    //        }
    //
    //
    //    }else if(screenWidth>= 992 && screenWidth<= 1199){
    //        if(subMenuHeight>navMinHeight){
    //            $('.js-nav').css('height',subMenuHeight+100);
    //            $('.js-personal').css('height',subMenuHeight+100);
    //        }else{
    //            $('.js-nav').css('height',navMinHeight+100);
    //            $('.js-personal').css('height',navMinHeight+100);
    //        }
    //        $('.js-nav').css('height',contHeight+100);
    //        //$('.js-membercontbox').css('height',contHeight+100);
    //        $('.js-submenu').css('height',contHeight+100);
    //
    //        $('.js-submenucount').css('height',contHeight+100);
    //        $('.js-submenubtn').css('height',contHeight+100);
    //
    //    }else if(screenWidth>= 701 && screenWidth<= 991){
    //        if(subMenuHeight>navMinHeight){
    //            $('.js-nav').css('height',subMenuHeight+100);
    //            $('.js-personal').css('height',subMenuHeight+100);
    //            $('.js-submenubtn').css('height',subMenuHeight+100);
    //        }else{
    //            $('.js-nav').css('height',navMinHeight+100);
    //            $('.js-personal').css('height',navMinHeight+100);
    //            $('.js-submenubtn').css('height',navMinHeight+100);
    //        }
    //        $('.js-nav').css('height',contHeight+100);
    //        //$('.js-membercontbox').css('height',contHeight+100);
    //        $('.js-submenu').css('height',contHeight+100);
    //
    //        $('.js-submenucount').css('height',contHeight+100);
    //        $('.js-submenubtn').css('height',contHeight+100);
    //
    //    }else if(screenWidth>= 576 && screenWidth<= 700){
    //        if(subMenuHeight>navMinHeight){
    //            $('.js-nav').css('height',subMenuHeight+52);
    //            $('.js-personal').css('height',subMenuHeight+52);
    //            $('.js-submenubtn').css('height',subMenuHeight+52);
    //        }else{
    //            $('.js-nav').css('height',navMinHeight+100);
    //            $('.js-personal').css('height',navMinHeight+100);
    //            $('.js-submenubtn').css('height',navMinHeight+100);
    //
    //        }
    //        $('.js-nav').css('height',contHeight+52);
    //        //$('.js-membercontbox').css('height',contHeight+100);
    //        $('.js-submenu').css('height',contHeight+52);
    //
    //        $('.js-submenucount').css('height',contHeight+52);
    //        $('.js-submenubtn').css('height',contHeight+52);
    //
    //    }else if(screenWidth<= 575){
    //        //$('.js-submenucount').css('height',sxMenuHeight-60);
    //        $('.js-submenucount').css('height',contHeight+52);
    //        $('.js-submenubtn').css('height',contHeight+52);
    //    }



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



    //}


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

    $('.js_EvaluateVal').bind('input propertychange', function() {
        textLength = $(this).val().length;
        if(textLength>500){
            $('.js_EvaluateValLength').html(textLength);
            alert('字数不能大于500！');
        }else{
            $('.js_EvaluateValLength').html(textLength);

        }

    });
//        删除图片
    $('.js_sharePhotoDelect').click(function(){
        $(this).siblings('img').attr('src',' ').parents('.member-share-photo-cur').remove();
        $.ajax({

        })
    })

});
