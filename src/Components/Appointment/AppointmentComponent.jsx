import React, { useState } from 'react'



const AppointmentComponent = () => {

  const [formData,setFormdata] = useState({
    patientName:'',
    email:'',
    phone:'',
    dob:'',
    gender:'',
    aadharNumber:'',
    appointmentDate:''
  })
  return (
    <div>
      <div>
        <h1>New Appointment Booking</h1>
      </div>

      <form>
          <div>
            <label htmlFor='patientName'>
              Patient Name
            </label>
          </div>
      </form>
    </div>
  )
}

export default AppointmentComponent