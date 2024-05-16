import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navRoute } from '../../info'
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import './HeaderComponent.css'
const HeaderComponent = () => {
  const [isOpen,setIsOpen] = useState(false);
 

  const mobileNavbarHandler = () => {
   setIsOpen(!isOpen)
  }
  return (
    <div className='navbar-container'>
      <div className='mobile-menu-icon'>
        <MdOutlineMenuOpen onClick={mobileNavbarHandler} />
      </div>
      <div className={`navlink-container ${isOpen?'navlink-mobile-container':''}`}>
        
      {isOpen && <RiCloseLine onClick={mobileNavbarHandler} className='close-navbar'/>}
        {
          navRoute.map((data, index) => (
            <div key={index} className='navlink'>
              
              <Link to={data.route} className='link nav-link' >{data.link}</Link>
            </div>
          ))
        }

        <div className='nav-account-container'>
          <div>
            <Link to='/login' className='link nav-link' >Login</Link>
          </div>
          <div>
            <Link to='/signup' className='link nav-link' >SignUp</Link>
          </div>
        </div>
      </div>


    </div>
  )
}

export default HeaderComponent