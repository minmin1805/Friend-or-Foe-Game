import React from 'react'

/**
 * Mock design for a \"correct decision\" feedback popup.
 * Content is static for now; real data will be wired later.
 */
function CorrectPopup({ onClose }) {
  return (
    <div className='bg-blue-100 p-3 rounded-2xl'>
    <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-green-500 text-white px-6 py-4 text-center">
        <p className="text-sm font-semibold tracking-wide">CORRECT DECISION!</p>
        <p className="text-lg md:text-xl font-bold mt-1">Great Detective Work!</p>
      </div>

      <div className="px-6 py-5 space-y-4 text-sm md:text-base text-gray-800">
        {/* Base points */}
        <div className="text-center flex items-center justify-center">
          <p className="text-2xl font-semibold tracking-wide text-gray-700">BASE POINTS:</p>
          <p className="text-2xl font-extrabold text-green-600">+ 500</p>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Red flags spotted */}
        <div>
          <p className="font-semibold text-gray-900 mb-2">RED FLAGS YOU SPOTTED: 5/7</p>
          <ul className="space-y-1 text-sm">
            <li>✔ No profile photo</li>
            <li>✔ New account (3 days)</li>
            <li>✔ No mutual friend</li>
            <li>✔ Very few friends (12)</li>
            <li>✔ No photos in gallery</li>
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />


        {/* Flags missed */}
        <div>
          <p className="font-semibold text-gray-900 mb-1">FLAGS YOU MISSED: 2</p>
          <ul className="space-y-1 text-sm text-amber-700">
            <li>⚠ Following 247 (suspicious ratio)</li>
            <li>⚠ Generic username with numbers</li>
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Round score */}
        <div className="text-center flex items-center justify-center">
          <p className="text-2xl font-semibold tracking-wide text-gray-700">ROUND SCORE:</p>
          <p className="text-2xl font-extrabold text-green-600 ml-2">750 points</p>
        </div>

        {/* Why this was fake */}
        <div className="mt-2 rounded-2xl bg-purple-50 px-4 py-3 text-xs md:text-sm text-gray-700">
          <p className="font-semibold mb-1">💡 Why This Was Fake:</p>
          <p>
            This profile had 7 red flags. No profile photo, brand new account, and no mutual friends
            all indicate a fake account pretending to be a teen. Always look for multiple red flags
            together before accepting.
          </p>
        </div>
      </div>

      {/* Footer button */}
      <div className="px-6 pb-5 flex justify-center">
        <button
          type="button"
          onClick={onClose}
          className="mt-1 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Next Profile
        </button>
      </div>
    </div>
    </div>
  )
}

export default CorrectPopup
