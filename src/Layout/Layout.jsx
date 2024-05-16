import React from 'react'
import HeaderComponent from '../Components/Headers/HeaderComponent'
import RouteComponent from '../Components/Routes/RouteComponent'
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage'

const Layout = () => {
  return (
    <div>

      <HeaderComponent/>
      <RouteComponent/>

      <ErrorMessage errorMessage="Hello"/>
    </div>
  )
}

export default Layout