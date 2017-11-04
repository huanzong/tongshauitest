/*
[
    {
        "property": {
            "AB类": "A",
            "投放渠道": "淘宝旗舰店"
        },
        "skuPicUrl": "http://tcloud.haier.com/hshop/openapi/readimg?ScaleWidth=600&FileName=U020171018355887626539.JPG",
        "outSkuCode": "1",
        "available": 0,
        "costPrice": "1",
        "salePrice": "1",
        "inSkuCode": "506000",
        "siteId": 5,
        "productId": 506,
        "skuStockMgr": "海尔电商开放平台",
        "freeze": 0,
        "sale": 0,
        "createBy": "duqian",
        "operateBy": "duqian"
    },
    {
        "property": {
            "AB类": "A",
            "投放渠道": "京东旗舰店"
        },
        "skuPicUrl": "http://tcloud.haier.com/hshop/openapi/readimg?ScaleWidth=600&FileName=U020171018355940292244.jpg",
        "outSkuCode": "2",
        "available": 0,
        "costPrice": "2",
        "salePrice": "2",
        "inSkuCode": "506001",
        "siteId": 5,
        "productId": 506,
        "skuStockMgr": "海尔电商开放平台",
        "freeze": 0,
        "sale": 0,
        "createBy": "duqian",
        "operateBy": "duqian"
    }
]*/

/**
 * 解析json串获取产品价格
 *
 */
function readJsonString(jsonStr){

    var minPrice = 0;

    if(jsonStr == null || jsonStr == ""){
        /*jsonStr+='[ { "property": { "AB类": "A", "投放渠道": "淘宝旗舰店" },';
        jsonStr+='   "skuPicUrl": "http://tcloud.haier.com/hshop/openapi/readimg?ScaleWidth=600&FileName=U020171018355887626539.JPG",';
        jsonStr+='  "outSkuCode": "1",';
        jsonStr+='  "available": 0,';
        jsonStr+='   "costPrice": "1",';
        jsonStr+='     "salePrice": "1",';
        jsonStr+='     "inSkuCode": "506000",';
        jsonStr+='    "siteId": 5,';
        jsonStr+='      "productId": 506,';
        jsonStr+='      "skuStockMgr": "海尔电商开放平台",';
        jsonStr+='     "freeze": 0,';
        jsonStr+='     "sale": 0,';
        jsonStr+='   "createBy": "duqian",';
        jsonStr+='    "operateBy": "duqian"';
        jsonStr+='  }';
        jsonStr+=' ]';*/
        return minPrice;
    }

    var jsonObj = eval('(' + jsonStr + ')');
    if(jsonObj != null && jsonObj!="" && jsonObj.length>0){
        var currentPrice = 0;
        for(var i=0;i<jsonObj.length;i++){
     
            currentPrice = jsonObj[i].salePrice;
            if(i==0){
                minPrice=currentPrice;
            }else if(parseInt(minPrice)>parseInt(currentPrice)){
                minPrice = currentPrice;
            }
       

        }
    }

    return minPrice;

}