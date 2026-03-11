import React from 'react'
import Header from '../components/Header'
import mockProfilePicture1 from '../assets/Images/GamePage/person1.png'
import mockProfilePicture2 from '../assets/Images/GamePage/person2.png'
import mockProfilePicture3 from '../assets/Images/GamePage/person3.png'
import stockImage1 from '../assets/Images/ProfilePage/stock1.jpeg'
import stockImage2 from '../assets/Images/ProfilePage/stock2.jpg'
import stockImage3 from '../assets/Images/ProfilePage/stock3.jpeg'
import stockPostImage from '../assets/Images/ProfilePage/postStockImage.jpeg'
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendar,
  FaComment,
  FaUserPlus,
  FaSearch,
  FaStar,
  FaRegStar,
  FaImages,
  FaShare,
  FaPlus,
} from 'react-icons/fa'

const AVATAR_BG = 'bg-green-100'

function ProfilePage() {
  const mockProfileInfo = {
    name: 'Luis',
    username: 'cool_gamer_3544',
    profilePicture: mockProfilePicture1,
    biography: "Hey!. I'm 14 and love gaming...",
    bgClass: AVATAR_BG,
    age: 14,
    sex: 'Male',
    location: 'Los Angeles, CA',
    joinedWhen: '3 months ago',
    friends: 12,
    mutualFriends: 12,
    photos: 2,
    rating: 3,
  }

  const mockFriends = [
    { name: 'Ethan', avatar: mockProfilePicture1 },
    { name: 'Emma', avatar: mockProfilePicture2 },
    { name: 'Jordan', avatar: mockProfilePicture3 },
  ]

  const mockActivityPosts = [
    {
      id: 1,
      name: 'Luis',
      description: 'Looking for new gaming buddies! Add me on Fortnite!',
      profilePicture: mockProfilePicture1,
      image: stockPostImage,
      postedDate: '17 April 2025',
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      name: 'Jane Doe',
      description: 'I love coding and I love to code with my friends',
      profilePicture: mockProfilePicture2,
      image: null,
      postedDate: '2026-03-11',
      likes: 0,
      comments: 0,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100">
      <Header />

      <main className="flex-1 flex gap-6 p-6 pb-24 max-w-7xl mx-auto w-full">
        {/* Left column */}
        <div className="w-[380px] shrink-0 flex flex-col gap-5">
          {/* Profile Overview */}
          <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
            <div className="px-5 py-3 border-b border-purple-200/60 flex items-center gap-2">
              <FaComment className="text-purple-600 text-lg" />
              <h2 className="font-semibold text-purple-900">Profile Overview</h2>
            </div>
            <div className="p-5 flex flex-col items-center text-center">
              <div className={`w-24 h-24 rounded-full overflow-hidden ${mockProfileInfo.bgClass} ring-2 ring-purple-200`}>
                <img src={mockProfileInfo.profilePicture} alt="" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-3">{mockProfileInfo.name}</h3>
              <p className="text-sm text-purple-700">@{mockProfileInfo.username}</p>
              <p className="text-xs text-gray-500 mt-1">Joined: {mockProfileInfo.joinedWhen}</p>
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
                <FaUser className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Age: {mockProfileInfo.age}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">{mockProfileInfo.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUser className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">{mockProfileInfo.sex}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendar className="text-purple-500 w-4 shrink-0" />
                <span className="text-gray-700">Joined {mockProfileInfo.joinedWhen}</span>
              </div>
              <div className="pt-2 mt-2 border-t border-purple-200/60 space-y-2">
                <div className="flex items-center gap-3">
                  <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                  <span className="text-gray-700">Friends: {mockProfileInfo.friends}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUserPlus className="text-purple-500 w-4 shrink-0" />
                  <span className="text-gray-700">Mutual Friends</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaImages className="text-purple-500 w-4 shrink-0" />
                  <span className="text-gray-700">Photos: {mockProfileInfo.photos}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Friends (Connection Network) + Photos - two cards side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* List of Friends */}
            <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-purple-200/60 flex items-center gap-2">
                <FaUserPlus className="text-purple-600 text-base" />
                <h2 className="font-semibold text-purple-900 text-sm">Connection Network</h2>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {mockFriends.map((f, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-200 ring-1 ring-purple-200">
                        <img src={f.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-gray-700 mt-1 truncate max-w-[56px]">{f.name}</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold text-lg">+</div>
                    <span className="text-xs text-purple-700 mt-1">9 More</span>
                  </div>
                </div>
                <button type="button" className="mt-3 w-full text-center text-sm text-purple-700 hover:underline flex items-center justify-center gap-1">
                  <FaPlus className="text-xs" /> View All Friends
                </button>
              </div>
            </div>

            {/* Photo Section */}
            <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-purple-200/60 flex items-center gap-2">
                <FaImages className="text-purple-600 text-base" />
                <h2 className="font-semibold text-purple-900 text-sm">Photo Section</h2>
              </div>
              <div className="p-4">
                <div className="flex gap-2">
                  <img src={stockImage1} alt="" className="w-16 h-16 rounded-lg object-cover border border-purple-200/60" />
                  <img src={stockImage2} alt="" className="w-16 h-16 rounded-lg object-cover border border-purple-200/60" />
                  <img src={stockImage3} alt="" className="w-16 h-16 rounded-lg object-cover border border-purple-200/60" />
                </div>
                <p className="text-xs text-gray-600 mt-2">Number of photos: {mockProfileInfo.photos}</p>
                <button type="button" className="mt-2 w-full text-center text-sm text-purple-700 hover:underline flex items-center justify-center gap-1">
                  <FaPlus className="text-xs" /> View All Photos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Activity Posts */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="rounded-2xl bg-purple-50/90 border border-purple-200/60 shadow-lg shadow-purple-200/40 overflow-hidden">
            <div className="px-5 py-3 border-b border-purple-200/60 flex items-center gap-2">
              <FaComment className="text-purple-600 text-lg" />
              <h2 className="font-semibold text-purple-900">Activity Posts</h2>
            </div>
            <div className="p-5 space-y-5">
              {mockActivityPosts.map((post) => (
                <div key={post.id} className="rounded-xl bg-white/80 border border-purple-200/50 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-200 shrink-0">
                      <img src={post.profilePicture} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{post.name}</p>
                      <p className="text-xs text-gray-500">{post.postedDate}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{post.description}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="w-full rounded-lg object-cover max-h-80 border border-purple-200/50" />
                  )}
                  {!post.image && (
                    <div className="w-full h-32 rounded-lg bg-purple-100/50 border border-purple-200/50 flex items-center justify-center text-gray-500 text-sm">
                      post
                    </div>
                  )}
                  <div className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <FaStar className="text-amber-400" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <FaComment className="text-purple-500" /> {post.comments}
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
      </main>

      {/* Investigation Panel - fixed at bottom edge */}
      <div className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl bg-purple-50 border-t border-purple-200/60 shadow-[0_-4px_20px_rgba(147,51,234,0.15)] px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <FaSearch className="text-purple-600 text-xl" />
          <h2 className="font-semibold text-purple-900">Investigation Panel</h2>
        </div>
        <p className="text-gray-700 text-sm">Click suspicious elements to flag them</p>
        <div className="flex gap-3">
          <button type="button" className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors">
            ✕ Reject Request
          </button>
          <button type="button" className="px-5 py-2.5 rounded-xl bg-green-500 text-white font-medium text-sm hover:bg-green-600 transition-colors">
            ✓ Accept Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
