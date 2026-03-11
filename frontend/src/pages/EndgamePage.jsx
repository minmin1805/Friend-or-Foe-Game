import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import ScoreDisplay from "../components/ScoreDisplay";
import Leaderboard from "../components/Leaderboard";
// Reuse your existing logo for now – change path if needed
import logo from "../assets/Images/EndGamePage/logo.png";

// Optional: if you later add specific Friend or Foe badge/title images,
// you can import and use them here. For now we use simple text.


function EndgamePage() {
  const navigate = useNavigate();

  const handleDownloadChecklist = () => {
    // Mock only – wire to real PDF later
    alert("Download Friend or Foe Safety Checklist (mock).");
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center relative">
      {/* Reuse the animated gradient background from Sextortion Escape */}
      <style>{`
        .fof-endgame-bg {
          background: linear-gradient(90deg, #FFFFFF, #E0ACFF, #A4A4FF);
          background-size: 300% 300%;
          animation: fof-endgame-gradient 4s alternate infinite;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 0;
        }
        @keyframes fof-endgame-gradient {
          0% { background-position: 0%; }
          100% { background-position: 100%; }
        }
      `}</style>
      <div className="fof-endgame-bg" aria-hidden="true" />

      <div className="relative z-10 flex flex-col w-full items-center py-6 sm:py-8">
        {/* Logo – same style as EndgamePage */}
        <img
          src={logo}
          alt="Friend or Foe logo"
          className="w-60 sm:w-44 lg:w-[300px] items-center ml-4 sm:ml-6 mb-4 sm:mb-6 "
        />

        {/* Main content: two columns on large screens, stacked on small */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl px-4 sm:px-6 gap-6 lg:gap-10 mt-4 sm:mt-8">
          {/* Left: score / badge card (styled like ScoreDisplay) */}
          <div className="w-full lg:w-auto flex justify-center h-fit">
            <ScoreDisplay />
          </div>

          {/* Right: leaderboard + learnings, styled like LeaderBoard */}
          <Leaderboard />

        </div>

        {/* Bottom buttons – reuse style from Sextortion EndgamePage */}
        <div className="flex flex-col sm:flex-row mt-8 sm:mt-10 gap-4 sm:gap-8 justify-center w-full px-4 sm:px-6 pb-8">
          <button
            type="button"
            className="bg-[#ddecff] text-blue-900 px-4 py-2 rounded-md text-lg sm:text-xl font-bold flex items-center justify-center gap-2"
            onClick={handleDownloadChecklist}
          >
            <IoMdDownload /> Download Safety Checklist!
          </button>
          <button
            type="button"
            className="bg-[#ddecff] text-blue-900 px-4 py-2 rounded-md text-lg sm:text-xl font-bold"
            onClick={() => navigate("/welcome")}
          >
            Exit To Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndgamePage;