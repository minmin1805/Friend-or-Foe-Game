import React from 'react'
import Header from '../components/Header'
import { FaUserFriends, FaFlag, FaHome } from 'react-icons/fa'
import { SlMagnifier } from 'react-icons/sl'
import FriendRequestList from '../components/FriendRequestList'
import { useFriendOrFoe } from '../context/FriendOrFoeContext'
import { useNavigate } from 'react-router-dom'
import { avatarByProfileId } from '../utils/profileAssets'

const profilePhotoMap = { ...avatarByProfileId, default: null }

function GamePage() {
  const {
    profiles,
    decisions,
    setCurrentProfileById,
    score,
    doubleForNextAvailable,
    doubleForNextActive,
    doubleForNextUsed,
    activateDoubleForNext,
  } = useFriendOrFoe()
  const navigate = useNavigate()

  const remainingProfiles = profiles.filter((_, index) => !decisions[index])

  const handleSelectProfile = (profile) => {
    setCurrentProfileById(profile.profileId)
    navigate(`/profile/${profile.profileId}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100">
      <Header />

      <div className="flex w-full flex-1 min-h-0">
        {/* Desktop sidebar only — hidden on small screens */}
        <div className="hidden lg:flex lg:flex-col lg:w-[23%] lg:shrink-0 bg-gray-200 pt-[100px]">
          <p className="flex items-center gap-2 text-xl xl:text-2xl font-medium text-gray-500 p-2">
            <FaHome className="text-2xl xl:text-3xl text-gray-500 shrink-0" /> Home
          </p>
          <p className="flex items-center gap-2 text-xl xl:text-2xl font-medium text-white bg-purple-500 p-2">
            <FaUserFriends className="text-2xl xl:text-3xl text-white shrink-0" /> Friends Suggestions {'>'}
          </p>
          <p className="flex items-center gap-2 text-xl xl:text-2xl font-medium text-gray-500 p-2">
            <FaFlag className="text-2xl xl:text-3xl text-gray-500 shrink-0" /> Sugesstions
          </p>
        </div>

        <div className="w-full min-w-0 flex-1 lg:w-[77%]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-2xl sm:text-3xl font-medium">Friend Requests</h1>
              <p className="text-gray-500 mt-1 sm:mt-2 text-base sm:text-lg">
                {remainingProfiles.length} request{remainingProfiles.length === 1 ? '' : 's'} remaining
              </p>
            </div>
            <div className="rounded-2xl border border-gray-300 py-2 px-4 sm:px-5 flex items-center gap-2 h-[48px] sm:h-[50px] bg-white w-full sm:w-auto sm:min-w-[200px] sm:max-w-sm">
              <SlMagnifier className="text-xl sm:text-2xl text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search (mock)"
                className="w-full min-w-0 outline-none bg-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="mx-4 sm:mx-6 lg:mx-10 mt-4 sm:mt-5 pb-24 lg:pb-8">
            {remainingProfiles.length > 0 ? (
              <FriendRequestList
                profiles={remainingProfiles}
                profilePhotoMap={profilePhotoMap}
                onSelectProfile={handleSelectProfile}
              />
            ) : (
              <div className="mt-10 text-center text-gray-700 text-lg">
                You have reviewed all friend requests.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Double-points power-up bar fixed at bottom */}
      {( (doubleForNextAvailable || score >= 4000) && !doubleForNextUsed ) && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-purple-700 text-white px-4 py-3 sm:px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <p className="text-xs sm:text-sm md:text-base font-semibold text-center sm:text-left leading-snug">
            Power‑Up Unlocked: Double points on your next profile decision!
          </p>
          <button
            type="button"
            disabled={doubleForNextActive}
            onClick={activateDoubleForNext}
            className={`w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-lg text-sm font-bold ${
              doubleForNextActive
                ? 'bg-green-400 text-purple-900 cursor-default'
                : 'bg-yellow-300 text-purple-900 hover:bg-yellow-200'
            }`}
          >
            {doubleForNextActive ? 'Double Points Active' : 'Use on Next Profile'}
          </button>
        </div>
      )}
    </div>
  )
}

export default GamePage
