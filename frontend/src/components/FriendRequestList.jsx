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
 */
function FriendRequestList({ profiles = [], profilePhotoMap = {} }) {
  const navigate = useNavigate()

  const getAvatarBg = (index) => AVATAR_BG[index % AVATAR_BG.length]

  return (
    <div className="rounded-lg border border-gray-300 bg-white overflow-hidden">
      {profiles.map((profile, index) => {
        const photoSrc = profilePhotoMap[profile.profilePhotoKey] ?? profilePhotoMap.default ?? null
        const bgClass = getAvatarBg(index)

        return (
          <div
            key={profile.profileId}
            className={`flex justify-between items-center w-full py-5 px-6 ${index < profiles.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className={`shrink-0 w-16 h-16 rounded-full overflow-hidden ${bgClass}`}>
                {photoSrc ? (
                  <img src={photoSrc} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                    ?
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {profile.displayName || profile.username}
                </h2>
                <p className="text-gray-600 text-sm">
                  {profile.mutualFriends} mutual {profile.mutualFriends === 1 ? 'friend' : 'friends'}
                </p>
                <p className="text-gray-500 text-sm truncate">{profile.bio}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full"
                aria-label="Options"
              >
                <FaEllipsisH className="text-lg" />
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/profile/${profile.profileId}`)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FriendRequestList
