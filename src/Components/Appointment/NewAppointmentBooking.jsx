import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BE_URL } from '../../info';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const NewAppointmentBooking = () => {
   const { id } = useParams();
   const [loading, setLoading] = useState(false);
   const [formData, setFormdata] = useState({
      patientName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      aadharNumber: '',
      appointmentDate: '',
      centerId: id,
      vaccineName: 'covid-19',
      dosage: ''
   });
   const [responseData, setResponseData] = useState('');
   const formSubmitHandler = async (e) => {
      e.preventDefault();
      console.log(formData);
      setLoading(true);
      try {
         const token = sessionStorage.getItem('token');
         const response = await axios.post(`${BE_URL}/book`, formData, {
            headers: {
               Authorization: `Bearer ${token}`,
               token: token,
            }
         })
         console.log(response.data)
         setResponseData(response.data);
         setLoading(false);

      }
      catch (error) {
         setLoading(false);
         console.log(error.response);
         if (error.response) {
            setResponseData(error.response.data);
         }
         // setInterval(()=> {
         //    setResponseData('')
         // },[5000])
      }
   }
   const inputHandler = (e) => {
      setFormdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      setResponseData('');
   }
   return (
      <div>
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
         <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full mx-auto z-20">

            <div className="mb-1 text-center">
               <h1 className="text-2xl font-bold text-gray-900">New Appointment Booking</h1>
            </div>

            <form onSubmit={formSubmitHandler} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg mx-auto">
               <div>
                  <label htmlFor="patientName" className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                     id="patientName"
                     type="text"
                     onChange={inputHandler}
                     required

                     title="Center Name should only contain letters and spaces."
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone No</label>
                  <input
                     id="phone"
                     type="tel"
                     onChange={inputHandler}
                     required
                     pattern="\d{10}"
                     title="Phone number should be 10 digits."
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Mail</label>
                  <input
                     id="email"
                     type="email"
                     onChange={inputHandler}
                     required
                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                     title="Please enter a valid email address."
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">Date of birth</label>
                  <input
                     id="dob"
                     type="date"
                     onChange={inputHandler}
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">Gender</label>
                  <select
                     id='gender'
                     onChange={inputHandler}
                     className='w-full p-2 border border-gray-300 rounded'
                     value={formData.gender}
                  >
                     <option value='others'>
                        None
                     </option>
                     <option value='Male' >Male</option>
                     <option value='Female'>Female</option>
                  </select>

               </div>
               <div>
                  <label htmlFor="aadharNumber" className="block text-gray-700 font-semibold mb-2">Aadhar Number</label>
                  <input
                     id="aadharNumber"
                     type="tel"
                     onChange={inputHandler}
                     pattern="\d{12}"
                     required
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="appointmentDate" className="block text-gray-700 font-semibold mb-2">Appointment Date</label>
                  <input
                     id="appointmentDate"
                     type="date"
                     onChange={inputHandler}

                     required
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>
               <div>
                  <label htmlFor="vaccineName" className="block text-gray-700 font-semibold mb-2">vaccine Name</label>
                  <select
                     onChange={inputHandler}
                     className=" text-lg text-gray-800 bg-white focus:border-blue-500 transition duration-300 w-full p-2 border border-gray-300 rounded"
                     id="vaccineName">
                     <option value={`covid-19`}>Covid 19</option>
                  </select>
               </div>
               <div>
                  <label htmlFor="dosage" className="block text-gray-700 font-semibold mb-2">No of dosage</label>
                  <input
                     id="dosage"
                     type="number"
                     placeholder='1 or 2'
                     onChange={inputHandler}
                     required
                     min='1'
                     max='2'
                     title="Dosage count should be a number."
                     className="w-full p-2 border border-gray-300 rounded"
                  />
               </div>
               <div>
                  <button className="bg-violet-700 text-white rounded p-3 w-full hover:bg-violet-800 transition duration-300" type="submit">Book</button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default NewAppointmentBooking