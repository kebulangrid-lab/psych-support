"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

export default function UpcomingPrograms() {
  const router = useRouter();
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const progRes = await axios.get("https://psych-support-1.onrender.com/api/programs");
        setPrograms(progRes.data || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10 flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#45366b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-md text-center tracking-wide">
          Programs
        </h1>
        <p className="text-sm md:text-base text-[#19193d] font-bold mb-8 text-center drop-shadow-sm">
          Explore our specialized programs designed to support growth, performance, and development.
        </p>

        <div className="w-full bg-white/60 text-black border border-white/50 backdrop-blur-sm rounded-[8px] p-8 flex flex-col items-center shadow-xl relative overflow-hidden">
          <h2 className="text-xl font-bold mb-2 text-[#260e40]">No Programs Available</h2>
          <p className="text-[#19193d]">Check back later for newly added programs.</p>
        </div>
      </div>
    );
  }

  const currentProgram = programs[currentIndex];

  const handleNext = () => {
    if (currentIndex < programs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAccess = () => {
    router.push("/client/sign-in");
  };

  return (
    <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-md text-center tracking-wide">
        Programs
      </h1>
      <p className="text-sm md:text-base text-[#19193d] font-bold mb-8 text-center drop-shadow-sm">
        Explore our specialized programs designed to support growth, performance, and development.
      </p>

      <div className="w-full bg-white/60 text-black border border-white/50 backdrop-blur-sm rounded-[8px] p-5 sm:p-6 md:p-8 flex flex-col shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Left Column content - Icon block */}
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-[#af00ff] flex items-center justify-center flex-shrink-0 relative overflow-hidden hidden md:block rounded-sm">
            <Image src={currentProgram.thumbnail_url || "/pricingComplete.png"} alt={currentProgram.title} fill className="object-cover opacity-80 mix-blend-screen" />
          </div>

          {/* Right Column content - Text block */}
          <div className="flex flex-col flex-1 items-start text-left text-black/90 font-medium text-xs sm:text-sm leading-relaxed tracking-wide z-10 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-[#260e40]">{currentProgram.title}</h2>
            <p className="mb-3 whitespace-pre-line text-[#19193d]">
              {currentProgram.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 px-1">
        <button
          onClick={handleAccess}
          className="bg-[#00ff00] text-black px-6 py-2 rounded-[4px] font-bold text-sm border border-green-800 hover:bg-[#00ff00]/90 transition shadow-lg"
        >
          Access
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-8 h-8 rounded-full border border-[#45265B] flex items-center justify-center transition-all ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#45265B]/10"}`}
          >
            <FaArrowLeft className="text-[#45265B] text-sm" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === programs.length - 1}
            className={`w-8 h-8 rounded-full border border-[#45265B] flex items-center justify-center transition-all ${currentIndex === programs.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#45265B]/10"}`}
          >
            <FaArrowRight className="text-[#45265B] text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
