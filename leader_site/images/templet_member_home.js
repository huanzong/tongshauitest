/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-首页
* @author:      刘悦
* @date        2017.11.15
* ---------------------------------------------------------------------------*/
var templet_entities;
var templet_addhtml;
$(function () {

    $('.js-recommendation').attr('freshen', 'A');

    //精选推荐 4个按时间倒序
    var data = {
        "orderBy": "-shangshishijian",
        "pageNo": 1,
        "pageSize": 4
    };
    $.ajax({
        url: siteConfig.userUrl + "/interaction-search/front/recommendation/list/",
        data: JSON.stringify(data),
        applicationType: true,
        login: true,
        success_cb: function (data) {
            templet_entities = data.data.entities;
            freshenA();

            $('.js-freshen').live('click',function () {
                if ($('.js-recommendation').attr('freshen') == 'A') {
                    freshenB();

                }
                else if ($('.js-recommendation').attr('freshen') == 'B') {
                    freshenA();
                }
            })

        }
    });
})
//第一第二个产品
function freshenA() {
    $('.js-recommendation').attr('freshen','A');
    templet_addhtml='';
    templet_addhtml+='<div class="o_g member-home-down-table"><div class="o_u o_df_11-12"> <span>精选推荐</span>';
    templet_addhtml+='<a href="javascript:;" class="iconfont icon-refresh-solid js-freshen"></a>';
    templet_addhtml+='</div></div>';
    templet_branches=2;
    //如果产品总数小于2
    if(templet_branches>templet_entities.length){
        templet_branches=templet_entities.length;
    }
    for(var i=0;i<templet_branches;i++){
        var templet_docpuburl=templet_entities[i].docpuburl;
        var templet_location=templet_docpuburl.lastIndexOf("\/");
        var templet_picUrl=templet_docpuburl.substring(0,templet_location+1)+templet_entities[i].appfile;
        templet_addhtml+='<div class="o_u o_df_1-2 o_lg_1-2 o_sm_1-2 o_xs_1-2">';
        templet_addhtml+='<div class="member-home-down-cont">';
        templet_addhtml+='<a class="o_u o_df_1-2 o_lg_1-3 o_md_1-3 o_sm_3-3 o_xs_3-3" href="'+templet_docpuburl+'">';
        templet_addhtml+='<img src="'+templet_picUrl+'"/></a>';
        templet_addhtml+='<a href="'+templet_docpuburl+'"><div class="member-home-down-info o_u o_df_1-2 o_lg_2-3 o_md_2-3 o_sm_3-3 o_xs_2-2"> ';
        templet_addhtml+='<p class="pro-info-title">'+templet_entities[i].pname+'</p>';
        templet_addhtml+='<span class="pro-info-type">'+templet_entities[i].modelno+'</span>';
        templet_addhtml+='<strong>￥'+templet_entities[i].price+'.00</strong></div></a></div></div> ';
    }
    $('.js-recommendation').html(templet_addhtml);

}
function freshenB() {
    //如果产品总数小于2就不执行B方法
    if(2>templet_entities.length){
        return;
    }
    $('.js-recommendation').attr('freshen','B');
    templet_addhtml='';
    templet_addhtml+='<div class="o_g member-home-down-table"><div class="o_u o_df_11-12"> <span>精选推荐</span>';
    templet_addhtml+='<a href="javascript:;" class="iconfont icon-refresh-solid js-freshen"></a>';
    templet_addhtml+='</div></div>';
    for(var i=2;i<templet_entities.length;i++){
        var templet_docpuburl=templet_entities[i].docpuburl;
        var templet_location=templet_docpuburl.lastIndexOf("\/");
        var templet_picUrl=templet_docpuburl.substring(0,templet_location+1)+templet_entities[i].appfile;
        templet_addhtml+='<div class="o_u o_df_1-2 o_lg_1-2 o_sm_1-2 o_xs_1-2">';
        templet_addhtml+='<div class="member-home-down-cont">';
        templet_addhtml+='<a class="o_u o_df_1-2 o_lg_1-3 o_md_1-3 o_sm_3-3 o_xs_3-3" href="'+templet_docpuburl+'">';
        templet_addhtml+='<img src="'+templet_picUrl+'"/></a>';
        templet_addhtml+='<a href="'+templet_docpuburl+'"><div class="member-home-down-info o_u o_df_1-2 o_lg_2-3 o_md_2-3 o_sm_3-3 o_xs_2-2"> ';
        templet_addhtml+='<p class="pro-info-title">'+templet_entities[i].pname+'</p>';
        templet_addhtml+='<span class="pro-info-type">'+templet_entities[i].modelno+'</span>';
        templet_addhtml+='<strong>'+templet_entities[i].price+'</strong></div></a></div></div> ';
    }
    $('.js-recommendation').html(templet_addhtml);
}



