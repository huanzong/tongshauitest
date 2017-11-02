/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的晒单
* @author:      刘悦
* @date        2017.10.30
* ---------------------------------------------------------------------------*/

$(function(){
    //前台判断是否登陆
    if(!istrsidssdssotoken()){
        jumpToLoginPage()
    }

    var templat_pagesize='10';

    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/interaction-comment/comment/myComment/myCommentList/",
        data: {
            'pageNo':'1',
            'pageSize':templat_pagesize
        },
        login:true,
        success_cb: function(data){
            if(data.isSuccess){
                var templet_count=data.data.entities.length;
                var templet_mysharelist = data.data.entities;
                var allPageCount = data.data.pageCount;
                var currentPageNo = data.data.pageNo;
                var templet_addhtml="";
                for(var i=0;i<templet_count;i++){
                    templet_addhtml+='<div class="member-myshare-list-cont o_u  o_df_9-10 o_lg_9-10 o_md_9-10 o_sm_9-10 o_xs_9-10">';
                    templet_addhtml+='<div class=" member-myshare-listcont-left o_u  o_df_1-3 o_lg_1-3 o_md_1-3 o_sm_1-3 o_xs_12-12">';
                    templet_addhtml+='<img src="images/compare_goods.PNG" alt=""></div>';
                    templet_addhtml+='<div class=" member-myshare-listcont-right o_u  o_df_2-3 o_lg_2-3 o_md_2-3 o_sm_2-3 o_xs_12-12"><div class="member-myshare-listcont-righttop"><div>';
                    templet_addhtml+='<p>统帅323L大容量无霜冰箱</p><span>'+templet_mysharelist[i].businessId+'</span> </div>';
                    templet_addhtml+='<ul>';
                    for(var j=1;j<=templet_mysharelist[i].star;j++){
                        templet_addhtml+='<li class="member-share-score-selected"><p class="selected_g"><i class="iconfont icon-star-solid"></i></p></li>';
                    }
                    for(var j=1;j<=5-templet_mysharelist[i].star;j++){
                        templet_addhtml+='<li class="member-share-score-selected-false"><p class="selected_g"><i class="iconfont icon-star-solid"></i></p></li>';
                    }
                    templet_addhtml+='</ul></div>';
                    templet_addhtml+='<p class="member-myshare-listcont-right-text o_u  o_df_9-10 o_lg_6-6 o_md_6-6 o_sm_6-6 o_xs_12-12">';
                    templet_addhtml+=templet_mysharelist[i].content;
                    templet_addhtml+='</p><ul class="member-myshare-listcont-right-photo o_g">';
                    for(var j=0;j<templet_mysharelist[i].paths.length;j++){
                        templet_addhtml+='<li class="member-share-photo-cur"><img src=http://test.tongshuai.com/tongshuaifile'+templet_mysharelist[i].paths[j]+' alt=""></li> ';
                    }
                    templet_addhtml+='</ul><div class="member-myshare-listcont-rightdown"> <div class="member-myshare-data">发表于 <span>'+templet_mysharelist[i].commentTime+'</span></div><span>|</span>';
                    templet_addhtml+=' <div class="member-myshare-comment" ><i class="iconfont icon-comment-solid"></i><i>评论</i><span>'+templet_mysharelist[i].commentsTotal+'</span></div><span>|</span>';
                    templet_addhtml+=' <div class="member-myshare-more"><a href="">查看详情<i class="iconfont icon-arrow-line-right"></i></a></div></div></div></div>';
                }
                $(".js-myshare").html(templet_addhtml);
                //-------------------分页
                paginationInit(currentPageNo,allPageCount,templat_pagesize);
                //分页结束
            }
            else{
            }
        }
    });
});

//分页初始化
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
    $.ajax({
        type: "get",
        dataType: "json",
        url: siteConfig.userUrl+"/interaction-comment/comment/myComment/myCommentList/",
        data: {
            'pageNo':currPageT,
            'pageSize':pageSize
        },
        login:true,
        success_cb: function(data){
            if(data.isSuccess){
                var templet_count=data.data.entities.length;
                var templet_mysharelist = data.data.entities;
                var allPageCount = data.data.pageCount;
                var currentPageNo = data.data.pageNo;
                var templet_addhtml="";
                for(var i=0;i<templet_count;i++){
                    templet_addhtml+='<div class="member-myshare-list-cont o_u  o_df_9-10 o_lg_9-10 o_md_9-10 o_sm_9-10 o_xs_9-10">';
                    templet_addhtml+='<div class=" member-myshare-listcont-left o_u  o_df_1-3 o_lg_1-3 o_md_1-3 o_sm_1-3 o_xs_12-12">';
                    templet_addhtml+='<img src="images/compare_goods.PNG" alt=""></div>';
                    templet_addhtml+='<div class=" member-myshare-listcont-right o_u  o_df_2-3 o_lg_2-3 o_md_2-3 o_sm_2-3 o_xs_12-12"><div class="member-myshare-listcont-righttop"><div>';
                    templet_addhtml+='<p>统帅323L大容量无霜冰箱</p><span>'+templet_mysharelist[i].businessId+'</span> </div>';
                    templet_addhtml+='<ul>';
                    for(var j=1;j<=templet_mysharelist[i].star;j++){
                        templet_addhtml+='<li class="member-share-score-selected"><p class="selected_g"><i class="iconfont icon-star-solid"></i></p></li>';
                    }
                    for(var j=1;j<=5-templet_mysharelist[i].star;j++){
                        templet_addhtml+='<li class="member-share-score-selected-false"><p class="selected_g"><i class="iconfont icon-star-solid"></i></p></li>';
                    }
                    templet_addhtml+='</ul></div>';
                    templet_addhtml+='<p class="member-myshare-listcont-right-text o_u  o_df_9-10 o_lg_6-6 o_md_6-6 o_sm_6-6 o_xs_12-12">';
                    templet_addhtml+=templet_mysharelist[i].content;
                    templet_addhtml+='</p><ul class="member-myshare-listcont-right-photo o_g">';
                    for(var j=0;j<templet_mysharelist[i].paths.length;j++){
                        templet_addhtml+='<li class="member-share-photo-cur"><img src=http://test.tongshuai.com/tongshuaifile'+templet_mysharelist[i].paths[j]+' alt=""></li> ';
                    }
                    templet_addhtml+='</ul><div class="member-myshare-listcont-rightdown"> <div class="member-myshare-data">发表于 <span>'+templet_mysharelist[i].commentTime+'</span></div><span>|</span>';
                    templet_addhtml+=' <div class="member-myshare-comment" ><i class="iconfont icon-comment-solid"></i><i>评论</i><span>'+templet_mysharelist[i].commentsTotal+'</span></div><span>|</span>';
                    templet_addhtml+=' <div class="member-myshare-more"><a href="">查看详情<i class="iconfont icon-arrow-line-right"></i></a></div></div></div></div>';
                }
                $(".js-myshare").html(templet_addhtml);
                //-------------------分页
                paginationInit(currentPageNo,allPageCount,pageSize);
                //分页结束
            }
            else{

            }
        }
    });
}
