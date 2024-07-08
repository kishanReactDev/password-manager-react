import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white   flex flex-col justify-center items-center w-full'>
         <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
        </div>
        <div className="flex justify-center items-center">Created With <img className='w-7 mx-1' src="icons/icons8-love-48.png" alt="" />by kishan</div>
        
    </div>
  )
}

export default Footer