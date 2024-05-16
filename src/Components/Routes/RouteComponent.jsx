import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomeComponent from '../Home/HomeComponent'
import AppointmentComponent from '../Appointment/AppointmentComponent'
import CenterComponent from '../Centers/CenterComponent'
import AccountComponent from '../Account/AccountComponent'
import AboutComponent from '../About/AboutComponent'
import RegisterComponent from '../LoginAndRegister/RegisterComponent'
import LoginComponent from '../LoginAndRegister/LoginComponent'

const RouteComponent = () => {
  return (
    <Routes>

      <Route path='/' element={<HomeComponent/>} />
      <Route path='/appointment' element={<AppointmentComponent/>} />
      <Route path='/center' element={<CenterComponent/>} />
      <Route path='/account' element={<AccountComponent/>} />
      <Route path='/about' element={<AboutComponent/>} />
      <Route path='/auth/login' element={<LoginComponent/>} />
      <Route path='/auth/signup' element={<RegisterComponent/>} />

    </Routes>
  )
}

export default RouteComponent