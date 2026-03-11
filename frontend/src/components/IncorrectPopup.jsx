import React from 'react'

/**
 * Mock design for an \"incorrect decision\" feedback popup.
 * Content is static for now; real data will be wired later.
 */
function IncorrectPopup({ onClose }) {
  return (
  <div className='bg-blue-100 p-3 rounded-2xl'>
    <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      
      <div className="bg-red-500 text-white px-6 py-4 text-center">
        <p className="text-sm font-semibold tracking-wide">LET&apos;S LEARN FROM THIS</p>
        <p className="text-lg md:text-xl font-bold mt-1">
          You accepted a <span className="underline">FAKE</span> account
        </p>
      </div>

      <div className="px-6 py-5 space-y-4 text-sm md:text-base text-gray-800">
        {/* Round score */}
        <div className="text-center flex items-center justify-center">
          <p className="text-2xl font-semibold tracking-wide text-gray-700">ROUND SCORE:</p>
          <p className="text-2xl font-extrabold text-red-600 ml-2">0 points</p>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Red flags list */}
        <div>
          <p className="font-semibold text-gray-900 mb-2">THIS PROFILE HAD 6 RED FLAGS</p>
          <ul className="space-y-1 text-sm">
            <li>🚩 Stock photo (not real person)</li>
            <li>🚩 Account only 2 weeks old</li>
            <li>🚩 Only 1 mutual friend</li>
            <li>🚩 All photos are stock images</li>
            <li>🚩 Generic posts, no personal details</li>
            <li>🚩 Bio says &quot;DM open&quot; to strangers</li>
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Flags you spotted */}
        <div>
          <p className="font-semibold text-gray-900 mb-1">You spotted: 2/6 flags</p>
          <ul className="space-y-1 text-sm text-green-700">
            <li>✔ Stock photo</li>
            <li>✔ New account</li>
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />


        {/* Total score */}
        <div className="text-center flex items-center justify-center">
          <p className="text-2xl font-semibold tracking-wide text-gray-700 mr-2">TOTAL SCORE:</p>
          <p className="text-2xl font-extrabold text-blue-700">1,450 points</p>
        </div>

        {/* What to look for */}
        <div className="mt-2 rounded-2xl bg-purple-50 px-4 py-3 text-xs md:text-sm text-gray-700">
          <p className="font-semibold mb-1">💡 What to Look For:</p>
          <p>
            Predators use stock photos to create fake profiles. Always look for multiple red flags
            together before accepting friend requests.
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
    </div></div>
  )
}

export default IncorrectPopup
