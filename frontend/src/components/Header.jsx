import React from 'react'
import redFlag from '../assets/Images/WelcomePage/redflag.png'
import logo from '../assets/Images/GamePage/logo.png'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import { FaEnvelopeOpenText } from "react-icons/fa";

function Header() {
  return (
    <div className='flex justify-between items-center bg-purple-500 p-4 px-10'>
        <img src={logo} alt="logo" className='w-[200px] h-[80px]' />
        <div className='flex justify-between items-center w-[50%]'>
        <h2 className='text-2xl font-medium text-white'>Score: 0</h2>
        <h2 className='text-2xl font-medium text-white'> | </h2>
        <h2 className='text-2xl font-medium text-white'>Profile: 0/10</h2>
        <h2 className='text-2xl font-medium text-white'> | </h2>
        <h2 className='text-2xl font-medium text-white'>Flags: 0 <img src={redFlag} alt="redFlag" className='w-6 h-6 inline-block' /></h2>
        </div>

        <div className='flex justify-between items-center w-[10%]'>
            <FaMagnifyingGlass className='text-2xl text-white' />
            <GoBell className='text-2xl text-white' />
            <FaEnvelopeOpenText className='text-2xl text-white' />
        </div>
    </div>
  )
}

export default Header