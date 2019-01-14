import React from 'react';
import { Button, Icon, Table, Divider, Tag, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import eventProxy from '../../public/js/eventProxy';
import myLifeCircle from '../../public/js/myLifeCircle';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.css'

const { Column, ColumnGroup } = Table;

class Index extends React.Component {
  /*生命周期功能替换一览*/
  /*static getDerivedStateFromProps(nextProps, prevState) {
        4. Updating state based on props
        7. Fetching external data when props change
    }

    constructor() {
        1. Initializing state
    }

    componentWillMount() {
        // 1. Initializing state
        // 2. Fetching external data
        // 3. Adding event listeners (or subscriptions)
    }

    componentDidMount() {
        2. Fetching external data
        3. Adding event listeners (or subscriptions)
    }

    componentWillReceiveProps() {
        // 4. Updating state based on props
        // 6. Side effects on props change
        // 7. Fetching external data when props change
    }

    shouldComponentUpdate() {
    }

    componentWillUpdate(nextProps, nextState) {
        // 5. Invoking external callbacks
        // 8. Reading DOM properties before an update

    }

    render() {
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        8. Reading DOM properties before an update
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        5. Invoking external callbacks
        6. Side effects on props change
    }

    componentWillUnmount() {
    }*/

  /*
   ****************************************************************************
   * Mounting阶段
   * 挂载
   * START
   ****************************************************************************
   */

  /*如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;
    如果你在constructor中要使用this.props,就必须给super加参数：super(props)；
    （无论有没有constructor，在render中this.props都是可以使用的，这是React自动附带的；）
    如果没用到constructor,是可以不写的；React会默认添加一个空的constructor。*/
  /*constructor是ES6对类的默认方法，通过 new命令生成对象实例时自动调用该方法。并且，该方法是类中必须有的，如果没有显示定义，则会默认添加空的constructor( )方法。当存在constructor的时候必须手动调用super方法。在constructor中如果要访问this.props需要传入props
    强调以下：
    1.存在constructor的时候必须手动调用super方法
    2.constructor中如果要访问this.props需要传入props*/
  constructor(props, context) {
    super(props);
    this.state = {
      selectedRowKeys: this.props.selectedRowKeys, // Check here to configure the default column
      tableData: props.tableData,
      pagination: props.pagination,
      stateKeyInProps: props.stateKeyInProps,
      componentLastProps: props
    };
    console.log('dataTable constructor ? props', props);
    // //新的ref绑定方法
    // this.inputRef = React.createRef();
    // this.textRef = React.createRef();
  }

  /*class的静态方法实例属性也可以初始化state
   * https://babeljs.io/docs/en/babel-plugin-proposal-class-properties */
  /*state = {
        list: []
    };*/

  /*触发时间：在组件构建之后(虚拟dom之后，实际dom挂载之前) ，以及每次获取新的props之后。
    每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state.
    配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法。
    在update阶段也会调用一次这个方法。*/
  /*在下列三种情况下，会调用getDerivedStateFromProps方法：
    组件实例化。
    组件的props发生变化。
    父组件重新渲染。
    this.setState()不会触发getDerivedStateFromProps()，但是this.forceUpdate()会。
    **这个新的函数主要致力于确保在需要state和props的时候是同步的，并致力于替换componentWillReceiveProps函数。
    这个函数将会在组件更新被调用同时也包括更新，就在constructor之后，所以你不再需要用constructor来根据props初始化state了。*/
  static getDerivedStateFromProps(nextProps, prevState) {
    return myLifeCircle.getDerivedStateFromProps({
      componentName: 'dataTable',
      nextProps: nextProps,
      prevState: prevState
    });
  }

  /*alias  componentWillMount*/
  /*组件将要挂载的时候调用。*/
  /* **对于某些操作比如说在willMount的时候去调接口的话，请将异步逻辑移步到componentDidMount生命周期，接口请求放在这里和即将到来的异步呈现模式冲突（其中请求可能被多次启动）。
    如果在willMount的时候想要把props的某些属性赋值给state状态机，请将此类操作直接在构造函数中进行。
    **componentWillMount不再建议使用
    可以做:
    通过this.setState更新state；
    在SSR（服务端渲染）时，执行具有副作用的函数（譬如：ajax）。
    不可以做:
    在客户端执行具有副作用的函数。（译者注：原文为cause side-effects (AJAX calls etc.) in case of server-side-rendering only，但在SSR时ajax操作则会在服务端和客户端执行两次。
    **服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用setState，render() 将会感知到更新后的state，将会执行仅一次，尽管 state 改变了。*/
  UNSAFE_componentWillMount() {
    console.log('dataTable UNSAFE_componentWillMount ? ?', new Date());
  }

  /*在update阶段也会调用一次这个方法。*/
  /* **当调用render的时候，组件会检查props和state并返回下列类型中的一个：
    react元素。
    字符串或者数字。
    Portals。
    null。(不渲染)
    Booleans。(不渲染)
    react.Fragment。
    **render() 方法是必须的。
    当调用的时候，会检测 this.props 和 this.state，返回一个单子级组件。该子级组件可以是虚拟的本地DOM 组件（比如 <div /> 或者 React.DOM.div()），也可以是自定义的复合组件。
    你也可以返回 null 或者 false 来表明不需要渲染任何东西。实际上，React渲染一个<noscript> 标签来处理当前的差异检查逻辑。当返回 null 或者 false 的时候，this.getDOMNode() 将返回 null。
    render() 函数应该是纯粹的，也就是说该函数不修改组件state，每次调用都返回相同的结果，不读写 DOM 信息，也不和浏览器交互（例如通过使用 setTimeout）。
    如果需要和浏览器交互，在 componentDidMount() 中或者其它生命周期方法中做这件事。保持render() 纯粹，可以使服务器端渲染更加切实可行，也使组件更容易被理解。*/
  render() {
    console.log('dataTable render ? ?', new Date());
    const { selectedRowKeys, tableData } = this.state;
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      // 去掉『全选』『反选』两个默认选项
      hideDefaultSelections: true,
      onChange: (newSelectedRowKeys, selectedRows) => {
        console.log('newSelectedRowKeys', newSelectedRowKeys);
        console.log('selectedRows', selectedRows);
        eventProxy.trigger('dataTable__rowSelection__onChange', newSelectedRowKeys);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
      }),
      selections: [
        {
          key: 'all-data',
          text: '选中所有数据',
          onSelect: (changableRowKeys) => {
            // changableRowKeys 为当前页所有key（不管以前有没有选中）
            eventProxy.trigger('dataTable__rowSelection__allData');
          }
        },
        {
          key: 'curPage-all-data',
          text: '选中当前页数据',
          onSelect: (changableRowKeys) => {
            eventProxy.trigger('dataTable__rowSelection__curPageAllData', changableRowKeys);
          }
        },
        {
          key: 'odd',
          text: '选中奇数行数据',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            eventProxy.trigger('dataTable__rowSelection__odd', newSelectedRowKeys);
          }
        },
        {
          key: 'even',
          text: '选中偶数行数据',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            eventProxy.trigger('dataTable__rowSelection__even', newSelectedRowKeys);
          }
        }
      ]
    };
    return (
      <LocaleProvider locale={zh_CN}>
        <Table
          dataSource={tableData}
          rowSelection={rowSelection}
          bordered
          expandedRowRender={(record, index) => (
            <p style={{ margin: 0 }}>
              第{index}条: 年龄{record.age}
            </p>
          )}
          pagination={{
            current: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            pageSizeOptions: this.state.pagination.pageSizeOptions,
            showSizeChanger: this.state.pagination.showSizeChanger,
            showQuickJumper: this.state.pagination.showQuickJumper,
            total: tableData.length,
            onChange: this.pageOnChange.bind(this),
            onShowSizeChange: this.pageOnShowSizeChange.bind(this)
          }}
        >
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <span>
                {tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </span>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a href="javascript:;">Invite {record.lastName}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
              </span>
            )}
          />
        </Table>
      </LocaleProvider>
    );
  }

  /*组件第一次加载完成*/
  /* **这个方法在整个生命周期中只会被调用一次。
    可以做:
    ajax操作。
    不可以做:
    调用this.setState因为会引起重渲染。
    **在这里调用接口数据请求和进行事件监听。有一个常见的错误观念认为，在componentWillMount中提取可以避免第一个空的渲染。
    在实践中，这从来都不是真的，因为React总是在componentWillMount之后立即执行渲染。
    如果数据在componentWillMount触发的时间内不可用，则无论你在哪里提取数据，第一个渲染仍将显示加载状态。这就是为什么在绝大多数情况下将提取移到componentDidMount没有明显效果。
    **这个方法会在组件建立之后立即调用。需要DOM节点的初始化应该放在这里。需要注意的是，在这里调用setState()会发生第二次render，
    但是这第二次render会发生在浏览器渲染之前，所以用户往往看不到第二次渲染，即使这样，也要小心使用这个方法，因为它会造成性能问题。
    **在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    如果想和其它JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX请求，可以在该方法中执行这些操作。*/
  componentDidMount() {
    console.log('dataTable componentDidMount ? ?', new Date());
  }

  /*
   ****************************************************************************
   * Mounting阶段
   * 挂载
   * END
   ****************************************************************************
   */

  /*
   ****************************************************************************
   * Update阶段
   * 更新
   * START
   ****************************************************************************
   */

  /*alias  componentWillReceiveProps*/
  /*在组件接收到新的props 的时候调用。在初始化渲染的时候，该方法不会调用。
   * 当props发生变化时执行，初始化render时不执行*/
  /* **用此函数可以作为react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。
    在该函数中调用 this.setState() 将不会引起第二次渲染。
    **在下列三种情况下，会调用UNSAFE_componentWillReceiveProps方法，但是官方不建议使用这个方法，官方建议使用static getDerivedStateFromProps方法。
    组件的props发生改变。
    父组件发生重新渲染。
    需要注意的是，在初始化props的时候并不会调用这个方法，this.setState()也不会触发这个方法。
    **在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，
    旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用*/
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('dataTable UNSAFE_componentWillReceiveProps ? ?', new Date());
    // this.setState({
    //     selectedRowKeys: nextProps.selectedRowKeys,
    //     tableData: nextProps.tableData,
    //     pagination: nextProps.pagination
    // });
  }

  /*在接收到新的props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用，在使用 forceUpdate 方法的时候也不会。
    如果确定新的props 和 state 不会导致组件更新，则此处应该 返回 false。*/
  /* **当props、state或context改变时，所有的React类都将会重新渲染他们自身。
    如果重渲染这个组件计算繁杂或是基于表现原因不建议时，将能通过这个函数决定是否重渲染。
    返回false将会阻止重渲染，返回’true’将不会进行阻止。
    不可以做:
    调用具有副作用的函数，ajax；
    调用this.setState。
    **这个方法的默认行为是每当state发生改变的时候就重新渲染组件。
    当初始化的时候，这个方法不会被调用，当使用forceUpdate()的时候，这个方法也不会调用。
    如果要提升性能的话，建议使用React.PureComponent，它在shouldComponentUpdate()的默认行为中使用了浅比较。你也可以在里面自己写比较方法。
    **如果 shouldComponentUpdate 返回false，则 render() 将不会执行，直到下一次 state 改变。（另外，componentWillUpdate 和 componentDidUpdate 也不会被调用。）
    默认情况下，shouldComponentUpdate 总会返回true，在 state 改变的时候避免细微的bug，但是如果总是小心地把 state 当做不可变的，在 render() 中只从 props 和state 读取值，此时你可以覆盖 shouldComponentUpdate 方法，实现新老 props 和state 的比对逻辑。
    如果性能是个瓶颈，尤其是有几十个甚至上百个组件的时候，使用 shouldComponentUpdate可以提升应用的性能。*/
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return myLifeCircle.shouldComponentUpdate({
      componentName: 'dataTable',
      prevState: this.state,
      nextProps: nextProps,
      nextState: nextState,
      nextContext: nextContext,
      customReturn: null,
      propsShould: true,
      propsShouldReturn: null
    });
  }

  /*alias  componentWillUpdate*/
  /*组件将要跟新的时候触发,即state树发生变化时触发
   * 在接收到新的props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。*/
  /* **在异步模式下使用componentWillUpdate都是不安全的，因为外部回调可能会多次调用只更新一次
    这个方法会在接受新props和state之后调用。官方不建议在里面调用setState()，要使用的话，建议在getDerivedStateFromProps方法里面使用。
    **使用该方法做一些更新之前的准备工作。
    注意：你不能在刚方法中使用 this.setState()。如果需要更新 state 来响应某个 prop 的改变，请使用 componentWillReceiveProps。
    **对于state，没有相似的方法： componentWillReceiveState。将要传进来的 prop 可能会引起 state 改变，反之则不然。
    如果需要在state 改变的时候执行一些操作，请使用 componentWillUpdate。*/
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('dataTable UNSAFE_componentWillUpdate ? nextProps', nextProps);
    console.log('dataTable UNSAFE_componentWillUpdate ? nextState', nextState);
  }

  /*触发时间: update发生的时候，在render之后，在组件dom渲染之前。*/
  /* **返回一个值，作为componentDidUpdate的第三个参数。
    配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法。
    在更新前记录原来的dom节点属性 — Reading DOM properties before an update
    **在upate之前获取dom节点，getSnapshotBeforeUpdate(prevProps, prevState)代替componentWillUpdate(nextProps, nextState)
    getSnapshotBeforeUpdate在render之后，但在节点挂载前
    componentDidUpdate(prevProps, prevState, snapshot)直接获得getSnapshotBeforeUpdate返回的dom属性值
    **被叫做"pre-commit phase"（预提期），将在Virtual DOM的变化影响到DOM之前被调用。如果你想读取当前DOM state将会非常有用。
    即使这个函数并不是static，也建议返回一个值，而不是更新component。返回的值将会作为第三个参数传给componentDidUpdate函数
    **新的getSnapshotBeforeUpdate生命周期在更新之前被调用（例如，在DOM被更新之前）。
    此生命周期的返回值将作为第三个参数传递给componentDidUpdate。
    （这个生命周期不是经常需要的，但可以用于在恢复期间手动保存滚动位置的情况。
    与componentDidUpdate一起，这个新的生命周期将覆盖旧版componentWillUpdate的所有用例
    **这个方法会在把渲染结果提交到DOM之前被调用。它可以返回一个参数，这个参数被componentDidUpdate(prevProps, prevState, snapshot)方法的第三个参数接收。
    **A snapshot value (or null) should be returned.*/
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('dataTable getSnapshotBeforeUpdate ? prevProps', prevProps);
    console.log('dataTable getSnapshotBeforeUpdate ? prevState', prevState);
    return null;
  }

  /*组件更新结束之后执行，在初始化render时不执行
    在组件的更新已经同步到DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。*/
  /* **这个方法会在组件更新前被调用，所以最好在这里面操作DOM。
    使用该方法可以在组件更新之后操作DOM 元素。*/
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('dataTable componentDidUpdate ? prevProps', prevProps);
    console.log('dataTable componentDidUpdate ? prevState', prevState);
    console.log('dataTable componentDidUpdate ? snapshot', snapshot);
  }

  /*
   ****************************************************************************
   * Update阶段
   * 更新
   * END
   ****************************************************************************
   */

  /*
   ****************************************************************************
   * Unmounting阶段
   * 移除
   * START
   ****************************************************************************
   */

  /*组件卸载后执行
   * 在组件从DOM 中移除的时候立刻被调用。*/
  /* **人们经常认为componentWillMount和componentWillUnmount总是配对，但这并不能保证。
    只有调用componentDidMount后，React才能保证稍后调用componentWillUnmount进行清理。
    出于这个原因，添加事件监听的推荐方式是使用componentDidMount生命周期：
    **如果想要添加事件监听函数，请移步到componentDidMount生命周期，在这里添加的话会导致服务器渲染（componentWillUnmount永远不会被调用）
    异步渲染（在渲染完成之前渲染可能被中断，导致componentWillUnmount不被调用）的内存泄漏。
    **利用这个方法清理组件所使用的各种计数器（setTimeout, setInterval），sockets或者是不再需要的表现。
    **这个方法会在组件被销毁时调用，所以在这里面做一些必要的清理，比如计时器，网络请求，订阅等等。
    **在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    **You should not call setState() in componentWillUnmount() because the component will never be re-rendered.*/
  componentWillUnmount() {
    console.log('dataTable componentWillUnmount ? ?', new Date());
  }

  /*
   ****************************************************************************
   * Unmounting阶段
   * 移除
   * END
   ****************************************************************************
   */

  /*
   ****************************************************************************
   * Error阶段
   * 错误
   * START
   ****************************************************************************
   */

  /*这个方法在组件catch到各种error之后调用，并进行处理。不要在里面改变数据流，它也不能处理本身抛出的错误。*/
  /* **这个生命周期方法能够相应自组件的事件，特别是对于任何没有被捕获的错误发生在自组件时。
    因此你可以在父元素中收集到这些错误并设置错误信息返回正确的信息或者记录在日志中返回给系统。
    errorString——error调用.toString()方法后的值；
    errorInfo——一个拥有componentStack组件调用栈的对象，能够追溯到error在哪里发生。
    */
  componentDidCatch(errorString, errorInfo) {
    console.warn('dataTable componentDidCatch ? errorString', errorString);
    console.warn('dataTable componentDidCatch ? errorInfo', errorInfo);
  }

  /*
   ****************************************************************************
   * Error阶段
   * 错误
   * END
   ****************************************************************************
   */

  pageOnChange(page, pageSize) {
    // 发布 pageANDPageSize 事件
    eventProxy.trigger('pageANDPageSize', page, pageSize);
  }

  pageOnShowSizeChange(current, size) {
    // this.setState({
    //     pagination: Object.assign(this.props.pagination, {
    //         current: current,
    //         pageSize: size
    //     })
    // }, () => {this.forceUpdate();});

    // this.setState((prevState, props) => ({
    //     pagination: Object.assign({}, this.state.pagination, {
    //         current: current,
    //         pageSize: size
    //     })
    // }), () => {this.forceUpdate();});
    eventProxy.trigger('pageANDPageSize', current, size, () => {
      this.forceUpdate();
    });
  }
}

export default Index;
