import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import ScoreDisplay from "../components/ScoreDisplay";
import Leaderboard from "../components/Leaderboard";
// Reuse your existing logo for now – change path if needed
import logo from "../assets/Images/EndGamePage/logo.png"; 
import safetyScoutImage from "../assets/Images/EndGamePage/safetyScoutImage.png";
import cyberDetectiveImage from "../assets/Images/EndGamePage/cyberDetective.png";
import expertInvestigatorImage from "../assets/Images/EndGamePage/expertInvestigatorImage.png";
import safetyChecklistPdf from "../assets/PDF/pdf.pdf";
import { useFriendOrFoe } from "../context/FriendOrFoeContext";


function EndgamePage() {
  const navigate = useNavigate();
  const { score, correctDecisions, decisions, profiles, flaggedElements, gameStartedAt } =
    useFriendOrFoe();

  const {
    totalSpottedFlags,
    totalPossibleFlags,
    finishTimeLabel,
    badgeTitle,
    badgeImage,
  } = useMemo(() => {
    const totalProfiles = profiles.length;

    // Flags
    let possible = 0;
    let spotted = 0;
    profiles.forEach((profile, index) => {
      const redKeys = new Set((profile.redFlags || []).map((f) => f.elementKey));
      possible += redKeys.size;
      const flaggedForProfile = flaggedElements[index] || [];
      flaggedForProfile.forEach((key) => {
        if (redKeys.has(key)) spotted += 1;
      });
    });

    // Time
    let finish = "--:--";
    if (gameStartedAt) {
      const elapsedMs = Date.now() - gameStartedAt;
      const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      finish = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    // Badge
    const totalCompleted = decisions.filter(Boolean).length || totalProfiles;
    const correctRate = totalCompleted > 0 ? correctDecisions / totalCompleted : 0;
    let title = "Safety Scout";
    let image = safetyScoutImage;
    if (correctRate >= 0.8) {
      title = "Expert Investigator";
      image = expertInvestigatorImage;
    } else if (correctRate >= 0.5) {
      title = "Cyber Detective";
      image = cyberDetectiveImage;
    }

    return {
      totalSpottedFlags: spotted,
      totalPossibleFlags: possible,
      finishTimeLabel: finish,
      badgeTitle: title,
      badgeImage: image,
    };
  }, [profiles, flaggedElements, gameStartedAt, decisions, correctDecisions]);

  const handleDownloadChecklist = () => {
    const link = document.createElement("a");
    link.href = safetyChecklistPdf;
    link.download = "Friend-or-Foe-Safety-Checklist.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <ScoreDisplay
              score={score}
              correctCount={correctDecisions}
              totalProfiles={profiles.length}
              totalSpottedFlags={totalSpottedFlags}
              totalPossibleFlags={totalPossibleFlags}
              finishTimeLabel={finishTimeLabel}
              badgeTitle={badgeTitle}
              badgeImage={badgeImage}
            />
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