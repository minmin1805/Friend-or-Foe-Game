import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import profilesData from '../data/profiles.json'
import { avatarByProfileId, getPhotosForProfileId } from '../utils/profileAssets'

function ProfilePhotosPage() {
  const { id } = useParams()
  const profile = profilesData.find((p) => p.profileId === id) ?? null

  const photos = profile ? getPhotosForProfileId(profile.profileId) : []
  const sidebarAvatar = profile ? avatarByProfileId[String(profile.profileId)] ?? null : null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100">
      <Header />

      <main className="flex-1 flex max-w-6xl mx-auto w-full px-8 pb-24 pt-8 gap-6">
        {profile ? (
          <>
            {/* Left sidebar */}
            <aside className="w-64 shrink-0 rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 p-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-purple-100 ring-2 ring-purple-200">
                {sidebarAvatar ? (
                  <img src={sidebarAvatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-semibold">
                    ?
                  </div>
                )}
              </div>
              <h2 className="mt-3 text-lg font-semibold text-gray-900">
                {profile.displayName || profile.username}
              </h2>
              <p className="text-xs text-purple-700">@{profile.username}</p>

              <nav className="mt-6 w-full space-y-2 text-sm">
                <Link
                  to={`/profile/${id}`}
                  className="block w-full px-3 py-2 rounded-lg text-left text-purple-800 hover:bg-purple-100"
                >
                  Overview
                </Link>
                <Link
                  to={`/profile/${id}/friends`}
                  className="block w-full px-3 py-2 rounded-lg text-left text-purple-800 hover:bg-purple-100"
                >
                  Connections
                </Link>
                <div className="block w-full px-3 py-2 rounded-lg text-left bg-purple-600 text-white">
                  Photos
                </div>
              </nav>
            </aside>

            {/* Photos grid */}
            <section className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {profile.displayName || profile.username}
                    {"'"}s Photos
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {photos.length} Total Photos
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
                >
                  + Add Photo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((src, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden bg-purple-100 border border-purple-200/60 shadow-sm"
                  >
                    <img src={src} alt="" className="w-full h-40 object-cover" />
                  </div>
                ))}
              </div>
            </section>
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

export default ProfilePhotosPage

