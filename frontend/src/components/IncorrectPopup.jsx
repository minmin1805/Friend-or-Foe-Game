import React from 'react'

/**
 * Feedback popup when the player made an incorrect decision.
 * Uses data from FriendOrFoeContext (pendingFeedback).
 */
function IncorrectPopup({ onClose, feedback }) {
  const profile = feedback?.profile
  const spottedKeys = feedback?.spottedFlags ?? []
  const missedKeys = feedback?.missedFlags ?? []

  const allRedFlags = profile?.redFlags ?? []
  const spottedReasons = allRedFlags.filter((f) => spottedKeys.includes(f.elementKey))
  const missedReasons = allRedFlags.filter((f) => missedKeys.includes(f.elementKey))

  const totalRedFlags = allRedFlags.length
  const spottedCount = spottedKeys.length
  const missedCount = missedKeys.length
  const roundScore = feedback?.roundPoints ?? 0
  const totalScore = feedback?.totalScore ?? 0
  const explanation = feedback?.explanation

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
          <p className="text-2xl font-extrabold text-red-600 ml-2">
            {roundScore} points
          </p>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Red flags list */}
        <div>
          <p className="font-semibold text-gray-900 mb-2">
            THIS PROFILE HAD {totalRedFlags || '?'} RED FLAGS
          </p>
          <ul className="space-y-1 text-sm">
            {allRedFlags.length > 0 ? (
              allRedFlags.map((f) => (
                <li key={f.elementKey}>🚩 {f.reason}</li>
              ))
            ) : (
              <li className="text-gray-500 italic">Red flag details unavailable for this profile.</li>
            )}
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Flags you spotted */}
        <div>
          <p className="font-semibold text-gray-900 mb-1">
            You spotted: {spottedCount}/{totalRedFlags || '?'} flags
          </p>
          <ul className="space-y-1 text-sm text-green-700">
            {spottedReasons.length > 0 ? (
              spottedReasons.map((f) => (
                <li key={f.elementKey}>✔ {f.reason}</li>
              ))
            ) : (
              <li className="text-gray-500 italic">You didn&apos;t flag any of the red flags.</li>
            )}
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />


        {/* Total score */}
        <div className="text-center flex items-center justify-center">
          <p className="text-2xl font-semibold tracking-wide text-gray-700 mr-2">TOTAL SCORE:</p>
          <p className="text-2xl font-extrabold text-blue-700">{totalScore} points</p>
        </div>

        {/* What to look for */}
        <div className="mt-2 rounded-2xl bg-purple-50 px-4 py-3 text-xs md:text-sm text-gray-700">
          <p className="font-semibold mb-1">💡 What to Look For:</p>
          <p>{explanation}</p>
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
