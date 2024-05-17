import React, { useEffect, useState } from 'react'

const SuccessMessageComponent = (props) => {

  const [success, setSuccess] = useState(props.success);
  useEffect(() => {
    setTimeout(() => {
      setSuccess(false)
    }, 2000)
  })
  return (
    <div>{success && (
      // Success modal
      <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-green-500">Success</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{props.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default SuccessMessageComponent