import React from 'react'
import "./App.css"
import RouterApp from './Route/RouterApp'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <ToastContainer/>
      <RouterApp/>
    </>
  )
}

export default App