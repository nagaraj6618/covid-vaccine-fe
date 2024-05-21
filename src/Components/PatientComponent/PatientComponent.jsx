import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BE_URL } from '../../info';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const PatientComponent = () => {
  const [responseData,setResponseData] = useState([]);
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  const fetchPatientDetails = async() => {
   setLoading(true);
   try{
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${BE_URL}/patient/${id}`,{
         headers:{
            Authorization:`Bearer ${token}`,
            token:token
         }
      });
      console.log(response.data);
      setResponseData(response.data);
   }
   catch(error){
      setLoading(false);
      console.log(error.response);
      if(error.response){
         setResponseData(error.response);
      }
   }
  } 
  
  useEffect(() => {
   fetchPatientDetails();
  },[])
   return (
    <div>
      
     {loading && <LoadingComponent/>}

     {responseData && responseData.success === false && <ErrorMessage error={responseData.message} />}
    </div>
  )
}

export default PatientComponent