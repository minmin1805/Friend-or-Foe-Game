import React from 'react'

function ScoreDisplay({
  score,
  correctCount,
  totalProfiles,
  totalSpottedFlags,
  totalPossibleFlags,
  finishTimeLabel,
  badgeTitle,
  badgeImage,
}) {
  const correctPercent =
    totalProfiles > 0 ? Math.round((correctCount / totalProfiles) * 100) : 0
  const flagPercent =
    totalPossibleFlags > 0 ? Math.round((totalSpottedFlags / totalPossibleFlags) * 100) : 0

  return (
    <div className="w-full lg:w-auto flex justify-center">
      <div className="bg-[#ddecff] rounded-2xl p-3 flex flex-col items-center justify-center w-full max-w-md">
        <div className="bg-white flex flex-col items-center justify-center overflow-hidden rounded-2xl">
          <div className="bg-[#e92727] flex flex-col items-center justify-center py-4 sm:py-5 px-4 w-full">
            <h1 className="text-white text-2xl sm:text-[25px] font-bold uppercase">
              Investigation Complete
            </h1>
          </div>

          <div className="w-full px-4  flex flex-col items-center gap-3">
            {/* Badge image */}
            {badgeImage && (
              <img
                src={badgeImage}
                alt={badgeTitle}
                className="w-70 h-70 object-contain mb-1"
              />
            )}

            {/* Final score */}
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Your Final Score
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-800 mt-1">
                {score.toLocaleString()} <span className="text-xl sm:text-2xl">points</span>
              </p>
            </div>

            <div className="h-0.5 bg-[#2e0f53] w-[90%] my-2" />

            {/* Badge / stats */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-base sm:text-lg font-bold text-slate-900">
                Your title: <span className="text-base sm:text-lg font-extrabold text-blue-800">{badgeTitle}</span>
              </p>
              <div className="flex flex-col text-xs sm:text-sm text-slate-700 text-center mb-3">
                <p>
                  Correct:{' '}
                  <span className="font-semibold">
                    {correctCount}/{totalProfiles}
                  </span>{' '}
                  <span className="text-slate-500">({correctPercent}%)</span>
                </p>
                <p>
                  Flags:{' '}
                  <span className="font-semibold">
                    {totalSpottedFlags}/{totalPossibleFlags}
                  </span>{' '}
                  <span className="text-slate-500">({flagPercent || 0}%)</span>
                </p>
                <p>
                  Finish Time:{' '}
                  <span className="font-semibold">{finishTimeLabel}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreDisplay
