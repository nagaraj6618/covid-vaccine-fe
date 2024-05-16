import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './Loginregister.css';
import { BE_URL } from '../../info';
import axios from 'axios'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';
// import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [loading,setLoading] = useState(true)
  const [responseData,setResponse] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    emailorusername: '',
    password: ''
  });

  const inputHandler = (e) => {
    setResponse(null);
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  
  const passwordToggle = () => {
    setIsShowPassword(!isShowPassword)
  }

  const formSubmitHandler = async(e) => {
    e.preventDefault();
    console.log(userData);
    setLoading(false);
    try{
      const response = await axios.post(`${BE_URL}/auth/signin`,userData);
      console.log(response.data);
      setLoading(true);
      setResponse(response.data);
      sessionStorage.setItem('token',response.data.token);
      sessionStorage.setItem('timeIn',Date.now());
      sessionStorage.setItem('timeOut',Date.now()+(10*60*1000));

      localStorage.setItem('name',response.data.data.name);
      localStorage.setItem('userName',response.data.data.userName);

      setTimeout(()=> {
        window.location.href='/'
      },1000)
      
    }
    catch(error){
      console.log(error.response.data);
      
      if(error.response){
        setResponse(error.response.data);
        console.log(error.response.data);

      }
    }

  }
  return (
    <div className='loginregister-container'>
      {responseData 
      &&
      responseData.success 
      && 
      <SuccessMessageComponent success={responseData.success} message={responseData.message}/>
      }
     
      {responseData &&responseData.success===false && <ErrorMessage error={responseData.message}/>}

      <div className='flex '>
        {!loading && (
          <div className="flex items-center justify-center w-full h-40">
            <svg className="animate-spin h-8 w-8 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291c1.865 2.114 3 4.896 3 7.938h4c0-6.627-5.373-12-12-12v4z"></path>
            </svg>
            <span className="ml-2">Loading...</span>
          </div>
        )}
      </div>
      <form onSubmit={formSubmitHandler} className='loginregisterform-container'>
        <div>
          <label htmlFor='emailorusername'>Email/Username</label>
          <div>
            <input id="emailorusername" type='text' required onChange={inputHandler} />
          </div>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <div>
            <input id="password" type={isShowPassword ? 'text' : 'password'} required onChange={inputHandler} />
            {
            isShowPassword ?
              <AiOutlineEye className='text-black eye-option' onClick={passwordToggle} />
              :
              <AiOutlineEyeInvisible className='text-black eye-option' onClick={passwordToggle} />
            }
          
          </div>
          
        </div>
        <div>
          <button type='submit' className='btn btn-login text-white'>Login</button>
        </div>
        <div className='text-black'>
          New User ? <Link to='/auth/signup' className='text-blue-500 transition hover:text-blue-700'>signup</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginComponent