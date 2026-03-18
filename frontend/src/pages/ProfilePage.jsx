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

const NOTEBOOK_STATIC = {
  joinedDate: 'Remember to check how old the account is.',
  bio: 'Remember to read the bio carefully for risky phrases.',
  profilePhoto: 'Look closely at the profile photo (real vs stock vs AI).',
  friends: 'Compare friend count with how long the account has existed.',
  mutualFriends: 'Check how many mutual friends you share.',
  following: 'Look at the followers vs following ratio.',
  username: 'Check whether the username looks generic or like a bot/scam account.',
  section_photos: 'Open the photo section to see if the photos look real and consistent.',
}

/**
 * Notebook reminders: no duplicate generic lines; group multiple missed posts into one block
 * with specific reasons from profiles.json.
 */
function getNotebookReminderItems(note, profiles) {
  const profile = profiles.find((p) => String(p.profileId) === String(note.profileId))
  const keys = note.missedKeys || []
  if (keys.length === 0) return []

  const postKeys = keys.filter((k) => String(k).startsWith('post_'))
  const otherKeys = keys.filter((k) => !String(k).startsWith('post_'))

  const simpleLines = []
  const seen = new Set()

  for (const key of otherKeys) {
    const rf = profile?.redFlags?.find((r) => r.elementKey === key)
    const text = rf?.reason || NOTEBOOK_STATIC[key] || `Review this part of the profile (${key}).`
    if (seen.has(text)) continue
    seen.add(text)
    simpleLines.push(text)
  }

  if (postKeys.length === 0) {
    return simpleLines.map((text) => ({ kind: 'line', text }))
  }

  const postReasons = postKeys
    .map((k) => profile?.redFlags?.find((r) => r.elementKey === k)?.reason)
    .filter(Boolean)
  const uniqueReasons = [...new Set(postReasons)]

  if (postKeys.length === 1) {
    const text =
      uniqueReasons[0] ||
      'Review that activity post for risky language (DMs, meet-ups, video chat, or other apps).'
    if (!seen.has(text)) simpleLines.push(text)
    return simpleLines.map((text) => ({ kind: 'line', text }))
  }

  // Several missed post flags → one grouped entry (unique reasons only)
  const postBlock = {
    kind: 'posts',
    count: postKeys.length,
    reasons:
      uniqueReasons.length > 0
        ? uniqueReasons
        : [
            'Meet-up asks, video chat, DMs, or moving to Snapchat/other apps — re-read each post in the activity feed.',
          ],
  }
  return [...simpleLines.map((text) => ({ kind: 'line', text })), postBlock]
}

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

      <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 px-3 pt-3 pb-40 sm:px-4 sm:pt-4 sm:pb-36 lg:p-6 lg:pb-28 max-w-7xl mx-auto w-full min-w-0">
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
      <div className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl bg-purple-50 border-t border-purple-200/60 shadow-[0_-4px_20px_rgba(147,51,234,0.15)] px-3 py-3 sm:px-5 sm:py-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-start gap-2 min-w-0">
            <FaSearch className="text-purple-600 text-lg sm:text-xl shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-purple-900 text-sm sm:text-base">Investigation Panel</h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-snug">
                Tap to flag suspicious spots, then Accept or Reject.
              </p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              className="flex-1 sm:flex-none px-3 py-2.5 sm:px-5 rounded-xl bg-red-500 text-white font-medium text-xs sm:text-sm hover:bg-red-600 transition-colors"
              onClick={() => handleDecision('reject')}
            >
              ✕ Reject
            </button>
            <button
              type="button"
              className="flex-1 sm:flex-none px-3 py-2.5 sm:px-5 rounded-xl bg-green-500 text-white font-medium text-xs sm:text-sm hover:bg-green-600 transition-colors"
              onClick={() => handleDecision('accept')}
            >
              ✓ Accept
            </button>
          </div>
        </div>
      </div>

      {/* Centered feedback popups with dimmed background */}
      {pendingFeedback && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
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
        className="fixed bottom-32 right-4 sm:bottom-auto sm:top-40 sm:right-6 z-20 rounded-full bg-white shadow-lg border border-purple-200 w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center text-purple-700 hover:bg-purple-50 touch-manipulation"
        aria-label="Open investigation notebook"
      >
        📓
      </button>
      {/* Reference notebook popup */}
      {showNotebook && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-[calc(100%-2rem)] sm:w-full mx-2 sm:mx-0 max-h-[85vh] overflow-y-auto p-4 sm:p-6">
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
              {referenceNotes.map((note) => {
                const reminderItems = getNotebookReminderItems(note, profiles)
                return (
                <div
                  key={note.profileId}
                  className="rounded-xl border border-purple-200 bg-purple-50/60 px-4 py-3"
                >
                  <p className="font-semibold text-purple-900 mb-1">
                    {note.label}
                  </p>
                  {reminderItems.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                      {reminderItems.map((item, i) =>
                        item.kind === 'posts' ? (
                          <li key={`${note.profileId}-posts-${i}`} className="list-none -ml-4 sm:ml-0">
                            <span className="font-medium text-purple-900">Activity posts</span>
                            <span className="text-gray-700">
                              {' '}
                              — you missed {item.count} flagged posts. Look for:
                            </span>
                            <ul className="list-disc list-inside ml-4 mt-1.5 space-y-0.5 text-gray-700">
                              {item.reasons.map((r, j) => (
                                <li key={`${note.profileId}-pr-${j}`}>{r}</li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={`${note.profileId}-${i}`}>{item.text}</li>
                        ),
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No reminders for this profile – you spotted everything important.
                    </p>
                  )}
                </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
