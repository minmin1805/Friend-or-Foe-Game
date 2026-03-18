import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaSearch,
  FaFlag,
  FaCheckCircle,
  FaBook,
  FaLightbulb,
  FaMapMarkerAlt,
  FaCalendar,
  FaUserFriends,
  FaImages,
  FaUser,
} from 'react-icons/fa'

const STEPS = [
  {
    num: 1,
    title: 'Enter your detective name.',
    detail: 'On the Welcome screen, type the name you want to use in the game.',
  },
  {
    num: 2,
    title: 'Pick a request to investigate.',
    detail: 'On the main game page, click “View Profile” on any card. You can choose profiles in any order.',
  },
  {
    num: 3,
    title: 'Inspect the full profile.',
    detail: 'Look at the profile photo, bio, location, account age, friends and followers, Friends section, Photos section, and posts.',
  },
  {
    num: 4,
    title: 'Flag suspicious details.',
    detail: 'If something feels unsafe, click it to add a red flag. Click again if you change your mind.',
  },
  {
    num: 5,
    title: 'Make your decision.',
    detail: 'At the bottom of the profile page, use the Investigation Panel to Accept or Reject the friend request.',
  },
  {
    num: 6,
    title: 'Review your feedback.',
    detail: 'A popup shows if you were right, which red flags you spotted or missed, and how many points you earned.',
  },
  {
    num: 7,
    title: 'Finish all 10 profiles.',
    detail: 'Completed profiles disappear from the list. After the last profile, you’ll see your final score, badge, and the leaderboard.',
  },
]

const WHAT_TO_FLAG = [
  { icon: FaUser, label: 'Profile photo', hint: 'Does the picture look like a real teen selfie, or is it too perfect or professional?' },
  { icon: FaUser, label: 'Username', hint: 'Lots of random numbers or weird names can be a warning sign.' },
  { icon: FaUser, label: 'Bio', hint: 'Watch for “DM me”, money requests, or offers for “exclusive content”.' },
  { icon: FaMapMarkerAlt, label: 'Location', hint: 'Does the location make sense with the rest of the profile?' },
  { icon: FaCalendar, label: 'Created X ago', hint: 'New accounts with big friend lists can be suspicious.' },
  { icon: FaUserFriends, label: 'Friends / followers', hint: 'Check friend count, follower ratio, and mutual friends together.' },
  { icon: FaUserFriends, label: 'Friends section', hint: 'Do they show real friends, or almost no connections?' },
  { icon: FaImages, label: 'Photos section', hint: 'Are photos consistent over time, with the same person and real life moments?' },
  { icon: FaImages, label: 'Each post', hint: 'Look at what they say and whether images look real or copied.' },
]

const RED_FLAGS = [
  'A very new account with lots of friends',
  'No mutual friends',
  'A strange follower/following ratio',
  'No personal photos, or only stock/professional-looking images',
  'Bios or posts asking for DMs, video chat, money, or private contact',
  'Pressure to move to Snapchat or another app right away',
  'Pressure to meet up in person',
  'A profile that looks too perfect, fake, or AI-generated',
]

function InstructionPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen min-h-dvh bg-gradient-to-b from-purple-100 via-purple-50/80 to-indigo-50/90">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_#7c3aed_1px,_transparent_1px)] bg-[length:24px_24px]" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16 pb-40">
        {/* Hero */}
        <header className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-900 tracking-tight">
            How to Play Friend or Foe
          </h1>
          <p className="mt-5 text-xl sm:text-2xl text-purple-700/90 font-medium">
            Investigate friend requests, spot red flags, and decide who to trust online.
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            You’ll review 10 social media–style profiles and choose whether to Accept or Reject each request based on what you find.
          </p>
        </header>

        {/* Game Flow overview – 3 cards */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-8">Game Flow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-7 sm:p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-purple-300/80 transition-all">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <FaSearch className="text-4xl" />
              </div>
              <h3 className="font-bold text-purple-900 text-xl sm:text-2xl mb-3">Investigate</h3>
              <p className="text-base sm:text-lg text-gray-700">
                Open profiles and look closely at photos, posts, bios, and account details.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-7 sm:p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-purple-300/80 transition-all">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <FaFlag className="text-4xl" />
              </div>
              <h3 className="font-bold text-purple-900 text-xl sm:text-2xl mb-3">Flag red flags</h3>
              <p className="text-base sm:text-lg text-gray-700">
                Click suspicious parts of the profile to mark them. Click again to remove a flag.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-7 sm:p-8 flex flex-col items-center text-center hover:shadow-xl hover:border-purple-300/80 transition-all">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <FaCheckCircle className="text-4xl" />
              </div>
              <h3 className="font-bold text-purple-900 text-xl sm:text-2xl mb-3">Decide</h3>
              <p className="text-base sm:text-lg text-gray-700">
                Use what you found to Accept or Reject each friend request.
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-step */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-8">Step-by-step</h2>
          <div className="relative rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-8 sm:p-10">
            {/* Vertical dotted line */}
            <div className="absolute left-10 sm:left-12 top-20 bottom-20 w-0.5 border-l-2 border-dashed border-purple-300/80 hidden sm:block" aria-hidden="true" />
            <ul className="space-y-8">
              {STEPS.map((step) => (
                <li key={step.num} className="relative flex gap-5 sm:gap-8 items-start">
                  <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl z-10">
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="font-semibold text-purple-900 text-base sm:text-lg">{step.title}</p>
                    <p className="text-base sm:text-lg text-gray-700 mt-2">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What to Flag + What to Look For */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-7 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-2">What to Flag</h2>
            <p className="text-base text-purple-700/80 mb-5">
              Click these parts of a profile to mark them as suspicious.
            </p>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700">
              {WHAT_TO_FLAG.map((item) => (
                <li key={item.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <item.icon className="text-purple-500 w-5 shrink-0" />
                    <span className="font-semibold text-purple-900">
                      {item.label}
                    </span>
                  </div>
                  {item.hint && (
                    <p className="pl-8 text-sm sm:text-base text-gray-700">
                      {item.hint}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-amber-50/90 border border-amber-200/80 p-4 sm:p-5 flex gap-3">
              <FaLightbulb className="text-amber-500 w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-amber-900/90">
                <strong>Tip:</strong> One red flag does not always mean a profile is fake. Look for multiple warning signs together before making your decision.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-7 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-2">What to Look For</h2>
            <p className="text-base text-purple-700/80 mb-5">Red flags can include:</p>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700">
              {RED_FLAGS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-red-500 font-bold text-lg">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {/* Sample profile card illustration hint */}
            <div className="mt-6 rounded-2xl bg-purple-50/90 border border-purple-200/80 p-4">
              <p className="text-sm sm:text-base text-purple-900 font-semibold mb-2">
                Example: Real vs. fake profile card
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Imagine two friend request cards side by side. The real one shows the same teen in all
                photos, with friends and normal posts. The fake one uses different‑looking photos, has
                very few mutual friends, and lots of posts asking for DMs or Snap.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring + Investigation Panel example */}
        <section className="mb-16 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-7 sm:p-8 space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-4">Scoring</h2>
            <ul className="text-base sm:text-lg text-gray-700 space-y-2">
              <li><strong className="text-purple-800">+500</strong> for a correct Accept or Reject</li>
              <li><strong className="text-green-700">+50</strong> for each red flag you correctly flag</li>
              <li><strong className="text-red-600">−10</strong> for each incorrect flag (score never goes below 0)</li>
              <li>
                Reach <strong className="text-purple-800">4,000 points</strong> to unlock a one-time
                {' '}<strong>Double Points</strong> power-up for your next profile
              </li>
            </ul>
          </div>

          {/* Investigation Panel mini-strip */}
          <div className="mt-3 rounded-2xl bg-purple-50 border border-purple-200/80 px-4 py-3 flex flex-col gap-2">
            <p className="text-sm sm:text-base text-purple-900 font-semibold">
              Investigation Panel (on each profile)
            </p>
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <p className="text-xs sm:text-sm text-gray-700">
                Use this bar to make your final choice after you finish investigating.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-red-500/90 text-white text-xs sm:text-sm font-semibold"
                >
                  ✕ Reject
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-green-500/90 text-white text-xs sm:text-sm font-semibold"
                >
                  ✓ Accept
                </button>
              </div>
              <div className="text-xs sm:text-sm text-purple-900 font-medium">
                Flags: <span className="font-bold">3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Investigation Notebook */}
        <section className="mb-12 rounded-2xl border-2 border-purple-200/80 bg-white/90 shadow-lg shadow-purple-200/30 p-6 sm:p-7 flex flex-col gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <FaBook className="text-3xl" />
            </div>
            <div>
              <h2 className="font-bold text-purple-900 text-xl sm:text-2xl">Investigation Notebook</h2>
              <p className="text-base sm:text-lg text-gray-700 mt-1">
                On each profile page, click the notebook icon to open your notes. It shows reminders for
                red flags you missed on earlier profiles.
              </p>
            </div>
          </div>
          {/* Mini notebook mockup */}
          <div className="rounded-2xl bg-purple-50/90 border border-purple-200/80 p-4">
            <p className="text-sm sm:text-base text-purple-900 font-semibold mb-2">
              Example notebook page
            </p>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
              <li><strong>Profile 3 – Alex:</strong> You spotted all the red flags here. Great work!</li>
              <li><strong>Profile 6 – Jason:</strong> Remember to check how new the account is.</li>
              <li><strong>Profile 8 – Sophia:</strong> Watch for Cash App requests and “exclusive content”.</li>
            </ul>
          </div>
        </section>

        {/* Safety reminder */}
        <section className="rounded-2xl bg-purple-100/80 border border-purple-200/80 p-6 sm:p-7 text-center mb-15">
          <p className="text-base sm:text-lg text-purple-900 font-medium">
            It’s okay to reject strangers online. If someone pushes for private chat, money, or meet-ups, talk to a trusted adult. Use these skills in real life when you get friend requests you’re not sure about.
          </p>
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
