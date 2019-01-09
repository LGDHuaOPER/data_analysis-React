const webpackFile = require('./webpack.file.conf');

// 用于个性化返回title
let titleFun = function(chunkName, title){
    let titleDef = 'futureD数据管理与数据分析';
    return titleDef + '_' + title;
};

module.exports = {
    titleFun
};