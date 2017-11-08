/**
 * Created by Norman on 2017/11/6 0006.
 */
/**
 * 基于原生javascript构造分页
 *
 * @param {Object} id
 * @memberOf {TypeName}
 * @return {TypeName}
 */
var pagination = function(id){

    var $this = this;
    this.id = id;
    //内部总页数
    this._totalPage = 0;
    this._start = 1;
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
                /*if($this.showPageCount == 8){
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
                }else if($this.showPageCount == 6){
                    //判断分页总数是奇数还是偶数

                    if(currpage+2 < $this.totalPage ){
                        startPageNo = currpage -2;
                        endPageNo = currpage+3;
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
                }*/
                //偶数分页
                if($this.showPageCount%2 == 0){
                    if(currpage+$this.showPageCount/2 < $this.totalPage ){
                        startPageNo = currpage - $this.showPageCount/2 +1;
                        endPageNo = currpage+$this.showPageCount/2 ;
                    }else{
                        endPageNo =  $this.totalPage;
                        startPageNo = currpage - ($this.showPageCount-($this.totalPage-currpage))+1;
                    }
                    
                 //奇数分页   
                }else{
                    if(currpage+parseInt($this.showPageCount/2) < $this.totalPage ){
                        startPageNo = currpage -parseInt($this.showPageCount/2);
                        endPageNo = currpage+parseInt($this.showPageCount/2);
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
        //每一个页码加上点击事件
        var a_list = divPage.find("a");
        for(var i=0;i<a_list.length;i++){
            a_list[i].onclick = function(){
                var index = this.getAttribute("page");
                if(index != undefined && index != ''){
                    $this._click(index);
                }

            }
        }
    }
}



