import React from 'react'
import { useNavigate } from 'react-router-dom'
import legitAvatarExample from '../assets/Images/ProfilePage/ProfileImages/Profile3-alex/avatar.png'
import {
  FaBook,
  FaLightbulb,
  FaSearch,
} from 'react-icons/fa'

const BASICS = [
  "You'll see 10 friend request cards.",
  'Click "View Profile" to investigate each one.',
  'Flag suspicious things by clicking them.',
  'Choose Accept or Reject when you are done.',
]

const STEPS = [
  'Enter your detective name on the welcome screen.',
  'Click "View Profile" on any card (any order is fine).',
  'Look at everything: photo, bio, location, account age, friends, and posts.',
  'Click anything suspicious to flag it. Click again to unflag.',
  'Accept or Reject at the bottom of the profile.',
  'See your result: were you right? What did you miss?',
  'Do all 10, then see your final score, badge, and leaderboard.',
]

const WHAT_TO_FLAG = [
  { what: 'Profile photo', why: 'Too perfect or professional?' },
  { what: 'Username', why: 'Random numbers or weird name?' },
  { what: 'Bio', why: 'Asking for DMs, money, or "exclusive content"?' },
  { what: 'Location', why: 'Does it match the rest of the profile?' },
  { what: 'Account age', why: 'Brand new but tons of friends?' },
  { what: 'Friends / followers', why: 'Low mutual friends? Weird ratio?' },
  { what: 'Friend list', why: 'Looks real, or almost empty?' },
  { what: 'Photos', why: 'Same person over time, or random images?' },
  { what: 'Posts', why: 'Normal content, or pushy/creepy messages?' },
]

const RED_FLAGS = [
  'New account + huge friend list',
  'No mutual friends',
  'Only perfect / stock photos',
  'Asking to DM, video chat, or meet up',
  'Pressure to switch to Snapchat fast',
  'Profile feels too polished or AI-generated',
]

function InstructionPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-dvh bg-linear-to-b from-purple-100 via-purple-50/80 to-indigo-50/90">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#7c3aed_1px,transparent_1px)] bg-size-[24px_24px]" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14 pb-40">
        <header className="text-center mb-12 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 tracking-tight">
            How to Play: Friend or Foe
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-purple-700/90 font-medium">
            Review 10 fake social media profiles. Find red flags. Decide who to trust.
          </p>
        </header>

        <section className="mb-10 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">The Basics</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
            {BASICS.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-purple-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Step by Step</h2>
          <ol className="space-y-3 text-sm sm:text-base text-gray-700 list-decimal list-inside">
            {STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mb-10 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">What to Flag</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-purple-200">
                  <th className="py-2 pr-3 text-purple-900 font-semibold">What</th>
                  <th className="py-2 text-purple-900 font-semibold">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {WHAT_TO_FLAG.map((item) => (
                  <tr key={item.what} className="border-b border-purple-100 align-top">
                    <td className="py-2 pr-3 font-medium text-gray-900 whitespace-nowrap">{item.what}</td>
                    <td className="py-2 text-gray-700">{item.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 rounded-xl bg-amber-50/90 border border-amber-200/80 p-4 sm:p-5 flex gap-3">
            <FaLightbulb className="text-amber-500 w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-amber-900/90">
              <strong>Tip:</strong> One red flag is not enough. Look for several warning signs before you decide.
            </p>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-3">How Profile Images Work in This Game</h2>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="shrink-0 mx-auto sm:mx-0">
              <img
                src={legitAvatarExample}
                alt="Example of a consistent, legit-style profile avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-purple-200 shadow-sm"
              />
              <p className="text-[11px] sm:text-xs text-center text-gray-500 mt-1">Legit-style example</p>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed sm:mt-3">
              Avatars and post photos in this game are generated images. Safer profiles usually show one
              consistent cartoon-style person; overly polished or uncanny “almost real” faces can be a red flag.
            </p>
          </div>
        </section>

        <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border-2 col-span-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Scoring</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="py-2 pr-3 text-purple-900 font-semibold">Action</th>
                    <th className="py-2 text-purple-900 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-100">
                    <td className="py-2 pr-3 text-gray-900">Correct Accept or Reject</td>
                    <td className="py-2 text-green-700 font-semibold">+500</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-2 pr-3 text-gray-900">Correct red flag</td>
                    <td className="py-2 text-green-700 font-semibold">+50</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-2 pr-3 text-gray-900">Wrong flag</td>
                    <td className="py-2 text-red-600 font-semibold">-10 (min: 0)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 text-gray-900">Reach 4,000 pts</td>
                    <td className="py-2 text-purple-800 font-semibold">Double Points power-up</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Investigation Panel</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4">
            At the bottom of each profile, use this to make your final call: Reject or Accept.
          </p>
          <div className="rounded-2xl bg-purple-50 border border-purple-200/80 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-purple-900 text-sm font-medium">
              <FaSearch className="text-purple-600" />
            </div>
            <div className="flex gap-2">
              <button type="button" className="px-3 py-1.5 rounded-lg bg-red-500/90 text-white text-xs sm:text-sm font-semibold">
                Reject
              </button>
              <button type="button" className="px-3 py-1.5 rounded-lg bg-green-500/90 text-white text-xs sm:text-sm font-semibold">
                Accept
              </button>
            </div>
          </div>
        </section>

        <section className=" mb-20 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-7 flex flex-col gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <FaBook className="text-3xl" />
            </div>
            <div>
              <h2 className="font-bold text-purple-900 text-xl sm:text-2xl">Investigation Notebook</h2>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                Click the notebook icon on any profile. It reviews red flags you missed on earlier profiles so you can learn as you go.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-50/90 border border-purple-200/80 p-4 text-xs sm:text-sm text-gray-700">
            Example: "Profile 8 – Watch for Cash App requests and 'exclusive content'."
          </div>
        </section>

      </div>

      {/* CTA – fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white/95 border-t border-purple-200/80 shadow-[0_-4px_20px_rgba(147,51,234,0.1)] px-4 py-4 sm:px-5 sm:py-5 flex justify-center ">
        <button
          type="button"
          onClick={() => navigate('/game')}
          className="w-full max-w-lg px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-purple-600 text-white font-bold text-lg sm:text-xl shadow-lg shadow-purple-300/50 hover:bg-purple-700 hover:shadow-purple-400/40 transition-all"
        >
          Start the investigation
        </button>
      </div>
    </div>
  )
}

export default InstructionPage
