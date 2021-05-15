import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from 'firebase/app'


const firebaseConfig = {
  apiKey: "AIzaSyCOfMu-wdfqKz-elouFkwpCRg1VnXdHKHY",
  authDomain: "fir-fotos-90fbd.firebaseapp.com",
  databaseURL: "https://fir-fotos-90fbd.firebaseio.com",
  projectId: "fir-fotos-90fbd",
  storageBucket: "fir-fotos-90fbd.appspot.com",
  messagingSenderId: "516468745664",
  appId: "1:516468745664:web:7c67372afe3f44278a1425"
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
