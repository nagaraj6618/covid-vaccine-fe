import React from 'react'

const AboutComponent = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Get Vaccinated, Stay Safe
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Welcome to our COVID-19 Vaccination Booking page. Our mission is to provide you with easy access to vaccines, helping you protect yourself and your loved ones from COVID-19. Book your appointment today and take a step towards ending the pandemic.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10m-5 4h5" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy Booking</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our user-friendly booking system makes it easy to schedule your vaccination appointment at a time and location that is convenient for you.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Reliable Information</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                We provide the latest and most accurate information about the COVID-19 vaccines to help you make informed decisions.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 00-4-4H3V7h3a4 4 0 014-4h2a4 4 0 014 4h3v4h-3a4 4 0 00-4 4v2m0 0l-3 3m3-3l3 3" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Comprehensive Support</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our dedicated support team is here to help you with any questions or concerns you may have about the vaccination process.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 8v8m0 4H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2h-6z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Safety First</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Your health and safety are our top priorities. We follow all the recommended guidelines to ensure a safe vaccination experience.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default AboutComponent