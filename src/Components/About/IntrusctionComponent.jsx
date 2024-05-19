import React from 'react'

const IntrusctionComponent = () => {
  return (
   <div className="bg-gray-100 py-12">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="text-center">
       <h1 className="text-3xl font-extrabold text-gray-900">COVID-19 Vaccination Booking</h1>
       <p className="mt-4 text-lg text-gray-600">
         Get Vaccinated, Stay Safe
       </p>
       <p className="mt-2 max-w-2xl mx-auto text-base text-gray-500">
         Welcome to the COVID-19 Vaccination Booking page. Protect yourself, your family, and your community by getting vaccinated. Book your appointment today and take a step towards ending the pandemic.
       </p>
     </div>
   
     <div className="mt-10">
       <h2 className="text-2xl font-semibold text-gray-900">How to Book Your Vaccination Appointment</h2>
       <ul className="mt-4 space-y-4 text-gray-700">
         <li>
           <span className="font-semibold">Check Eligibility:</span> Ensure you meet the eligibility criteria for receiving the COVID-19 vaccine. This may vary based on age, health condition, or priority groups defined by health authorities.
         </li>
         <li>
           <span className="font-semibold">Choose a Location:</span> Select a vaccination site near you. We have multiple locations available to ensure convenience and accessibility.
         </li>
         <li>
           <span className="font-semibold">Select a Date and Time:</span> Pick a date and time that fits your schedule. We offer flexible hours to accommodate everyone.
         </li>
         <li>
           <span className="font-semibold">Fill in Your Details:</span> Provide the necessary personal information, including your name, contact details, and any relevant health information.
         </li>
         <li>
           <span className="font-semibold">Confirm Your Appointment:</span> Review your details and confirm your booking. You will receive a confirmation email or SMS with your appointment details.
         </li>
       </ul>
     </div>
   
     <div className="mt-10">
       <h2 className="text-2xl font-semibold text-gray-900">What to Bring to Your Appointment</h2>
       <ul className="mt-4 space-y-4 text-gray-700">
         <li>
           <span className="font-semibold">Identification:</span> Bring a valid ID such as a driver’s license or passport.
         </li>
         <li>
           <span className="font-semibold">Health Information:</span> Have your health insurance card and any pertinent medical information ready.
         </li>
         <li>
           <span className="font-semibold">Appointment Confirmation:</span> Bring the confirmation email or SMS for your appointment.
         </li>
       </ul>
     </div>
   
     <div className="mt-10">
       <h2 className="text-2xl font-semibold text-gray-900">After Your Vaccination</h2>
       <ul className="mt-4 space-y-4 text-gray-700">
         <li>
           <span className="font-semibold">Wait 15-30 Minutes:</span> After receiving your vaccine, you will be asked to wait for a short period to monitor for any immediate reactions.
         </li>
         <li>
           <span className="font-semibold">Receive Your Vaccination Card:</span> You will get a card documenting your vaccination. Keep this card safe as you may need it for your second dose or for future reference.
         </li>
       </ul>
     </div>
   
     <div className="mt-10">
       <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions (FAQs)</h2>
       <dl className="mt-4 space-y-4 text-gray-700">
         <div>
           <dt className="font-semibold">Q: Who is eligible for the vaccine?</dt>
           <dd>A: Eligibility criteria are determined by health authorities and may vary. Please check the latest guidelines.</dd>
         </div>
         <div>
           <dt className="font-semibold">Q: Is the vaccine safe?</dt>
           <dd>A: Yes, the COVID-19 vaccines have undergone rigorous testing and have been approved by relevant health authorities.</dd>
         </div>
         <div>
           <dt className="font-semibold">Q: How much does the vaccine cost?</dt>
           <dd>A: The COVID-19 vaccine is free of charge for all eligible individuals.</dd>
         </div>
         <div>
           <dt className="font-semibold">Q: Can I choose which vaccine I get?</dt>
           <dd>A: Vaccine availability may vary by location. You will be informed about the available options when booking your appointment.</dd>
         </div>
         <div>
           <dt className="font-semibold">Q: Do I need to wear a mask?</dt>
           <dd>A: Yes, please wear a mask and follow all safety guidelines when you visit the vaccination site.</dd>
         </div>
       </dl>
     </div>
   </div>
   </div>
  )
}

export default IntrusctionComponent