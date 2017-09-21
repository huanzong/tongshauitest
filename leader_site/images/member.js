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

});

