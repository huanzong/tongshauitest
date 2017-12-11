/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单
* @author:      刘悦
* @date        2017.12.4
* ---------------------------------------------------------------------------*/
$(function(){
    var templat_pagesize='10';

    //绘制标题栏数字
    orderListCount('付款');
    orderListCount('收货');
    orderListCount('评价');

    //根据参数去相应的页面
    var templet_orderway=getQueryString("way");

    if('pay'==templet_orderway){
        searchStateList(1,10,'待付款');
        $('.js_orderList>li').eq(1).addClass('cur').siblings().removeClass('cur');
    }
    else if('received'==templet_orderway){
        searchStateList(1,10,'待收货');
        $('.js_orderList>li').eq(2).addClass('cur').siblings().removeClass('cur');
    }
    else if('comment'==templet_orderway){
        memberOrderNot();
        $('.js_orderList>li').eq(3).addClass('cur').siblings().removeClass('cur');
    }
    else{
        //全部订单第一页
        searchAllList(1,templat_pagesize);

    }

})

//分页初始化
function paginationInit(curPage,pageCount,pageSize,orderWay){
    var type;
    var pager=new pagination(".member-share-pagination-box");
    pager.currPage = curPage;
    pager.pageSize=pageSize;
    //重写click方法  ajax取数据
    pager.onclick = function(currPageT){
        var dataT = {
            type:type,
            pagesize:pageSize,
            curpage:currPageT
        }
        if(1==orderWay){
            searchAllList(currPageT, pageSize);
        }
        if(2==orderWay){
            searchStateList(currPageT, pageSize,'待付款')
        }
        if(3==orderWay){
            searchStateList(currPageT, pageSize,'待收货')
        }


        pager.totalPage =  pageCount;
        pager.currPage = currPageT;
        pager.pageCount = pageSize;
        pager.render();
    };
    pager.totalPage =  pageCount;
    pager.currPage = curPage;
    pager.pageCount = pageSize;
    pager.render();
}

//全部订单方法
function searchAllList(currPageT, pageSize){
    var templet_date={
        "pageNo": currPageT,
        "pageSize": pageSize,
        "asc": 2,
        "orderBy": 1,
    };

    $.ajax({
        url: siteConfig.userUrl + "/buy/order/order-front/list/",
        data: JSON.stringify(templet_date),
        applicationType: true,
        login: true,

        success_cb: function (data) {
            var templet_orderlist = data.data.entities;
            var allPageCount = data.data.pageCount;
            var currentPageNo = data.data.pageNo;
            var templet_addhtml = '';
            if(templet_orderlist.length==0){
                memberOrderNot('1');
                return;
            }
            $.ajax({
                url: siteConfig.userUrl + "/interaction-comment/comment/orderComment/getOrderCommentList/",
                type:"get",
                login: true,
                success_cb: function (successdata) {
                    for (var i = 0; i < templet_orderlist.length; i++) {

                        if(templet_orderlist[i].haveSub==0){
                            if (templet_orderlist[i].statusDesc.indexOf("待付款") > -1) {
                                templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_10-12 o_sm_7-12 o_xs_7-12"> ';
                                templet_addhtml += ' <h3>待付款</h3> ';
                            }
                            if (templet_orderlist[i].statusDesc.indexOf("待发货") > -1) {
                                templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_2-2"> ';
                                templet_addhtml += ' <h3>待发货</h3> ';
                            }
                            if (templet_orderlist[i].statusDesc.indexOf("待收货") > -1) {
                                templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_2-2"> ';
                                templet_addhtml += ' <h3>待收货</h3> ';
                            }
                            if (templet_orderlist[i].statusDesc.indexOf("已取消") > -1) {
                                templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_2-2"> ';
                                templet_addhtml += ' <h3 class="title_disable">已关闭</h3> ';
                            }
                            if (templet_orderlist[i].statusDesc.indexOf("已完成") > -1) {
                                templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_2-2"> ';

                            }
                            var templet_time = removeMsec(templet_orderlist[i].orderTime);
                            templet_addhtml += ' <div class="o_u"><p class="o_u o_md_2-2  o_sm_2-2 o_xs_2-2 order_cont_title_time"><span>' + templet_time + '</span></p>';
                            templet_addhtml += ' <p class="o_u o_md_1-2 o_sm_2-2 o_xs_2-2"><span>订单号：</span><i>' + templet_orderlist[i].orderNo + '</i></p> ';
                            templet_addhtml += ' <p class="o_u o_md_1-2  o_sm_2-2 o_xs_2-2"><span>订单总额：</span><i class="order_cont_title_price">￥' + templet_orderlist[i].orderPrice + '</i></p></div> ';
                            templet_addhtml += ' <a href="javascript:;">订单详情 <span class=" iconfont icon-arrow-line-right"></span></a> </div> ';

                            if (templet_orderlist[i].statusDesc.indexOf("待付款") > -1) {
                                templet_addhtml += ' <div class=" order_cont_title_btn o_u o_df_2-12 o_sm_5-12 o_xs_5-12"> ';
                                templet_addhtml += ' <a href="javascript:;" class="l-btn-sm l-btn-red">付款</a><br><a href="javascript:;" class="l-btn-sm l-btn-line2">取消</a></div> ';
                            }

                            templet_addhtml += ' </div> </div> ';

                            for (var j = 0; j < templet_orderlist[i].orderGoods.length; j++) {
                                var templet_ordergoods = templet_orderlist[i].orderGoods[j];
                                var templet_docpuburl = templet_ordergoods.proUrl;
                                var templet_docgoodsPic = templet_ordergoods.goodsPic;
                                var templet_picUrl=goodsPicCut(templet_docpuburl,templet_docgoodsPic);

                                if (templet_orderlist[i].statusDesc.indexOf("已完成") > -1) {
                                    templet_addhtml += ' <div class="o_u o_df_11-12 order_content3_box"  style="padding-top: 30px"> <div class="o_u o_df_2-12 order_content_img"> ';
                                    templet_addhtml += ' <img src="'+templet_picUrl+'" alt="" width="80px" height="80px;"></div> ';
                                    templet_addhtml += ' <div class="o_u o_df_5-12 o_xs_8-12 order_content_name"><h4>' + templet_ordergoods.goodsName + '</h4><span>' + templet_ordergoods.modelNo + '</span></div> ';
                                    templet_addhtml += ' <div class="o_u o_df_2-12 order_content_nub">x' + templet_ordergoods.buyNum + '</div> ';
                                    //循环所有的订单
                                    for(var k = 0; k < successdata.data.length; k++){
                                        //如果订单对应上，循环里面的商品，加状态
                                        if(templet_orderlist[i].orderId==successdata.data[k].orderId){
                                            for(var l = 0; l < successdata.data[k].goodsCommentVOList.length; l++){
                                                if(templet_ordergoods.modelNo==successdata.data[k].goodsCommentVOList[l].businessId){
                                                    templet_addhtml += '<div class="o_u o_df_3-12 o_sm_2-2 o_xs_2-2 order_content_btns"> <ul class="o_u o_df_2-2">';
                                                    if(successdata.data[k].goodsCommentVOList[l].commentStatus==0){
                                                        templet_addhtml += ' <li class="o_u o_df_2-2 o_sm_3-12 o_xs_3-12"> <a href="javascript:;"  class="sm-hide" >查看评价</a> <a href="javascript:;" class="l-btn-sm l-btn-line2 see-evaluate  o_u o_df_8-12 o_sm_11-12 o_xs_11-12" data-alt="1">查看评价</a> </li>';

                                                    }else{
                                                        templet_addhtml += '<li class="o_u o_df_2-2 o_sm_3-12 o_xs_3-12"><a href="javascript:;" class="l-btn-sm l-btn-orange  o_u o_df_8-12 o_sm_11-12 o_xs_11-12">评价</a> </li>';
                                                    }
                                                    templet_addhtml += '<li class="o_u o_df_4-2  sm-hide"> <a href="javascript:;" >查看物流</a></li>';
                                                    templet_addhtml += '<li class="o_u o_df_2-2 sm-hide "><a href="javascript:;">下载发票</a></li>';
                                                    templet_addhtml += ' <li class=" o_u o_df_2-2 o_sm_4-12 o_xs_4-12 "><a href="javascript:;" class="sm-hide">申请售后</a><a href="javascript:;" class="l-btn-sm l-btn-line2 o_u o_df_2-2 check_service">申请售后</a></li>';
                                                    templet_addhtml += '<li class="o_u o_df_2-2 o_sm_5-12 o_xs_3-12 order_list_more"   data-click=\'1\'><a href="javascript:;" class="js_orderListMove">更多<i class="iconfont icon-arrow-line-down"></i></a>';
                                                    templet_addhtml += '<div class="l-float-tops"><div class="float_content"> <a href="" class="o_u o_df_11-12">下载发票</a><a href="" class="o_u o_df_11-12">查看物流</a></div><p><i></i></p></div></li></ul></div>';
                                                }
                                            }
                                            break;
                                        }
                                    }

                                }else{
                                    templet_addhtml += ' <div class="o_u o_df_11-12 order_content_box"  style="padding-top: 30px"> <div class="o_u o_df_2-12 order_content_img"> ';
                                    templet_addhtml += ' <img src="'+templet_picUrl+'" alt="" width="80px" height="80px;"></div> ';
                                    templet_addhtml += ' <div class="o_u o_df_8-12 o_xs_10-12 order_content_name"><h4>' + templet_ordergoods.goodsName + '</h4><span>' + templet_ordergoods.modelNo + '</span></div> ';
                                    templet_addhtml += ' <div class="o_u o_df_2-12 order_content_nub">x' + templet_ordergoods.buyNum + '</div> ';
                                }

                                templet_addhtml += '';
                                templet_addhtml += '</div>';
                            }
                            templet_addhtml += ' </div> </div> ';

                        }else {
                            templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_2-2"> ';

                            var templet_time = removeMsec(templet_orderlist[i].orderTime);
                            templet_addhtml += ' <div class="o_u"><p class="o_u o_md_2-2  o_sm_2-2 o_xs_2-2 order_cont_title_time"><span>' + templet_time + '</span></p>';
                            templet_addhtml += ' <p class="o_u o_md_1-2 o_sm_2-2 o_xs_2-2"><span>订单号：</span><i>' + templet_orderlist[i].orderNo + '</i></p> ';
                            templet_addhtml += ' <p class="o_u o_md_1-2  o_sm_2-2 o_xs_2-2"><span>订单总额：</span><i class="order_cont_title_price">￥' + templet_orderlist[i].orderPrice + '</i></p></div> ';
                            templet_addhtml += ' <a href="javascript:;">订单详情 <span class=" iconfont icon-arrow-line-right"></span></a> </div> ';

                            templet_addhtml += ' </div> </div> ';
                            //循环拆单以及里面的商品（显示状态）
                            for(var j = 0; j < templet_orderlist[i].subOrders.length; j++){
                                templet_addhtml += ' <div class="o_u o_df_11-12 order_content_box">  ';
                                if(j==1){
                                    if('待发货'==templet_orderlist[i].subOrders[j].statusDesc){
                                        templet_addhtml +=' <div class="order-title-in-orange">  <h3 >待发货</h3> </div>';
                                    }
                                    if('待收货'==templet_orderlist[i].subOrders[j].statusDesc){
                                        templet_addhtml +=' <div class="order-title-in-orange">  <h3 >待收货</h3> </div>';
                                    }
                                }
                                else{
                                    templet_addhtml +=' <div class="order-title-in-orange title_hide"><h3>待收货</h3> </div>';
                                }

                                //循环订单里面的商品
                               for(var k = 0; k<templet_orderlist[i].subOrders[j].orderGoods.length ; k++){

                                   var templet_ordergoods = templet_orderlist[i].subOrders[j].orderGoods[k];
                                   var templet_docpuburl = templet_ordergoods.proUrl;
                                   var templet_docgoodsPic = templet_ordergoods.goodsPic;
                                   var templet_picUrl=goodsPicCut(templet_docpuburl,templet_docgoodsPic);

                                   if (templet_orderlist[i].subOrders[j].statusDesc.indexOf("已完成") > -1) {
                                       templet_addhtml += ' <div class="o_u o_df_11-12 order_content3_box"  style="padding-top: 30px"> <div class="o_u o_df_2-12 order_content_img"> ';
                                       templet_addhtml += ' <img src="'+templet_picUrl+'" alt="" width="80px" height="80px;"></div> ';
                                       templet_addhtml += ' <div class="o_u o_df_8-12 o_xs_10-12 order_content_name"><h4>' + templet_ordergoods.goodsName + '</h4><span>' + templet_ordergoods.modelNo + '</span></div> ';
                                       templet_addhtml += ' <div class="o_u o_df_2-12 order_content_nub">x' + templet_ordergoods.buyNum + '</div> ';
                                       //循环所有的订单
                                       for(var m = 0; m < successdata.data.length; m++){
                                           //如果订单对应上，循环里面的商品，加状态
                                           if(templet_orderlist[i].orderId==successdata.data[m].orderId){
                                               for(var l = 0; l < successdata.data[m].goodsCommentVOList.length; l++){
                                                   if(templet_ordergoods.modelNo==successdata.data[m].goodsCommentVOList[l].businessId){
                                                       templet_addhtml += '<div class="o_u o_df_3-12 o_sm_2-2 o_xs_2-2 order_content_btns"> <ul class="o_u o_df_2-2">';
                                                       if(successdata.data[m].goodsCommentVOList[l].commentStatus==0){
                                                           templet_addhtml += ' <li class="o_u o_df_2-2 o_sm_3-12 o_xs_3-12"> <a href="javascript:;"  class="sm-hide" >查看评价</a> <a href="javascript:;" class="l-btn-sm l-btn-line2 see-evaluate  o_u o_df_8-12 o_sm_11-12 o_xs_11-12" data-alt="1">查看评价</a> </li>';

                                                       }else{
                                                           templet_addhtml += '<li class="o_u o_df_2-2 o_sm_3-12 o_xs_3-12"><a href="javascript:;" class="l-btn-sm l-btn-orange  o_u o_df_8-12 o_sm_11-12 o_xs_11-12">评价</a> </li>';
                                                       }
                                                       templet_addhtml += '<li class="o_u o_df_4-2  sm-hide"> <a href="javascript:;" >查看物流</a></li>';
                                                       templet_addhtml += '<li class="o_u o_df_2-2 sm-hide "><a href="javascript:;">下载发票</a></li>';
                                                       templet_addhtml += ' <li class=" o_u o_df_2-2 o_sm_4-12 o_xs_4-12 "><a href="javascript:;" class="sm-hide">申请售后</a><a href="javascript:;" class="l-btn-sm l-btn-line2 o_u o_df_2-2 check_service">申请售后</a></li>';
                                                       templet_addhtml += '<li class="o_u o_df_2-2 o_sm_5-12 o_xs_3-12 order_list_more"   data-click=\'1\'><a href="javascript:;" class="js_orderListMove">更多<i class="iconfont icon-arrow-line-down"></i></a>';
                                                       templet_addhtml += '<div class="l-float-tops"><div class="float_content"> <a href="" class="o_u o_df_11-12">下载发票</a><a href="" class="o_u o_df_11-12">查看物流</a></div><p><i></i></p></div></li></ul></div>';
                                                   }
                                               }
                                               break;
                                           }
                                       }

                                   }else{
                                       templet_addhtml +='<div class="o_u o_df_2-12 order_content_img">'
                                       templet_addhtml += ' <img src="'+templet_picUrl+'" alt="" width="80px" height="80px;"></div> ';
                                       templet_addhtml += ' <div class="o_u o_df_8-12 o_xs_10-12 order_content_name"><h4>' + templet_orderlist[i].subOrders[j].orderGoods[k].goodsName + '</h4><span>' + templet_orderlist[i].subOrders[j].orderGoods[k].modelNo + '</span></div> ';
                                       templet_addhtml += ' <div class="o_u o_df_2-12 order_content_nub">x' + templet_orderlist[i].subOrders[j].orderGoods[k].buyNum + '</div> ';
                                   }
                                   templet_addhtml += '';
                                   templet_addhtml += '</div>';
                               }
                            }
                        }

                    }
                    templet_addhtml += '<div class=\'l-pagination-box member-share-pagination-box\'></div>';
                    $(".js-orderAllList").html(templet_addhtml);
                    //-------------------分页
                    paginationInit(currentPageNo, allPageCount, pageSize,1);
                    //分页结束
                }
            })
        }
    })
}

//待付款，待收货方法通用
function searchStateList(currPageT, pageSize,orderlist){
    var templet_orderStatus;
    if('待付款'==orderlist){
        templet_orderStatus=1;
    }
    if('待收货'==orderlist){
        templet_orderStatus=3;
    }
    var templet_date={
        "pageNo": currPageT,
        "pageSize": pageSize,
        "asc": 2,
        "orderBy": 1,
        "orderStatus":templet_orderStatus
    };

    $.ajax({
        url: siteConfig.userUrl + "/buy/order/order-front/list/",
        data: JSON.stringify(templet_date),
        applicationType: true,
        login: true,

        success_cb: function (data) {
            var templet_orderlist = data.data.entities;
            var allPageCount = data.data.pageCount;
            var currentPageNo = data.data.pageNo;
            var templet_addhtml = '';

            if('待付款'==orderlist){
                if(!data.data.entityCount==0){
                    $(".js-notPay").addClass('member-nub-round');
                    $(".js-notPay").html(data.data.entityCount);
                }else{
                    $(".js-notPay").removeClass('member-nub-round');
                    $(".js-notPay").html("");
                    memberOrderNot();
                    return;
                }
            }
            if('待收货'==orderlist){
                if(!data.data.entityCount==0){
                    $(".js-notReceived").addClass('member-nub-round');
                    $(".js-notReceived").html(data.data.entityCount);
                }else{
                    $(".js-notReceived").removeClass('member-nub-round');
                    $(".js-notReceived").html("");
                    memberOrderNot();
                    return;
                }
            }

            for (var i = 0; i < templet_orderlist.length; i++) {
                if('待付款'==orderlist){
                    templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_10-12 o_sm_7-12 o_xs_7-12"> ';
                    templet_addhtml += ' <h3>待付款</h3> ';
                }
                if('待收货'==orderlist){
                    templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_2-2"> ';
                    templet_addhtml += ' <h3>待收货</h3> ';
                }
                var templet_time = removeMsec(templet_orderlist[i].orderTime);
                templet_addhtml += ' <div class="o_u"><p class="o_u o_md_2-2  o_sm_2-2 o_xs_2-2 order_cont_title_time"><span>' + templet_time + '</span></p>';
                templet_addhtml += ' <p class="o_u o_md_1-2 o_sm_2-2 o_xs_2-2"><span>订单号：</span><i>' + templet_orderlist[i].orderNo + '</i></p> ';
                templet_addhtml += ' <p class="o_u o_md_1-2  o_sm_2-2 o_xs_2-2"><span>订单总额：</span><i class="order_cont_title_price">￥' + templet_orderlist[i].orderPrice + '</i></p></div> ';
                templet_addhtml += ' <a href="javascript:;">订单详情 <span class=" iconfont icon-arrow-line-right"></span></a> </div> ';

                if('待付款'==orderlist){
                    templet_addhtml += ' <div class=" order_cont_title_btn o_u o_df_2-12 o_sm_5-12 o_xs_5-12"> ';
                    templet_addhtml += ' <a href="javascript:;" class="l-btn-sm l-btn-red">付款</a><br><a href="javascript:;" class="l-btn-sm l-btn-line2">取消</a></div> ';
                }

                templet_addhtml += ' </div> </div> ';

                for (var j = 0; j < templet_orderlist[i].orderGoods.length; j++) {
                    var templet_ordergoods = templet_orderlist[i].orderGoods[j];
                    var templet_docpuburl = templet_ordergoods.proUrl;
                    var templet_docgoodsPic = templet_ordergoods.goodsPic;
                    var templet_picUrl=goodsPicCut(templet_docpuburl,templet_docgoodsPic);

                    templet_addhtml += ' <div class="o_u o_df_11-12 order_content_box" style="padding-top: 30px"> <div class="o_u o_df_2-12 order_content_img"> ';
                    templet_addhtml += ' <img src="../images/compare_goods.PNG" alt="" width="80px" height="80px;"></div> ';
                    templet_addhtml += ' <div class="o_u o_df_8-12 o_xs_10-12 order_content_name"><h4>' + templet_ordergoods.goodsName + '</h4><span>' + templet_ordergoods.modelNo + '</span></div> ';
                    templet_addhtml += ' <div class="o_u o_df_2-12 order_content_nub">x' + templet_ordergoods.buyNum + '</div></div> ';
                }
                templet_addhtml += ' </div> </div> ';
            }
            templet_addhtml += '<div class=\'l-pagination-box member-share-pagination-box\'></div>';
            $(".js-orderAllList").html(templet_addhtml);
            //-------------------分页
            if('待付款'==orderlist){
                paginationInit(currentPageNo, allPageCount, pageSize,2);
            }
            if('待收货'==orderlist){
                paginationInit(currentPageNo, allPageCount, pageSize,3);
            }
            //分页结束
        }
    })
}

//商品图片的链接拼接
function goodsPicCut(templet_docpuburl,templet_ordergoods){
    var templet_semicolon=templet_ordergoods.indexOf(";");
    if(templet_semicolon>-1){
        templet_ordergoods=templet_ordergoods.substring(0, templet_semicolon)
    }
    templet_semicolon=templet_ordergoods.indexOf('|');
    if(templet_semicolon>-1){
        templet_ordergoods=templet_ordergoods.substring(0, templet_semicolon)
    }

    var templet_location = templet_docpuburl.lastIndexOf("\/");
    var templet_picUrl = templet_docpuburl.substring(0, templet_location + 1) + templet_ordergoods;

    return templet_picUrl;
}

//点击选择 全部订单，代付款等等
$('.js_orderList>li').click(function(){
    $(this).addClass('cur').siblings().removeClass('cur');
    $(".js-orderAllList").html('');

    var index = $(".js_orderList>li").index(this);
    //全部
    if(0==index){
        searchAllList(1,10);
    }
    //待付款
    if(1==index){
        searchStateList(1,10,'待付款');
    }
    //待收货
    if(2==index){
        searchStateList(1,10,'待收货');
    }
    //待评论
    if(3==index){
        memberOrderNot();
    }

});

//时间格式
function removeMsec(time){
    var templet_timeIndex=time.lastIndexOf('.');
    var templet_time=time.substring(0, templet_timeIndex);
    return templet_time;

}

//无订单页面
function memberOrderNot(way){
    var templet_addhtml;
    if(way==1){
        templet_addhtml+='<div class="o_g prdouct-search-zanwu js_memberOrderNot" >';
        templet_addhtml+='<img src="../images/share_nothing.png"  alt="">';
        templet_addhtml+='<p>还没有任何订单，去寻找心仪的产品吧</p>';
        templet_addhtml+='<div> <a  href="http://test.tongshuai.com/cooling/"  class="">轻产品 <i class="iconfont icon-arrow-line-right"></i> </a></div></div>';
    }else{
        templet_addhtml+='<div class="o_g prdouct-search-zanwu js_memberOrderNot"  >';
        templet_addhtml+='<img src="../images/share_nothing.png"  alt="">';
        templet_addhtml+='<p>暂无订单记录</p> </div>';


    }
    $(".js-orderAllList").html(templet_addhtml);
    $('.js_memberOrderNot').show();

}

//绘制标题栏数字
function orderListCount(way){
    var templet_date;
    if('收货'==way){
        templet_date={
            "orderStatus":3
        };
    }
    if('付款'==way){
        templet_date={
            "orderStatus":1
        };
    }
    if('付款'==way || '收货'==way){
        $.ajax({
            url: siteConfig.userUrl + "/buy/order/order-front/list/",
            data: JSON.stringify(templet_date),
            applicationType: true,
            login: true,
            success_cb: function (data) {

                if('收货'==way){
                    if(!data.data.entityCount==0){
                        $(".js-notReceived").addClass('member-nub-round');
                        $(".js-notReceived").html(data.data.entityCount);
                    }else{
                        $(".js-notReceived").removeClass('member-nub-round');
                        $(".js-notReceived").html('');
                    }
                }
                if('付款'==way){
                    if(!data.data.entityCount==0){
                        $(".js-notPay").addClass('member-nub-round');
                        $(".js-notPay").html(data.data.entityCount);
                    }
                    else{
                        $(".js-notPay").removeClass('member-nub-round');
                        $(".js-notPay").html('');
                    }
                }
            }
        })
    }


    if('评价'==way){
        templet_date={
            "commentStatus":0,
            "pageNo":1,
            "pageSize":1
        };
        $.ajax({
            url: siteConfig.userUrl + "/interaction-comment/comment/orderComment/getOrderListByCommSta/",
            type:"get",
            data: templet_date,
            login: true,
            success_cb: function (data) {
                if(!data.data.entityCount==0){
                    if(!data.data.entityCount==0){
                        $(".js-evaluate").addClass('member-nub-round');
                        $(".js-evaluate").html(data.data.entityCount);
                    }else{
                        $(".js-evaluate").removeClass('member-nub-round');
                        $(".js-evaluate").html('');
                    }
                }
            }
        });
    }
}

//标题栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

