﻿## 项目名
data_analysis-React

## 开发日记
- 2019/01/03  完成基本的开发环境搭建
- 2019/01/04  添加测试、预生产、生产环境的搭建，并配置简单的代理，打包文件的压缩包增加版本号和时间
- 2019/01/07  添加antd UI库，整个项目增加grid布局，css自动增加前缀，增加babel-polyfill以修复IE11报错
- 2019/01/08  添加lodash，系统主页面入口增加，数据管理大模块增加主页面内容;增加：数据管理页面搜索后触发子组件刷新
- 2019/01/09  修改Object.assign用法；数据管理主页面增加添加上传界面，增加搜索后表格动态响应
- 2019/01/10  增加：数据管理页面添加上传界面高度自适应；增加自己的组件间事件通讯库--eventProxy；组件内增加生命周期钩子，并且将unsafe的生命周期函数标记出来，引入V16.3及以后的新生命周期函数