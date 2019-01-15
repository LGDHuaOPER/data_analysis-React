import React from 'react';
import { Icon } from 'antd';
import dayjs from 'dayjs';
import NProgress from 'nprogress';
// import '../../public/css/nprogress.css';
import 'nprogress/nprogress.css';
import '../../public/css/common.pcss';
import '../../public/css/MyLayout.pcss';

class MyLayout extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {};
        console.log('MyLayout constructor ? this', this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('MyLayout getDerivedStateFromProps ? nextProps', nextProps);
        console.log('MyLayout getDerivedStateFromProps ? prevState', prevState);
        NProgress.start();
        return null;
    }

  render() {
    let copyStr = 'copyright©' + dayjs().format('YYYY') + ' 苏州伊欧陆系统集成有限公司';
    return (
      <div className="proj-layout">
        <div className="proj-layout__icon">
          <img src={require('../../public/img/pic/logo_iaminhtml.png')} alt="logo" />
        </div>
        <div className="proj-layout__btn">
            <div className="proj-layout__btn__l">futureD数据管理与数据分析</div>
            <div className="proj-layout__btn__r">
                <Icon type="logout" title="安全退出系统" />
            </div>
        </div>
        <div className="proj-layout__menu" />
        <div className="proj-layout__body">
          <div id="proj-content" style={{ height: '100%' }} />
        </div>
        <div className="proj-layout__copy">{copyStr}</div>
      </div>
    );
  }

    componentDidMount() {
        // 监听事件和请求数据
        console.log('MyLayout componentDidMount ? ?', new Date());
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('MyLayout shouldComponentUpdate ? nextProps', nextProps);
        console.log('MyLayout shouldComponentUpdate ? nextState', nextState);
        console.log('MyLayout shouldComponentUpdate ? nextContext', nextContext);
        // 因为是页面的顶级组件，需要总是触发render
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('MyLayout getSnapshotBeforeUpdate ? prevProps', prevProps);
        console.log('MyLayout getSnapshotBeforeUpdate ? prevState', prevState);
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('MyLayout componentDidUpdate ? prevProps', prevProps);
        console.log('MyLayout componentDidUpdate ? prevState', prevState);
        console.log('MyLayout componentDidUpdate ? snapshot', snapshot);
    }

    componentWillUnmount() {
        console.log('MyLayout componentWillUnmount ? ?', new Date());
    }

    componentDidCatch(errorString, errorInfo) {
        console.warn('MyLayout componentDidCatch ? errorString', errorString);
        console.warn('MyLayout componentDidCatch ? errorInfo', errorInfo);
    }
}

export default MyLayout;
