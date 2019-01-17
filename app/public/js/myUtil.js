import React from 'react';
import { Icon } from 'antd';
import _ from 'lodash';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.css'

/*路径导航渲染*/
let itemRenderWrap = function(routes) {
  let clickFn = function(url) {
    window.location.assign(url);
  };
  return function(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    // console.log(params) // {}
    let iconFlag = false;
    route.icon && (iconFlag = true);
    return last ? (
      iconFlag ? (
        <span className="isLast hasIcon">
          <Icon type={route.icon} theme="filled" /> {route.breadcrumbName}
        </span>
      ) : (
        <span className="isLast hasNoIcon">{route.breadcrumbName}</span>
      )
    ) : iconFlag ? (
      <span onClick={() => clickFn(route.url)} style={{ cursor: 'pointer' }} className="isNotLast hasIcon">
        <Icon type={route.icon} theme="filled" /> {route.breadcrumbName}
      </span>
    ) : (
      <span onClick={() => clickFn(route.url)} style={{ cursor: 'pointer' }} className="isNotLast hasNoIcon">
        {route.breadcrumbName}
      </span>
    );
  };
};

let hrefSkip = function(ext, event) {
  window.location.assign(getDOMAttr(event.currentTarget, 'data-ipage') + ext);
};

let getDOMAttr = function(DOM, attr) {
  DOM = DOM || document.getElementsByTagName('body')[0];
  attr = attr || 'title';
  return DOM.getAttribute(attr);
};

/*根据视口获取关键词*/
let getRP = function(unit) {
  unit = unit || 'en';
  let iw = document.documentElement.clientWidth || document.body.clientWidth;
  let RP;
  switch (unit) {
    case 'en':
      if (iw >= 1600) {
        RP = 'xxl';
      } else if (iw >= 1200) {
        RP = 'xl';
      } else if (iw >= 992) {
        RP = 'lg';
      } else if (iw >= 768) {
        RP = 'md';
      } else if (iw >= 576) {
        RP = 'sm';
      } else {
        RP = 'xs';
      }
      break;
  }
  return RP;
};

let groupItemKey = (Collection = [], keyArr = [], fromIndex = 0) => {
  let obj = {};
  fromIndex = fromIndex < 0 ? fromIndex + Collection.length : fromIndex;
  keyArr.forEach((v, i) => {
    obj[v] = Collection.map((vv, ii) => {
      if (ii >= fromIndex) return vv[v];
      return 'itemIndex@#small@#than@#fromIndex';
    }).filter((vvv) => !_.eq(vvv, 'itemIndex@#small@#than@#fromIndex'));
  });
  return obj;
};

/*执行时机：在DOM完全就绪时就可以被调用。
　多次使用：在同一个文件中多次使用，一次调用。
　理解：document.ready()的意思是在DOM加载完成之后执行ready()方法中的代码，换句话说，这个方法的本意是为了让代码的执行时间是在DOM加载完成之后才开始执行。
document.ready和window.onload的区别——JavaScript文档加载完成事件。
　页面加载完成有两种事件：
　一是ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。
　二是onload，指示页面包含图片等文件在内的所有元素都加载完成。*/
let documentReady = (callback) => {
  /*Array.apply(null, {length: 5}).map(function(val, index) {
        return index+1;
    });*/
  ///兼容FF,Google
  if (document.addEventListener) {
    document.addEventListener(
      'DOMContentLoaded',
      function fnn() {
        document.removeEventListener('DOMContentLoaded', fnn, false);
        _.isFunction(callback) && callback();
      },
      false
    );
  }
  //兼容IE
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function fnnn() {
      if (_.eq(document.readyState, 'complete')) {
        document.detachEvent('onreadystatechange', fnnn);
        _.isFunction(callback) && callback();
      }
    });
  } else if (_.eq(document.lastChild, document.body)) {
    _.isFunction(callback) && callback();
  }
};

/*获取当前浏览器*/
let getBrowser = () => {
  let Sys = {},
    ua = navigator.userAgent.toLowerCase(),
    s;
  (s = ua.match(/edge\/([\d.]+)/))
    ? (Sys.edge = s[1])
    : (s = ua.match(/msie ([\d.]+)/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (Sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (Sys.chrome = s[1])
    : (s = ua.match(/opera.([\d.]+)/))
    ? (Sys.opera = s[1])
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (Sys.safari = s[1])
    : (s = ua.match(/rv:?([\d.]+)/))
    ? (Sys.ie11 = s[1])
    : 0;
  let returnArr = [];
  if (Sys.edge) {
    returnArr[0] = 'Edge';
    returnArr[1] = Sys.edge;
  } else if (Sys.ie) {
    returnArr[0] = 'IE';
    returnArr[1] = Sys.ie;
  } else if (Sys.firefox) {
    returnArr[0] = 'Firefox';
    returnArr[1] = Sys.firefox;
  } else if (Sys.chrome) {
    returnArr[0] = 'Chrome';
    returnArr[1] = Sys.chrome;
  } else if (Sys.opera) {
    returnArr[0] = 'Opera';
    returnArr[1] = Sys.opera;
  } else if (Sys.safari) {
    returnArr[0] = 'Safari';
    returnArr[1] = Sys.safari;
  } else if (Sys.ie11) {
    returnArr[0] = 'IE11';
    returnArr[1] = Sys.ie11;
  } else {
    returnArr[0] = 'other';
    returnArr[1] = '0';
  }
  return returnArr;
};

/*获取URL各属性*/
let getUrlParams = ({ iurl = '', classify = 'URL' }) => {
  let returnUrlObj;
  if (_.isEqual(_.toUpper(classify), 'A')) {
    let a = document.createElement('a');
    a.href = iurl;
    returnUrlObj = {
      protocol: a.protocol,
      username: a.username, // IE
      password: a.password, // IE
      hostname: a.hostname, // host 可能包括 port, hostname 不包括
      port: a.port,
      pathname: a.pathname,
      search: a.search,
      hash: a.hash
    };
  } else if (_.isEqual(_.toUpper(classify), 'REG')) {
    let pattern = RegExp(
      '^(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?(#(?:.*))?'
    );
    let matches = iurl.match(pattern) || [];
    returnUrlObj = {
      protocol: matches[1],
      username: matches[2],
      password: matches[3],
      hostname: matches[4],
      port: matches[5],
      pathname: matches[6],
      search: matches[7],
      hash: matches[8]
    };
  } else if (_.isEqual(_.toUpper(classify), 'URL')) {
    returnUrlObj = new URL(iurl);
  }
  return returnUrlObj;
};

/*钩子*/
let withHookBefore = (originalFn, hookFn) => {
  return function() {
    if (hookFn.apply(this, arguments) === false) {
      return;
    }
    return originalFn.apply(this, arguments);
  };
};

let withHookAfter = (originalFn, hookFn) => {
  return function() {
    let output = originalFn.apply(this, arguments);
    hookFn.apply(this, arguments);
    return output;
  };
};

let hookArgs = (originalFn, argsGetter) => {
  return function() {
    let _args = argsGetter.apply(this, arguments);
    if (Array.isArray(_args)) {
      for (let i = 0; i < _args.length; i++) arguments[i] = _args[i];
    }
    return originalFn.apply(this, arguments);
  };
};

let hookOutput = (originalFn, outputGetter) => {
  return function() {
    let _output = originalFn.apply(this, arguments);
    return outputGetter(_output);
  };
};

export default {
  /*导航*/
  Nav: {
    itemRenderWrap
  },
  /*跳转*/
  Skip: {
    hrefSkip
  },
  /*DOM*/
  DOM: {
    getDOMAttr,
    getRP
  },
  /*集合*/
  Collection: {
    groupItemKey
  },
  /*事件*/
  Event: {
    documentReady
  },
  /*浏览器和URL*/
  BrowserANDUrl: {
    getBrowser,
    getUrlParams
  },
  /*代码劫持、钩子*/
  Hook: {
    before: withHookBefore,
    after: withHookAfter,
    args: hookArgs,
    output: hookOutput
  }
};
