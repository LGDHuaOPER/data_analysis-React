import React from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Row, Col, Button, Icon, Input, Divider, Tag, Modal, message, notification } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import NProgress from 'nprogress';
import myUtil from '../../public/js/myUtil';
import mockData from '../../public/js/mockData';
import eventProxy from '../../public/js/eventProxy';
import myLifeCircle from '../../public/js/myLifeCircle';
import DataTable from '../dataTable/Index';
import AdditionUpload from './AdditionUpload';
import '../../public/css/dataList.pcss';

// dayjs.extend(relativeTime);
// console.log(dayjs().from(dayjs(), true));

const ButtonGroup = Button.Group;
const Search = Input.Search;
const confirm = Modal.confirm;

const routes = [
  {
    path: 'index',
    breadcrumbName: '系统主页面',
    icon: 'home',
    url: 'index.html'
  },
  {
    path: 'dataList',
    breadcrumbName: '数据管理',
    icon: 'database',
    url: 'dataList.html'
  }
];

const allTableData = _.cloneDeep(mockData.tableData);
const allKeys = _.cloneDeep(mockData.allKeys);

myLifeCircle.setBaseOptions({
  'getDerivedStateFromProps.componentLastProps': 'componentLastProps'
});

// message配置
message.config({
  top: 24,
  duration: 2,
  maxCount: 5,
  getContainer: () => document.body
});

// notification配置
notification.config({
  placement: 'topRight',
  top: 24,
  duration: 3,
  getContainer: () => document.body
});

class Index extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      currentPage: 2,
      pageSize: 10,
      tableData: _.cloneDeep(allTableData),
      quoteDataTable: 'dataList',
      searchWords: [],
      DrawerVisible: false,
      DrawerHeight: 400,
      AutoCompleteDataSource: ['测试', '梦颖', '阿华', 'ying', 'hua', '1234567890', 'abcdefghijklmn', 'opqrstuvwxyz'],
      AutoCompleteAllData: ['测试', '梦颖', '阿华', 'ying', 'hua', '1234567890', 'abcdefghijklmn', 'opqrstuvwxyz']
    };
    this.dataStore = {
      lastEmptyDate: dayjs().valueOf()
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('dataList getDerivedStateFromProps ? nextProps', nextProps);
    console.log('dataList getDerivedStateFromProps ? prevState', prevState);
    // console.log("dataList getDerivedStateFromProps ? nextProps", JSON.stringify(nextProps));
    // console.log("dataList getDerivedStateFromProps ? prevState", JSON.stringify(prevState));
    return null;
  }

  render() {
    return (
      <div className="dataList-body">
        <div className="dataList-body__nav">
          <Breadcrumb itemRender={myUtil.Nav.itemRenderWrap(routes)} routes={routes} separator=">" />
        </div>
        <div className="dataList-body__cont">
          <div className="dataList-body__cont--opera">
            <Row align="middle" justify="center" gutter={0}>
              <Col
                xs={{ span: 22, offset: 1 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 16, offset: 0 }}
                lg={{ span: 16, offset: 0 }}
                xl={{ span: 16, offset: 0 }}
                xxl={{ span: 16, offset: 0 }}
              >
                <ButtonGroup>
                  <Button
                    type="default"
                    icon="plus-circle"
                    title="添加上传"
                    onClick={this.addUploadOnClick.bind(this)}
                  />
                  <Button type="default" icon="close" title="删除选中" onClick={this.delSelectedOnClick.bind(this)} />
                  <Button type="default" icon="delete" title="跳转至回收站" href="recycle.html" />
                </ButtonGroup>
              </Col>
              <Col
                style={{
                  textAlign: ['xxl', 'xl', 'lg', 'md'].includes(myUtil.DOM.getRP()) ? 'right' : 'left',
                  marginTop: ['xxl', 'xl', 'lg', 'md'].includes(myUtil.DOM.getRP()) ? 0 : 5
                }}
                xs={{ span: 22, offset: 1 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
                xxl={{ span: 8, offset: 0 }}
              >
                <div style={{ display: 'inline-block' }}>
                  <Search
                    placeholder="请输入搜索值"
                    enterButton={false}
                    allowClear
                    style={{ width: 300 }}
                    onSearch={this.InputOnSearch.bind(this)}
                    onChange={this.InputOnChange.bind(this)}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="dataList-body__cont--table" style={{ marginTop: 10 }}>
            <DataTable
              pagination={{
                current: this.state.currentPage,
                pageSize: this.state.pageSize,
                pageSizeOptions: ['2', '5', '10', '20', '50'],
                showSizeChanger: true,
                showQuickJumper: true
              }}
              quoteDataTable={this.state.quoteDataTable}
              searchWords={this.state.searchWords}
              selectedRowKeys={this.state.selectedRowKeys}
              tableData={this.state.tableData}
              stateKeyInProps={['pagination', 'quoteDataTable', 'searchWords', 'selectedRowKeys', 'tableData']}
            />
          </div>
        </div>
        <AdditionUpload
          ref="AdditionUpload"
          AutoCompleteDataSource={this.state.AutoCompleteDataSource}
          AutoCompleteAllData={this.state.AutoCompleteAllData}
          DrawerHeight={this.state.DrawerHeight}
          DrawerVisible={this.state.DrawerVisible}
          stateKeyInProps={['AutoCompleteDataSource', 'DrawerHeight', 'DrawerVisible']}
        />
      </div>
    );
  }

  componentDidMount() {
    // 监听事件
    eventProxy.on({
      dataList__pageANDPageSize: (currentPage, pageSize, callback) => {
        this.setState(
          {
            currentPage,
            pageSize
          },
          () => {
            _.isFunction(callback) && callback();
          }
        );
      },
      DrawerOnClose: (DrawerVisible) => {
        this.setState({
          DrawerVisible
        });
      },
      AutoCompleteOnSearch: (AutoCompleteDataSource) => {
        this.setState({
          AutoCompleteDataSource
        });
      },
      TextAreaOnPressEnter: (DrawerHeight) => {
        this.setState({
          DrawerHeight
        });
      },
      dataList__rowSelection__onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys
        });
      },
      dataList__rowSelection__allData: () => {
        this.setState({
          selectedRowKeys: allKeys
        });
      },
      dataList__rowSelection__curPageAllData: (curPageAllRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, curPageAllRowKeys))
        }));
      },
      dataList__rowSelection__odd: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, newSelectedRowKeys))
        }));
      },
      dataList__rowSelection__even: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, newSelectedRowKeys))
        }));
      }
    });
    window.addEventListener('resize', _.debounce(this.onWindowResize.bind(this), 200), true);
    // window.addEventListener('resize', this.onWindowResize.bind(this), true);
    setTimeout(() => {
        NProgress.set(0.6);
    }, 800);
    setTimeout(() => {
        NProgress.done();
    }, 1600);
    console.log('dataList componentDidMount ? ?', new Date());
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('dataList shouldComponentUpdate ? nextProps', nextProps);
    console.log('dataList shouldComponentUpdate ? nextState', nextState);
    console.log('dataList shouldComponentUpdate ? nextContext', nextContext);
    // 因为是页面的顶级组件，需要总是触发render
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('dataList getSnapshotBeforeUpdate ? prevProps', prevProps);
    console.log('dataList getSnapshotBeforeUpdate ? prevState', prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('dataList componentDidUpdate ? prevProps', prevProps);
    console.log('dataList componentDidUpdate ? prevState', prevState);
    console.log('dataList componentDidUpdate ? snapshot', snapshot);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, true);
    console.log('dataList componentWillUnmount ? ?', new Date());
  }

  componentDidCatch(errorString, errorInfo) {
    console.warn('dataList componentDidCatch ? errorString', errorString);
    console.warn('dataList componentDidCatch ? errorInfo', errorInfo);
  }

  onWindowResize() {
    console.log(this);
    // this.forceUpdate(); 不会触发getDerivedStateFromProps和shouldComponentUpdate，直接走render
    let AdditionUpload = this.refs.AdditionUpload;
    let dom = ReactDOM.findDOMNode(AdditionUpload);
    if (!_.isNil(dom)) {
      let RP = myUtil.DOM.getRP(),
        // iH = dom.clientHeight; // 最外部容器高度
        iprops = AdditionUpload.props,
        iH = _.isEmpty(iprops) ? 400 : iprops.DrawerHeight;
      if (['xxl', 'xl'].includes(RP)) {
        this.setState({
          DrawerHeight: iH >= 500 ? 500 : iH
        });
      } else {
        this.setState({
          DrawerHeight: iH <= 550 ? 550 : iH
        });
      }
    }
  }

  InputOnSearch(value, event) {
    value = value.trim();
    let tableData = _.filter(allTableData, function(val, ind, arr) {
      // console.log("this", this) // undefined
      let flag = false;
      _.forOwn(val, function(v, k) {
        if (!['key'].includes(k)) {
          if (_.isNumber(v) || _.isString(v)) {
            let flag1 = _.toString(v).includes(value);
            flag = flag1;
            if (flag) return false;
          } else if (_.isArray(v) || _.isObject(v)) {
            let valArr = _.isArray(v) ? v : _.values(v);
            let flag2 = _.without(valArr, undefined, null)
              .map(function(vv) {
                return _.isNumber(vv) ? _.toString(vv) : vv;
              })
              .includes(value);
            flag = flag2;
            if (flag) return false;
          }
        }
      });
      return flag;
    });
    this.setState({
      currentPage: 1,
      tableData: tableData,
      searchWords: [value]
    });
  }

  InputOnChange(e) {
    if (_.eq(_.trim(e.currentTarget.value), '')) {
      let inow = dayjs().valueOf();
      if (inow - this.dataStore.lastEmptyDate > 3000) {
        this.setState({
          currentPage: 1,
          tableData: _.cloneDeep(allTableData),
          searchWords: []
        });
      }
      this.dataStore.lastEmptyDate = inow;
    }
  }

  addUploadOnClick() {
    this.setState({
      DrawerVisible: true
    });
  }

  delSelectedOnClick() {
    if (this.state.selectedRowKeys.length > 0) {
      let that = this;
      let iConfirm = confirm({
        title: '你确定要删除以下行数据？',
        content: 'Key值为' + _.sortBy(this.state.selectedRowKeys).join('、') + '的行数据将要被删除',
        autoFocusButton: 'cancel',
        onOk() {
          iConfirm.update({
            okButtonProps: {
              disabled: true,
              loading: true
            }
          });
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              notification.success({
                key: 'delSelectedOnClick_success',
                description: '删除成功！',
                icon: <Icon type="check" style={{ color: '#108ee9' }} />,
                message: '删除提示'
              });
              that.setState((prevState, props) => ({
                tableData: _.filter(prevState.tableData, function(o) {
                  return !prevState.selectedRowKeys.includes(o.key);
                }),
                selectedRowKeys: []
              }));
              setTimeout(() => {
                notification.success({
                  key: 'delSelectedOnClick_success',
                  description: '正在更新界面',
                  icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                  message: '删除提示'
                });
                iConfirm.update({
                  okButtonProps: {
                    disabled: false,
                    loading: false
                  }
                });
                iConfirm.destroy();
              }, 700);
            }, 1600);
          }).catch(() => message.error('删除失败！'));
        },
        onCancel() {
          message.info('未做处理！');
        }
      });
    } else {
      message.warn('未选中行数据！', 1).then(() => message.info('请先选中数据再进行删除！'));
    }
  }
}

export default Index;
