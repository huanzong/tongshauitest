/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单
* @author:      刘悦
* @date        2017.12.4
* ---------------------------------------------------------------------------*/
$(function(){
    var templat_pagesize='10';

    //全部订单第一页
    search(1,templat_pagesize);
})

function paginationInit(curPage,pageCount,pageSize){
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
        search(currPageT, pageSize);
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

function search(currPageT, pageSize){
    var templet_date={
        "pageNo": currPageT,
        "pageSize": pageSize
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
            for (var i = 0; i < templet_orderlist.length; i++) {
                templet_addhtml += ' <div class="member_contborder_box  o_u  o_df_11-12"><div class="o_g"> <div class="  order_cont_title_box"><div class="o_u o_df_11-12"> <div class=" order_cont_title o_u o_df_9-12 o_sm_7-12 o_xs_7-12"> ';
                if (templet_orderlist[i].statusDesc.indexOf("待付款") > -1) {
                    templet_addhtml += ' <h3>待付款</h3> ';
                }
                if (templet_orderlist[i].statusDesc.indexOf("待发货") > -1) {
                    templet_addhtml += ' <h3>待发货</h3> ';
                }
                if (templet_orderlist[i].statusDesc.indexOf("已关闭") > -1) {
                    templet_addhtml += ' <h3>已关闭</h3> ';
                }
                templet_addhtml += ' <div class="o_u"><p class="o_u o_md_2-2  o_sm_2-2 o_xs_2-2 order_cont_title_time"><span>' + templet_orderlist[i].orderTime + '</span></p>';
                templet_addhtml += ' <p class="o_u o_md_1-2 o_sm_2-2 o_xs_2-2"><span>订单号：</span><i>' + templet_orderlist[i].orderNo + '</i></p> ';
                templet_addhtml += ' <p class="o_u o_md_1-2  o_sm_2-2 o_xs_2-2"><span>订单总额：</span><i class="order_cont_title_price">￥' + templet_orderlist[i].orderPrice + '</i></p></div> ';
                templet_addhtml += ' <a href="javascript:;">订单详情 <span class=" iconfont icon-arrow-line-right"></span></a> </div> ';

                if (templet_orderlist[i].statusDesc.indexOf("支付") > -1) {
                    templet_addhtml += ' <div class=" order_cont_title_btn o_u o_df_3-12 o_sm_5-12 o_xs_5-12"> ';
                    templet_addhtml += ' <a href="javascript:;" class="l-btn-sm l-btn-red">付款</a><br><a href="javascript:;" class="l-btn-sm l-btn-line2">取消</a></div> ';
                }

                templet_addhtml += ' </div> </div> ';

                for (var j = 0; j < templet_orderlist[i].orderGoods.length; j++) {
                    var templet_ordergoods = templet_orderlist[i].orderGoods[j];
                    var templet_docpuburl = templet_ordergoods.proUrl;
                    var templet_picUrl=goodsPicCut(templet_docpuburl,templet_ordergoods);

                    templet_addhtml += ' <div class="o_u o_df_11-12 order_content_box" > <div class="o_u o_df_2-12 order_content_img"> ';
                    templet_addhtml += ' <img src="' + templet_picUrl + '" alt="" width="80px" height="80px;"></div> ';
                    templet_addhtml += ' <div class="o_u o_df_8-12 o_xs_10-12 order_content_name"><h4>' + templet_ordergoods.goodsName + '</h4><span>' + templet_ordergoods.modelNo + '</span></div> ';
                    templet_addhtml += ' <div class="o_u o_df_2-12 order_content_nub">x' + templet_ordergoods.buyNum + '</div></div> ';
                }
                templet_addhtml += ' </div> </div> ';
            }
            templet_addhtml += '<div class=\'l-pagination-box member-share-pagination-box\'></div>';
            $(".js-orderAllList").html(templet_addhtml);
            //-------------------分页
            paginationInit(currentPageNo, allPageCount, pageSize);
            //分页结束
        }
    })
}

function goodsPicCut(templet_docpuburl,templet_ordergoods){
    var templet_semicolon=templet_ordergoods.indexOf(';');
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