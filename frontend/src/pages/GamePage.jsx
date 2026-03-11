import React from 'react'
import Header from '../components/Header'
import { FaUserFriends, FaFlag, FaHome, FaEllipsisH } from "react-icons/fa"
import { SlMagnifier } from "react-icons/sl"
import mockProfilePicture1 from '../assets/Images/GamePage/person1.png'
import mockProfilePicture2 from '../assets/Images/GamePage/person2.png'
import mockProfilePicture3 from '../assets/Images/GamePage/person3.png'
import { useNavigate } from 'react-router-dom'

const AVATAR_BG = ['bg-green-100', 'bg-blue-100', 'bg-amber-100']

function GamePage() {
  const navigate = useNavigate()

  const mockRequestInfo = [
    { name: 'cool_gamer_3544', profilePicture: mockProfilePicture1, mutualFriends: 12, biography: "Hey!. I'm 14 and love gaming...", bgClass: AVATAR_BG[0] },
    { name: 'cutie_emma_2005', profilePicture: mockProfilePicture2, mutualFriends: 8, biography: 'So excited to get to know you!', bgClass: AVATAR_BG[1] },
    { name: 'soccerguy2k4', profilePicture: mockProfilePicture3, mutualFriends: 6, biography: "I'm new here in town! I am soccer....", bgClass: AVATAR_BG[2] },
  ]

  return (
    <div className='flex flex-col h-screen'>
      <Header />

      <div className='flex w-full h-full'>
        {/* left bar */}
        <div className='w-[23%] h-full bg-gray-200 pt-[100px]'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-500 p-2 pl-10'><FaHome className='text-3xl text-gray-500' /> Home</p>
          <p className='flex items-center gap-2 text-2xl font-medium text-white bg-purple-500 p-2 pl-10'><FaUserFriends className='text-3xl text-white' /> Friends Suggestions {'>'}</p>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-500 p-2 pl-10'><FaFlag className='text-3xl text-gray-500' /> Sugesstions</p>
        </div>

        {/* right side */}
        <div className='w-[80%] h-full'>
          <div className='flex justify-between p-10 bg-gray-50'>
            <div className='flex flex-col justify-center'>
              <h1 className='text-3xl font-medium'>Friend Requests</h1>
              <p className='text-gray-500 mt-4 text-2xl'>10 requests</p>
            </div>
            <div className='rounded-2xl border border-gray-300 py-2 px-5 flex items-center gap-2 h-[50px] mt-2 bg-white'>
              <SlMagnifier className='text-2xl text-gray-500' />
              <input type="text" placeholder='Search' className='w-full outline-none bg-transparent' />
            </div>
          </div>

          {/* requests - white card with thin gray border */}
          <div className='mx-10 rounded-lg border border-gray-300 bg-white overflow-hidden'>
            {mockRequestInfo.map((eachProfile, id) => (
              <div
                key={id}
                className={`flex justify-between w-full py-5 px-6 ${id < mockRequestInfo.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className='flex items-center gap-4 min-w-0 flex-1'>
                  <div className={`shrink-0 w-[100px] h-[100px] rounded-full overflow-hidden ${eachProfile.bgClass}`}>
                    <img src={eachProfile.profilePicture} alt="" className='w-full h-full object-cover ' />
                  </div>
                  <div className='flex flex-col gap-0.5 min-w-0'>
                    <h2 className='text-2xl font-bold text-gray-900 truncate'>{eachProfile.name}</h2>
                    <p className='text-gray-600 text-xl'>{eachProfile.mutualFriends} mutual friends</p>
                    <p className='text-gray-500 text-xl truncate'>{eachProfile.biography}</p>
                  </div>
                </div>

                <div className='flex gap-3 shrink-0 items-end'>
                  <button type='button' className='p-1.5 text-gray-600 hover:bg-gray-100 rounded-full' aria-label='Options'>
                    <FaEllipsisH className='text-lg' />
                  </button>
                  <div className='flex gap-2'>
                    <button onClick={() => navigate(`/profile/${id}`)} type='button' className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-xl font-medium hover:bg-gray-300'>
                      View Profile
                    </button>
                    <button type='button' className='bg-red-500 text-white px-4 py-2 rounded-md text-xl font-medium hover:bg-red-600'>
                      Reject
                    </button>
                    <button type='button' className='bg-blue-500 text-white px-4 py-2 rounded-md text-xl font-medium hover:bg-blue-600'>
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default GamePage
