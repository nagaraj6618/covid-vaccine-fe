import React, { useState } from 'react'
import axios from 'axios'
import { BE_URL } from '../../info'
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

const RestPassword = () => {
   const [userData, setUserData] = useState({
      oldpassword: '',
      newpassword: '',
      confrimnewpassword: ''
   });
   const [responseData, setResponseData] = useState('');
   const [loading, setLoading] = useState(false);
   const inputHandler = (e) => {
      setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   }
   const formSubmitHandler = async (e) => {
      e.preventDefault();
      console.log(userData);
      setLoading(true);
      try {


         if (userData.confrimnewpassword === userData.newpassword) {
            const token = sessionStorage.getItem('token')
            const response = await axios.post(`${BE_URL}/auth/reset-password`, userData, {
               headers: {
                  token: token,
                  Authorization:`Bearer ${token}`
               }
            })
            console.log(response.data);
            setLoading(false);
            setResponseData(response.data)
         }
         else {
            setResponseData({
               success: false,
               message: "Password doesn't match",
            });
            setLoading(false);
         }
      }
      catch (error) {
         console.log(error.response);
         if (error.response) {
            setResponseData(error.response.data)

         }
         setLoading(false);
      }
   }
   return (
      <div className="container mx-auto p-4">

         <div className='flex align-middle justify-center'>
            {/* {loading && (
               <div className="flex items-center justify-center w-full h-40">
                  <svg className="animate-spin h-8 w-8 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291c1.865 2.114 3 4.896 3 7.938h4c0-6.627-5.373-12-12-12v4z"></path>
                  </svg>
                  <span className="ml-2">Loading...</span>
               </div>
            )} */}
            {loading && <LoadingComponent/>}
         </div>

         {responseData
            &&
            responseData.success
            &&
            <SuccessMessageComponent success={responseData.success} message={responseData.message} />
         }

         {responseData && responseData.success === false && <ErrorMessage error={responseData.message} />}
         <form onSubmit={formSubmitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
            <div className="mb-4">
               <label htmlFor="oldpassword" className="block text-gray-700 font-semibold mb-2">Old Password</label>
               <input id="oldpassword" type="text" onChange={inputHandler} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
               <label htmlFor="newpassword" className="block text-gray-700 font-semibold mb-2">New Password</label>
               <input id="newpassword" type="text" onChange={inputHandler} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
               <label htmlFor="confrimnewpassword" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
               <input id="confrimnewpassword" type="text" onChange={inputHandler} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-between">
               <button className="btn bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Reset</button>
            </div>
         </form>
      </div>
   )
}

export default RestPassword