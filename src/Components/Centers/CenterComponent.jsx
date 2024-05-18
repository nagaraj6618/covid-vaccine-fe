import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BE_URL } from '../../info';
import { Link } from 'react-router-dom';
const CenterComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [centerData, setCenterData] = useState('');
  async function fetchAllCenter() {
    try {
      const response = await axios.get(`${BE_URL}/center`);
      console.log(response.data);
      setCenterData(response.data);
    }
    catch (error) {
      console.log(error.response.data);
      if (error.response) {
        setCenterData(error.response.data);
      }
    }

  }

  const centerDeleteHandler = async (id) => {
    console.log(id)
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(`${BE_URL}/center/${id}`, {
        headers: {
          token: token,
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      fetchAllCenter();
    }
    catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchAllCenter();
    const userRole = localStorage.getItem('role');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
    else {
      setIsAdmin(false);
    }
  }, [])
  return (
    <div className='center-main-container'>



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
      <div className="container mx-auto p-4">
        {
          centerData && centerData.data.map((data, index) => (
            <div className="center-container bg-white shadow-lg rounded-lg p-6 mb-6" key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-violet-700">Center Name: <span className="text-gray-900 font-bold ">{data.name}</span></p>
                </div>
                <div>
                  <p className="font-semibold text-violet-700">Contact Mail: <span className="text-gray-900">{data.email}</span></p>
                </div>
                <div>
                  <p className="font-semibold text-violet-700">Contact Ph: <span className="text-gray-900">{data.phone}</span></p>
                </div>
                <div>
                  <p className="font-semibold text-violet-700">Address: <span className="text-gray-900">{data.address.place}</span></p>
                </div>
                <div>
                  <p className="font-semibold text-violet-700">Pincode & City: <span className="text-gray-900">{`${data.address.pincode},${data.address.city}`}</span></p>
                </div>
                <div>
                  <p className="font-semibold text-violet-700">State: <span className="text-gray-900">{data.address.state}</span></p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-semibold text-violet-700">Opening Hours: <span className="text-gray-900">{data.openingHours}</span></p>
                </div>
                <div>
                  <p className="font-semibold text-violet-700">Active Status: <span className="text-gray-900 font-bold ">{data.status?'Active':'Inactive'}</span></p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-semibold text-white "> <Link to={`/center/${data._id}`} className='bg-violet-700 p-3 rounded'>Veiw Details </Link></p>
                </div>
                {isAdmin &&
                  <div className="md:col-span-2 m-3">
                    <p className="font-semibold text-white ">
                      <Link to={`/center/update/${data._id}`} className='text-violet-700 p-3 rounded'>Update </Link>
                      <button className='btn' onClick={() => centerDeleteHandler(data._id)}>Delete</button>
                    </p>

                  </div>
                }
              </div>
            </div>
          ))
        }
      </div>
      {isAdmin &&
        <div className="flex justify-center items-center m-3">
          <div className="md:col-span-2 m-3">
            <p className="font-semibold text-white">
              <Link to={`/center/new`} className="bg-violet-700 p-3 rounded">Add new</Link>
            </p>

          </div>
        </div>
      }

    </div>
  )
}

export default CenterComponent