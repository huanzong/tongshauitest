/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的晒单
* @author:      刘悦
* @date        2017.10.30
* ---------------------------------------------------------------------------*/

$(function(){
    var templat_pagesize='10';

    $.ajax({
        type: "get",
        url: siteConfig.userUrl+"/interaction-comment/comment/myComment/myCommentList/",
        data: {
            'pageNo':'1',
            'pageSize':templat_pagesize,
            'categoryId':'2'
        },
        login:true,
        success_cb: function(data){
            if(data.isSuccess){
                var templet_count=data.data.entities.length;
                if(templet_count==0){
                    var templet_addhtml="";
                    templet_addhtml +='<div class="member-security-tit"><p>我的晒单</p></div>';
                    templet_addhtml +='<div class="member-security-contbox js-contRightContBox">';
                    templet_addhtml +='<div class="member-security-bingsuccess o_g">';
                    templet_addhtml += '<div><img src="images/share_nothing.png" alt=""></div>';
                    templet_addhtml += '<div class="member-security-bingsuccess-txtbox">';
                    templet_addhtml += '<div class="member-security-bingsuccess-bigtext"><span>还没有任何晒单记录</span></div>';
                    templet_addhtml += '</div></div></div>';
                    $(".js-myshare").html(templet_addhtml);
                }else{
                    var templet_mysharelist = data.data.entities;
                    var allPageCount = data.data.pageCount;
                    var currentPageNo = data.data.pageNo;
                    var templet_addhtml="";
                    var templet_modelNoall='';
                    for(var i=0;i<templet_count;i++){
                        if(templet_modelNoall==''){
                            templet_modelNoall+=templet_mysharelist[i].businessId;
                        }else {
                            templet_modelNoall+=','+templet_mysharelist[i].businessId;
                        }
                    }

                    //根据modelNo获取商品信息
                    $.ajax({
                        type: "get",
                        url: siteConfig.userUrl + "/buy/sku/frontpro/productByModelNo",
                        data: {
                            'modelNo':templet_modelNoall
                        },
                        login: true,
                        success_cb: function (data) {
                            if (data.isSuccess) {
                                templet_addhtml+='<div class="member-myshare-list-box o_g">';
                                templet_addhtml +='<div class="member-security-tit"><p>我的晒单</p></div>';
                                for(var i=0;i<templet_count;i++) {
                                    for (var k = 0; k < data.data.length; k++) {
                                        if (data.data[k].modelNo == templet_mysharelist[i].businessId) {
                                            var templet_picUrl=data.data[k].proUrl;
                                            var templet_comment=templet_picUrl.substring(0,templet_picUrl.length-6)+'_comment.shtml';

                                            templet_addhtml += '<div class="member-myshare-list-cont o_u  o_df_9-10 o_lg_9-10 o_md_9-10 o_sm_9-10 o_xs_9-10">';
                                            templet_addhtml += '<div class=" member-myshare-listcont-left o_u  o_df_1-3 o_lg_1-3 o_md_1-3 o_sm_1-3 o_xs_12-12">';
                                            templet_addhtml+='<img src="'+data.data[k].goodsPic+'" alt=""></div>';
                                            templet_addhtml+='<div class=" member-myshare-listcont-right o_u  o_df_2-3 o_lg_2-3 o_md_2-3 o_sm_2-3 o_xs_12-12"><div class="member-myshare-listcont-righttop"><div>';
                                            templet_addhtml+='<p>'+data.data[k].goodsName+'</p><span>'+data.data[k].modelNo+'</span> </div>';
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
                                            templet_addhtml+=' <div class="member-myshare-more"><a href="'+templet_comment+'">查看详情<i class="iconfont icon-arrow-line-right"></i></a></div></div></div></div>';
                                        }
                                    }
                                }
                                templet_addhtml+='</div>';
                                templet_addhtml+='<div class=\'l-pagination-box member-share-pagination-box\'></div>';
                                $(".js-myshare").html(templet_addhtml);
                                //-------------------分页
                                paginationInit(currentPageNo,allPageCount,templat_pagesize);
                                //分页结束
                            }
                        }
                    })
                }
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
        url: siteConfig.userUrl+"/interaction-comment/comment/myComment/myCommentList/",
        data: {
            'pageNo':currPageT,
            'pageSize':pageSize,
            'categoryId':'2'
        },
        login:true,
        success_cb: function(data){
            if(data.isSuccess){
                var templet_count=data.data.entities.length;
                var templet_mysharelist = data.data.entities;
                var allPageCount = data.data.pageCount;
                var currentPageNo = data.data.pageNo;
                var templet_addhtml="";
                var templet_modelNoall='';
                for(var i=0;i<templet_count;i++){
                    if(templet_modelNoall==''){
                        templet_modelNoall+=templet_mysharelist[i].businessId;
                    }else {
                        templet_modelNoall+=','+templet_mysharelist[i].businessId;
                    }
                }

                //根据modelNo获取商品信息
                $.ajax({
                    type: "get",
                    url: siteConfig.userUrl + "/buy/sku/frontpro/productByModelNo",
                    data: {
                        'modelNo':templet_modelNoall
                    },
                    login: true,
                    success_cb: function (data) {
                        if (data.isSuccess) {
                            templet_addhtml+='<div class="member-myshare-list-box o_g">';
                            templet_addhtml +='<div class="member-security-tit"><p>我的晒单</p></div>';
                            for(var i=0;i<templet_count;i++) {
                                for (var k = 0; k < data.data.length; k++) {
                                    if (data.data[k].modelNo == templet_mysharelist[i].businessId) {
                                        templet_addhtml += '<div class="member-myshare-list-cont o_u  o_df_9-10 o_lg_9-10 o_md_9-10 o_sm_9-10 o_xs_9-10">';
                                        templet_addhtml += '<div class=" member-myshare-listcont-left o_u  o_df_1-3 o_lg_1-3 o_md_1-3 o_sm_1-3 o_xs_12-12">';
                                        templet_addhtml+='<img src="'+data.data[k].goodsPic+'" alt=""></div>';
                                        templet_addhtml+='<div class=" member-myshare-listcont-right o_u  o_df_2-3 o_lg_2-3 o_md_2-3 o_sm_2-3 o_xs_12-12"><div class="member-myshare-listcont-righttop"><div>';
                                        templet_addhtml+='<p>'+data.data[k].goodsName+'</p><span>'+data.data[k].modelNo+'</span> </div>';
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
                                }
                            }
                            templet_addhtml+='</div>';
                            templet_addhtml+='<div class=\'l-pagination-box member-share-pagination-box\'></div>';
                            $(".js-myshare").html(templet_addhtml);
                            //-------------------分页
                            paginationInit(currentPageNo,allPageCount,pageSize);
                            //分页结束
                        }
                    }
                })
            }
            else{

            }
        }
    });
}
