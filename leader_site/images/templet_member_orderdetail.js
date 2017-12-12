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

            if(templet_data.statusDesc=='待付款'){
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
                templet_addhtml+=' <div class="o_u o_df_2-12 o_md_4-12  o_sm_2-12 o_xs_2-2 order_content_price">&yen;1799<span>x1</span></div>';
                templet_addhtml+='';
                templet_addhtml+='';
                templet_addhtml+='';

            }
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