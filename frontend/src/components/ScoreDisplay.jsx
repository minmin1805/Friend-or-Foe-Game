import React from 'react'

function ScoreDisplay() {
  return (
    <div className="w-full lg:w-auto flex justify-center">
    <div className="bg-[#ddecff] rounded-2xl p-5 flex flex-col items-center justify-center w-full max-w-md">
      <div className="bg-white flex flex-col items-center justify-center overflow-hidden rounded-2xl ">
      <div className="bg-[#e92727] flex justify-center items-center py-4 sm:py-5 p-4">
      <h1 className="text-white text-2xl sm:text-[28px] font-bold uppercase">
            Investigation Complete
          </h1>
        </div>

        <div className="w-full px-4 py-4 sm:py-5 flex flex-col items-center gap-3">
          {/* Final score */}
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Your Final Score
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-800 mt-1">
              4,250 <span className="text-xl sm:text-2xl">points</span>
            </p>
          </div>

          <div className="h-0.5 bg-[#2e0f53] w-[90%] my-2" />

          {/* Badge / stats (simplified version of ScoreDisplay) */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-base sm:text-lg font-bold text-slate-900">
              Expert Investigator
            </p>
            <div className='flex flex-col text-xs sm:text-sm text-slate-700 text-center'>
              <p>Correct: <span className="font-semibold">8/10</span> <span className="text-slate-500">(80%)</span></p>
              <p>Flags: <span className="font-semibold">28/43</span> <span className="text-slate-500">(65%)</span></p>
              <p>Finish Time: <span className="font-semibold">1:35</span></p>
            </div>
          </div>

          <div className="h-0.5 bg-[#2e0f53] w-[90%] my-2" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ScoreDisplay
