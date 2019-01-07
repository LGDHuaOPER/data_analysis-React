import React from 'react';
import { Breadcrumb, Card, Row, Col } from 'antd';
import myUtil from '../../public/js/myUtil';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.css'
import '../../public/css/index.pcss';

// const {Header, Sider, Content, Footer} = Layout;

const routes = [{
    path: 'index',
    breadcrumbName: '系统主页面',
    icon: 'home',
    url: 'index.html'
}];

class Index extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userName: 'Admin',
        }
    }
    changeUserName(userName) {
        this.setState({userName:userName});
    }
    render() {
        let gutter = function () {
            let iw = document.getElementById("proj-content").offsetWidth;
            return Math.floor(iw*0.1);
        };
        return (
            <div className="index-body">
                <div className="index-body__nav"><Breadcrumb itemRender={myUtil.itemRenderWrap(routes)} routes={routes} separator=">"/></div>
                <div className="index-body__cont">
                    <div className="index-body__cont--info" style={{fontSize: '16px'}}>{this.state.userName}，您好！欢迎使用futureD数据管理与分析系统</div>
                    <div className="index-body__cont--entry">
                        <Row align="middle" justify="center" gutter={0}>
                            <Col span={12}>1</Col>
                            <Col span={12}>2</Col>
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
}

export default Index;