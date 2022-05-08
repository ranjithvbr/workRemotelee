import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import "./lang";
import 'antd/dist/antd.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
