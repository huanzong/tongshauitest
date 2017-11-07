/*-----------------------------------------------------------------------------
* @Description:  模板-产品列表页
* @author:      张静
* @date        2017.11.07
* ---------------------------------------------------------------------------*/

//获取产品个数
var template_dataNum=$("div.prolist-box").length;
$(".js_dataNum").text(template_dataNum);
//判断当前tab标签
function cur(){
    $(".js_proNameBox").find("a").each(function(){//pc
        var channelid=$(this).attr("channelid");
        if(channelid==chnlid_owner){//是当前栏目 设置样式
            $(this).addClass("active");
        }else{//不为当前栏目移除样式
            $(this).removeClass("active");
        }
    });
    $(".js_proNameBox2").find("a").each(function(){//移动
        var channelid=$(this).attr("channelid");
        if(channelid==chnlid_owner){//是当前栏目 设置样式
            $(this).addClass("active");
        }else{//不为当前栏目移除样式
            $(this).removeClass("active");
        }
    });
}

//重新绘制价格
$(".js_minPrice").each(function(){
    var templet_price=$(this).attr("sku_value");
    if(templet_price==''||templet_price==null){
        $(this).css('display','none');//没有价格隐藏
    }else{
        $(this).find("span").text(readJsonString(templet_price));
    }

})

//价格转化获取最小值
function readJsonString(templet_price){
    var minPrice = 0;
    var jsonObj = eval('(' + templet_price + ')');
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

//精选推荐手机端添加class
$(".js_recommend").find('a').eq(2).addClass("o_lg-hide o_md-hide o_sm-hide o_xs-hide");
$(".js_recommend").find('a').eq(3).addClass("o_lg-hide o_md-hide o_sm-hide o_xs-hide");
//精选推荐切换
var template_url=window.location.href;
$('.js_recomChange').click(function(){
    $.ajax({
        type: "get",
        dataType:"json",
        url: template_url+"recommend_116.json",
        data: "",
        success_cb: function(data){
            $(".js_recommend").html('');
            var recommendData="";
            var chooseArray=[];
            for(var j=0; j<4; j++){
                while(true){
                    var random=Math.round(Math.random()*(data.length-2));
                    if(!chooseArray[random]){
                        break;
                    }
                }
                chooseArray[random]=true;
                var pname=data[random].pname;
                var modelno=data[random].modelno;
                var dochref=data[random].dochref;
                var pic=data[random].pic;
                var sku_value=data[random].sku_value;
                var minPrice = 0;
                if(sku_value != null && sku_value!="" && sku_value.length>0){
                    var currentPrice = 0;
                    for(var i=0;i<sku_value.length;i++){

                        currentPrice = sku_value[i].salePrice;
                        if(i==0){
                            minPrice=currentPrice;
                        }else if(parseInt(minPrice)>parseInt(currentPrice)){
                            minPrice = currentPrice;
                        }
                    }
                }
                recommendData+='<a class="o_u o_df_1-4 o_lg_1-3 o_md_1-2 o_sm_1-2 o_xs_1-2" href="'+dochref+'">';
                recommendData+='<img src="'+pic+'"/>';
                recommendData+='<div class="recommend-pro-info">';
                recommendData+='<span class="pro-info-title">'+pname+'</span>';
                recommendData+='<span class="pro-info-type">'+modelno+'</span>';
                recommendData+='<span class="pro-info-price js_minPrice">￥<span>'+minPrice+'</span></span>';
                recommendData+='</div></a>';

            }
            $(".js_recommend").html(recommendData);
        }
    });
})
var paginationTwo = function(id){

    var $this = this;
    this.id = id;
    //内部总页数
    this._totalPage = 0;
    this._start = 0;
    this._end = 1;
    //每页显示记录数
    this.pageSize = 0;
    //总条数
    this.totalCount = 0;
    //总页数
    this.totalPage = 0;
    //当前页面 默认从1开始
    this.currPage = 0;
    //显示的分页按钮数量
    this.maxButtons = 8;
    this.showPageCount=8;

    /**
     * 需要重新改写该方法
     * @param {Object} index
     * @return {TypeName}
     */
    this.onclick = function(currPage){
        return true;
    }

    /**
     * 内部方法  用于生成分页代码的click
     * @param {Object} currPage
     */
    this._click = function(currPage){

        var oldPage = currPage;
        if($this.onclick(currPage)!= false){
            $this.render();
        }else{
            $this.currPage = oldPage;
        }
        $('html, body').scrollTop(0);
    }

    /**
     * 在显示之前计算各种页码变量的值
     */
    /*this._calculate = function(){

     $this._totalPage = $this.totalCount;//parseInt(Math.ceil($this.totalCount/$this.pageSize));//计算页码总数
     if($this._totalPage<8){
     $this.maxButtons=$this._totalPage;
     }
     $this.currPage = parseInt($this.currPage);
     if($this.currPage>$this._totalPage){
     $this.currPage = $this._totalPage;
     }
     if($this.currPage<1){
     $this.currPage = 1;
     }

     $this._start = Math.max(1, $this.currPage - parseInt($this.maxButtons/2));//
     $this._end = Math.min($this._totalPage, $this._start + $this.maxButtons - 1);//最后一个页码按钮的页码数
     $this._start = Math.max(1, $this._end - $this.maxButtons + 1);//第一个页码按钮的页码数
     }*/



    /**
     * 渲染分页部分的html
     */
    this.render = function(){

        var divPage = $(""+$this.id);
        //$this._calculate();
        var htmlStr = "";
        var currpage = parseInt($this.currPage);
        //|| $this.totalCount==0
        if($this.totalPage<=1){
            divPage.html(htmlStr);
            return;
        }

        // 上一页
        if(1!=currpage){
            htmlStr+='<a href="javascript:;" class="l-pagination-prew" page="'+(parseInt(currpage)-1)+'">上一页</a>';
        }

        //初始化分页 1:总页数小于8页
        if($this.totalPage<=$this.showPageCount){
            for(var m=1;m<=$this.totalPage;m++){
                if(currpage == m){

                    htmlStr+='<a href="javascript:;" class="l-pagination-pagenumber active"  page="'+m+'">'+m+'</a>';
                }else{

                    htmlStr+='<a href="javascript:;" class="l-pagination-pagenumber"  page="'+m+'">'+m+'</a>';
                }
            }
        }else{
            //当页数小于8时
            if(currpage < $this.showPageCount){
                for(var m=1;m<=$this.showPageCount;m++){
                    if(currpage == m){
                        htmlStr+='<a href="javascript:;" class="l-pagination-pagenumber active"  page="'+m+'">'+m+'</a>';
                    }else{

                        htmlStr+='<a href="javascript:;" class="l-pagination-pagenumber"  page="'+m+'">'+m+'</a>';
                    }
                }
            }else{
                var startPageNo = 0;
                var endPageNo=0;
                //判断分页显示数
                if($this.showPageCount == 8){

                    //判断分页总数是奇数还是偶数
                    if($this.totalPage%2 == 0){
                        if(currpage+4 < $this.totalPage ){
                            startPageNo = currpage -3;
                            endPageNo = currpage+4;
                        }else{
                            endPageNo =  $this.totalPage;
                            startPageNo = currpage - ($this.showPageCount-($this.totalPage-currpage))+1;
                        }

                        //奇数
                    }else{
                        if(currpage+3 < $this.totalPage ){
                            startPageNo = currpage -3;
                            endPageNo = currpage+3;
                        }else{
                            endPageNo =  $this.totalPage;
                            startPageNo = currpage - ($this.showPageCount-($this.totalPage-currpage))+1;
                        }
                    }
                }else if($this.showPageCount == 5){
                    //判断分页总数是奇数还是偶数

                    if(currpage+2 < $this.totalPage ){
                        startPageNo = currpage -2;
                        endPageNo = currpage+2;
                    }else{
                        endPageNo =  $this.totalPage;
                        startPageNo = currpage - ($this.showPageCount-($this.totalPage-currpage))+1;
                    }
                }else if($this.showPageCount == 3){
                    //判断分页总数是奇数还是偶数

                    if(currpage+1 < $this.totalPage ){
                        startPageNo = currpage -1;
                        endPageNo = currpage+1;
                    }else{
                        endPageNo =  $this.totalPage;
                        startPageNo = currpage - ($this.showPageCount-($this.totalPage-currpage))+1;
                    }
                }


                for(var m=startPageNo;m<=endPageNo;m++){
                    if(currpage == m){
                        htmlStr+='<a href="javascript:;" class="l-pagination-pagenumber active"  page="'+m+'">'+m+'</a>';
                    }else{
                        htmlStr+='<a href="javascript:;" class="l-pagination-pagenumber"  page="'+m+'">'+m+'</a>';
                    }
                }
            }

        }

        // 下一页
        if (currpage != $this.totalPage) {
            htmlStr+='<a href="javascript:;" class="l-pagination-next" page="'+(parseInt(currpage)+1)+'" >下一页</a>';
        }

        divPage.html(htmlStr);
    }
}
