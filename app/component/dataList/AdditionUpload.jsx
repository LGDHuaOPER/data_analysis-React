import React from 'react';
import { Drawer, Form, Button, Row, Col, Select, AutoComplete, Input, Upload, Icon, message } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import myUtil from '../../public/js/myUtil';
import eventProxy from '../../public/js/eventProxy';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.css'

const { Option, OptGroup } = Select;
const { TextArea } = Input;
const Dragger = Upload.Dragger;

const DraggerProps = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class AdditionUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DrawerVisible: this.props.DrawerVisible,
            AutoCompleteDataSource: props.AutoCompleteDataSource
        };
        this.dataStore = {
            AutoCompleteAllData: props.AutoCompleteAllData
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            DrawerVisible: nextProps.DrawerVisible,
            AutoCompleteDataSource: nextProps.AutoCompleteDataSource
        });
    }

    DrawerOnClose() {
        eventProxy.trigger('DrawerOnClose', false);
    }

    AutoCompleteOnSearch(value) {
        let AutoCompleteDataSource = this.dataStore.AutoCompleteAllData.filter((v) => _.toString(v).includes(value));
        eventProxy.trigger('AutoCompleteOnSearch', AutoCompleteDataSource);
    }

    render() {
        return (
            <Drawer
                destroyOnClose={true}
                getContainer='body'
                height={400}
                placement={'top'}
                title='添加上传'
                visible={this.state.DrawerVisible}
                onClose={this.DrawerOnClose.bind(this)}
            >
                <Row align="middle" justify="center" gutter={0}>
                    <Col xs={{ span: 22, offset: 1 }} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }} xxl={{ span: 6, offset: 1 }}>
                        <Row align="middle" justify="center" gutter={0}>
                            <Col span={6}>数据格式<span style={{color: 'red', fontWeight: 600, fontSize: 16}}>*</span></Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                                <Select
                                    allowClear
                                    filterOption={(input, option) => {
                                            if(_.eq('OptGroup', option.type.name)){
                                                if(_.isArray(option.props.children)){
                                                    let a = _.find(option.props.children, (v, i) => {
                                                        return v.props.children.includes(input);
                                                    });
                                                    if(_.isNil(a)){
                                                        return false;
                                                    }else{
                                                        return true;
                                                    }
                                                }else if(_.isObject(option.props.children)){
                                                    return option.props.children.props.children.includes(input);
                                                }
                                            }else if(_.eq('Option', option.type.name)){
                                                return option.props.children.includes(input);
                                            }
                                        }
                                    }
                                    labelInValue
                                    notFoundContent={'未找到'}
                                    optionFilterProp="children"
                                    placeholder={"请选择数据格式"}
                                    showSearch
                                    style={{width: '99%'}}
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
                    <Col xs={{ span: 22, offset: 1 }} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }} xxl={{ span: 6, offset: 1 }}>
                        <Row align="middle" justify="center" gutter={0}>
                            <Col span={6}>产品类别<span style={{color: 'red', fontWeight: 600, fontSize: 16}}>*</span></Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                                <AutoComplete
                                    allowClear
                                    backfill
                                    dataSource={this.state.AutoCompleteDataSource}
                                    optionLabelProp={'children'}
                                    placeholder={'请输入或选择产品类别'}
                                    style={{width: '99%'}}
                                    onSearch={this.AutoCompleteOnSearch.bind(this)}
                                >
                                </AutoComplete>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }} xxl={{ span: 6, offset: 1 }}>
                        <Row align="middle" justify="center" gutter={0}>
                            <Col span={6}>描述</Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                                <TextArea maxlength='100' placeholder="最多输入100个字符" autosize={{ minRows: 1, maxRows: 5 }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div style={{height: 260, maxHeight: 260, overflowY: 'auto'}}>
                    <Row align="middle" justify="center" gutter={0} style={{marginTop: 10}}>
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
}

export default AdditionUpload;