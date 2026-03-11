import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import profilesData from '../data/profiles.json'
import person1 from '../assets/Images/GamePage/person1.png'

function ProfileFriendsPage() {
  const { id } = useParams()
  const profile = profilesData.find((p) => p.profileId === id) ?? null

  // Simple mock: duplicate one friend card 8 times
  const friendCards = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    name: profile?.displayName || profile?.username || 'Friend',
    mutualFriends: 0,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 pb-24 pt-10">
        {profile ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {profile.displayName || profile.username}
                  {"'"}s Friends
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {friendCards.length} Friends | {profile.mutualFriends || 0} mutual
                </p>
              </div>
              <div className="rounded-2xl border border-gray-300 py-2 px-4 flex items-center gap-2 h-[44px] bg-white">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {friendCards.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-green-100 flex-shrink-0">
                    <img src={person1} alt="" className="w-full h-full object-cover" />
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

