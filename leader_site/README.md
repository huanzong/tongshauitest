# 统帅前端项目开发规范

## 命名规则
	
	所有命名尽量不要简写，保证见名知意
	所有命名确保符合相应的命名规则
	所有命名尽量简洁，无特殊情况，不要使用特殊符号	

### 文件夹命名

	文件夹命名若含有多个单词组，需用下划线间隔，
		eg：leader_website

### 文件命名

	文件命名若含有多个单词组，需用下划线间隔，
		eg: reset_password.shtml
	shtml文件和对应的js/css文件，除后缀名外，尽量保持一致，方便查找
		eg:index.shtml index.js/index.css
		
### 变量命名
1.css

	单词组以中划线分割，
		eg：class = "login-header",
	带有逻辑功能的css样式，不得以任何形式任何情况添加样式信息，只能在js中使用。且以“js_”开头，	eg：class=“js_login”
2.less
	
	变量单词组以中划线分割，
		eg：@l-yellow: #fff100; 
3.js

	命名驼峰式，
		eg：var loginNum = 1

## 操作流程

一切内容的调整都需要先更新git才能更新wcm 一切以git为准

## 注意事项

服务的地址以及各需要配置的变量统一放在html中定义
