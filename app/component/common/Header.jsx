import React from 'react';
import '../../public/css/common.pcss';
const Header = () =>
    <div className="top">
        <div>这是头部</div>
        <div>
            <i className="logo"/>
        </div>
        <div className="nav">
            <a href="/index.html">首页</a> <a href="/shop.html">商城</a> <a href="/demo.html">演示</a>
        </div>
    </div>
;

export default Header;