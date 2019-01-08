import React from 'react';
import { Button, Icon, Table, Divider, Tag, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import _ from 'lodash';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.css'

const { Column, ColumnGroup } = Table;

class Index extends React.Component {
    /*如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;
    如果你在constructor中要使用this.props,就必须给super加参数：super(props)；
    （无论有没有constructor，在render中this.props都是可以使用的，这是React自动附带的；）
    如果没用到constructor,是可以不写的；React会默认添加一个空的constructor。*/
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: props.selectedRowKeys, // Check here to configure the default column
            tableData: props.tableData,
            pagination: this.props.pagination
        };
        console.log(props)
        console.log(this.props)
    }

    pageOnChange(page, pageSize) {
        this.setState({
            pagination: Object.assign(this.state.pagination, {
                current: page,
                pageSize: pageSize
            })
        });
    }

    pageOnShowSizeChange(current, size) {
        // this.setState({
        //     pagination: Object.assign(this.props.pagination, {
        //         current: current,
        //         pageSize: size
        //     })
        // }, () => {this.forceUpdate();});
        this.setState((prevState, props) => ({
            pagination: Object.assign(this.state.pagination, {
                current: current,
                pageSize: size
            })
        }), () => {this.forceUpdate();});
    }

    render() {
        const { selectedRowKeys, tableData } = this.state;
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            // 去掉『全选』『反选』两个默认选项
            hideDefaultSelections: true,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({ selectedRowKeys });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
            selections: [{
                key: 'all-data',
                text: '选中所有数据',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(3).keys()].map((v) => _.toString(v))
                    });
                },
            }, {
                key: 'curPage-all-data',
                text: '选中当前页数据',
                onSelect: (changableRowKeys) => {
                    this.setState({ selectedRowKeys: [...Array(3).keys()].map((v) => _.toString(v)) });
                },
            }, {
                key: 'odd',
                text: '选中奇数行数据',
                onSelect: (changableRowKeys) => {
                    console.log(changableRowKeys)
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: '选中偶数行数据',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }]
        };
        return (
            <LocaleProvider locale={zh_CN}>
                <Table dataSource={tableData} rowSelection={rowSelection} bordered
                       expandedRowRender={(record, index) => <p style={{ margin: 0 }}>第{index}条: 年龄{record.age}</p>}
                       pagination={{
                           current: this.state.pagination.current,
                           pageSize: this.state.pagination.pageSize,
                           pageSizeOptions: this.state.pagination.pageSizeOptions,
                           showSizeChanger: this.state.pagination.showSizeChanger,
                           showQuickJumper: this.state.pagination.showQuickJumper,
                           total: tableData.length,
                           onChange: this.pageOnChange.bind(this),
                           onShowSizeChange: this.pageOnShowSizeChange.bind(this)
                       }}>
                    <ColumnGroup title="Name">
                        <Column
                            title="First Name"
                            dataIndex="firstName"
                            key="firstName"
                        />
                        <Column
                            title="Last Name"
                            dataIndex="lastName"
                            key="lastName"
                        />
                    </ColumnGroup>
                    <Column
                        title="Age"
                        dataIndex="age"
                        key="age"
                    />
                    <Column
                        title="Address"
                        dataIndex="address"
                        key="address"
                    />
                    <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <span>{tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}</span>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                            <a href="javascript:;">Invite {record.lastName}</a>
                            <Divider type="vertical"/>
                            <a href="javascript:;">Delete</a>
                        </span>
                        )}
                    />
                </Table>
            </LocaleProvider>
        );
    }
}

export default Index;