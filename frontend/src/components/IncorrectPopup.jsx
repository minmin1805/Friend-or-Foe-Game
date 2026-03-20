import React from 'react'

/**
 * Feedback popup when the player made an incorrect decision.
 * Uses data from FriendOrFoeContext (pendingFeedback).
 */
function IncorrectPopup({ onClose, feedback }) {
  const profile = feedback?.profile
  const spottedKeys = feedback?.spottedFlags ?? []
  const missedKeys = feedback?.missedFlags ?? []
  const decision = feedback?.decision
  const acceptedFake = decision === 'accept'

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
  <div className="bg-blue-100 p-2 sm:p-3 rounded-2xl max-h-[90vh] overflow-y-auto w-fit max-w-[calc(100vw-2rem)] sm:max-w-176 mx-auto">
    <div className="relative w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-red-500 text-white px-4 py-3 sm:px-6 sm:py-4 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-wide">LET&apos;S LEARN FROM THIS</p>
        <p className="text-base sm:text-lg md:text-xl font-bold mt-1 leading-snug px-1">
          {acceptedFake ? (
            <>You accepted a <span className="underline">FAKE</span> account</>
          ) : (
            <>You rejected a <span className="underline">SAFE</span> account</>
          )}
        </p>
      </div>

      <div className="px-4 py-4 sm:px-6 sm:py-5 space-y-3 sm:space-y-4 text-sm md:text-base text-gray-800">
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
          <p className="text-lg sm:text-2xl font-semibold tracking-wide text-gray-700">ROUND SCORE:</p>
          <p className="text-lg sm:text-2xl font-extrabold text-red-600 sm:ml-2">
            {roundScore} points
          </p>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* Red flags list (fake-profile scenario) / safety context (safe-profile scenario) */}
        <div>
          <p className="font-semibold text-gray-900 mb-2">
            {acceptedFake
              ? `THIS PROFILE HAD ${totalRedFlags} RED FLAGS`
              : 'THIS PROFILE WAS A SAFE ACCOUNT'}
          </p>
          <ul className="space-y-1 text-sm">
            {acceptedFake && allRedFlags.length > 0 ? (
              allRedFlags.map((f) => (
                <li key={f.elementKey}>🚩 {f.reason}</li>
              ))
            ) : !acceptedFake ? (
              <li className="text-gray-700">
                This profile showed normal, authentic signs and did not require rejection.
              </li>
            ) : (
              <li className="text-gray-500 italic">Red flag details unavailable for this profile.</li>
            )}
          </ul>
        </div>

        <hr className="border-dashed border-gray-900" />

        {/* What was flagged */}
        <div>
          <p className="font-semibold text-gray-900 mb-1">
            {acceptedFake
              ? `You spotted: ${spottedCount}/${totalRedFlags} flags`
              : `Correct red flags spotted: ${spottedCount}`}
          </p>
          <ul className="space-y-1 text-sm text-green-700">
            {acceptedFake && spottedReasons.length > 0 ? (
              spottedReasons.map((f) => (
                <li key={f.elementKey}>✔ {f.reason}</li>
              ))
            ) : !acceptedFake ? (
              <li className="text-gray-700">
                This profile was safe overall — use caution, but avoid over-flagging safe accounts.
              </li>
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

        {/* Learning summary */}
        <div className="mt-2 rounded-2xl bg-purple-50 px-4 py-3 text-xs md:text-sm text-gray-700">
          <p className="font-semibold mb-1">💡 Learning Point:</p>
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
