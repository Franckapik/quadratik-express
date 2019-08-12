import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MainRouter from './routes';
import './App.scss';

ReactDOM.render( <MainRouter />, document.getElementById('root'))
serviceWorker.unregister();
