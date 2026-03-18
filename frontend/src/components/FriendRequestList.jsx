import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEllipsisH } from 'react-icons/fa'

const AVATAR_BG = ['bg-green-100', 'bg-blue-100', 'bg-amber-100']

/**
 * Renders the list of friend request cards (10 profiles).
 * Used on GamePage to show all pre-made profiles from profiles.json.
 * @param {Object} props
 * @param {Array} props.profiles - Array of profile objects (from profiles.json)
 * @param {Object} props.profilePhotoMap - Map of profilePhotoKey -> image (e.g. { person1: img, person2: img, person3: img, default: null })
 * @param {Function} [props.onSelectProfile] - Optional callback when \"View Profile\" is clicked
 */
function FriendRequestList({ profiles = [], profilePhotoMap = {}, onSelectProfile }) {
  const navigate = useNavigate()

  const getAvatarBg = (index) => AVATAR_BG[index % AVATAR_BG.length]

  return (
    <div className="rounded-lg border border-gray-300 bg-white overflow-hidden">
      {profiles.map((profile, index) => {
        const photoSrc =
          profilePhotoMap?.[profile.profileId] ?? profilePhotoMap.default ?? null
        const bgClass = getAvatarBg(index)

        return (
          <div
            key={profile.profileId}
            className={`flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full py-4 px-4 sm:py-5 sm:px-6 ${index < profiles.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ${bgClass}`}>
                {photoSrc ? (
                  <img src={photoSrc} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                    ?
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  {profile.displayName || profile.username}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {profile.mutualFriends} mutual {profile.mutualFriends === 1 ? 'friend' : 'friends'}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 sm:truncate">{profile.bio}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 w-full sm:w-auto border-t border-gray-100 pt-3 sm:border-0 sm:pt-0">
              <button
                type="button"
                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full"
                aria-label="Options"
              >
                <FaEllipsisH className="text-lg" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onSelectProfile) {
                    onSelectProfile(profile)
                  } else {
                    navigate(`/profile/${profile.profileId}`)
                  }
                }}
                className="flex-1 sm:flex-none bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-300 text-center"
              >
                View Profile
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FriendRequestList
