import React from 'react'
import { RiCloseLine } from "react-icons/ri";
const ErrorMessage = (props) => {
  return (
    <div className='error-container'>
      <div className='error-display'>
        <p>Not Working{props.errorMessage}</p>
        <p><RiCloseLine/></p>
      </div>
    </div>
  )
}

export default ErrorMessage