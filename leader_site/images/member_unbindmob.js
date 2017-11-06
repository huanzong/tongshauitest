/**
 * Created by 15610 on 2017/11/6.
 */


//静态页面测试添加，正常后隐藏
$("#js_unbindmail").attr('autotext',"手机（"+15115151515+"）");
$("#js_unbindmail").append("<option value='1'>手机（"+15115151515+"）</option>");
$("#js_unbindmail").append("<option value='2'>手机（"+18616161616+"）</option>");
$("#js_unbindmail").oSelect().init();



