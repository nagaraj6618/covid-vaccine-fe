import React from 'react'
import HeaderComponent from '../Components/Headers/HeaderComponent'
import RouteComponent from '../Components/Routes/RouteComponent'
// import ErrorMessage from '../Components/ErrorMessage/ErrorMessage'
// import SuccessMessageComponent from '../Components/SuccessMessage/SuccessMessageComponent'

const Layout = () => {
  return (
    <div>

      <HeaderComponent/>
      <RouteComponent/>
      {/* <SuccessMessageComponent success={true} message="Hii"/> */}
      {/* <ErrorMessage error="Hello"/> */}
    </div>
  )
}

export default Layout