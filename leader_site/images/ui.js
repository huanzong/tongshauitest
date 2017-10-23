$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

    }
    //简易导航栏
    $('.js_navShow').siblings('li').fadeOut();
    $('.js_navShow').on('mouseover',function(){
        $(this).siblings('li').fadeIn();
    });
    $('.js_navShow').siblings('li').on('click',function(){
        $('.js_navShow').siblings('li').fadeOut();
    });
    $('.js_navShow').parent('ul').on('mouseleave',function(){
        $('.js_navShow').siblings('li').fadeOut();
    });

    //checkbox，radio样式初始化
    $(".js_checkbox,.js_radio").jq_qvote();//单选多选初始化

    //下拉菜单:下拉菜单初始化
    $("#js_select").oSelect().init();

    /**
     * 表单验证
     */
    var demo=$(".js_ui_validForm").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
            "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
        },
        ajaxPost:true
    });

    //上传图片
    $.jUploader.setDefaults({
        cancelable: true, // 可取消上传
        allowedExtensions: ['jpg', 'png', 'gif'], // 只允许上传图片
        messages: {
            upload: '上传',
            cancel: '取消',
            emptyFile: "{file} 为空，请选择一个文件.",
            //invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
            invalidExtension: "只能上传后缀名是 {extensions} 的图片。",
            onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
        }
    });
    $.jUploader({
        fileField: 'file',
        button: "js_imgUpload", // 这里设置按钮id
        action: '/comment/uploadcasartejfmallproductcommentimage/uploadImage',//这里写地址
        // 开始上传事件
        onUpload: function(data) {
            // $.jUploader.defaults.otherArgs = {
            //   // activityId: activityId,
            //   proportion: proportion,
            //   slotId: minSizeSlotId
            // };
            console.log(data);
        },
        // 上传完成事件
        onComplete: function(name, data) {
            console.log(data.fileUrl);
            if (data.isSuccess) {
                console.log('上传成功');
                
            } else {
                console.log('上传失败'); 
            }

        },
        // 系统信息显示（例如后缀名不合法）
        showMessage: function(message) {
            alert(message);
        },
        // 取消上传事件
        onCancel: function(fileName) {},
        debug: true
    });

    //时间组件
    if (window.innerWidth == undefined || window.innerWidth > 1199) {
        $(".js_Date").datetimepicker({
            language: 'zh-CN',      //语言
            weekStart: 0,           //一周从哪一天开始
            todayBtn: 1,            //底部显示“今天”
            autoclose: 1,           //选择后关闭选择器
            todayHighlight: 1,      //高亮当前日期
            startView: 2,           //首先显示的视图
            minView: 2,             //视图
            forceParse: true,       //解析输入值
            format: "yyyy-mm-dd",   // 日期格式
            pickerPosition: "bottom-left",
            // startDate: new Date()     // 开始时间
        });
    }else{
        $('.js_Date').mobiscroll().date({
            preset: 'date',           //日期
            lang: "zh",               //语言
            display: 'center',
            dateFormat: 'yyyy-mm-dd', // 日期格式
            dateOrder: 'yymmdd',      //面板中日期排列格式
            // minDate:new Date()        //  最小时间
        });
    }




    
});





