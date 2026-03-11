import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import ProfileView from '../components/ProfileView'
import CorrectPopup from '../components/CorrectPopup'
import IncorrectPopup from '../components/IncorrectPopup'
import profilesData from '../data/profiles.json'
import person1 from '../assets/Images/GamePage/person1.png'
import person2 from '../assets/Images/GamePage/person2.png'
import person3 from '../assets/Images/GamePage/person3.png'
import stockImage1 from '../assets/Images/ProfilePage/stock1.jpeg'
import stockImage2 from '../assets/Images/ProfilePage/stock2.jpg'
import stockImage3 from '../assets/Images/ProfilePage/stock3.jpeg'
import { FaSearch } from 'react-icons/fa'

const profilePhotoMap = {
  person1,
  person2,
  person3,
  default: null,
}

const friendAvatars = [person1, person2, person3]
const photoThumbnails = [stockImage1, stockImage2, stockImage3]

function ProfilePage() {
  const { id } = useParams()
  const profile = profilesData.find((p) => p.profileId === id) ?? null
  const navigate = useNavigate()

  const [showCorrectPopup, setShowCorrectPopup] = useState(false)
  const [showIncorrectPopup, setShowIncorrectPopup] = useState(false)

  const handleViewAllFriends = () => {
    if (!profile) return
    navigate(`/profile/${profile.profileId}/friends`)
  }

  const handleViewAllPhotos = () => {
    if (!profile) return
    navigate(`/profile/${profile.profileId}/photos`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100">
      <Header />

      <main className="flex-1 flex gap-6 p-6 pb-24 max-w-7xl mx-auto w-full">
        {profile ? (
          <>
            <ProfileView
              profile={profile}
              profilePhotoMap={profilePhotoMap}
              friendAvatars={friendAvatars}
              photoThumbnails={photoThumbnails}
              onViewAllFriends={handleViewAllFriends}
              onViewAllPhotos={handleViewAllPhotos}
            />

            {/* Demo buttons to toggle mock popups */}
            <div className="absolute top-28 right-6 flex gap-2 z-20">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600"
                onClick={() => {
                  setShowIncorrectPopup(false)
                  setShowCorrectPopup(true)
                }}
              >
                Show Correct Popup
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600"
                onClick={() => {
                  setShowCorrectPopup(false)
                  setShowIncorrectPopup(true)
                }}
              >
                Show Incorrect Popup
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Profile not found.</p>
          </div>
        )}
      </main>

      {/* Investigation Panel - fixed at bottom edge */}
      <div className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl bg-purple-50 border-t border-purple-200/60 shadow-[0_-4px_20px_rgba(147,51,234,0.15)] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <FaSearch className="text-purple-600 text-xl" />
          <h2 className="font-semibold text-purple-900">Investigation Panel</h2>
        </div>
        <p className="text-gray-700 text-sm">Click suspicious elements to flag them</p>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors"
          >
            ✕ Reject Request
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-green-500 text-white font-medium text-sm hover:bg-green-600 transition-colors"
          >
            ✓ Accept Request
          </button>
        </div>
      </div>

      {/* Centered popups with dimmed background */}
      {(showCorrectPopup || showIncorrectPopup) && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          {showCorrectPopup && <CorrectPopup onClose={() => setShowCorrectPopup(false)} />}
          {showIncorrectPopup && <IncorrectPopup onClose={() => setShowIncorrectPopup(false)} />}
        </div>
      )}
    </div>
  )
}

export default ProfilePage
