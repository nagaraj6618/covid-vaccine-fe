import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BE_URL } from '../../info';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const AppointmentComponent = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOption, setFilterOption] = useState({
    date: '',
    status: '',
  });

  const fetchAllAppointmentHistory = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${BE_URL}/book/user?status=${filterOption.status}&date=${filterOption.date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setResponseData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      if (error.response) {
        setResponseData(error.response);
      }
    }
  };

  useEffect(() => {
    fetchAllAppointmentHistory();
  }, [filterOption]);

  const inputFilterHandler = (e) => {
    setFilterOption((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Filter by Status:
            </label>
            <select
              onChange={inputFilterHandler}
              id="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Filter by Date:
            </label>
            <input
              type="date"
              onChange={inputFilterHandler}
              id="date"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
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
      {responseData && responseData.success === false && <ErrorMessage error={responseData.message} />}

      <div className="max-w-3xl mx-auto mb-6">
        {responseData && responseData.success === true && responseData.data.length === 0 && (
          <div className="text-center text-gray-500">
            No Record Found
          </div>
        )}
        {responseData && responseData.success === true && (
          <div className="text-black text-center mb-6">
            No of records: {responseData.data.length}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        {responseData && responseData.success === true && responseData.data.map((data, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <div className="mb-2">
              <p className="text-lg font-semibold">
                Appointment Date: <span className="font-normal">{new Date(data.appointmentDate).toDateString()}</span>
              </p>
            </div>
            <div className="mb-2">
              <p className="text-lg font-semibold">
                Status: <span className="font-normal">{data.status}</span>
              </p>
            </div>
            <div>
              <Link to={`/patient/${data.patientId}`} className="inline-block bg-blue-500 text-white px-4 py-2 rounded m-2 hover:bg-blue-600 transition duration-300">
                View Patient Details
              </Link>
            </div>
            <div>
              <Link to={`/center/${data.centerId}`} className="inline-block  bg-violet-700 text-white px-4 py-2 rounded m-2 hover:bg-blue-600 transition duration-300">
                View Center Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentComponent;
