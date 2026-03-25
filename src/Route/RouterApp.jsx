import React from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Home from '../Components/Home'
import Java from '../Components/Java'
import WebTech from '../Components/WebTech'
import Python from '../Components/Python'
import Testing from '../Components/Testing'
import Reacts from '../Components/Reacts'
import StudentsDetails from '../Form/StudentsDetails'
import TrainerLogin from '../Form/TrainerLogin'
import TrainerRegister from '../Form/TrainerRegister'
import DataCreate from '../Crud/DataCreate'
import DataHome from '../Crud/DataHome'
import DataRead from '../Crud/DataRead'
import DataUpdate from '../Crud/DataUpdate'
import Protected from '../Components/Protected'


const RouterApp = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/java' element={<Java/>}/>
          <Route path='/webtech' element={<WebTech/>}/>
          <Route path='/python' element={<Python/>}/>
          <Route path='/testing' element={<Testing/>}/>
          <Route path='/reacts' element={<Reacts/>}/>
          <Route path='/studentsdetails/:id' element={<StudentsDetails/>}/>
          <Route path='/tlogin' element={<TrainerLogin/>}/>
          <Route path='/tregister' element={<TrainerRegister/>}/>
          <Route path='/dataCreate' element={<Protected Comp={DataCreate} />} />
          <Route path='/dataHome' element={<Protected Comp={DataHome} />}/>
          <Route path='/dataUpdate/:id' element={<Protected Comp={DataUpdate} />}/>
          <Route path='/dataRead/:id' element={<Protected Comp={DataRead} />}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouterApp