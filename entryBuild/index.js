import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../app/component/index/Index.jsx';
import MyLayout from '../app/component/common/MyLayout';
ReactDOM.render([<MyLayout key="MyLayout"/>], document.getElementById('app'));
ReactDOM.render(<Index key="Index"/>, document.getElementById('proj-content'));