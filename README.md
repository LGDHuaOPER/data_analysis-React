## 项目名
data_analysis-React

## 开发日记
- `2019/01/03`
    - 完成基本的开发环境搭建
- `2019/01/04`
    - 添加测试、预生产、生产环境的搭建，并配置简单的代理，打包文件的压缩包增加版本号和时间
- `2019/01/07`
    - 添加antd UI库，整个项目增加grid布局，css自动增加前缀，增加babel-polyfill以修复IE11报错
- `2019/01/08`
    - 添加lodash，系统主页面入口增加，数据管理大模块增加主页面内容；
    - 增加：数据管理页面搜索后触发子组件刷新
- `2019/01/09`
    - 修改Object.assign用法；
    - 数据管理主页面增加添加上传界面，增加搜索后表格动态响应
- `2019/01/10`
    - 增加：数据管理页面添加上传界面高度自适应；
    - 增加自己的组件间事件通讯库--eventProxy；
    - 组件内增加生命周期钩子，并且将unsafe的生命周期函数标记出来，引入V16.3及以后的新生命周期函数；
    - 增加TemplateJSX.jsx模板文件，部分组件增加React16.3 生命周期函数新写法以及打印信息
- `2019/01/11`
    - 增加：V16.3生命周期函数.md文件；
    - 增加：myLifeCircle.js，用于复用生命周期函数返回值逻辑，可扩展；
    - 对组件内生命周期返回值进行优化
- `2019/01/14`
    - 增加：prettier依赖，prettier.config.js配置文件；
    - 增加：数据管理主页面删除选中行数据的功能；
    - 增加：lodash-webpack-plugin，解决打包时lodash过大问题；
    - 增加：回收站页面；
    - 增加：myUtil.js里的Collection模块
- `2019/01/15`
    - 增加：babel-plugin-import依赖；
    - 配置.babelrc文件，增加antd按需引入功能；
    - 增加：react-highlight-words组件，用于数据表格搜索后高亮搜索值；
    - 增加：nprogress第三方库
- `2019/01/16`
    - 增加：工程分析主页面；
    - 增加：各页面右上角操作按钮组组件；
    - 增加：工程分析页面搜索响应功能；
    - 增加：组件卸载移除绑定事件；
    - 修改：`NProgress.start();`调用位置
    - 增加：myUtil.js里的Event和BrowserANDUrl模块
    - 修改：README.md排版
- `2019/01/17`
    - 修改：部分行间样式改为prototype原型链获取样式对象
    - 增加：myConfig.js
    - 增加：myUtil.js里的Hook模块
    - 修改：gulp任务自动修改myConfig.js里environment
- `2019/01/18`
    - 增加：网站icon图标
- `2019/01/20`
    - 增加：格式化git commit与自动生成changelog
        ```
        // 全局安装commitizen
        npm install -g commitizen
        // 然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。
        commitizen init cz-conventional-changelog --save --save-exact
        // 如果是第二次配置，需要用--force
        commitizen init cz-conventional-changelog --save --force
        // 如果都不行则
        npm install cz-conventional-changelog --save-dev
        // 这种模式需要在package.json里增加
        "config": {
            "commitizen": {
                "path": "./node_modules/cz-conventional-changelog"
            }
        }
        // 全局安装conventional-changelog-cli
        npm install -g conventional-changelog-cli
        // This will not overwrite any previous changelog.
        conventional-changelog -p angular -i CHANGELOG.md -s
        // If you first time use this tool and want to generate all previous changelog, you could do.
        // This will overwrite any previous changelog if exist.
        conventional-changelog -p angular -i CHANGELOG.md -s -r 0
        ```
    - 增加：commitlint
        ```
        // 安装commitlint依赖
        npm install --save-dev @commitlint/config-conventional @commitlint/cli
        // 创建配置文件
        echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
        // To lint commits before they are created you can use Husky's 'commit-msg' hook.
        npm install --save-dev husky
        // package.json
        {
            "husky": {
                "hooks": {
                    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
                }  
            }
        }
        ```
- `2019/01/21`
	- 版本回退：删除V1.0.0，回退至`1d3ba909a7fcc10aeb404f5b872151c8457c7d37`
    - 新分支：V1.0.0
    - 增加：工程分析主页面曲线选择功能；增加：个人账号、管理员下拉菜单选择
    - 增加：admin user RFS2P模块；修改：recycle模块位置
    
## 生产环境依赖或第三方库
- `antd` `3.12.1`
    - UI库
- `babel-polyfill` `6.26.0`
    - 解决兼容性
- `dayjs` `1.7.8`
    - 日期工具库
- `lodash` `4.17.11`
    - 工具库
- `nprogress` `0.2.0`
    - 顶部进度条组件
- `react` `16.3.0`
- `react-dom` `16.3.0`
- `react-highlight-words` `0.16.0`
    - 关键字高亮组件
- `react-split-pane` `0.1.85`
    - 分割面板组件
- `commitizen` `-g` `cz-conventional-changelog` `2.1.0`
    - 格式化commit
- `conventional-changelog-cli` `-g`
    - 自动生成changelog
- `@commitlint/cli` `7.3.2` `@commitlint/config-conventional` `7.3.1` `husky` `1.3.1`
    - commit验证