import React from 'react'
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendar,
  FaComment,
  FaUserPlus,
  FaSearch,
  FaImages,
  FaShare,
  FaPlus,
  FaStar,
} from 'react-icons/fa'

/**
 * Renders a single profile (intro, details, connection network, photo section, activity posts).
 * Used on ProfilePage and will support flagging (flaggedSet, onFlag) later for the game.
 * @param {Object} props
 * @param {Object} props.profile - One profile object from profiles.json
 * @param {Object} props.profilePhotoMap - Map of profilePhotoKey -> image (person1, person2, person3, default)
 * @param {Array} [props.friendAvatars] - Optional array of 3 images for connection network placeholders
 * @param {Array} [props.photoThumbnails] - Optional array of images for photo section placeholders
 * @param {Function} [props.onViewAllFriends] - Optional handler when \"View All Friends\" is clicked
 * @param {Function} [props.onViewAllPhotos] - Optional handler when \"View All Photos\" is clicked
 */
function ProfileView({
  profile,
  profilePhotoMap = {},
  friendAvatars = [],
  photoThumbnails = [],
  onViewAllFriends,
  onViewAllPhotos,
}) {
  if (!profile) return null

  const photoSrc = profilePhotoMap[profile.profilePhotoKey] ?? profilePhotoMap.default ?? null
  const friendsCount = profile.friendsSection?.count ?? profile.friends ?? 0
  const photosCount = profile.photosSection?.count ?? 0

  return (
    <>
      {/* Left column */}
      <div className="w-[380px] shrink-0 flex flex-col gap-5">
        {/* Profile Overview */}
        <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
          <div className="px-5 py-3 border-b border-purple-200/60 flex items-center gap-2">
            <FaComment className="text-purple-600 text-lg" />
            <h2 className="font-semibold text-purple-900">Profile Overview</h2>
          </div>
          <div className="p-5 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-purple-100 ring-2 ring-purple-200">
              {photoSrc ? (
                <img src={photoSrc} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">?</div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-3">{profile.displayName || profile.username}</h3>
            <p className="text-sm text-purple-700">@{profile.username}</p>
            <p className="text-xs text-gray-500 mt-1">{profile.accountAge}</p>
            <div className="flex gap-2 mt-4 w-full">
              <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-100 text-purple-800 font-medium text-sm hover:bg-purple-200 transition-colors">
                <FaComment className="text-sm" /> Message
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-100 text-purple-800 font-medium text-sm hover:bg-purple-200 transition-colors">
                <FaUserPlus className="text-sm" /> Follow
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
          <div className="px-5 py-3 border-b border-purple-200/60 flex items-center gap-2">
            <FaUser className="text-purple-600 text-lg" />
            <h2 className="font-semibold text-purple-900">Profile Details</h2>
          </div>
          <div className="p-5 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-purple-500 w-4 shrink-0" />
              <span className="text-gray-700">{profile.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendar className="text-purple-500 w-4 shrink-0" />
              <span className="text-gray-700">{profile.accountAge}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-purple-200/60 space-y-2">
              <div className="flex items-center gap-3">
                <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Friends: {profile.friends}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Followers: {profile.followers}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Following: {profile.following}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Mutual friends: {profile.mutualFriends}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaImages className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Photos: {photosCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Network (Friends) + Photo Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-purple-200/60 flex items-center gap-2">
              <FaUserPlus className="text-purple-600 text-base" />
              <h2 className="font-semibold text-purple-900 text-sm">Connection Network</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 flex-wrap">
                {friendAvatars.slice(0, 3).map((src, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-200 ring-1 ring-purple-200">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-700 mt-1">Friend</span>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold text-lg">+</div>
                  <span className="text-xs text-purple-700 mt-1">{Math.max(0, friendsCount - 3)} More</span>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 w-full text-center text-sm text-purple-700 hover:underline flex items-center justify-center gap-1"
                onClick={() => onViewAllFriends && onViewAllFriends()}
              >
                <FaPlus className="text-xs" />
                <span>View All Friends</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-purple-200/60 flex items-center gap-2">
              <FaImages className="text-purple-600 text-base" />
              <h2 className="font-semibold text-purple-900 text-sm">Photo Section</h2>
            </div>
            <div className="p-4">
              <div className="flex gap-2 flex-wrap">
                {photoThumbnails.length > 0 ? (
                  photoThumbnails.slice(0, 3).map((src, i) => (
                    <img key={i} src={src} alt="" className="w-16 h-16 rounded-lg object-cover border border-purple-200/60" />
                  ))
                ) : (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="w-16 h-16 rounded-lg bg-purple-200/60 border border-purple-200/60 flex items-center justify-center text-gray-400 text-xs">
                      Photo
                    </div>
                  ))
                )}
              </div>
              <p className="text-xs text-gray-600 mt-2">Number of photos: {photosCount}</p>
              <button
                type="button"
                className="mt-2 w-full text-center text-sm text-purple-700 hover:underline flex items-center justify-center gap-1"
                onClick={() => onViewAllPhotos && onViewAllPhotos()}
              >
                <FaPlus className="text-xs" />
                <span>View All Photos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right column - Activity Posts (from profile.posts) */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">
        <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
          <div className="px-5 py-3 border-b border-purple-200/60 flex items-center gap-2">
            <FaComment className="text-purple-600 text-lg" />
            <h2 className="font-semibold text-purple-900">Activity Posts</h2>
          </div>
          <div className="p-5 space-y-5">
            {(profile.posts || []).map((post) => (
              <div key={post.id} className="rounded-xl bg-white/80 border border-purple-200/50 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-200 shrink-0">
                    {photoSrc ? (
                      <img src={photoSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">?</div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{profile.displayName || profile.username}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{post.text}</p>
                {post.hasImage ? (
                  <div className="w-full h-32 rounded-lg bg-purple-100/50 border border-purple-200/50 flex items-center justify-center text-gray-500 text-sm">
                    [Image]
                  </div>
                ) : (
                  <div className="w-full h-20 rounded-lg bg-purple-100/30 border border-purple-200/50 flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <FaStar className="text-amber-400" /> 0
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <FaComment className="text-purple-500" /> 0
                  </span>
                  <button type="button" className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700">
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileView
