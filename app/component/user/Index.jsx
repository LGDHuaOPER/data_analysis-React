import React from 'react';
import { Breadcrumb, Row, Col, Button, Icon, Input, Modal, message, notification } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import NProgress from 'nprogress';
import Snow from '../common/Snow';
import myUtil from '../../public/js/myUtil';
import mockData from '../../public/js/mockData';
import eventProxy from '../../public/js/eventProxy';
import myLifeCircle from '../../public/js/myLifeCircle';
import DataTable from '../dataTable/Index';
import '../../public/css/recycle.pcss';

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
  },
  {
    path: 'recycle',
    breadcrumbName: '回收站',
    icon: 'delete',
    url: 'recycle.html'
  }
];

const allTableData = _.cloneDeep(mockData.recycleTableData);
const allKeys = _.cloneDeep(mockData.recycleAllKeys);
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
      currentPage: 1,
      pageSize: 5,
      tableData: _.cloneDeep(allTableData),
      quoteDataTable: 'recycle',
      searchWords: []
    };
    this.dataStore = {
      lastEmptyDate: dayjs().valueOf()
    };
    this.delSelectedOnClick = this.delSelectedOnClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('recycle getDerivedStateFromProps ? nextProps', nextProps);
    console.log('recycle getDerivedStateFromProps ? prevState', prevState);
    // console.log("recycle getDerivedStateFromProps ? nextProps", JSON.stringify(nextProps));
    // console.log("recycle getDerivedStateFromProps ? prevState", JSON.stringify(prevState));
    return null;
  }

  render() {
    return (
      <div className="recycle-body">
          <Snow></Snow>
      </div>
    );
  }

  componentDidMount() {
    // 监听事件
    eventProxy.on({
      recycle__pageANDPageSize: (currentPage, pageSize, callback) => {
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
      recycle__rowSelection__onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys
        });
      },
      recycle__rowSelection__allData: () => {
        this.setState({
          selectedRowKeys: allKeys
        });
      },
      recycle__rowSelection__curPageAllData: (curPageAllRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, curPageAllRowKeys))
        }));
      },
      recycle__rowSelection__odd: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, newSelectedRowKeys))
        }));
      },
      recycle__rowSelection__even: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, newSelectedRowKeys))
        }));
      }
    });
    setTimeout(() => {
      NProgress.set(0.6);
    }, 800);
    setTimeout(() => {
      NProgress.done();
    }, 1600);
    console.log('recycle componentDidMount ? ?', new Date());
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('recycle shouldComponentUpdate ? nextProps', nextProps);
    console.log('recycle shouldComponentUpdate ? nextState', nextState);
    console.log('recycle shouldComponentUpdate ? nextContext', nextContext);
    // 因为是页面的顶级组件，需要总是触发render
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('recycle getSnapshotBeforeUpdate ? prevProps', prevProps);
    console.log('recycle getSnapshotBeforeUpdate ? prevState', prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('recycle componentDidUpdate ? prevProps', prevProps);
    console.log('recycle componentDidUpdate ? prevState', prevState);
    console.log('recycle componentDidUpdate ? snapshot', snapshot);
  }

  componentWillUnmount() {
    console.log('recycle componentWillUnmount ? ?', new Date());
  }

  componentDidCatch(errorString, errorInfo) {
    console.warn('recycle componentDidCatch ? errorString', errorString);
    console.warn('recycle componentDidCatch ? errorInfo', errorInfo);
  }

  InputOnSearch(value, event) {
    value = value.trim();
    let tableData = _.filter(allTableData, function(val, ind, arr) {
      // console.log("this", this) // undefined
      let flag = false;
      _.forOwn(val, function(v, k) {
        if (!['key'].includes(k)) {
          if (_.isNumber(v) || _.isString(v)) {
            flag = _.toString(v).includes(value);
            if (flag) return false;
          } else if (_.isArray(v) || _.isObject(v)) {
            let valArr = _.isArray(v) ? v : _.values(v);
            let flag1 = _.without(valArr, undefined, null)
              .map(function(vv) {
                return _.isNumber(vv) ? _.toString(vv) : vv;
              })
              .includes(value);
            flag = flag1;
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

  delSelectedOnClick() {
    if (this.state.selectedRowKeys.length > 0) {
      let that = this;
      let iConfirm = confirm({
        title: '你确定要永久删除以下行数据？',
        content: 'Key值为' + _.sortBy(this.state.selectedRowKeys).join('、') + '的行数据将要被永久删除，不可恢复',
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
                message: '永久删除提示'
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
                  message: '永久删除提示'
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
          }).catch(() => message.error('永久删除失败！'));
        },
        onCancel() {
          message.info('未做处理！');
        }
      });
    } else {
      message.warn('未选中行数据！', 1).then(() => message.info('请先选中数据再进行永久删除！'));
    }
  }

  recoverSelectedOnClick() {
    if (this.state.selectedRowKeys.length > 0) {
      let that = this;
      let iConfirm = confirm({
        title: '你确定要恢复以下行数据？',
        content:
          'Key值为' +
          _.sortBy(this.state.selectedRowKeys).join('、') +
          '的行数据将要被恢复，成功后在数据管理主页面会看到',
        autoFocusButton: 'ok',
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
                key: 'recoverSelectedOnClick_success',
                description: '恢复成功！',
                icon: <Icon type="check" style={{ color: '#108ee9' }} />,
                message: '恢复提示'
              });
              that.setState((prevState, props) => ({
                tableData: _.filter(prevState.tableData, function(o) {
                  return !prevState.selectedRowKeys.includes(o.key);
                }),
                selectedRowKeys: []
              }));
              setTimeout(() => {
                notification.success({
                  key: 'recoverSelectedOnClick_success',
                  description: '正在更新界面',
                  icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                  message: '恢复提示'
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
          }).catch(() => message.error('恢复失败！'));
        },
        onCancel() {
          message.info('未做处理！');
        }
      });
    } else {
      message.warn('未选中行数据！', 1).then(() => message.info('请先选中数据再进行恢复！'));
    }
  }
}

export default Index;
