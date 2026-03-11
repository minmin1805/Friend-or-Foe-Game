import React from 'react'
import { useNavigate } from 'react-router-dom'

function InstructionPage() {

  const navigate = useNavigate();

  const handleBackToWelcome = () => {
    navigate('/game');
  }

  return (
    <div>
      <button onClick={handleBackToWelcome} className='bg-blue-500 text-white p-2 rounded-xl mt-4 text-xl px-10 py-2 fixed bottom-10 right-10'>Start the investigation</button>
    </div>
  )
}

export default InstructionPage
