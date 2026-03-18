import React from 'react'
import tickImage from '../assets/Images/CorrectPopup/tickImage.png'
/**
 * Mock design for a \"correct decision\" feedback popup.
 * Content is static for now; real data will be wired later.
 */
function CorrectPopup({ onClose, feedback }) {
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
    <div className="bg-blue-100 p-2 sm:p-3 rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-[calc(100vw-2rem)] sm:max-w-none mx-auto">
    <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-green-800 text-white px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 text-center sm:text-left">
        <img src={tickImage} alt="" className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 sm:mr-6" />
        <div className="flex flex-col min-w-0">
          <p className="text-base sm:text-xl md:text-3xl font-semibold tracking-wide">CORRECT DECISION!</p>
          <p className="text-base sm:text-lg md:text-2xl font-bold mt-1">Great Detective Work!</p>
        </div>
      </div>

      <div className="px-6 py-5 space-y-4 text-sm md:text-base text-gray-800">
        {/* Base points */}
        <div className="text-center flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="text-2xl font-semibold tracking-wide text-gray-700">ROUND SCORE:</p>
            <p className="text-2xl font-extrabold text-green-600 ml-2">
              {roundScore} points
            </p>
          </div>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Includes +50 points for each correctly spotted red flag ({spottedCount} × 50 = {spottedCount * 50} bonus).
          </p>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Red flags spotted */}
        <div>
          <p className="font-semibold text-gray-900 mb-2">
            RED FLAGS YOU SPOTTED: {spottedCount}/{totalRedFlags || '?'}
          </p>
          <ul className="space-y-1 text-sm">
            {spottedReasons.length > 0 ? (
              spottedReasons.map((f) => (
                <li
                  key={f.elementKey}
                  className="flex items-center justify-between gap-2"
                >
                  <span>✔ {f.reason}</span>
                  <span className="text-green-600 font-semibold">+50</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No red flags were flagged.</li>
            )}
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />


        {/* Flags missed */}
        <div>
          <p className="font-semibold text-gray-900 mb-1">
            FLAGS YOU MISSED: {missedCount}
          </p>
          <ul className="space-y-1 text-sm text-amber-700">
            {missedReasons.length > 0 ? (
              missedReasons.map((f) => (
                <li key={f.elementKey}>⚠ {f.reason}</li>
              ))
            ) : (
              <li className="text-gray-500 italic">You spotted all the red flags for this profile.</li>
            )}
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Total score so far */}
        <div className="text-center flex items-center justify-center">
          <p className="text-2xl font-semibold tracking-wide text-gray-700 mr-2">TOTAL SCORE:</p>
          <p className="text-2xl font-extrabold text-blue-700">{totalScore} points</p>
        </div>

        {/* Why this was fake */}
        <div className="mt-2 rounded-2xl bg-purple-50 px-4 py-3 text-xs md:text-sm text-gray-700">
          <p className="font-semibold mb-1">💡 Why This Was Fake / Safe:</p>
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
    </div>
    </div>
  )
}

export default CorrectPopup
