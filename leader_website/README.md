# 统帅前端项目开发规范

## 命名规则

静态页面使用对应页面功能的英文全称命名 全部小写 多个单词中划线连接 请确保文件命名总是以字母开头

各处命名力求语义化，不得使用意义不明的缩写

每个静态页对应的css和js文件与html同名

当前页面js scss 命名使用page-xxxx.scss/.js

当前模块js scss 命名使用module-xxxx.scss/.js

全局通用js scss 命名使用common-xxxx.scss/.js

图片放在images文件夹下 以l_xxx命名
样式文件全部使用sass 对应目录在images/sass

class和id 一律小写英文单词 多个单词中划线连接 不得为id指定样式

避免为 0 值指定单位，例如，用 margin: 0; 代替 margin: 0px;

通用样式放在base.scss中 命名为c-xxx

当前页面相关样式放在当前页scss中 命名为当前页英文标记-xxx 例如首页样式index-xxxx

js变量使用驼峰命名,且务必以"js_"开头，js变量不得添加任何css样式属性

所有声明语句都应当以分号结尾，不可省略




## 操作流程

一切内容的调整都需要先更新git才能更新wcm 一切以git为准

## 注意事项

服务的地址以及各需要配置的变量统一放在html中定义
