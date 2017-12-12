/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-订单详情
* @author:      刘悦
* @date        2017.12.11
* ---------------------------------------------------------------------------*/

$(function() {
    var templet_date = {
        "orderId": 12
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

            for(var i=0;i<templet_data.goods.length;i++){
                var templet_goods=templet_data.goods[i];
                templet_addhtml+='<div class="o_u o_df_11-12 order_content3_box"><div class="o_u o_df_2-12 order_content_img">';

                var templet_docpuburl = templet_goods.proUrl;
                var templet_docgoodsPic = templet_goods.goodsPic;
                var templet_picUrl=goodsPicCut(templet_docpuburl,templet_docgoodsPic);

                templet_addhtml+=' <img src="'+templet_picUrl+'" alt=""  ></div><div class="o_u o_df_6-12 o_sm_8-12 o_xs_2-2 order_content_name">';
                templet_addhtml+='<h4>'+templet_goods.goodsName+'</h4><span>'+templet_goods.modelNo+'</span> </div>';
                templet_addhtml+=' <div class="o_u o_df_2-12 o_md_4-12  o_sm_2-12 o_xs_2-2 order_content_price">&yen;'+templet_goods.costPrice+'<span>x'+templet_goods.buyNum +'</span></div>';
                templet_addhtml+='<div class="o_u o_df_2-12 o_sm_2-2 o_xs_2-2 order_content_nub ">x'+templet_goods.buyNum +'</div></div>';
                templet_addhtml+='<div class="datail_product_state_box">';
                templet_addhtml+='<ul class="o_u o_df_11-12 datail_product_state">';
                templet_addhtml+='<li class="o_u cur_after"><div class="cur_border"></div>提交订单<p>2017-06-14 08:23:42</p></li>';
                templet_addhtml+='<li class="o_u cur"><div class="cur_border"></div>等待付款<p>2017-06-14 08:23:42</p></li>';
                templet_addhtml+='<li class="o_u"><div class="cur_border"></div>订单确认<p>2017-06-14 08:23:42</p></li>';
                templet_addhtml+='<li class="o_u"><div class="cur_border"></div>商品出库<p>2017-06-14 08:23:42</p></li>';
                templet_addhtml+=' <li class="o_u"><div class="cur_border"></div>送货到家<p>2017-06-14 08:23:42</p></li>';
                templet_addhtml+='<li class="o_u"><div class="cur_border"></div>完成<p>2017-06-14 08:23:42</p></li></ul>';
                templet_addhtml+='<div class="datail_product_state_scroll"></div> </div>';


            }
            $('.js-goods').html(templet_addhtml);

            $('.js-recipientsName').html(templet_data.recipientsName);
            var templet_callphone = templet_data.recipientsPhone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
            $('.js-recipientsPhone').html(templet_callphone);
            $('.js-payTime').html(templet_data.payTime);


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