/*ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

严格模式主要有以下限制。

变量必须声明后再使用
函数的参数不能有同名属性，否则报错
不能使用with语句
不能对只读属性赋值，否则报错
不能使用前缀0表示八进制数，否则报错
不能删除不可删除的属性，否则报错
不能删除变量delete prop，会报错，只能删除属性delete global[prop]
eval不会在它的外层作用域引入变量
eval和arguments不能被重新赋值
arguments不会自动反映函数参数的变化
不能使用arguments.callee
不能使用arguments.caller
禁止this指向全局对象
不能使用fn.caller和fn.arguments获取函数调用的堆栈
增加了保留字（比如protected、static和interface）
其中，尤其需要注意this的限制。ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。*/
'use strict';
import _ from 'lodash';
const eventProxy = {
  onObj: {},
  oneObj: {},
  on: function(key, fn) {
    if (_.isObject(key)) {
      _.forOwn(key, (va, ke) => {
        _.isUndefined(this.onObj[ke]) && (this.onObj[ke] = []);
        this.onObj[ke].push(va);
      });
    } else {
      _.isUndefined(this.onObj[key]) && (this.onObj[key] = []);
      this.onObj[key].push(fn);
    }
  },
  one: function(key, fn) {
    if (_.isObject(key)) {
      _.forOwn(key, (va, ke) => {
        _.isUndefined(this.oneObj[ke]) && (this.oneObj[ke] = []);
        this.oneObj[ke].push(va);
      });
    } else {
      _.isUndefined(this.oneObj[key]) && (this.oneObj[key] = []);
      this.oneObj[key].push(fn);
    }
  },
  off: function(key) {
    if (_.isArray(key)) {
      _.forEach(key, (v) => {
        this.onObj[v] = [];
        this.oneObj[v] = [];
      });
    } else {
      this.onObj[key] = [];
      this.oneObj[key] = [];
    }
  },
  trigger: function() {
    let key, args;
    if (_.eq(arguments.length, 0)) {
      return false;
    }
    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      for (let i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }
    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (let i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, args);
        this.oneObj[key][i] = undefined;
      }
      this.oneObj[key] = [];
    }
  }
};

export default eventProxy;
