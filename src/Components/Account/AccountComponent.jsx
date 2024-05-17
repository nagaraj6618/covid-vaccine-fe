import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BE_URL } from '../../info'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useNavigate, Link } from 'react-router-dom';


const AccountComponent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  async function fetchUserData(token) {
    try {
      const response = await axios.get(`${BE_URL}/auth`, {
        headers: {
          token: token
        }
      });
      console.log(response.data);
      setUserData(response.data);
    }
    catch (error) {
      // console.log(error.response.data);

      if (error.response) {
        setUserData(error.response.data);
        if (error.response.data.success === false) {
          logoutHandler();
        }

        console.log(error.response.data);

      }
    }
  }

  function logoutHandler() {
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(() => {
      navigate('/auth/login');
    }, 1300)

  }
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setUserData("");
    fetchUserData(token);

  }, [])

  return (
    <div className='account-container'>

      <div className='flex align-middle justify-center'>
        {!userData && (
          <div className="flex items-center justify-center w-full h-40">
            <svg className="animate-spin h-8 w-8 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291c1.865 2.114 3 4.896 3 7.938h4c0-6.627-5.373-12-12-12v4z"></path>
            </svg>
            <span className="ml-2">Loading...</span>
          </div>
        )}
      </div>
      {/* <h1 className='text-black'> {userData.message}</h1> */}
      {userData && userData.success === false && <ErrorMessage error={userData.message} />}


      {

        userData && userData.success === true &&

        <div className="container mx-auto p-4">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="mb-4">
              <span className="font-semibold text-violet-700">Username:</span>
              <span className="text-gray-900 ml-2 font-semibold">{userData.data.userName}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-violet-700">Name:</span>
              <span className="text-gray-900 ml-2">{userData.data.name}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-violet-700">Email:</span>
              <span className="text-gray-900 ml-2">{userData.data.email}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-violet-700">Verified status:</span>
              <span className={`ml-2 ${userData.data.verified ? 'text-green-600' : 'text-red-600'}`}>
                {userData.data.verified ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-violet-700">Role:</span>
              <span className="text-gray-900 ml-2">{userData.data.role}</span>
            </div>
            <div>
              <span className="font-semibold text-violet-700">Created At:</span>
              <span className="text-gray-900 ml-2">{new Date(userData.data.createdAt).toDateString()}</span>
            </div>
          </div>

          <button className='btn btn-login text-white mt-5 ml-10' onClick={() => logoutHandler()}>LogOut</button>
          <Link to='/auth/reset-password' className='btn m-5 text-white'>Reset Password</Link>
        </div>



      }

    </div>
  )
}

export default AccountComponent