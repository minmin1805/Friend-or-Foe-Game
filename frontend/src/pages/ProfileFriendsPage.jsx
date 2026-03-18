import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import profilesData from '../data/profiles.json'
import { avatarByProfileId } from '../utils/profileAssets'

function ProfileFriendsPage() {
  const { id } = useParams()
  const profile = profilesData.find((p) => p.profileId === id) ?? null
  // Placeholder avatars: profile 1 "unknown" avatar for all friend rows (until per-friend art exists)
  const friendAvatarSrc = avatarByProfileId['1'] ?? null

  const MAX_FRIENDS_TO_SHOW = 15

  const desiredFriendsCount =
    typeof profile?.friends === 'number'
      ? profile.friends
      : typeof profile?.friendsSection?.count === 'number'
        ? profile.friendsSection.count
        : 0

  const seedFriends = Array.isArray(profile?.friendsList) ? profile.friendsList : []
  const totalMutualFriends = typeof profile?.mutualFriends === 'number' ? profile.mutualFriends : 0

  const firstNames = [
    'Alex',
    'Jordan',
    'Riley',
    'Taylor',
    'Maya',
    'Noah',
    'Emma',
    'Ava',
    'Sam',
    'Leo',
    'Chloe',
    'Nina',
    'Kai',
    'Sofia',
    'Elijah',
    'Grace',
    'Logan',
    'Zoe',
    'Miles',
    'Ivy',
  ]
  const lastNames = [
    'Nguyen',
    'Patel',
    'Kim',
    'Reyes',
    'Wong',
    'Martinez',
    'Johnson',
    'Brown',
    'Davis',
    'Garcia',
    'Wilson',
    'Clark',
    'Walker',
    'Taylor',
    'Anderson',
    'Thomas',
    'Moore',
    'Harris',
    'White',
    'Young',
  ]

  const makeFriendName = (index) => {
    const seed = seedFriends[index]
    if (seed?.name) return seed.name
    const f = firstNames[index % firstNames.length]
    const l = lastNames[(index * 7) % lastNames.length]
    return `${f} ${l}`
  }

  const makeMutualFriendsForRow = (index) => {
    if (!totalMutualFriends || totalMutualFriends <= 0) return 0
    // Make a plausible number of "mutual" connections distributed across rows.
    if (index < totalMutualFriends) {
      return 1 + ((index + Number(profile?.profileId || 0)) % 3) // 1..3
    }
    return 0
  }

  const baseFriendCount = desiredFriendsCount || seedFriends.length || 0
  const shownFriendCount = Math.min(MAX_FRIENDS_TO_SHOW, baseFriendCount)
  const extraFriendCount = Math.max(0, baseFriendCount - shownFriendCount)

  const friendCards = Array.from({ length: shownFriendCount }, (_, index) => ({
    id: index,
    name: makeFriendName(index),
    mutualFriends: makeMutualFriendsForRow(index),
  }))

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-28 pt-6 sm:pt-10">
        {profile ? (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 break-words">
                  {profile.displayName || profile.username}
                  {"'"}s Friends
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {friendCards.length} Friends | {profile.mutualFriends || 0} mutual
                </p>
                {extraFriendCount > 0 ? (
                  <p className="text-xs text-purple-700 mt-1">
                    ... {extraFriendCount} more friends
                  </p>
                ) : null}
              </div>
              <div className="rounded-2xl border border-gray-300 py-2 px-4 flex items-center gap-2 h-[44px] bg-white w-full sm:w-64 shrink-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full min-w-0 outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {friendCards.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-green-100 shrink-0">
                    {friendAvatarSrc ? (
                      <img src={friendAvatarSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-semibold">
                        ?
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{friend.name}</p>
                    <p className="text-xs text-gray-600">
                      {friend.mutualFriends} mutual{' '}
                      {friend.mutualFriends === 1 ? 'friend' : 'friends'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                to={`/profile/${id}`}
                className="text-sm text-purple-700 hover:underline"
              >
                ← Back to Profile
              </Link>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Profile not found.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default ProfileFriendsPage

