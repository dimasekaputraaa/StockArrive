import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import GoodReceive from './pages/goodReceive'
import Login from './pages/login'
const router = createBrowserRouter([
{
  path:"/",
  element: <Login/>
},
{
  path:"/setup",
  element: <Dashboard/>
},
{
  path:"/goodReceive",
  element: <GoodReceive/>
},
{
  path:"/Monitoring",
  element: <Dashboard/>
},
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
