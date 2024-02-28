import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const Header = () => {
  return (
    <header className='navbar bg-green-400 mb-10 px-5'>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-4xl">Recipee</a>
        </div>
        {/* <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          </button>
        </div> */}
      <div className='navbar-end flex gap-5'>
      <Link href="/" className='text-xl'><button className='btn btn-primary'>Home</button></Link>
      <Link href="/home" className='text-xl'><button className='btn btn-primary'>View Regions</button></Link>
        <Link href="/api" className='text-xl'><button className='btn btn-primary'>Restuarants near you<FaArrowRight /></button></Link>
      </div>
      </div>
      

      
    </header>
  )
}

export default Header
