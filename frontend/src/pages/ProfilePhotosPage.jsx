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

      <main className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-28 pt-6 lg:pt-8 gap-6 min-w-0">
        {profile ? (
          <>
            <aside className="w-full lg:w-64 shrink-0 rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 p-4 flex flex-row lg:flex-col items-center lg:items-center gap-4 lg:gap-0 overflow-x-auto lg:overflow-visible">
              <div className="flex items-center gap-3 shrink-0 lg:flex-col lg:w-full">
                <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-purple-100 ring-2 ring-purple-200 shrink-0">
                  {sidebarAvatar ? (
                    <img src={sidebarAvatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-semibold">
                      ?
                    </div>
                  )}
                </div>
                <div className="lg:text-center min-w-0">
                  <h2 className="text-base lg:text-lg font-semibold text-gray-900 truncate lg:whitespace-normal">
                    {profile.displayName || profile.username}
                  </h2>
                  <p className="text-xs text-purple-700 truncate">@{profile.username}</p>
                </div>
              </div>

              <nav className="flex lg:flex-col gap-1 sm:gap-2 text-sm w-full lg:mt-4 min-w-0">
                <Link
                  to={`/profile/${id}`}
                  className="shrink-0 px-3 py-2 rounded-lg text-center lg:text-left text-purple-800 hover:bg-purple-100 whitespace-nowrap"
                >
                  Overview
                </Link>
                <Link
                  to={`/profile/${id}/friends`}
                  className="shrink-0 px-3 py-2 rounded-lg text-center lg:text-left text-purple-800 hover:bg-purple-100 whitespace-nowrap"
                >
                  Connections
                </Link>
                <div className="shrink-0 px-3 py-2 rounded-lg text-center lg:text-left bg-purple-600 text-white whitespace-nowrap">
                  Photos
                </div>
              </nav>
            </aside>

            <section className="flex-1 min-w-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 break-words">
                    {profile.displayName || profile.username}
                    {"'"}s Photos
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">{photos.length} Total Photos</p>
                </div>
                <button
                  type="button"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 shrink-0"
                >
                  + Add Photo
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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

