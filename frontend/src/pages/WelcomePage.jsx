import React, { useState } from 'react'
import logo from '../assets/Images/WelcomePage/logo.png'
import redFlag from '../assets/Images/WelcomePage/redflag.png'
import magnifyingGlass from '../assets/Images/WelcomePage/magnifyingGlass.png'
import {useNavigate} from 'react-router-dom'
import { useFriendOrFoe } from '../context/FriendOrFoeContext'

function WelcomePage() {

  const navigate = useNavigate();
  const { createPlayer, resetGame } = useFriendOrFoe()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleStartInvestigation = async () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Please enter your detective name.')
      return
    }
    setError('')
    await resetGame()
    try {
      await createPlayer(trimmed)
      navigate('/instruction')
    } catch (e) {
      console.error(e)
      setError('Unable to start game. Please try again.')
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-blue-300 px-4 py-8 sm:py-10">
      <div className="flex flex-1 flex-col items-center justify-center w-full">
      <img src={logo} alt="Friend or Foe" className="max-w-[min(100%,280px)] sm:max-w-xs w-full h-auto" />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-6 sm:mt-10 text-center max-w-lg leading-tight">
        Can you spot the fake account?
      </h1>

      <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-5 sm:p-6 mt-6 sm:mt-10 w-full max-w-md shadow-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center">Before we begin...</h2>
        <h2 className="text-lg sm:text-xl md:text-2xl mb-3 font-bold text-center text-gray-800">
          Enter your detective name
        </h2>
        <input
          type="text"
          placeholder="Type your name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center w-full max-w-sm p-3 rounded-xl border-2 border-gray-300 text-base"
        />
        <button
          type="button"
          onClick={handleStartInvestigation}
          className="w-full max-w-sm bg-blue-500 text-white py-3 rounded-xl mt-4 text-lg sm:text-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Start Investigation
        </button>
        {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
        <p className="text-sm sm:text-base text-center mb-1 mt-5 text-gray-700 flex flex-wrap items-center justify-center gap-2">
          <img src={magnifyingGlass} alt="" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          Investigate 10 friend requests
        </p>
        <p className="text-sm sm:text-base text-center text-gray-700 flex flex-wrap items-center justify-center gap-2">
          <img src={redFlag} alt="" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          Spot red flags to earn points
        </p>
      </div>
      </div>
      <p className="mt-8 text-center text-xs sm:text-sm text-white/85">
        Design &amp; development by Minh Doan
      </p>
    </div>
  )
}

export default WelcomePage
