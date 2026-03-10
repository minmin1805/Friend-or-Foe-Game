import React from 'react'
import logo from '../assets/Images/WelcomePage/logo.png'
import redFlag from '../assets/Images/WelcomePage/redflag.png'
import magnifyingGlass from '../assets/Images/WelcomePage/magnifyingGlass.png'
import {useNavigate} from 'react-router-dom'

function WelcomePage() {

  const navigate = useNavigate();

  const handleStartInvestigation = () => {
    navigate('/instruction');
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-blue-300'>
      <img  src={logo} alt="logo" className=''/>
      <h1 className='text-4xl font-bold text-white mt-10'>Can you spot the fake account?</h1>

      <div className='flex flex-col items-center justify-center rounded-2xl bg-white p-4 mt-10 w-[40%]'>
        <h2 className='text-3xl font-bold mb-2'>Before we begin...</h2>
        <h2 className='text-2xl mb-2 font-bold'>Enter your detective name</h2>
        <input type="text" placeholder='Type your name here' className='text-center w-[85%] p-2 rounded-xl border-2 border-gray-300' />
        <button onClick={handleStartInvestigation} className='bg-blue-500 text-white p-2 rounded-xl mt-4 text-xl px-10 py-2'>Start Investigation</button>
        <p className='text-lg mb-2 mt-4'> <img src={magnifyingGlass} alt="magnifyingGlass" className='w-6 h-6 inline-block' /> Invesgitate 10 friend requests</p>
        <p className='text-lg'> <img src={redFlag} alt="redFlag" className='w-6 h-6 inline-block' /> Spot red flags to earn points</p>
      </div>  
    </div>
  )
}

export default WelcomePage
