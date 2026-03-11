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

function App() {
  return (
    <FriendOrFoeProvider>
      <Router>
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
      </Router>
    </FriendOrFoeProvider>
  )
}

export default App
