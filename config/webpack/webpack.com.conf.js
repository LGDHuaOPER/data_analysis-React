const webpackFile = require('./webpack.file.conf');

// 用于个性化返回title
let titleFun = function(chunkName, title){
    let titleDef = 'XXX网站';
    if(chunkName.indexOf('index') !==-1){
        return titleDef;
    }else{
        return title + '_' + titleDef;
    }
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