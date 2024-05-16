import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import './Loginregister.css';
import { BE_URL } from '../../info';
import axios from 'axios'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';

const RegisterComponent = () => {
  const navigate = useNavigate();
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
    try {
      if (userData.password != userData.confrimPassword) {

        setResponse({
          success: false,
          message: "Password doesn't match"
        });
      }
      else {
        const response = await axios.post(`${BE_URL}/auth/signup`, userData);
        console.log(response.data);

        setResponse(response.data);

        setTimeout(() => {
          navigate(`/auth/verify/otp/${response.data.data.id}`)
        }, 1000);
      }
    }
    catch (error) {
      console.log(error.response.data);

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
          <button type='submit' className='btn btn-login text-white'>Login</button>
        </div>
        <div className='text-black'>
          New User ? <Link to='/auth/signup' className='text-blue-500 transition hover:text-blue-700'>signup</Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterComponent