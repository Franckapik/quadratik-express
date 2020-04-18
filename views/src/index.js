import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import MainRouter from './routes';
import './styles/App.scss';

ReactDOM.render( <MainRouter />, document.getElementById('root'))
serviceWorker.unregister();
