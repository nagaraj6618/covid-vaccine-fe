import axios from 'axios';
import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { BE_URL } from '../../info';

const NewAppointmentBooking = () => {
   const {id} = useParams();
   const [formData,setFormdata] = useState({
      patientName:'',
      email:'',
      phone:'',
      dob:'',
      gender:'',
      aadharNumber:'',
      appointmentDate:'',
      centerId:id,
      vaccineName:'covid-19',
      dosage:''
    })

    const formSubmitHandler = async(e) => {
      e.preventDefault();
      console.log(formData);

      try{
         const token = sessionStorage.getItem('token');
         const response = await axios.post(`${BE_URL}/book`,formData,{
            headers:{
               Authorization:`Bearer ${token}`,
               token:token,
            }
         })
         console.log(response.data)
      }
      catch(error){
         console.log(error.response);
      }
    }
    const inputHandler = (e) => {
      setFormdata((prev) => ({...prev,[e.target.id]:e.target.value}));
    }
    return (
      <div>
        <div>
          <h1>New Appointment Booking</h1>
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
                  pattern="\d+"
                  title="Dosage count should be a number."
                  className="w-full p-2 border border-gray-300 rounded"
               />
            </div>
            <div>
               <button className="bg-violet-700 text-white rounded p-3 w-full hover:bg-violet-800 transition duration-300" type="submit">Book</button>
            </div>
         </form>
      </div>
    )
}

export default NewAppointmentBooking