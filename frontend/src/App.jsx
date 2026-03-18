import WelcomePage from './pages/WelcomePage'
import ContentWarningPage from './pages/ContentWarningPage'
import InstructionPage from './pages/InstructionPage'
import GamePage from './pages/GamePage'
import EndgamePage from './pages/EndgamePage'
import ProfilePage from './pages/ProfilePage'
import ProfileFriendsPage from './pages/ProfileFriendsPage'
import ProfilePhotosPage from './pages/ProfilePhotosPage'
import { FriendOrFoeProvider } from './context/FriendOrFoeContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MusicToggleButton from './components/MusicToggleButton'
import { SoundProvider, useSounds } from './context/SoundContext'
import { MusicProvider, useMusic } from './context/MusicContext'

function AppContent() {
  const { playClickSound, playButtonClickSound } = useSounds()
  const { startMusic } = useMusic()
  const location = useLocation()

  useEffect(() => {
    const handleGlobalClick = (ev) => {
      if (ev.target.closest('[data-skip-global-click-sound]')) return
      if (ev.target.closest('button, [role="button"]')) {
        playButtonClickSound()
      } else {
        playClickSound()
      }
    }
    document.addEventListener('click', handleGlobalClick, true)
    return () => document.removeEventListener('click', handleGlobalClick, true)
  }, [playClickSound, playButtonClickSound])

  // Attempt to start background music automatically (autoplay may still be blocked by the browser).
  useEffect(() => {
    if (location.pathname === '/') return
    startMusic()
  }, [location.pathname])

  return (
    <>
      {location.pathname !== '/' && <MusicToggleButton />}
      <Routes>
        <Route path="/" element={<ContentWarningPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/instruction" element={<InstructionPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/endgame" element={<EndgamePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/friends" element={<ProfileFriendsPage />} />
        <Route path="/profile/:id/photos" element={<ProfilePhotosPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <FriendOrFoeProvider>
      <SoundProvider>
        <MusicProvider>
          <Router>
            <AppContent />
          </Router>
        </MusicProvider>
      </SoundProvider>
    </FriendOrFoeProvider>
  )
}

export default App
