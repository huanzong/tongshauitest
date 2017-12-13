/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-订单详情
* @author:      刘悦
* @date        2017.12.11
* ---------------------------------------------------------------------------*/

$(function() {
    var templet_orderId=getQueryString("orderId");
    if(templet_orderId==null){
        window.location.href ='/order';
    }
    var templet_date = {
        "orderId": templet_orderId
    };
    $.ajax({
        url: siteConfig.userUrl + "/buy/order/order-front/show/",
        data: templet_date,
        login: true,
        success_cb: function (data) {
            var templet_data=data.data;
            $('.orderNo').html(templet_data.orderNo);

            if(templet_data.orderStatus==1){
                $(".js-pay a").show();
            }else{
                $(".js-pay a").hide();
            }

            var templet_addhtml="";

           if(templet_data.haveSub==0 || templet_data.haveSub==null || templet_data.haveSub=='null'){
               for(var i=0;i<templet_data.orderGoods.length;i++){
                   var templet_goods=templet_data.orderGoods[i];
                   templet_addhtml+='<div class="o_u o_df_11-12 order_content3_box"><div class="o_u o_df_2-12 order_content_img">';

                   var templet_docpuburl = templet_goods.proUrl;
                   var templet_docgoodsPic = templet_goods.goodsPic;
                   var templet_picUrl=goodsPicCut(templet_docpuburl,templet_docgoodsPic);

                   templet_addhtml+=' <img src="'+templet_picUrl+'" alt=""  ></div><div class="o_u o_df_6-12 o_sm_8-12 o_xs_2-2 order_content_name">';
                   templet_addhtml+='<h4>'+templet_goods.goodsName+'</h4><span>'+templet_goods.modelNo+'</span> </div>';
                   templet_addhtml+=' <div class="o_u o_df_2-12 o_md_4-12  o_sm_2-12 o_xs_2-2 order_content_price">&yen;'+templet_goods.payPrice+'<span>x'+templet_goods.buyNum +'</span></div>';
                   templet_addhtml+='<div class="o_u o_df_2-12 o_sm_2-2 o_xs_2-2 order_content_nub ">x'+templet_goods.buyNum +'</div></div>';
                   templet_addhtml+='<div class="datail_product_state_box">';
                   templet_addhtml+='<ul class="o_u o_df_11-12 datail_product_state">';

                   if(templet_data.orderStatus==1){
                       var templet_time = removeMsec(templet_data.orderTime);
                       templet_addhtml+='<li class="o_u cur" ><div class="cur_border"></div>提交订单<p>'+templet_time+'</p></li>';
                       templet_addhtml+='<li class="o_u"><div class="cur_border"></div>已付款<p></p></li>';
                       templet_addhtml+='<li class="o_u"><div class="cur_border"></div>订单确认<p></p></li>';
                   }
                   if(templet_data.orderStatus==2){
                       var templet_time = removeMsec(templet_data.payTime);
                       templet_addhtml+='<li class="o_u cur_after" ><div class="cur_border"></div>提交订单<p></p></li>';
                       templet_addhtml+='<li class="o_u cur"><div class="cur_border"></div>已付款<p>'+templet_time+'</p></li>';
                       templet_addhtml+='<li class="o_u"><div class="cur_border"></div>订单确认<p></p></li>';
                   }
                   if(templet_data.orderStatus==3){
                       var templet_time = removeMsec(templet_data.omsInsertDate);
                       templet_addhtml+='<li class="o_u cur_after" ><div class="cur_border"></div>提交订单<p></p></li>';
                       templet_addhtml+='<li class="o_u cur_after"><div class="cur_border"></div>已付款<p></p></li>';
                       templet_addhtml+='<li class="o_u cur"><div class="cur_border"></div>订单确认<p>'+templet_time+'</p></li>';
                   }
                   if(templet_data.orderStatus==-1){
                       templet_addhtml+='<li class="o_u " ><div class="cur_border"></div>提交订单<p></p></li>';
                       templet_addhtml+='<li class="o_u"><div class="cur_border"></div>已付款<p></p></li>';
                       templet_addhtml+='<li class="o_u"><div class="cur_border"></div>订单确认<p></p></li>';
                   }
                   templet_addhtml+='<li class="o_u"><div class="cur_border"></div>商品出库<p></p></li>';
                   templet_addhtml+='<li class="o_u"><div class="cur_border"></div>完成<p></p></li></ul>';
                   templet_addhtml+='<div class="datail_product_state_scroll"></div> </div>';
                   $('.js-goods').html(templet_addhtml);
               }
           }else{
               //评价方法
               $.ajax({
                   url: siteConfig.userUrl + "/interaction-comment/comment/orderComment/getOrderCommentList/",
                   type: "get",
                   login: true,
                   success_cb: function (successdata) {
                       //循环子订单
                       for(var i=0;i<templet_data.subOrders.length;i++){
                           var templet_subOrder=templet_data.subOrders[i];

                           //循环子订单里面的商品
                           for(var j=0;j<templet_subOrder.orderGoods.length;j++){
                               var templet_subGoods=templet_subOrder.orderGoods[j];
                               templet_addhtml+='<div class="o_u o_df_11-12 order_content3_box"><div class="o_u o_df_2-12 order_content_img">';
                               var templet_docpuburl = templet_subGoods.proUrl;
                               var templet_docgoodsPic = templet_subGoods.goodsPic;
                               var templet_picUrl=goodsPicCut(templet_docpuburl,templet_docgoodsPic);

                               templet_addhtml+=' <img src="'+templet_picUrl+'" alt=""  ></div><div class="o_u o_df_6-12 o_sm_8-12 o_xs_2-2 order_content_name">';
                               templet_addhtml+='<h4>'+templet_subGoods.goodsName+'</h4><span>'+templet_subGoods.modelNo+'</span> </div>';
                               templet_addhtml+=' <div class="o_u o_df_2-12 o_md_4-12  o_sm_2-12 o_xs_2-2 order_content_price">&yen;'+templet_subGoods.payPrice+'<span>x'+templet_subGoods.buyNum +'</span></div>';
                               templet_addhtml+='<div class="o_u o_df_2-12 o_sm_2-2 o_xs_2-2 order_content_nub ">x'+templet_subGoods.buyNum +'</div></div>';
                               templet_addhtml+='<div class="datail_product_state_box">';
                               templet_addhtml+='<ul class="o_u o_df_11-12 datail_product_state">';

                               templet_addhtml+='<li class="o_u cur_after" ><div class="cur_border"></div>提交订单<p></p></li>';
                               templet_addhtml+='<li class="o_u cur_after"><div class="cur_border"></div>已付款<p></p></li>';
                               templet_addhtml+='<li class="o_u cur_after"><div class="cur_border"></div>订单确认<p></p></li>';
                               if(templet_subOrder.statusDesc=='待收货'){
                                   var templet_time = removeMsec(templet_subOrder.shipTime);
                                   templet_addhtml+='<li class="o_u cur"><div class="cur_border"></div>商品出库<p>'+templet_time+'</p></li>';
                                   templet_addhtml+='<li class="o_u"><div class="cur_border"></div>完成<p></p></li></ul>';
                               }
                               if(templet_subOrder.statusDesc=='已完成'){
                                    //循环所有已完成的订单判断评价状态
                                   for(var k = 0; k < successdata.data.length; k++){
                                       //如果两个订单号相同，比对商品，添加商品的状态
                                        if(successdata.data[k].orderId==templet_data.orderId){
                                            //循环已完成订单的商品，比对当前商品
                                            for(var f = 0; f < successdata.data[k].goodsCommentVOList.length; f++){
                                                var templet_goodsCommentVOList=successdata.data[k].goodsCommentVOList[f];
                                                if(templet_goodsCommentVOList.businessId==templet_subOrder.modelNo){
                                                    var templet_time = removeMsec(templet_subOrder.finishTime);
                                                    if(templet_goodsCommentVOList.commentStatus==0){
                                                        templet_addhtml+='<li class="o_u cur"><div class="cur_border"></div>商品出库<p>'+templet_time+'</p></li>';
                                                        templet_addhtml+='<li class="o_u"><div class="cur_border"></div>完成<p></p></li></ul>';
                                                    }else{
                                                        templet_addhtml+='<li class="o_u cur_after"><div class="cur_border"></div>商品出库<p></p></li>';
                                                        templet_addhtml+='<li class="o_u cur"><div class="cur_border"></div>完成<p>'+templet_time+'</p></li></ul>';
                                                    }
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                   }
                               }
                               templet_addhtml+='<div class="datail_product_state_scroll"></div> </div>';
                           }
                       }
                       $('.js-goods').html(templet_addhtml);
                   }
               });
           }



            $('.js-recipientsName').html(templet_data.recipientsName);
            var templet_callphone = templet_data.recipientsPhone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
            $('.js-recipientsPhone').html(templet_callphone);

            //不是待付款状态则显示
            if(!templet_data.orderStatus==1){
                $('.js-payTime').html(templet_data.payTime);
                $('.js-payType').html('支付宝支付');
                if(templet_data.invoiceType==2 ){
                    $('.js-invoiceType').html("公司普通发票 ");
                }
                if(templet_data.invoiceType==1 ){
                    $('.js-invoiceType').html("个人普通发票 ");
                }
                $('.js-invoiceTitle ').html(templet_data.invoiceTitle );

            }

            $('.js-address').html(templet_data.recipientsProvince+templet_data.recipientsCity+templet_data.recipientsArea+templet_data.recipientsAddr);

            $('.js-price').html("￥"+templet_data.orderPrice );

        }, error_cb:function(){
            window.location.href ='/order';
        }
    })
})

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

//时间格式
function removeMsec(time){
    if(time==null || time=='null' || time==''){
        return '';
    }

    var templet_timeIndex=time.lastIndexOf('.');
    if(templet_timeIndex>-1){
        var templet_time=time.substring(0, templet_timeIndex);
        return templet_time;
    }else {
        return time;
    }
}

//标题栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}