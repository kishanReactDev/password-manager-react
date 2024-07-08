import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800  '>
      <div className=" flex justify-between items-center h-14">


        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li>
            <a href="/" className='text-white hover:font-bold px-2'>Home</a>
            <a href="#" className='text-white hover:font-bold px-2'>About</a>
            <a href="#" className='hover:font-bold text-white px-2'>Contact</a>
          </li>
        </ul> */}
        <button className='bg-green-700 text-white my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1'>
          <img src="icons/githublogo.svg" className='invert p-1 w-10' alt="huhuhu" />
          <span className='font-bold px-2'>GitHub</span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar