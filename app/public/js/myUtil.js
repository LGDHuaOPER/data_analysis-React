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
        return last ? (iconFlag ? <span className="isLast hasIcon"><Icon type={route.icon} theme="filled" />{route.breadcrumbName}</span> : <span className="isLast hasNoIcon">{route.breadcrumbName}</span>) : (iconFlag ? <span onClick={() => clickFn(route.url)} style={{cursor: 'pointer'}} className="isNotLast hasIcon"><Icon type={route.icon} theme="filled" />{route.breadcrumbName}</span> : <span onClick={() => clickFn(route.url)} style={{cursor: 'pointer'}} className="isNotLast hasNoIcon">{route.breadcrumbName}</span>);
    };
};

export default {
    itemRenderWrap: itemRenderWrap
};