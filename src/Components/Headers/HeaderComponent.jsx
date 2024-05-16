import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { navRoute } from '../../info'
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import './HeaderComponent.css'
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(false);
  const [userData,setUserData] = useState(false);


  const mobileNavbarHandler = () => {
   setIsOpen(!isOpen)
  }

  useEffect(()=> {
    const sessionOutTime = sessionStorage.getItem('timeOut');
    console.log(sessionOutTime);

    if(sessionOutTime <= Date.now()){
      sessionStorage.clear();
      localStorage.clear();
      // window.location.reload();
      setUserData(false);
      navigate('/auth/login');
      
    }
    else{
      setUserData(true)
    }
    
  } ,[0])
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

        {!userData && <div className='nav-account-container'>
          <div>
            <Link to='/auth/login' className='link nav-link' >Login</Link>
          </div>
          <div>
            <Link to='/auth/signup' className='link nav-link' >SignUp</Link>
          </div>
        </div>}
       
      </div>


    </div>
  )
}

export default HeaderComponent