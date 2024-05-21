import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BE_URL } from '../../info';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const PatientComponent = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({});
  const { id } = useParams();

  const fetchPatientDetails = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${BE_URL}/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token
        }
      });
      console.log(response.data);
      setLoading(false);
      setResponseData(response.data);
      setPatientData(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      if (error.response) {
        setResponseData(error.response);
      }
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {loading && <LoadingComponent />}

      {responseData && responseData.success === false && <ErrorMessage error={responseData.message} />}

      {responseData && responseData.success === true && (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700 animate-fadeIn">Patient Details</h2>
          <div className="border-b pb-6 mb-6">
            <div className="mb-4">
              <p className=" font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Patient Name: <span className="font-normal text-gray-800">{patientData.patientDetails.name}</span></p>
            </div>
            <div className="mb-4">
              <p className=" font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Gender: <span className="font-normal text-gray-800">{patientData.patientDetails.gender}</span></p>
            </div>
            <div className="mb-4">
              <p className=" font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Aadhar Number: <span className="font-normal text-gray-800">{patientData.patientDetails.aadharNumber}</span></p>
            </div>
            <div className="mb-4">
              <p className=" font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">DOB: <span className="font-normal text-gray-800">{new Date(patientData.patientDetails.dob).toDateString()}</span></p>
            </div>
            <div className="mb-4">
              <p className=" font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Email: <span className="font-normal text-gray-800">{patientData.patientDetails.email}</span></p>
            </div>
            <div className="mb-4">
              <p className=" font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Phone Number: <span className="font-normal text-gray-800">{patientData.patientDetails.phone}</span></p>
            </div>
          </div>
          <h3 className="text-3xl font-semibold mb-4 text-center text-gray-700 animate-fadeIn">Vaccine Details</h3>
          <div>
            <div className="mb-4">
              <p className="font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Vaccine Name: <span className="font-normal text-gray-800">{patientData.vaccineDetails.name}</span></p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Dosage Number: <span className="font-normal text-gray-800">{patientData.vaccineDetails.dosageCount}</span></p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Vaccinated Status: <span className={patientData.vaccineDetails.status ? 'text-green-600' : 'text-red-700'}>{patientData.vaccineDetails.status ? 'Yes' : 'No'}</span></p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-violet-600 transition-colors duration-200 hover:text-blue-600">Date: <span className="font-normal text-gray-800">{patientData.vaccineDetails.date === 'nil' ? 'Nil' : new Date(patientData.vaccineDetails.date).toDateString()}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientComponent;
