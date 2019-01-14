import React from "react";
import {
  Drawer,
  Form,
  Button,
  Row,
  Col,
  Select,
  AutoComplete,
  Input,
  Upload,
  Icon,
  message
} from "antd";
import _ from "lodash";
import dayjs from "dayjs";
// import relativeTime from 'dayjs/plugin/relativeTime';
import myUtil from "../../public/js/myUtil";
import eventProxy from "../../public/js/eventProxy";
import myLifeCircle from "../../public/js/myLifeCircle";
import "antd/dist/antd.less"; // or 'antd/dist/antd.css'

const { Option, OptGroup } = Select;
const { TextArea } = Input;
const Dragger = Upload.Dragger;

const DraggerProps = {
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  onChange(info) {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

class AdditionUpload extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      AutoCompleteDataSource: this.props.AutoCompleteDataSource,
      DrawerHeight: props.DrawerHeight,
      DrawerVisible: props.DrawerVisible,
      stateKeyInProps: props.stateKeyInProps,
      componentLastProps: props
    };
    //新的ref绑定方法
    this.dataStore = React.createRef();
    this.dataStore = {
      AutoCompleteAllData: props.AutoCompleteAllData
    };
    console.log("AdditionUpload constructor ? this", this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return myLifeCircle.getDerivedStateFromProps({
      componentName: "AdditionUpload",
      nextProps: nextProps,
      prevState: prevState,
      customReturn: null
    });
  }

  render() {
    console.log("AdditionUpload render ? ?", new Date());
    return (
      <Drawer
        destroyOnClose={true}
        getContainer="body"
        height={this.state.DrawerHeight}
        placement={"top"}
        title="添加上传"
        visible={this.state.DrawerVisible}
        onClose={this.DrawerOnClose.bind(this)}
        onResize={this.DrawerOnClose.bind(this)}
      >
        <Row type="flex" align="top" justify="space-around" gutter={0}>
          <Col xs={22} sm={10} md={10} lg={10} xl={7} xxl={7} style={{ marginTop: 5 }}>
            <Row gutter={0}>
              <Col span={6}>
                数据格式<span style={{ color: "red", fontWeight: 600, fontSize: 16 }}>*</span>
              </Col>
              <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                <Select
                  allowClear
                  filterOption={(input, option) => {
                    if (_.eq("OptGroup", option.type.name)) {
                      if (_.isArray(option.props.children)) {
                        let a = _.find(option.props.children, (v, i) => {
                          return v.props.children.includes(input);
                        });
                        if (_.isNil(a)) {
                          return false;
                        } else {
                          return true;
                        }
                      } else if (_.isObject(option.props.children)) {
                        return option.props.children.props.children.includes(input);
                      }
                    } else if (_.eq("Option", option.type.name)) {
                      return option.props.children.includes(input);
                    }
                  }}
                  labelInValue
                  notFoundContent={"未找到"}
                  optionFilterProp="children"
                  placeholder={"请选择数据格式"}
                  showSearch
                  style={{ width: "99%" }}
                  // defaultValue={{ key: 'lucy' }}
                >
                  <OptGroup label="可以处理的数据格式">
                    <Option value="0">EOULU标准数据</Option>
                  </OptGroup>
                  <OptGroup label="正在开发处理的数据格式">
                    <Option value="1">博达微数据</Option>
                    <Option value="2">新Excel格式</Option>
                    <Option value="3">TXT数据格式</Option>
                  </OptGroup>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col xs={22} sm={10} md={10} lg={10} xl={7} xxl={7} style={{ marginTop: 5 }}>
            <Row gutter={0}>
              <Col span={6}>
                产品类别<span style={{ color: "red", fontWeight: 600, fontSize: 16 }}>*</span>
              </Col>
              <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                <AutoComplete
                  allowClear
                  backfill
                  dataSource={this.state.AutoCompleteDataSource}
                  optionLabelProp={"children"}
                  placeholder={"请输入或选择产品类别"}
                  style={{ width: "99%" }}
                  onSearch={this.AutoCompleteOnSearch.bind(this)}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={22} sm={22} md={22} lg={22} xl={7} xxl={7} style={{ marginTop: 5 }}>
            <Row gutter={0}>
              <Col xs={6} sm={4} md={4} lg={4} xl={4} xxl={4}>
                描述
              </Col>
              <Col xs={18} sm={20} md={20} lg={20} xl={20} xxl={20}>
                <TextArea
                  maxLength="100"
                  placeholder="最多输入100个字符"
                  autosize={{ minRows: 1, maxRows: 5 }}
                  onPressEnter={this.TextAreaOnPressEnter.bind(this)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ marginTop: 5, height: 260, maxHeight: 260, overflowY: "auto" }}>
          <Row gutter={0} style={{ marginTop: 5 }}>
            <Dragger {...DraggerProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域进行上传</p>
              <p className="ant-upload-hint">支持Excel、TXT、zip、rar格式</p>
            </Dragger>
          </Row>
        </div>
      </Drawer>
    );
  }

  componentDidMount() {
    // 监听事件，请求数据
    console.log("AdditionUpload componentDidMount ? ?", new Date());
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return myLifeCircle.shouldComponentUpdate({
      componentName: "AdditionUpload",
      prevState: this.state,
      nextProps: nextProps,
      nextState: nextState,
      nextContext: nextContext,
      customReturn: null,
      propsShould: true,
      propsShouldReturn: null
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("AdditionUpload getSnapshotBeforeUpdate ? prevProps", prevProps);
    console.log("AdditionUpload getSnapshotBeforeUpdate ? prevState", prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("AdditionUpload componentDidUpdate ? prevProps", prevProps);
    console.log("AdditionUpload componentDidUpdate ? prevState", prevState);
    console.log("AdditionUpload componentDidUpdate ? snapshot", snapshot);
  }

  componentWillUnmount() {
    console.log("AdditionUpload componentWillUnmount ? ?", new Date());
  }

  componentDidCatch(errorString, errorInfo) {
    console.warn("AdditionUpload componentDidCatch ? errorString", errorString);
    console.warn("AdditionUpload componentDidCatch ? errorInfo", errorInfo);
  }

  DrawerOnClose() {
    eventProxy.trigger("DrawerOnClose", false);
  }

  AutoCompleteOnSearch(value) {
    let AutoCompleteDataSource = this.dataStore.AutoCompleteAllData.filter(v =>
      _.toString(v).includes(value)
    );
    eventProxy.trigger("AutoCompleteOnSearch", AutoCompleteDataSource);
  }

  TextAreaOnPressEnter(e) {
    let preHeight = parseFloat(e.currentTarget.style.height);
    if (preHeight < 113) eventProxy.trigger("TextAreaOnPressEnter", preHeight + 390);
  }
}

export default AdditionUpload;
