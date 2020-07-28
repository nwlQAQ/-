import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./assets/css/reset.css"
import "./assets/js/rem"
import { HashRouter } from 'react-router-dom'
import "./assets/css/iconfont.css"
// import 'antd-mobile/dist/antd-mobile.css'
import store from "./store"
import {Provider} from "react-redux"

ReactDOM.render(
 <Provider store={store}>
    <HashRouter>
    <App />
  </HashRouter>
 </Provider>,
  document.getElementById('root')
);

