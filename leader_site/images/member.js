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
        $('.js_memberHomeTile').width(contRightWidth);



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



//下拉菜单初始化

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

    //修改手机页面三种状态
    //$('.js-memberRevRateLine').css('width','0%');
    //$('.js-memberRevRateLine').css('width','50%');
    //$('.js-memberRevRateLine').css('width','100%');

//地址管理初始化
    var addressMobile=$(".js-addressMobile").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });
    var addressUserName=$(".js-addressUserName").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        ajaxPost:true

    });

});
