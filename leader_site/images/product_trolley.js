$(function() {

    var swiper = {
    }; //用来存放所有轮播

    /**
     * 服务请求
     **/
    var trolleyServer = {
        delete:function(data){
            $.ajax({
                url: siteConfig.apiUrl+"/order/cartGoods/delete/",
                data: data,
                // applicationType:true,
                success_cb: function(data){
                    console.log(data);
                },
                error_cb: function(jqXHR, textStatus, errorThrown) {
                    if(jqXHR.status==401){
                        console.log('用户未登录');
                    }
                }
            })
        },
        list:function(data){
            $.ajax({
                url: siteConfig.apiUrl+"/order/cartGoods/list/",
                applicationType:true,
                data: JSON.stringify(trolleyData),
                success_cb: function(data){
                     var data = {
                          "data": [{
                                "productShowVO": {
                                    "brandId": 1,
                                    "createBy": "zhangjing",
                                    "createDate": "2017-11-02",
                                    "goodsName": "海尔大富豪冷冻冷藏转换柜",
                                    "goodsPic": "images/compare_goods.PNG",
                                    "id": 9523339,
                                    "modelNo": 'BCD-LALAL',
                                    "operateBy": "zhangjing",
                                    "operateDate": "2017-11-07",
                                    "orderMgr": "",
                                    "proUrl": "",
                                    "productId": "555",
                                    "propertyJson": "[{\"outSkuCode\":0,\"available\":0,\"costPrice\":0,\"salePrice\":0,\"skuPicUrl\":\"\",\"property\":\"单规格该字段忽略\",\"inSkuCode\":\"555000\",\"siteId\":5,\"productId\":555,\"skuStockMgr\":\"\",\"freeze\":0,\"sale\":0,\"createBy\":\"zhangjing\",\"operateBy\":\"zhangjing\"}]",
                                    "riseFlag": 0,
                                    "skuStockMgr": "",
                                    "supplierId": "",
                                    "supplierName": "",
                                    "supplierVcode": ""
                                },
                                "skuShowVO": {
                                    "available": 0,
                                    "brandId": 1,
                                    "costPrice": 0,
                                    "createBy": "xuyingdong",
                                    "createDate": "2017-11-07",
                                    "freeze": 0,
                                    "inSkuCode": "555000",
                                    "operateBy": "xuyingdong",
                                    "operateDate": "2017-11-07",
                                    "outSkuCode": "0",
                                    "productId": "555",
                                    "property": "单规格该字段忽略",
                                    "sale": 0,
                                    "salePrice": 10000,
                                    "skuId": 158,
                                    "skuPicUrl": "",
                                    "skuStockMgr": ""
                                }
                            }],
                            "isSuccess": true,
                            "resultMsg": "执行成功！"
                        }
                    // 设置模版
                    $(".js_trolleyListData").setTemplateElement("template-items");

                    // 填充数据并展示
                    $(".js_trolleyListData").processTemplate(data.data);

        　　　      //这里也可以写成$("#result_container").setTemplateElement("template-items").processTemplate(data);
                    trolleyDatafun();
                },
                error_cb: function(jqXHR, textStatus, errorThrown) {
                    if(jqXHR.status==401){
                        console.log('用户未登录');
                    }
                }
            })
        }

    }

    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
    }

    $(".js_checkbox").jq_qvote();



    /**
     *   服务对接
     */

     //区分静态页面，之后去掉
    if(window.location.host.indexOf("123")>0 || window.location.href.indexOf("product_trolley.shtml")>0){
        trolleyDatafun();
        return false;
    }

    function trolleyDatafun(){
        //避免checkbox重复初始化
        $(".js_checkbox").each(function(i,n){
            $(this).siblings('.c_ipt_cr ').size()<1&&$(this).jq_qvote();
        });

        /**
         * 商品数量加减
         */
        $('.js_trolleyNumber').numberRule({

            // plus:'.icon-plus',
            // minus:'.icon-minus',
            // input:'input',
            // preNum:1,

            beforeMinusRule:function(num,ele){
                if(num<=0){
                    return true;//终止操作
                }else{
                    var inskucode = $(ele).attr('data-inskucode');
                    var trolleyData = {
                        inSkuCode: inskucode,
                        quantity: -1,
                        regionCode: 2450
                    }
                    $.ajax({
                        url: siteConfig.apiUrl+"/order/cartGoods/delete/",
                        data: trolleyData,
                        success_cb: function(data){
                            console.log(data);
                        },
                    })
                }
            }

        });
        $('.js_edit').on('click',function(){
            // var parent = $(this).parent().parent();
            var parent = $(this).parentsUntil('.trolley-prolist');
            if($(this).attr('data-oppo')=='edit'){
                parent.find('.js_trolleyNumber').removeClass('opacity-0');
                parent.find('.js_trolleyFont').addClass('opacity-0');
                parent.find('.js_trolleyPrice').addClass('opacity-0');
                $(this).attr('data-oppo','finish').html('完成');
                $(this).siblings('.js_deleteXs').removeClass('opacity-0');
            }else{
                parent.find('.js_trolleyNumber').addClass('opacity-0');
                parent.find('.js_trolleyFont').removeClass('opacity-0');
                parent.find('.js_trolleyPrice').removeClass('opacity-0');
                $(this).attr('data-oppo','edit').html('编辑');
                $(this).siblings('.js_deleteXs').addClass('opacity-0');
            }

        });

        //删除购物车商品
        $('.js_proDelete').on('click',function(){
            if(!istrsidssdssotoken()){
                //用户未登录时，物理删除
                return false;
            }
            var inskucode = $(this).attr('data-inskucode');
            console.log(inskucode);
            var trolleyData = {
                cartGoodId : inskucode
            }
            trolleyServer.delete(trolleyData);
        });
    }

    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        console.log('用户未登录')
        // jumpToLoginPage();
    }

    var trolleyData = {
        // cartGoodsQueryDTO:{},
    };
    $.ajax({
        url: siteConfig.apiUrl+"/order/cartGoods/list/",
        data: JSON.stringify(trolleyData),
        // contentType:"application/json; charset=utf-8",
        applicationType:true,
        success_cb: function(data){
             var data = {
                  "data": [{
                        "productShowVO": {
                            "brandId": 1,
                            "createBy": "zhangjing",
                            "createDate": "2017-11-02",
                            "goodsName": "海尔大富豪冷冻冷藏转换柜",
                            "goodsPic": "images/compare_goods.PNG",
                            "id": 9523339,
                            "modelNo": 'BCD-LALAL',
                            "operateBy": "zhangjing",
                            "operateDate": "2017-11-07",
                            "orderMgr": "",
                            "proUrl": "",
                            "productId": "555",
                            "propertyJson": "[{\"outSkuCode\":0,\"available\":0,\"costPrice\":0,\"salePrice\":0,\"skuPicUrl\":\"\",\"property\":\"单规格该字段忽略\",\"inSkuCode\":\"555000\",\"siteId\":5,\"productId\":555,\"skuStockMgr\":\"\",\"freeze\":0,\"sale\":0,\"createBy\":\"zhangjing\",\"operateBy\":\"zhangjing\"}]",
                            "riseFlag": 0,
                            "skuStockMgr": "",
                            "supplierId": "",
                            "supplierName": "",
                            "supplierVcode": ""
                        },
                        "skuShowVO": {
                            "available": 0,
                            "brandId": 1,
                            "costPrice": 0,
                            "createBy": "xuyingdong",
                            "createDate": "2017-11-07",
                            "freeze": 0,
                            "inSkuCode": "555000",
                            "operateBy": "xuyingdong",
                            "operateDate": "2017-11-07",
                            "outSkuCode": "0",
                            "productId": "555",
                            "property": "单规格该字段忽略",
                            "sale": 0,
                            "salePrice": 10000,
                            "skuId": 158,
                            "skuPicUrl": "",
                            "skuStockMgr": ""
                        }
                    }],
                    "isSuccess": true,
                    "resultMsg": "执行成功！"
             }
            // 设置模版
            $(".js_trolleyListData").setTemplateElement("template-items");

            // 填充数据并展示
            $(".js_trolleyListData").processTemplate(data.data);

　　　      //这里也可以写成$("#result_container").setTemplateElement("template-items").processTemplate(data);
            trolleyDatafun();
        },
        error_cb: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status==401){
                console.log('用户未登录');
            }
        }
    })
});
function buyAjax(params) {
    if(!params.url){
        console.log('url参数不能为空');
        return false;
    }
    var ajaxParams = {
        data: {},
        type: 'post',
        login:true,
        contentType: "application/json; charset=utf-8",
    };
    jQuery.extend(ajaxParams, params);
    return $.ajax(ajaxParams);
}
