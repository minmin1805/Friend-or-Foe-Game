import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import ProfileView from '../components/ProfileView'
import CorrectPopup from '../components/CorrectPopup'
import IncorrectPopup from '../components/IncorrectPopup'
import { useFriendOrFoe } from '../context/FriendOrFoeContext'
import {
  avatarByProfileId,
  getPhotosForProfileId,
  photoSrcByProfileIdAndNumber,
} from '../utils/profileAssets'
import { FaSearch } from 'react-icons/fa'

const profilePhotoMap = { ...avatarByProfileId, default: null }

function ProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    currentProfile,
    currentProfileIndex,
    flaggedSetForCurrent,
    setFlag,
    submitDecision,
    pendingFeedback,
    goToNextProfile,
    finishGame,
    profiles,
    decisions,
    setCurrentProfileById,
    referenceNotes,
  } = useFriendOrFoe()

  const [showNotebook, setShowNotebook] = useState(false)

  useEffect(() => {
    if (id) {
      setCurrentProfileById(id)
    }
  }, [id, setCurrentProfileById])

  const profile = currentProfile

  const unknownFriendAvatar = avatarByProfileId['1']
  const friendAvatars = unknownFriendAvatar
    ? [unknownFriendAvatar, unknownFriendAvatar, unknownFriendAvatar]
    : []

  const photoThumbnails = getPhotosForProfileId(profile?.profileId).slice(0, 3)

  const postImages = {}
  ;(profile?.posts || []).forEach((p) => {
    if (!p?.hasImage) return
    const n = Number(String(p.id).replace('post_', ''))
    const src = photoSrcByProfileIdAndNumber?.[String(profile.profileId)]?.[n]
    if (src) postImages[p.id] = src
  })

  const handleViewAllFriends = () => {
    if (!profile) return
    navigate(`/profile/${profile.profileId}/friends`)
  }

  const handleViewAllPhotos = () => {
    if (!profile) return
    navigate(`/profile/${profile.profileId}/photos`)
  }

  const handleDecision = (decision) => {
    if (!profile) return
    submitDecision(currentProfileIndex, decision)
  }

  const handleCloseFeedback = async () => {
    goToNextProfile() // clears pendingFeedback

    const remaining = profiles.filter((_, index) => !decisions[index]).length

    if (remaining <= 0) {
      await finishGame()
      navigate('/endgame')
    } else {
      navigate('/game')
    }
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
              postImages={postImages}
              onViewAllFriends={handleViewAllFriends}
              onViewAllPhotos={handleViewAllPhotos}
              flaggedSet={flaggedSetForCurrent}
              onToggleFlag={(key) => setFlag(currentProfileIndex, key)}
            />
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
        <p className="text-gray-700 text-sm">Click suspicious elements to flag them, then accept or reject.</p>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors"
            onClick={() => handleDecision('reject')}
          >
            ✕ Reject Request
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-green-500 text-white font-medium text-sm hover:bg-green-600 transition-colors"
            onClick={() => handleDecision('accept')}
          >
            ✓ Accept Request
          </button>
        </div>
      </div>

      {/* Centered feedback popups with dimmed background */}
      {pendingFeedback && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          {pendingFeedback.correct ? (
            <CorrectPopup feedback={pendingFeedback} onClose={handleCloseFeedback} />
          ) : (
            <IncorrectPopup feedback={pendingFeedback} onClose={handleCloseFeedback} />
          )}
        </div>
      )}
      {/* Reference notebook trigger */}
      <button
        type="button"
        onClick={() => setShowNotebook(true)}
        className="fixed top-40 right-6 z-20 rounded-full bg-white shadow-lg border border-purple-200 w-10 h-10 flex items-center justify-center text-purple-700 hover:bg-purple-50"
        aria-label="Open investigation notebook"
      >
        📓
      </button>
      {/* Reference notebook popup */}
      {showNotebook && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-900">Investigation Notebook</h2>
              <button
                type="button"
                onClick={() => setShowNotebook(false)}
                className="text-sm text-purple-700 hover:underline"
              >
                Close
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Reminders based on profiles you have already investigated.
            </p>
            <div className="space-y-4">
              {referenceNotes.map((note) => (
                <div
                  key={note.profileId}
                  className="rounded-xl border border-purple-200 bg-purple-50/60 px-4 py-3"
                >
                  <p className="font-semibold text-purple-900 mb-1">
                    {note.label}
                  </p>
                  {note.missedKeys && note.missedKeys.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {note.missedKeys.map((key) => (
                        <li key={key}>
                          {key === 'joinedDate' && 'Remember to check how old the account is.'}
                          {key === 'bio' && 'Remember to read the bio carefully for risky phrases.'}
                          {key === 'profilePhoto' && 'Look closely at the profile photo (real vs stock vs AI).'}
                          {key === 'friends' && 'Compare friend count with how long the account has existed.'}
                          {key === 'mutualFriends' && 'Check how many mutual friends you share.'}
                          {key === 'following' && 'Look at the followers vs following ratio.'}
                          {key === 'section_photos' && 'Open the photo section to see if the photos look real and consistent.'}
                          {key !== 'joinedDate' &&
                            key !== 'bio' &&
                            key !== 'profilePhoto' &&
                            key !== 'friends' &&
                            key !== 'mutualFriends' &&
                            key !== 'following' &&
                            key !== 'section_photos' &&
                            'Remember to double‑check this part of the profile.'}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No reminders for this profile – you spotted everything important.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
