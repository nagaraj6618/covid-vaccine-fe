import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeComponent from '../Home/HomeComponent'
import AppointmentComponent from '../Appointment/AppointmentComponent'
import CenterComponent from '../Centers/CenterComponent'
import AccountComponent from '../Account/AccountComponent'
import AboutComponent from '../About/AboutComponent'
import RegisterComponent from '../LoginAndRegister/RegisterComponent'
import LoginComponent from '../LoginAndRegister/LoginComponent'
import OtpVerify from '../Auth/OtpVerify'
import SingleCenterDisplayComponent from '../Centers/SingleCenterDisplayComponent'
import AddNewCenter from '../Centers/AddNewCenter'
import UpdateCenter from '../Centers/UpdateCenter'
import RestPassword from '../Auth/RestPassword'
import IntrusctionComponent from '../About/IntrusctionComponent'
import NotFoundRoute from '../NotFoundRoute/NotFoundRoute'

const RouteComponent = () => {
  return (
    <Routes>

      <Route path='/' element={<HomeComponent />} />
      <Route path='/appointment' element={<AppointmentComponent />} />
      <Route path='/center' element={<CenterComponent />} />
      <Route path='/account' element={<AccountComponent />} />
      <Route path='/about' element={<AboutComponent />} />
      <Route path='/auth/login' element={<LoginComponent />} />
      <Route path='/auth/signup' element={<RegisterComponent />} />
      <Route path='/auth/verify/otp/:id' element={<OtpVerify />} />
      <Route path='/center/:id' element={<SingleCenterDisplayComponent />} />
      <Route path='/center/update/:id' element={<UpdateCenter />} />
      <Route path='/center/new' element={<AddNewCenter />} />
      <Route path='/instruction' element={<IntrusctionComponent/>}/>

      <Route path='/auth/reset-password' element={<RestPassword />} />
      <Route path='/:no-route' element={<NotFoundRoute />} />
    </Routes>
  )
}

export default RouteComponent