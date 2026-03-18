import React, { useState } from 'react'
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
 * @param {Set<string>} [props.flaggedSet] - Optional set of flagged elementKeys for highlighting
 * @param {Function} [props.onToggleFlag] - Optional handler when a flaggable element is clicked
 */
function ProfileView({
  profile,
  profilePhotoMap = {},
  friendAvatars = [],
  photoThumbnails = [],
  postImages = {},
  onViewAllFriends,
  onViewAllPhotos,
  flaggedSet,
  onToggleFlag,
}) {
  if (!profile) return null

  const [expandedPostId, setExpandedPostId] = useState(null)

  const photoSrc = profilePhotoMap[String(profile.profileId)] ?? profilePhotoMap.default ?? null
  const friendsCount = profile.friendsSection?.count ?? profile.friends ?? 0
  const photosCount = profile.photosSection?.count ?? 0

  const isFlagged = (key) => (flaggedSet && flaggedSet.has ? flaggedSet.has(key) : false)

  // Only allow flagging "section_photos" when the current profile marks it as a red flag.
  const isSectionPhotosFlaggable =
    !!onToggleFlag && (profile.redFlags || []).some((f) => f.elementKey === 'section_photos')

  const flagClasses = (key) =>
    onToggleFlag
      ? `cursor-pointer ${
          isFlagged(key)
            ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-purple-50'
            : 'hover:ring-2 hover:ring-purple-300 hover:ring-offset-2 hover:ring-offset-purple-50'
        }`
      : ''

  return (
    <>
      {/* Left column */}
      <div className="w-full min-w-0 lg:w-[380px] lg:shrink-0 flex flex-col gap-4 lg:gap-5">
        {/* Profile Overview */}
        <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
          <div className="px-5 py-3 border-b border-purple-200/60 flex items-center gap-2">
            <FaComment className="text-purple-600 text-lg" />
            <h2 className="font-semibold text-purple-900">Profile Overview</h2>
          </div>
          <div className="p-5 flex flex-col items-center text-center">
            <div
              className={`w-24 h-24 rounded-full overflow-hidden bg-purple-100 ring-2 ring-purple-200 ${flagClasses(
                'profilePhoto',
              )}`}
              onClick={() => onToggleFlag && onToggleFlag('profilePhoto')}
            >
              {photoSrc ? (
                <img src={photoSrc} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">?</div>
              )}
            </div>
            <div
              className={`mt-3 ${flagClasses('username')}`}
              onClick={() => onToggleFlag && onToggleFlag('username')}
            >
              <h3 className="text-xl font-bold text-gray-900">
                {profile.displayName || profile.username}
              </h3>
              <p className="text-sm text-purple-700">@{profile.username}</p>
            </div>
            {profile.bio && (
              <p
                className={`mt-2 text-sm text-gray-700 text-center ${flagClasses('bio')}`}
                onClick={() => onToggleFlag && onToggleFlag('bio')}
              >
                {profile.bio}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {profile.accountAge}
            </p>
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
            <div
              className={`flex items-center gap-3 ${flagClasses('location')}`}
              onClick={() => onToggleFlag && onToggleFlag('location')}
            >
              <FaMapMarkerAlt className="text-purple-500 w-4 shrink-0" />
              <span className="text-gray-700">{profile.location}</span>
            </div>
            <div
              className={`flex items-center gap-3 ${flagClasses('joinedDate')}`}
              onClick={() => onToggleFlag && onToggleFlag('joinedDate')}
            >
              <FaCalendar className="text-purple-500 w-4 shrink-0" />
              <span className="text-gray-700">{profile.accountAge}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-purple-200/60 space-y-2">
              <div
                className={`flex items-center gap-3 ${flagClasses('friends')}`}
                onClick={() => onToggleFlag && onToggleFlag('friends')}
              >
                <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Friends: {profile.friends}</span>
              </div>
              <div
                className={`flex items-center gap-3 ${flagClasses('followers')}`}
                onClick={() => onToggleFlag && onToggleFlag('followers')}
              >
                <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Followers: {profile.followers}</span>
              </div>
              <div
                className={`flex items-center gap-3 ${flagClasses('following')}`}
                onClick={() => onToggleFlag && onToggleFlag('following')}
              >
                <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Following: {profile.following}</span>
              </div>
              <div
                className={`flex items-center gap-3 ${flagClasses('mutualFriends')}`}
                onClick={() => onToggleFlag && onToggleFlag('mutualFriends')}
              >
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
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
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

          <div
            className={`rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden ${
              isSectionPhotosFlaggable ? flagClasses('section_photos') : ''
            }`}
            onClick={isSectionPhotosFlaggable ? () => onToggleFlag && onToggleFlag('section_photos') : undefined}
          >
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
      <div className="flex-1 min-w-0 flex flex-col gap-4 lg:gap-5 pb-2 lg:pb-0">
        <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
          <div className="px-5 py-3 border-b border-purple-200/60 flex items-center gap-2">
            <FaComment className="text-purple-600 text-lg" />
            <h2 className="font-semibold text-purple-900">Activity Posts</h2>
          </div>
          <div className="p-5 space-y-5">
            {(profile.posts || []).map((post) => {
              const comments = post.comments || []
              const commentCount = comments.length
              const isExpanded = expandedPostId === post.id
              const likeCount = typeof post.likes === 'number' ? post.likes : 0

              return (
                <div
                  key={post.id}
                  className={`rounded-xl bg-white/80 border border-purple-200/50 p-4 space-y-3 ${flagClasses(
                    post.id,
                  )}`}
                  onClick={() => onToggleFlag && onToggleFlag(post.id)}
                >
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
                    <div className="w-full rounded-lg bg-purple-100/50 border border-purple-200/50 overflow-hidden">
                      {postImages?.[post.id] ? (
                        <img
                          src={postImages[post.id]}
                          alt=""
                          className="w-full max-h-96 h-auto object-contain block"
                        />
                      ) : (
                        <div className="w-full py-8 flex items-center justify-center text-gray-500 text-sm">
                          [Image]
                        </div>
                      )}
                    </div>
                  ) : null}
                  <div className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <FaStar className="text-amber-400" />
                      <span>{likeCount}</span>
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedPostId((prev) => (prev === post.id ? null : post.id))
                      }}
                    >
                      <FaComment className="text-purple-500" />
                      <span>{commentCount} comment{commentCount === 1 ? '' : 's'}</span>
                    </button>
                    <button type="button" className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700">
                      <FaShare /> Share
                    </button>
                  </div>

                  {isExpanded && commentCount > 0 && (
                    <div className="mt-2 border-t border-purple-100 pt-2 space-y-2">
                      {comments.map((c) => (
                        <div key={c.id} className="flex flex-col text-xs text-gray-700">
                          <span className="font-semibold">{c.author}</span>
                          <span>{c.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileView
