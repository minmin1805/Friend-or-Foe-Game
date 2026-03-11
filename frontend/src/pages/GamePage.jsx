import React from 'react'
import Header from '../components/Header'
import { FaUserFriends, FaFlag, FaHome } from 'react-icons/fa'
import { SlMagnifier } from 'react-icons/sl'
import FriendRequestList from '../components/FriendRequestList'
import { useFriendOrFoe } from '../context/FriendOrFoeContext'
import { useNavigate } from 'react-router-dom'
import person1 from '../assets/Images/GamePage/person1.png'
import person2 from '../assets/Images/GamePage/person2.png'
import person3 from '../assets/Images/GamePage/person3.png'

const profilePhotoMap = {
  person1,
  person2,
  person3,
  default: null,
}

function GamePage() {
  const { profiles, setCurrentProfileById } = useFriendOrFoe()
  const navigate = useNavigate()

  const handleSelectProfile = (profile) => {
    setCurrentProfileById(profile.profileId)
    navigate(`/profile/${profile.profileId}`)
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex w-full h-full">
        {/* left bar */}
        <div className="w-[23%] h-full bg-gray-200 pt-[100px]">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-500 p-2 pl-10">
            <FaHome className="text-3xl text-gray-500" /> Home
          </p>
          <p className="flex items-center gap-2 text-2xl font-medium text-white bg-purple-500 p-2 pl-10">
            <FaUserFriends className="text-3xl text-white" /> Friends Suggestions {'>'}
          </p>
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-500 p-2 pl-10">
            <FaFlag className="text-3xl text-gray-500" /> Sugesstions
          </p>
        </div>

        {/* right side - 10 friend requests from profiles.json */}
        <div className="w-[80%] h-full bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100">
          <div className="flex justify-between p-6 sm:p-8 bg-gray-50">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-medium">Friend Requests</h1>
              <p className="text-gray-500 mt-2 text-lg">{profiles.length} requests</p>
            </div>
            <div className="rounded-2xl border border-gray-300 py-2 px-5 flex items-center gap-2 h-[50px] mt-2 bg-white">
              <SlMagnifier className="text-2xl text-gray-500" />
              <input type="text" placeholder="Search (mock)" className="w-full outline-none bg-transparent" />
            </div>
          </div>

          <div className="mx-10">
            <FriendRequestList
              profiles={profiles}
              profilePhotoMap={profilePhotoMap}
              onSelectProfile={handleSelectProfile}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage
