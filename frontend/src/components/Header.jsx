import React, { useMemo } from 'react'
import redFlag from '../assets/Images/WelcomePage/redflag.png'
import logo from '../assets/Images/GamePage/logo.png'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { GoBell } from 'react-icons/go'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { useFriendOrFoe } from '../context/FriendOrFoeContext'

function Header() {
  const { score, profiles, decisions, flaggedElements, currentProfileIndex } = useFriendOrFoe()

  const { completedCount, currentFlags } = useMemo(() => {
    const completed = decisions.filter(Boolean).length
    const flagsForCurrent = flaggedElements[currentProfileIndex] || []
    return {
      completedCount: completed || 0,
      currentFlags: flagsForCurrent.length,
    }
  }, [decisions, flaggedElements, currentProfileIndex])

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between bg-purple-500 px-3 py-2.5 sm:px-5 sm:py-3 md:px-8 lg:px-10">
      <img
        src={logo}
        alt="Friend or Foe"
        className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[200px] object-contain shrink-0 mx-auto sm:mx-0"
      />
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-3 text-white text-xs sm:text-sm md:text-lg lg:text-2xl font-medium order-last sm:order-none">
        <span>Score: {score.toLocaleString()}</span>
        <span className="opacity-70 hidden sm:inline" aria-hidden>
          |
        </span>
        <span>
          Profile: {completedCount}/{profiles.length}
        </span>
        <span className="opacity-70 hidden sm:inline" aria-hidden>
          |
        </span>
        <span className="flex items-center gap-1">
          Flags: {currentFlags}
          <img src={redFlag} alt="" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 inline-block" />
        </span>
      </div>
      <div className="hidden sm:flex items-center justify-center sm:justify-end gap-3 md:gap-4 shrink-0">
        <FaMagnifyingGlass className="text-xl md:text-2xl text-white" aria-hidden />
        <GoBell className="text-xl md:text-2xl text-white" aria-hidden />
        <FaEnvelopeOpenText className="text-xl md:text-2xl text-white" aria-hidden />
      </div>
    </header>
  )
}

export default Header
