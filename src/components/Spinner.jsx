import React from 'react'
import {Dna} from 'react-loader-spinner'
const Spinner = ({message}) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <Dna type='Circles'
        color='#00BBFF'
        height={40}
        width={140}
        className='m-5'
      />
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner