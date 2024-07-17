import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import { Authenticator} from '@aws-amplify/ui-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Authenticator.Provider>
    <RouterProvider
      router={router}
    />
  </Authenticator.Provider>
  // <React.StrictMode>
  // </React.StrictMode>
)
