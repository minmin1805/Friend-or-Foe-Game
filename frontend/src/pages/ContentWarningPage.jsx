import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

function ContentWarningPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen w-full bg-[#1a0a2e] flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-2xl w-full bg-[#2d1b4e]/80 rounded-2xl border-2 border-amber-500/50 p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl" aria-hidden>⚠️</span>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400">
          Legal Disclaimer
          </h1>
        </div>
        <p className="text-white text-lg leading-relaxed mb-4">
        This game is an educational simulation designed to promote awareness of online safety and risks related to digital communication, including issues connected to human trafficking. All characters, scenarios, and interactions presented within the game are fictional and created solely for instructional purposes. The content is not intended to portray real individuals, real events, or actual social media platforms.
The game does not provide legal advice, mental health advice, or emergency guidance. Participants who feel unsafe, have experienced exploitation, or believe someone may be at risk should contact a trusted adult or seek immediate assistance from local authorities or qualified professionals.
By using this game, players acknowledge that they understand its purpose is educational and agree to engage with the content responsibly.
        </p>
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-[#7c4ed4] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          I understand, continue
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
}

export default ContentWarningPage;
