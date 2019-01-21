import React from 'react';
import { Icon, Row, Col, Divider, Input, Menu, Dropdown } from 'antd';
import _ from 'lodash';
import myLifeCircle from '../../public/js/myLifeCircle';
import eventProxy from '../../public/js/eventProxy';

const Search = Input.Search;
const menu = (
  <Menu>
    <Menu.SubMenu
      key="UserSubMenu"
      title={
        <span>
          <Icon type="smile" /> <span>Admin</span>
        </span>
      }
    >
      <Menu.Item key="user">
        <a rel="noopener noreferrer" href="user.html">
          <Icon type="setting" /> <span>个人账号</span>
        </a>
      </Menu.Item>
    </Menu.SubMenu>
    <Menu.Divider />
    <Menu.Item key="admin">
      <a rel="noopener noreferrer" href="admin.html">
        <Icon type="user" /> <span>管理员</span>
      </a>
    </Menu.Item>
  </Menu>
);

class OperIcon extends React.Component {
  /*
   ****************************************************************************
   * Mounting阶段
   * 挂载
   * START
   ****************************************************************************
   */
  constructor(props, context) {
    super(props);
    this.state = {
      searchColSpan: 0,
      searchStyle: '0%',
      curPageKey: this.props.curPageKey,
      stateKeyInProps: props.stateKeyInProps,
      componentLastProps: props
    };
    console.log('OperIcon constructor ? props', props);
    // //新的ref绑定方法
    // this.inputRef = React.createRef();
    // this.textRef = React.createRef();
  }

  /*class的静态方法实例属性也可以初始化state
   * https://babeljs.io/docs/en/babel-plugin-proposal-class-properties */

  /*state = {
        list: []
    };*/

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('OperIcon getDerivedStateFromProps ? nextProps', nextProps);
    // console.log('OperIcon getDerivedStateFromProps ? prevState', prevState);
    // return null;
    return myLifeCircle.getDerivedStateFromProps({
      componentName: 'OperIcon',
      nextProps: nextProps,
      prevState: prevState,
      customReturn: null
    });
  }

  render() {
    if (['projectAnalysis'].includes(this.state.curPageKey)) {
      return (
        <Row style={{ height: 40, lineHeight: 40 }} type="flex" justify="end" align="middle">
          <Col span={this.state.searchColSpan}>
            <Search
              allowClear={true}
              placeholder="请输入内容"
              onSearch={(value) => {
                eventProxy.trigger('OperIcon__OnSearch', value);
              }}
              style={{ width: this.state.searchStyle }}
            />
          </Col>
          <Col span={1}>
            <Icon
              style={{ fontSize: 22, cursor: 'pointer' }}
              type="search"
              title="搜索"
              onClick={this.searchIconOnClick.bind(this)}
            />
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col span={1}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Icon style={{ fontSize: 22, cursor: 'pointer' }} type="user" title="账户信息与管理员" />
            </Dropdown>
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col span={1}>
            <Icon style={{ fontSize: 22, cursor: 'pointer' }} type="logout" title="安全退出系统" />
          </Col>
        </Row>
      );
    } else {
      return (
        <Row style={{ height: 40, lineHeight: 40 }} type="flex" justify="end" align="middle">
          <Col span={1}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Icon style={{ fontSize: 22, cursor: 'pointer' }} type="user" title="账户信息与管理员" />
            </Dropdown>
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col span={1}>
            <Icon style={{ fontSize: 22, cursor: 'pointer' }} type="logout" title="安全退出系统" />
          </Col>
        </Row>
      );
    }
  }

  componentDidMount() {
    // 监听事件和请求数据
    console.log('OperIcon componentDidMount ? ?', new Date());
  }

  /*
   ****************************************************************************
   * Mounting阶段
   * 挂载
   * END
   ****************************************************************************
   */

  /*
   ****************************************************************************
   * Update阶段
   * 更新
   * START
   ****************************************************************************
   */

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('OperIcon shouldComponentUpdate ? nextProps', nextProps);
    console.log('OperIcon shouldComponentUpdate ? nextState', nextState);
    console.log('OperIcon shouldComponentUpdate ? nextContext', nextContext);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('OperIcon getSnapshotBeforeUpdate ? prevProps', prevProps);
    console.log('OperIcon getSnapshotBeforeUpdate ? prevState', prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('OperIcon componentDidUpdate ? prevProps', prevProps);
    console.log('OperIcon componentDidUpdate ? prevState', prevState);
    console.log('OperIcon componentDidUpdate ? snapshot', snapshot);
  }

  /*
   ****************************************************************************
   * Update阶段
   * 更新
   * END
   ****************************************************************************
   */

  /*
   ****************************************************************************
   * Unmounting阶段
   * 移除
   * START
   ****************************************************************************
   */

  componentWillUnmount() {
    console.log('OperIcon componentWillUnmount ? ?', new Date());
  }

  /*
   ****************************************************************************
   * Unmounting阶段
   * 移除
   * END
   ****************************************************************************
   */

  /*
   ****************************************************************************
   * Error阶段
   * 错误
   * START
   ****************************************************************************
   */

  componentDidCatch(errorString, errorInfo) {
    console.warn('OperIcon componentDidCatch ? errorString', errorString);
    console.warn('OperIcon componentDidCatch ? errorInfo', errorInfo);
  }

  /*
   ****************************************************************************
   * Error阶段
   * 错误
   * END
   ****************************************************************************
   */

  /*自定义方法*/
  searchIconOnClick() {
    this.setState((prevState, props) => ({
      searchColSpan: _.eq(prevState.searchColSpan, 8) ? 0 : 8,
      searchStyle: _.eq(prevState.searchColSpan, 8) ? '0%' : '95%'
    }));
  }
}

export default OperIcon;
