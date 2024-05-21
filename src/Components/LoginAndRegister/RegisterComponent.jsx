import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import './Loginregister.css';
import { BE_URL } from '../../info';
import axios from 'axios'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [responseData, setResponse] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    userName: '',
    password: '',
    name: '',
    confrimPassword: '',
  });

  const inputHandler = (e) => {
    setResponse(null);
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const passwordToggle = () => {
    setIsShowPassword(!isShowPassword)
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(userData);
    setLoading(false);
    try {
      if (userData.password != userData.confrimPassword) {

        setResponse({
          success: false,
          message: "Password doesn't match"
        });
        // setLoading(!);
      }
      else {
        const response = await axios.post(`${BE_URL}/auth/signup`, userData);
        console.log(response.data);

        setResponse(response.data);
        setLoading(true)
        setTimeout(() => {
          navigate(`/auth/verify/otp/${response.data.data.id}`)
        }, 1000);
      }
    }
    catch (error) {
      console.log(error.response.data);
      setLoading(true)
      if (error.response) {
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
        <SuccessMessageComponent success={responseData.success} message={responseData.message} />
      }

      {responseData && responseData.success === false && <ErrorMessage error={responseData.message} />}

      <div className='flex '>
        {/* {!loading && (
          <div className="flex  h-40 absolute top-20 left-10 z-10">
            <svg className="animate-spin h-8 w-8 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291c1.865 2.114 3 4.896 3 7.938h4c0-6.627-5.373-12-12-12v4z"></path>
            </svg>
            <span className="ml-2">Loading...</span>
          </div>
        )} */}
        {!loading && <LoadingComponent/>}
      </div>
      <form onSubmit={formSubmitHandler} className='loginregisterform-container'>

        <div>

          <label htmlFor='name'>Name</label>
          <div>
            <input id="name" type='text' required onChange={inputHandler} />
          </div>
        </div>
        <div>

          <label htmlFor='userName'>Username</label>
          <div>
            <input id="userName" type='text' required onChange={inputHandler} />
          </div>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <div>
            <input id="email" type='text' required onChange={inputHandler} />
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
          <label htmlFor='confrimPassword'>Confrim Password</label>
          <div>
            <input id="confrimPassword" type='text' required onChange={inputHandler} />
          </div>
        </div>
        <div>
          <button type='submit' className='btn btn-login text-white'>SignUp</button>
        </div>
        <div className='text-black'>
          Existing User ? <Link to='/auth/login' className='text-blue-500 transition hover:text-blue-700'>SignIn</Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterComponent