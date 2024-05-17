import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BE_URL } from '../../info';

const SingleCenterDisplayComponent = () => {
   const { id } = useParams();
   console.log(id);
   const [isAdmin, setIsAdmin] = useState(false);
   const [centerData, setCenterData] = useState('');
   async function fetchSingleCenter() {
      try {
         const response = await axios.get(`${BE_URL}/center/${id}`);
         console.log(response.data);
         setCenterData(response.data);
      }
      catch (error) {
         console.log(error.response.data);
         if (error.response) {
            setCenterData(error.response.data)
         }
      }
   }

   useEffect(() => {

      fetchSingleCenter();
      const userRole = localStorage.getItem('role');
      if (userRole === 'admin') {
         setIsAdmin(true);
      }
      else {
         setIsAdmin(false);
      }
   }, [])
   return (
      <div>
         <div className='flex align-middle justify-center'>
            {!centerData && (
               <div className="flex items-center justify-center w-full h-40">
                  <svg className="animate-spin h-8 w-8 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291c1.865 2.114 3 4.896 3 7.938h4c0-6.627-5.373-12-12-12v4z"></path>
                  </svg>
                  <span className="ml-2">Loading...</span>
               </div>
            )}
         </div>
         <div>
            {
               centerData && (
                  <div className="center-container bg-white shadow-lg rounded-lg p-6 mb-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <p className="font-semibold text-violet-700">Center Name: <span className="text-gray-900 font-bold ">{centerData.data.name}</span></p>
                        </div>
                        <div>
                           <p className="font-semibold text-violet-700">Contact Mail: <span className="text-gray-900">{centerData.data.email}</span></p>
                        </div>
                        <div>
                           <p className="font-semibold text-violet-700">Contact Ph: <span className="text-gray-900">{centerData.data.phone}</span></p>
                        </div>
                        <div>
                           <p className="font-semibold text-violet-700">Address: <span className="text-gray-900">{centerData.data.address.place}</span></p>
                        </div>
                        <div>
                           <p className="font-semibold text-violet-700">Pincode & City: <span className="text-gray-900">{`${centerData.data.address.pincode},${centerData.data.address.city}`}</span></p>
                        </div>
                        <div>
                           <p className="font-semibold text-violet-700">State: <span className="text-gray-900">{centerData.data.address.state}</span></p>
                        </div>
                        <div>
                           <p className="font-semibold text-violet-700">Total Visited: <span className="text-gray-900">{centerData.data.visited ? centerData.data.visited : 'nill'}</span></p>
                        </div>
                        <div className="md:col-span-2">
                           <p className="font-semibold text-violet-700">Opening Hours: <span className="text-gray-900">{centerData.data.openingHours}</span></p>
                        </div>
                        <div className="md:col-span-2">
                           <p className="font-semibold text-violet-700">Capacity Per day: <span className="text-gray-900">{centerData.data.capacityPerDay}</span></p>
                        </div>
                        <div className="md:col-span-2">
                           <p className="font-semibold text-violet-700">Total Dosage: <span className="text-gray-900">{centerData.data.dosageCount}</span></p>
                        </div>
                        <div>
                           <p className="font-semibold text-violet-700">Active Status: <span className="text-gray-900 font-bold ">{centerData.data.active}</span></p>
                        </div>
                     </div>

                     {isAdmin &&
                        <div className="md:col-span-2 m-3">
                           <p className="font-semibold text-white "> <Link to={`/center/update/${centerData.data._id}`} className='bg-violet-700 p-3 rounded'>Update </Link></p>
                        </div>
                     }
                  </div>
                  // </div>
                  // </div>
               )
            }
         </div>
         <div className="container mx-auto p-4">
            <p className="text-xl font-bold text-gray-800 mb-4">COVID-19 Vaccine Instructions</p>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
               <ul className="list-disc list-inside text-gray-700">
                  <li className="mb-2">
                     <span className="font-semibold">Eligibility:</span> Ensure you are eligible for the vaccine based on your local health authority guidelines. This typically includes specific age groups, frontline workers, and those with certain health conditions.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Appointment:</span> Schedule your vaccination appointment online through the official health department website or call the provided hotline.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Documentation:</span> Bring a valid ID and any required documentation, such as a health insurance card or proof of employment if you are a frontline worker.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Arrival:</span> Arrive at the vaccination site on time. Wear a mask and maintain social distancing.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Vaccination Process:</span> The vaccination will be administered in your upper arm. The process is quick and usually takes just a few minutes.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Observation:</span> After receiving the vaccine, you will be asked to wait for 15-30 minutes to monitor for any immediate adverse reactions.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Side Effects:</span> Common side effects include soreness at the injection site, mild fever, and fatigue. These typically resolve within a few days.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Second Dose:</span> If you are receiving a two-dose vaccine, schedule your second dose appointment as instructed. Ensure you receive the same brand of vaccine for both doses.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Post-Vaccination:</span> Continue to follow public health guidelines, such as wearing masks and social distancing, as full immunity takes time to develop.
                  </li>
                  <li className="mb-2">
                     <span className="font-semibold">Stay Informed:</span> Keep updated with any new guidelines or information from your local health authorities regarding COVID-19 and the vaccines.
                  </li>
               </ul>
            </div>
         </div>

      </div>
   )
}

export default SingleCenterDisplayComponent