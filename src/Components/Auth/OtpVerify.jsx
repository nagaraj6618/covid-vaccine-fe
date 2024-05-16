import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BE_URL } from '../../info';
import axios from 'axios'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';
const OtpVerify = () => {
   const navigate = useNavigate();
   const [responseData,setResponse] = useState({});
   const { id } = useParams();
   const [otp, setOtp] = useState('');
   const handleChange = (e) => {
      const value = e.target.value;
      if (/^\d{0,4}$/.test(value)) {
         setOtp(value);
         setResponse(null);
      }
   };
   const formSubmitHandler = async (e) => {
      e.preventDefault();
      console.log(otp)
      try {
         const response = await axios.post(`${BE_URL}/auth/otp-verify/${id}`, {otp});
         console.log(response.data);
         setResponse(response.data);
         setTimeout(()=> {
            navigate('/auth/login')
         },1500);
      }
      catch (error) {
         console.log(error.response.data);
      
      if(error.response){
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
               <label htmlFor='otp'>Enter OTP</label>
               <div>
                  <input
                     type="text"
                     id="otp"
                     value={otp}
                     pattern="\d{4}"
                     onChange={handleChange}
                     maxLength="4"
                     title="OTP must be exactly 4 digits"
                     required
                  />
               </div>

            </div>
            <div>

               <button className='btn btn-login text-white' type='submit'>Verify</button>
            </div>

         </form>
      </div>
   )
}

export default OtpVerify