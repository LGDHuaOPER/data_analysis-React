import React from 'react';
import { Icon } from 'antd';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.css'

let itemRenderWrap = function (routes) {
    let clickFn = function (url) {
        window.location.assign(url);
    };
    return function (route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        // console.log(params) // {}
        let iconFlag = false;
        route.icon && (iconFlag = true);
        return last ? (iconFlag ? <span className="isLast hasIcon"><Icon type={route.icon} theme="filled" /> {route.breadcrumbName}</span> : <span className="isLast hasNoIcon">{route.breadcrumbName}</span>) : (iconFlag ? <span onClick={() => clickFn(route.url)} style={{cursor: 'pointer'}} className="isNotLast hasIcon"><Icon type={route.icon} theme="filled" /> {route.breadcrumbName}</span> : <span onClick={() => clickFn(route.url)} style={{cursor: 'pointer'}} className="isNotLast hasNoIcon">{route.breadcrumbName}</span>);
    };
};

let hrefSkip = function (ext, event) {
    window.location.assign(getDOMAttr(event.currentTarget, 'data-ipage')+ext);
};

let getDOMAttr = function (DOM, attr) {
    DOM = DOM || document.getElementsByTagName('body')[0];
    attr = attr || 'title';
    return DOM.getAttribute(attr);
};

let getRP = function (unit) {
    unit = unit || 'en';
    let iw = document.documentElement.clientWidth || document.body.clientWidth;
    let RP;
    switch (unit){
        case 'en':
            if(iw>=1600){
                RP = 'xxl';
            }else if(iw>=1200){
                RP = 'xl';
            }else if(iw>=992){
                RP = 'lg';
            }else if(iw>=768){
                RP = 'md';
            }else if(iw>=576){
                RP = 'sm';
            }else{
                RP = 'xs';
            }
            break;
    }
    return RP;
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
    }
};