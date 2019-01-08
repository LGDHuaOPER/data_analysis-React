const webpackFile = require('./webpack.file.conf');

// 用于个性化返回title
let titleFun = function(chunkName, title){
    let titleDef = 'futureD数据管理与数据分析';
    return titleDef + '_' + title;
};

// 用于在css里和不在css里的资源路径
let resourcePathPrefix = function(fileName){
    if(/_iamincss/.test(fileName)){
        return webpackFile.resourcePrefixInCss;
    }else{
        return webpackFile.resourcePrefix;
    }
};
module.exports = {
    titleFun,
    resourcePathPrefix
};