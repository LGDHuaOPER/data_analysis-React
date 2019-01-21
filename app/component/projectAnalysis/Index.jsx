import React from 'react';
import { Breadcrumb, Collapse, List, Tag } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import NProgress from 'nprogress';
import SplitPane from 'react-split-pane';
import myUtil from '../../public/js/myUtil';
import mockData from '../../public/js/mockData';
import eventProxy from '../../public/js/eventProxy';
import myLifeCircle from '../../public/js/myLifeCircle';
import DataTable from '../dataTable/Index';
import '../../public/css/libs/react-split-pane.css';
import '../../public/css/projectAnalysis.pcss';

const Panel = Collapse.Panel;

const routes = [
  {
    path: 'index',
    breadcrumbName: '系统主页面',
    icon: 'home',
    url: 'index.html'
  },
  {
    path: 'projectAnalysis',
    breadcrumbName: '工程分析',
    icon: 'experiment',
    url: 'projectAnalysis.html'
  }
];

const allTableData = _.cloneDeep(mockData.tableData);
const allKeys = _.cloneDeep(mockData.allKeys);
const dataSource = {
  DC: [
    {
      title: 'ID-VD',
      description: 'DC之ID-VD'
    },
    {
      title: 'ID-VG',
      description: 'DC之ID-VG'
    }
  ],
  RTP: [
    {
      title: 'BTI',
      description: 'RTP之BTI'
    },
    {
      title: 'HCI',
      description: 'RTP之HCI'
    }
  ],
  'RF-S2P': [
    {
      title: 'SP2',
      description: 'RF-S2P之SP2'
    }
  ]
};

myLifeCircle.setBaseOptions({
  'getDerivedStateFromProps.componentLastProps': 'componentLastProps'
});

class Index extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      currentPage: 1,
      pageSize: 5,
      tableData: _.cloneDeep(allTableData),
      quoteDataTable: 'projectAnalysis',
      searchWords: [],
      /*第二个表格*/
      selectedRowKeys2: [], // Check here to configure the default column
      currentPage2: 1,
      pageSize2: 5,
      tableData2: [],
      quoteDataTable2: 'projectAnalysis2',
      outSplitPane: {
        defaultSize: 250,
        minSize: 200,
        maxSize: 300
      },
      inSplitPane: {
        defaultSize: 400,
        minSize: 300,
        maxSize: 500
      }
    };
    this.dataStore = {
      lastEmptyDate: dayjs().valueOf(),
      allKeys2: []
    };

    myUtil.Event.documentReady(() => {
      let size = Math.floor(document.getElementById('proj-content').clientHeight * 0.5);
      size = size < 300 ? 300 : size;
      this.setState((prevState, props) => ({
        inSplitPane: Object.assign({}, prevState.inSplitPane, {
          defaultSize: size,
          minSize: Math.floor(size * 0.8),
          maxSize: Math.ceil(size * 1.2)
        })
      }));
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('projectAnalysis getDerivedStateFromProps ? nextProps', nextProps);
    console.log('projectAnalysis getDerivedStateFromProps ? prevState', prevState);
    // console.log("dataList getDerivedStateFromProps ? nextProps", JSON.stringify(nextProps));
    // console.log("dataList getDerivedStateFromProps ? prevState", JSON.stringify(prevState));
    return null;
  }

  render() {
    return (
      <div className="projectAnalysis-body">
        <div className="projectAnalysis-body__nav">
          <Breadcrumb itemRender={myUtil.Nav.itemRenderWrap(routes)} routes={routes} separator=">" />
        </div>
        <div className="projectAnalysis-body__cont">
          <div className="projectAnalysis-body__contIn">
            <SplitPane
              primary="second"
              split="vertical"
              defaultSize={this.state.outSplitPane.defaultSize}
              minSize={this.state.outSplitPane.minSize}
              maxSize={this.state.outSplitPane.maxSize}
              onDragFinished={(size) => {
                console.log('outSize', size);
              }}
            >
              <SplitPane
                allowResize={true}
                primary="first"
                split="horizontal"
                defaultSize={this.state.inSplitPane.defaultSize}
                minSize={this.state.inSplitPane.minSize}
                maxSize={this.state.inSplitPane.maxSize}
                paneStyle={{ overflowY: 'auto' }}
                pane2Style={{ marginTop: 20 }}
                onDragFinished={(size) => {
                  console.log('inSize', size);
                }}
              >
                <div style={Object.assign({}, this.cssStyle.sizeAttr.width1)}>
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
                <div style={Object.assign({}, this.cssStyle.sizeAttr.width1)}>
                  {/*<div style={{position: 'sticky', top: 2}}>选中的数据</div>*/}
                  <DataTable
                    pagination={{
                      current: this.state.currentPage2,
                      pageSize: this.state.pageSize2,
                      pageSizeOptions: ['2', '5', '10', '20', '50'],
                      showSizeChanger: true,
                      showQuickJumper: true
                    }}
                    quoteDataTable={this.state.quoteDataTable2}
                    searchWords={[]}
                    selectedRowKeys={this.state.selectedRowKeys2}
                    tableData={this.state.tableData2}
                    stateKeyInProps={['pagination', 'quoteDataTable', 'selectedRowKeys', 'tableData']}
                  />
                </div>
              </SplitPane>
              <div>
                <Collapse accordion>
                  <Panel header="DC" key="DC">
                    <List
                      itemLayout="horizontal"
                      dataSource={dataSource.DC}
                      renderItem={(item) => (
                        <List.Item actions={[<Tag color="orange">待开发</Tag>]}>
                          <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                  <Panel header="RTP" key="RTP">
                    <List
                      itemLayout="horizontal"
                      dataSource={dataSource.RTP}
                      renderItem={(item) => (
                        <List.Item actions={[<Tag color="orange">待开发</Tag>]}>
                          <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                  <Panel header="RF-S2P" key="RF-S2P">
                    <List
                      itemLayout="horizontal"
                      dataSource={dataSource['RF-S2P']}
                      renderItem={(item) => (
                        <List.Item actions={[<Tag color="green">已开发</Tag>]}>
                          <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                </Collapse>
              </div>
            </SplitPane>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // 监听事件
    // window.addEventListener('resize', this.onWindowResize.bind(this), true);
    // var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    setTimeout(() => {
      NProgress.set(0.3);
    }, 100);
    setTimeout(() => {
      NProgress.set(0.6);
    }, 1000);
    setTimeout(() => {
      NProgress.done();
    }, 1600);

    eventProxy.on({
      projectAnalysis__pageANDPageSize: (currentPage, pageSize, callback) => {
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
      projectAnalysis__rowSelection__onChange: (selectedRowKeys, selectedRows) => {
        this.setState(
          (prevState, props) => ({
            tableData2: selectedRows,
            // tableData2: _.uniqWith(_.concat(prevState.tableData2, selectedRows), _.isEqual),
            selectedRowKeys
          }),
          () => {
            this.dataStore.allKeys2 = selectedRowKeys;
          }
        );
      },
      projectAnalysis__rowSelection__allData: () => {
        this.setState({
          selectedRowKeys: allKeys
        });
      },
      projectAnalysis__rowSelection__curPageAllData: (curPageAllRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, curPageAllRowKeys))
        }));
      },
      projectAnalysis__rowSelection__odd: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, newSelectedRowKeys))
        }));
      },
      projectAnalysis__rowSelection__even: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys: _.uniq(_.concat(prevState.selectedRowKeys, newSelectedRowKeys))
        }));
      },
      projectAnalysis2__pageANDPageSize: (currentPage2, pageSize2, callback) => {
        this.setState(
          {
            currentPage2,
            pageSize2
          },
          () => {
            _.isFunction(callback) && callback();
          }
        );
      },
      projectAnalysis2__rowSelection__onChange: (selectedRowKeys2) => {
        this.setState({
          selectedRowKeys2
        });
      },
      projectAnalysis2__rowSelection__allData: () => {
        this.setState({
          selectedRowKeys2: this.dataStore.allKeys2
        });
      },
      projectAnalysis2__rowSelection__curPageAllData: (curPageAllRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys2: _.uniq(_.concat(prevState.selectedRowKeys2, curPageAllRowKeys))
        }));
      },
      projectAnalysis2__rowSelection__odd: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys2: _.uniq(_.concat(prevState.selectedRowKeys2, newSelectedRowKeys))
        }));
      },
      projectAnalysis2__rowSelection__even: (newSelectedRowKeys) => {
        this.setState((prevState, props) => ({
          selectedRowKeys2: _.uniq(_.concat(prevState.selectedRowKeys2, newSelectedRowKeys))
        }));
      },
      OperIcon__OnSearch: (value) => {
        this.setState((prevState, props) => ({
          searchWords: [value]
        }));
      }
    });
    console.log('projectAnalysis componentDidMount ? ?', new Date());
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('projectAnalysis shouldComponentUpdate ? nextProps', nextProps);
    console.log('projectAnalysis shouldComponentUpdate ? nextState', nextState);
    console.log('projectAnalysis shouldComponentUpdate ? nextContext', nextContext);
    // 因为是页面的顶级组件，需要总是触发render
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('projectAnalysis getSnapshotBeforeUpdate ? prevProps', prevProps);
    console.log('projectAnalysis getSnapshotBeforeUpdate ? prevState', prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('projectAnalysis componentDidUpdate ? prevProps', prevProps);
    console.log('projectAnalysis componentDidUpdate ? prevState', prevState);
    console.log('projectAnalysis componentDidUpdate ? snapshot', snapshot);
  }

  componentWillUnmount() {
    console.log('projectAnalysis componentWillUnmount ? ?', new Date());
  }

  componentDidCatch(errorString, errorInfo) {
    console.warn('projectAnalysis componentDidCatch ? errorString', errorString);
    console.warn('projectAnalysis componentDidCatch ? errorInfo', errorInfo);
  }
}

Index.prototype.cssStyle = {
  positionAttr: {},
  sizeAttr: {
    width1: {
      width: '99%'
    }
  },
  characterAttr: {},
  backgroundAttr: {},
  otherAttr: {},
  combiningAttr: {}
};

export default Index;
