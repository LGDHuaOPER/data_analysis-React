import React from 'react';
import { Breadcrumb, Card, Row, Col } from 'antd';
import myUtil from '../../public/js/myUtil';
import '../../public/css/index.pcss';

// const {Header, Sider, Content, Footer} = Layout;
const { Meta } = Card;

const routes = [
  {
    path: 'index',
    breadcrumbName: '系统主页面',
    icon: 'home',
    url: 'index.html'
  }
];

/*const aa = function (event) {
    // console.log(this); // Index react组件
    // console.log(event.currentTarget.getAttribute('data-ipage')); // 绑定事件的元素
    // console.log(event.target); // 被点击的元素
    // currentTarget 返回其事件监听器触发该事件的元素。
    // target 返回触发此事件的元素（事件的目标节点）。
};*/

class Index extends React.Component {
  constructor(props, context) {
    super();
    this.state = {
      userName: 'Admin'
    };
  }

  changeUserName(userName) {
    this.setState({ userName: userName });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Index getDerivedStateFromProps ? nextProps', nextProps);
    console.log('Index getDerivedStateFromProps ? prevState', prevState);
    return null;
  }

  render() {
    return (
      <div className="index-body">
        <div className="index-body__nav">
          <Breadcrumb itemRender={myUtil.Nav.itemRenderWrap(routes)} routes={routes} separator=">" />
        </div>
        <div className="index-body__cont">
          <div className="index-body__cont--info" style={{ fontSize: '16px' }}>
            {this.state.userName}，您好！欢迎使用futureD数据管理与分析系统
          </div>
          <div className="index-body__cont--entry">
            <Row type="flex" align="middle" justify="space-around" gutter={0}>
              <Col xs={20} sm={18} md={16} lg={10} xl={8} xxl={7}>
                <Card
                  hoverable
                  style={{ margin: '6% auto', padding: '8% 8% 4%', width: '80%' }}
                  cover={<img alt="数据管理" src={require('../../public/img/pic/dataList_iaminhtml.png')} />}
                  bodyStyle={{ marginTop: 30, padding: 1 }}
                  data-ipage="dataList"
                  onClick={myUtil.Skip.hrefSkip.bind(this, '.html')}
                >
                  <Meta title="数据管理" description="展示管理的数据的属性" style={{ textAlign: 'center' }} />
                </Card>
              </Col>
              <Col xs={20} sm={18} md={16} lg={10} xl={8} xxl={7}>
                <Card
                  hoverable
                  style={{ margin: '6% auto', padding: '8% 8% 4%', width: '80%' }}
                  cover={<img alt="数据管理" src={require('../../public/img/pic/projectAnalysis_iaminhtml.png')} />}
                  bodyStyle={{ marginTop: 30, padding: 1 }}
                  data-ipage="projectAnalysis"
                  onClick={myUtil.Skip.hrefSkip.bind(this, '.html')}
                >
                  <Meta title="工程分析" description="进一步加工处理曲线数据" style={{ textAlign: 'center' }} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        {/*<Layout>*/}
        {/*<Header>header</Header>*/}
        {/*<Layout>*/}
        {/*<Sider>left sidebar</Sider>*/}
        {/*<Content>main content</Content>*/}
        {/*<Sider>right sidebar</Sider>*/}
        {/*</Layout>*/}
        {/*<Footer>footer</Footer>*/}
        {/*</Layout>*/}
      </div>
    );
  }

  componentDidMount() {
    // 监听事件和请求数据
    console.log('Index componentDidMount ? ?', new Date());
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('Index shouldComponentUpdate ? nextProps', nextProps);
    console.log('Index shouldComponentUpdate ? nextState', nextState);
    console.log('Index shouldComponentUpdate ? nextContext', nextContext);
    // 因为是页面的顶级组件，需要总是触发render
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Index getSnapshotBeforeUpdate ? prevProps', prevProps);
    console.log('Index getSnapshotBeforeUpdate ? prevState', prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Index componentDidUpdate ? prevProps', prevProps);
    console.log('Index componentDidUpdate ? prevState', prevState);
    console.log('Index componentDidUpdate ? snapshot', snapshot);
  }

  componentWillUnmount() {
    console.log('Index componentWillUnmount ? ?', new Date());
  }

  componentDidCatch(errorString, errorInfo) {
    console.warn('Index componentDidCatch ? errorString', errorString);
    console.warn('Index componentDidCatch ? errorInfo', errorInfo);
  }
}

export default Index;
