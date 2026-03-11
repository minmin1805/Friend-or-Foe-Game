import React from 'react'
import Header from '../components/Header'
import mockProfilePicture1 from '../assets/Images/GamePage/person1.png'
import mockProfilePicture2 from '../assets/Images/GamePage/person2.png'
import mockProfilePicture3 from '../assets/Images/GamePage/person3.png'
const AVATAR_BG = ['bg-green-100', 'bg-blue-100', 'bg-amber-100']
import { FaPlusSquare } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function ProfilePage() {


  const mockProfileInfo = { name: 'cool_gamer_3544', profilePicture: mockProfilePicture1, mutualFriends: 12, biography: "Hey!. I'm 14 and love gaming...", bgClass: AVATAR_BG[0], age: 14 , sex: 'male', location: 'London, UK', joinedWhen: '3 years ago', friends: 20, photo: 2}

  return (
    <div>
      <Header />

      <div className='flex w-[97%] h-full'>
        <div className='w-[30%] h-full flex flex-col fixed'>

          <div className='flex flex-col gap-2 rounded-xl border border-gray-300 overflow-hidden'>
            <div className='bg-purple-900 w-full h-[50px]'>
              Profile Picture
            </div>

            <div className='flex'>
              <img src={mockProfileInfo.profilePicture} alt="profile" className='w-[100px] h-[100px] rounded-full' />
              <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-medium'>{mockProfileInfo.name}</h2>
                <p className='text-gray-500 text-xl'>{mockProfileInfo.biography}</p>
              </div>
            </div>


            <div className='flex items-center justify-center gap-2'>
                <button className='bg-purple-100 text-purple-900 px-4 py-2 rounded-md text-xl font-medium hover:bg-gray-300'>Message</button>
                <button className='bg-purple-100 text-purple-900 px-4 py-2 rounded-md text-xl font-medium hover:bg-purple-600'>Follow</button>
                
              </div>

          </div>

          <div className='flex gap-2'>
          {/* profile detail */}
            <div className='flex flex-col gap-2 rounded-xl border border-gray-300 overflow-hidden'>
              <div className='bg-purple-900 w-full h-[50px]'>Profile Detail</div>
              <div className='flex flex-col gap-2'>
              <div>
                  <span>Age: </span>
                  <span>{mockProfileInfo.age}</span>
                </div>
                <div>
                  <span>Location: </span>
                  <span>{mockProfileInfo.location}</span>
                </div>
                <div>
                  <span>Sex: </span>
                  <span>{mockProfileInfo.sex}</span>
                </div>
                <div>
                  <span>{mockProfileInfo.joinedWhen}</span>
                </div>
                 
              </div>
            </div>

            <div className='flex flex-col gap-2 item'>
              {/* friend section */}
              <div className='flex flex-col gap-2 rounded-xl border border-gray-300 overflow-hidden '>
                <div className='bg-purple-900 w-full h-[50px]'>List of Friends</div>
                <div className='flex gap-2'>
                  <div className='flex flex-col'>
                    <img src={mockProfilePicture1} alt="photo" className='w-[40px] h-[40px] rounded-full' />
                    <span>John</span>
                  </div>
                  <div className='flex flex-col'>
                    <img src={mockProfilePicture2} alt="photo" className='w-[40px] h-[40px] rounded-full' />
                    <span>Sarah</span>
                  </div>
                  <div className='flex flex-col'>
                    <img src={mockProfilePicture3} alt="photo" className='w-[40px] h-[40px] rounded-full' />
                    <span>Mike</span>
                  </div>
                  <div className='flex'>
                    <FaPlusSquare className='text-purple-900 text-4xl' />
                  </div>
                </div>

                <div className='border-t border-gray-300 w-[80%] mx-auto'></div>

                <div className='flex items-center gap-2 justify-center'>
                  <FaPlus className='text-purple-900 text-2xl' />
                  View All Friends
                </div>

              </div>

              {/* photo section */}
              <div className='flex flex-col rounded-xl border border-gray-300 overflow-hidden'>
                <div className='bg-purple-900 w-full h-[50px]'>Photo Collection</div>

              </div>

            </div>
          </div>

        </div>
        <div className='w-[70%] h-full'>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage;
