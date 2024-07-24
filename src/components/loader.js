import React from 'react'
import { lineSpinner } from 'ldrs'

const Loader = () => {
    lineSpinner.register()
  return (
    <div className='flex justify-center items-center'>
        <l-line-spinner
        size="40"
        stroke="3"
        speed="1" 
        color="black" 
        >rotime</l-line-spinner>
    </div>
  )
}

export default Loader