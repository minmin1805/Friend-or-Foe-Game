import WelcomePage from './pages/WelcomePage';
import ContentWarningPage from './pages/ContentWarningPage';
import InstructionPage from './pages/InstructionPage';
import GamePage from './pages/GamePage';
import EndgamePage from './pages/EndgamePage';
import ProfilePage from './pages/ProfilePage';
import {useLocation} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

    return (
      <Router>
        <Routes>
          <Route path='/' element={<ContentWarningPage />} />
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/instruction' element={<InstructionPage />} />
          <Route path='/game' element={<GamePage />} />
          <Route path='/endgame' element={<EndgamePage />} />
        </Routes>
      </Router>
  )
}

export default App
