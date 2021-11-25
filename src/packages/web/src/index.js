// index.js - WEB
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from '../../components/src/registerServiceWorker';

import 'react-credit-cards/es/styles-compiled.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationToaster from './notification-toaster';

ReactDOM.render(
  <Router>
    <div>
      <App />
      <NotificationToaster />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
