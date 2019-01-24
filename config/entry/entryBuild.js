const fs = require('fs');
const path = require('path');
const entry = require('./entry');
const rimraf = require('rimraf');

//定义entryBuild
const entryBuildPath = path.resolve(__dirname, '../../entryBuild');
//删除entryBuild
rimraf.sync(entryBuildPath);
//创建entryBuild
fs.mkdirSync(entryBuildPath);
const entryContent = (data) => `import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MyLayout from '../app/component/common/MyLayout';
import Index from '../app/component/${data.path}';
import Snow from '../app/component/common/Snow';
ReactDOM.render([<MyLayout key="MyLayout" curPageKey="${data.key}"/>], document.getElementById('app'));
ReactDOM.render(<Index key="Index"/>, document.getElementById('proj-content'));
ReactDOM.render(<Snow key="Snow"/>, document.getElementById('appBackground'));`;
/*生成webpack entry 入口文件*/
entry.map((data) => {
  fs.writeFile(entryBuildPath + '/' + data.name + '.js', entryContent(data), 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
  });
});
