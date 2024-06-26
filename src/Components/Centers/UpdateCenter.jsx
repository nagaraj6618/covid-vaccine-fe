import React, { useState, useEffect } from 'react'
import { BE_URL } from '../../info';
import axios from 'axios';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
const UpdateCenter = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [responseData, setResponseData] = useState('');
   const [centerData, setCenterData] = useState({
      name: '',
      phone: '',
      email: '',
      address: '',
      dosageCount: '',
      pincode: '',
      city: '',
      state: '',
      status: true
   });
   const { id } = useParams();
   async function fetchCenterData() {
      try {
         const response = await axios.get(`${BE_URL}/center/${id}`, {
            headers: {
               token: localStorage.getItem('token')
            }
         })
         console.log(response.data);
         const centerResponseData = response.data.data;
         console.log(centerResponseData.address.place);
         setCenterData({
            name: centerResponseData.name,
            phone: centerResponseData.phone,
            email: centerResponseData.email,
            address: centerResponseData.address.place,
            dosageCount: centerResponseData.dosageCount,
            pincode: centerResponseData.address.pincode,
            city: centerResponseData.address.city,
            state: centerResponseData.address.state,
         })
      }
      catch (error) {
         console.log(error.response);
      }
   }
   useEffect(() => {
      fetchCenterData()
   }, [])
   const inputHandler = (e) => {
      setCenterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      setResponseData('')
   }
   const formSubmitHandler = async (e) => {
      e.preventDefault();
      console.log(centerData);
      setLoading(true);
      const centerFormData = {
         name: centerData.name,
         phone: centerData.phone,
         email: centerData.email,
         address: {
            place: centerData.address,
            city: centerData.city,
            pincode: centerData.pincode,
            state: centerData.state,
         },
         dosageCount: centerData.dosageCount,
         status: centerData.status,

      }
      try {
         const token = sessionStorage.getItem('token');
         const response = await axios.put(`${BE_URL}/center/${id}`, centerFormData, {
            headers: {
               token: token,
               Authorization:`Bearer ${token}`
            }
         });

         console.log(response.data);
         setResponseData(response.data);
         setLoading(false)
         navigate('/center')
      }
      catch (error) {
         console.log(error.response);
         setLoading(false)
         if (error.response) {
            setResponseData(error.response.data);
         }
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
         <form onSubmit={formSubmitHandler} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg mx-auto">
            <div>
               <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Center Name</label>
               <input
                  id="name"
                  type="text"
                  onChange={inputHandler}
                  required
                
                  title="Center Name should only contain letters and spaces."
                  className="w-full p-2 border border-gray-300 rounded"
                  value={centerData.name}
               />
            </div>
            <div>
               <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Center Phone No</label>
               <input
                  id="phone"
                  type="tel"
                  onChange={inputHandler}
                  required
                  pattern="\d{10}"
                  title="Phone number should be 10 digits."
                  className="w-full p-2 border border-gray-300 rounded"
                  value={centerData.phone}
               />
            </div>
            <div>
               <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Center Mail</label>
               <input
                  id="email"
                  type="email"
                  onChange={inputHandler}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address."
                  className="w-full p-2 border border-gray-300 rounded"
                  value={centerData.email}
               />
            </div>
            <div>
               <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Center Address</label>
               <input
                  id="address"
                  type="text"
                  onChange={inputHandler}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  value={centerData.address}
               />
            </div>
            <div>
               <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-2">Pincode</label>
               <input
                  id="pincode"
                  type="text"
                  onChange={inputHandler}
                  value={centerData.pincode}
                  required
                  pattern="\d{6}"
                  title="Pincode should be 6 digits."
                  className="w-full p-2 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
               <input
                  id="city"
                  type="text"
                  onChange={inputHandler}
                  value={centerData.city}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">State</label>
               <input
                  id="state"
                  type="text"
                  onChange={inputHandler}
                  value={centerData.state}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">Active Status</label>
               <select onChange={inputHandler} className="border-2 border-black p-2 rounded-lg text-lg text-gray-800 bg-white focus:border-blue-500 transition duration-300" id="status">
                  <option value={true}>Choose</option>
                  <option value={true}>True</option>
                  <option value={false}>False</option>

               </select>
            </div>
            <div>
               <label htmlFor="dosageCount" className="block text-gray-700 font-semibold mb-2">Dosage Count</label>
               <input
                  id="dosageCount"
                  type="number"
                  onChange={inputHandler}
                  required
                  pattern="\d+"
                  title="Dosage count should be a number."
                  className="w-full p-2 border border-gray-300 rounded"
                  value={centerData.dosageCount}
               />
            </div>

            <div>
               <button className="bg-violet-700 text-white rounded p-3 w-full hover:bg-violet-800 transition duration-300" type="submit">Update</button>
            </div>
         </form>
      </div>


   )
}

export default UpdateCenter