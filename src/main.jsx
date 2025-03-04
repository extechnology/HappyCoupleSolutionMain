import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { Store } from './Redux/Store.js';
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(




  <BrowserRouter>

    <Provider store={Store}>

      <GoogleOAuthProvider clientId='29717202964-nijskvugln8sha3ip1c4dq358ds4batk.apps.googleusercontent.com'>

        <App />

      </GoogleOAuthProvider>

    </Provider>

  </BrowserRouter>




)
