// App.js - WEB
import React, { Component } from 'react';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopButton from 'react-scroll-to-top';
import HomeScreen from '../../components/src/HomeScreen';
import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
import WebRoutes from './WebRoutes';
import { ToastContainer } from 'react-toastify';

const routeMap = {
  Home: {
    component: HomeScreen,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: '*/AlertWeb',
    modal: true
  }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
  authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
  databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
  projectId: 'rnmasterapp-c11e9',
  storageBucket: 'rnmasterapp-c11e9.appspot.com',
  messagingSenderId: '649592030497',
  appId: '1:649592030497:web:7728bee3f2baef208daa60',
  measurementId: 'G-FYBCF3Z2W3'
});

class App extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loader: true });
  }

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div>
          <WebRoutes />
          <ScrollToTopButton smooth top={200} />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
