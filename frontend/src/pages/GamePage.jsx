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

      <div className="flex w-full flex-1">
        {/* left bar */}
        <div className="w-[23%] bg-gray-200 pt-[100px]">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-500 p-2 ">
            <FaHome className="text-3xl text-gray-500" /> Home
          </p>
          <p className="flex items-center gap-2 text-2xl font-medium text-white bg-purple-500 p-2 ">
            <FaUserFriends className="text-3xl text-white" /> Friends Suggestions {'>'}
          </p>
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-500 p-2 ">
            <FaFlag className="text-3xl text-gray-500" /> Sugesstions
          </p>
        </div>

        {/* right side - 10 friend requests from profiles.json */}
        <div className="w-[80%]">
          <div className="flex justify-between p-6 sm:p-8 bg-gray-50">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-medium">Friend Requests</h1>
              <p className="text-gray-500 mt-2 text-lg">
                {remainingProfiles.length} request{remainingProfiles.length === 1 ? '' : 's'} remaining
              </p>
            </div>
            <div className="rounded-2xl border border-gray-300 py-2 px-5 flex items-center gap-2 h-[50px] mt-2 bg-white">
              <SlMagnifier className="text-2xl text-gray-500" />
              <input type="text" placeholder="Search (mock)" className="w-full outline-none bg-transparent" />
            </div>
          </div>

          <div className="mx-10 mt-5">
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
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-purple-700 text-white px-6 py-3 flex items-center justify-between">
          <p className="text-sm sm:text-base font-semibold">
            Power‑Up Unlocked: Double points on your next profile decision!
          </p>
          <button
            type="button"
            disabled={doubleForNextActive}
            onClick={activateDoubleForNext}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${
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
