import React from 'react'
import loading from './Spinner-2.gif'
export default function spinner() {
  return (
    <div className='text-center my-3'>
      <img src={loading} alt="loading" />
    </div>
  )
}
