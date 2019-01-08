import React from 'react';
import { Breadcrumb, Row, Col, Button, Icon, Input, Table, Divider, Tag } from 'antd';
import _ from 'lodash';
import myUtil from '../../public/js/myUtil';
import mockData from '../../public/js/mockData';
import DataTable from '../dataTable/Index';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.css'
import '../../public/css/dataList.pcss';

// const {Header, Sider, Content, Footer} = Layout;
const ButtonGroup = Button.Group;
const Search = Input.Search;
const { Column, ColumnGroup } = Table;

const routes = [{
    path: 'index',
    breadcrumbName: '系统主页面',
    icon: 'home',
    url: 'index.html'
}, {
    path: 'dataList',
    breadcrumbName: '数据管理',
    icon: 'database',
    url: 'dataList.html'
}];

class Index extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            tableData: mockData.tableData
        }
    }

    onSearch(value, event) {
        let tableData = Object.assign([], this.state.tableData);
        tableData.pop();
        console.log(tableData)
        this.setState({
            tableData: tableData
        });
    };

    render() {
        return (
            <div className="dataList-body">
                <div className="dataList-body__nav"><Breadcrumb itemRender={myUtil.Nav.itemRenderWrap(routes)} routes={routes} separator=">"/></div>
                <div className="dataList-body__cont">
                    <div className="dataList-body__cont--opera">
                        <Row align="middle" justify="center" gutter={0}>
                            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 16, offset: 0 }} lg={{ span: 16, offset: 0 }} xl={{ span: 16, offset: 0 }} xxl={{ span: 16, offset: 0 }}>
                                <ButtonGroup>
                                    <Button type="default" icon="plus-circle" title="添加上传" />
                                    <Button type="default" icon="close" title="删除选中"></Button>
                                    <Button type="default" icon="delete" title="跳转至回收站" href="recycle.html" />
                                </ButtonGroup>
                            </Col>
                            <Col style={{textAlign: ['xxl', 'xl', 'lg', 'md'].includes(myUtil.DOM.getRP()) ? 'right' : 'left', marginTop: ['xxl', 'xl', 'lg', 'md'].includes(myUtil.DOM.getRP()) ? 0 : 5}} xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 8, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }} xxl={{ span: 8, offset: 0 }}>
                                <div style={{display: 'inline-block'}}>
                                    <Search
                                        placeholder="请输入搜索值"
                                        onSearch={this.onSearch.bind(this)}
                                        enterButton = {false}
                                        allowClear
                                        style={{width: 300}}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="dataList-body__cont--table" style={{marginTop: 10}}>
                        <DataTable tableData={this.state.tableData} selectedRowKeys={this.state.selectedRowKeys} pagination={{
                            current: 2,
                            pageSize: 10,
                            pageSizeOptions: ['10', '20', '30', '40'],
                            showSizeChanger: true,
                            showQuickJumper: true
                        }} />
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