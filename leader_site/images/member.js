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
        var contRightWidth = ($(window).width())-$('.js-personal').width();
        if(contRightWidth){
            $('.js_memberHomeTile').width(contRightWidth);
        }else{
            $('.js_memberHomeTile').width('100%');
        }


        $('.js-personal').height(contHeight);
        $('.js-submenu').height(contHeight);
        $('.js-submenubtn').height(contHeight);
        //$('.js-membercontbox').height(contHeight);
        $('.js-membercontbox').css('min-height',contHeight);
        //console.log(contHeight);
        if(windowWidth<576){
            $('.js-personal').height('auto');
            $('.js-submenubtn').height('auto');
            $('.js-submenu').height('auto');
            //$('.js-membercontbox').height(contRightHeight+100);
            $('.js-membercontbox').css('min-height',contRightHeight+100);
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



    //修改手机页面三种状态


    ////第二种
    //$('.js-memberRevRateLine').css('width','75%');
    //$('.js-memberRevRateTree').addClass('member-revisemob-No2').children('.member-revisemob-line-point02').children('div').addClass('.member-revisemob-line-finishpoint');
    //$('.js-memberRevRateTree').children('.member-revisemob-line-point03').children('div').addClass('.member-revisemob-line-finishpoint');
    ////第三种
    //$('.js-memberRevRateLine').css('width','100%');
    //$('.js-memberRevRateTree').addClass('member-revisemob-No3').children('.member-revisemob-line-point03').children('div').addClass('.member-revisemob-line-finishpoint');
    //





});
