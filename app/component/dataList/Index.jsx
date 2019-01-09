import React from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Row, Col, Button, Icon, Input, Table, Divider, Tag, Drawer } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import myUtil from '../../public/js/myUtil';
import mockData from '../../public/js/mockData';
import eventProxy from '../../public/js/eventProxy';
import DataTable from '../dataTable/Index';
import AdditionUpload from './AdditionUpload';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.css'
import '../../public/css/dataList.pcss';

// dayjs.extend(relativeTime);
// console.log(dayjs().from(dayjs(), true));

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

const allTableData = _.cloneDeep(mockData.tableData);

class Index extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            currentPage: 2,
            pageSize: 10,
            tableData: _.cloneDeep(allTableData),
            DrawerVisible: false,
            DrawerHeight: 400,
            AutoCompleteDataSource: ['测试','梦颖','阿华','ying','hua','1234567890','abcdefghijklmn','opqrstuvwxyz'],
            AutoCompleteAllData: ['测试','梦颖','阿华','ying','hua','1234567890','abcdefghijklmn','opqrstuvwxyz']
        };
        this.dataStore = {
            lastEmptyDate: dayjs().valueOf()
        }
    }

    componentDidMount() {
        // 监听事件
        eventProxy.on({
            'pageANDPageSize': (currentPage, pageSize, callback) => {
                this.setState({
                    currentPage,
                    pageSize
                }, () => {
                    _.isFunction(callback) && callback();
                });
            },
            'DrawerOnClose': (DrawerVisible) => {
                this.setState({
                    DrawerVisible
                });
            },
            'AutoCompleteOnSearch': (AutoCompleteDataSource) => {
                this.setState({
                    AutoCompleteDataSource
                });
            },
            'TextAreaOnPressEnter': (DrawerHeight) => {
                this.setState({
                    DrawerHeight
                });
            }
        });
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    componentDidUpdate() {
        console.log("dataList componentDidUpdate", new Date())
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize.bind(this));
    }

    onWindowResize() {
        let AdditionUpload = this.refs.AdditionUpload;
        let dom = ReactDOM.findDOMNode(AdditionUpload);
        if(!_.isNil(dom)){
            let RP = myUtil.DOM.getRP(),
            iH = dom.clientHeight;
            console.log(dom)
            console.log(RP)
            console.log(iH)
            if(['xxl', 'xl'].includes(RP)){
                this.setState({
                    DrawerHeight: iH >= 600 ? 600 : iH
                });
            }else{
                this.setState({
                    DrawerHeight: iH <= 700 ? 700 : iH
                });
            }
        }
    }

    InputOnSearch(value, event) {
        value = value.trim();
        let tableData = _.filter(allTableData, function (val, ind, arr) {
            // console.log("this", this) // undefined
            let flag = false;
            _.forOwn(val, function (v, k) {
                if(!['key'].includes(k)){
                    if(_.isNumber(v) || _.isString(v)){
                        flag = _.toString(v).includes(value);
                        if(flag) return false;
                    }else if(_.isArray(v) || _.isObject(v)){
                        let valArr = _.isArray(v) ? v : _.values(v);
                        let flag1 = _.without(valArr, undefined, null).map(function (vv) {
                            return _.isNumber(vv) ? _.toString(vv) : vv;
                        }).includes(value);
                        flag = flag1;
                        if(flag) return false;
                    }
                }
            });
            return flag;
        });
        this.setState({
            currentPage: 1,
            tableData: tableData
        });
    }

    InputOnChange(e) {
        if(_.eq(_.trim(e.currentTarget.value), "")){
            let inow = dayjs().valueOf();
            if(inow - this.dataStore.lastEmptyDate > 3000){
                this.setState({
                    currentPage: 1,
                    tableData: _.cloneDeep(allTableData)
                });
            }
            this.dataStore.lastEmptyDate = inow;
        }
    }

    btnOnClick() {
        this.setState({
            DrawerVisible: true
        });
    }

    render() {
        return (
            <div className="dataList-body">
                <div className="dataList-body__nav"><Breadcrumb itemRender={myUtil.Nav.itemRenderWrap(routes)} routes={routes} separator=">"/></div>
                <div className="dataList-body__cont">
                    <div className="dataList-body__cont--opera">
                        <Row align="middle" justify="center" gutter={0}>
                            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 16, offset: 0 }} lg={{ span: 16, offset: 0 }} xl={{ span: 16, offset: 0 }} xxl={{ span: 16, offset: 0 }}>
                                <ButtonGroup>
                                    <Button type="default" icon="plus-circle" title="添加上传" onClick={this.btnOnClick.bind(this)} />
                                    <Button type="default" icon="close" title="删除选中"></Button>
                                    <Button type="default" icon="delete" title="跳转至回收站" href="recycle.html" />
                                </ButtonGroup>
                            </Col>
                            <Col style={{textAlign: ['xxl', 'xl', 'lg', 'md'].includes(myUtil.DOM.getRP()) ? 'right' : 'left', marginTop: ['xxl', 'xl', 'lg', 'md'].includes(myUtil.DOM.getRP()) ? 0 : 5}} xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 8, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 8, offset: 0 }} xxl={{ span: 8, offset: 0 }}>
                                <div style={{display: 'inline-block'}}>
                                    <Search
                                        placeholder="请输入搜索值"
                                        enterButton = {false}
                                        allowClear
                                        style={{width: 300}}
                                        onSearch={this.InputOnSearch.bind(this)}
                                        onChange={this.InputOnChange.bind(this)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="dataList-body__cont--table" style={{marginTop: 10}}>
                        <DataTable tableData={this.state.tableData} selectedRowKeys={this.state.selectedRowKeys} pagination={{
                            current: this.state.currentPage,
                            pageSize: this.state.pageSize,
                            pageSizeOptions: ['2', '5', '10', '20', '50'],
                            showSizeChanger: true,
                            showQuickJumper: true
                        }} />
                    </div>
                </div>
                <AdditionUpload
                    ref='AdditionUpload'
                    AutoCompleteDataSource={this.state.AutoCompleteDataSource}
                    AutoCompleteAllData={this.state.AutoCompleteAllData}
                    DrawerHeight={this.state.DrawerHeight}
                    DrawerVisible={this.state.DrawerVisible} />
            </div>
        );
    }
}

export default Index;