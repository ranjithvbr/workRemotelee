import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import "./lang";
import 'antd/dist/antd.css';
import './index.scss';
// eslint-disable-next-line no-unused-vars
import Trix from "trix";

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
