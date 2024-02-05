import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import store from './store/index'
import { Provider } from 'react-redux'

import Layout from './Layout'
import Home from './pages/Home'
import DetailBusiness from './pages/DetailBusiness'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:aliasBusiness",
        element: <DetailBusiness />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
)
