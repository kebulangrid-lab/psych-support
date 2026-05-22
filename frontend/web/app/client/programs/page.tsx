"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "@/components/AuthProvider";
import axios from "axios";

export default function ProgramsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [programs, setPrograms] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [progRes, enrollRes] = await Promise.all([
          axios.get("http://localhost:4000/api/programs"),
          axios.get(`http://localhost:4000/api/enrollments?client_id=${user.id}`)
        ]);

        setPrograms(progRes.data || []);
        setEnrollments(enrollRes.data || []);
      } catch (err) {
        console.error("Error fetching programs and enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-lg">Loading programs...</p>
        </div>
      </main>
    );
  }

  if (programs.length === 0) {
    return (
      <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src="/landing.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-purple-950/20" />
        </div>
        <Sidebar active="Programs" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen justify-center items-center">
          <div className="border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">No Programs Available</h2>
            <p className="text-white/80">Check back later for newly added programs.</p>
          </div>
        </div>
      </main>
    );
  }

  const currentProgram = programs[currentIndex];
  const isEnrolled = enrollments.some((e: any) => e.program_id === currentProgram.id);

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
    // Navigate to payment page, pass the program ID
    router.push(`/client/programs/payment?programId=${currentProgram.id}`);
  };

  // Split description text by double newlines for formatting if possible
  const desc = currentProgram.description || "";
  const paragraphs = desc.split("\n\n");
  const description1 = paragraphs[0] || "No description provided.";
  const description2 = paragraphs.slice(1).join("\n\n") || "";

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/landing.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/20" />
      </div>

      <div>
        <Sidebar active="Programs" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-5 sm:p-8 md:p-10 mb-24 sm:mb-16 flex flex-col gap-5 sm:gap-8 min-h-[auto] sm:min-h-[600px]">

              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-lg tracking-wide">
                  Programs
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 font-light drop-shadow-md">
                  Explore our specialised programs designed to support growth, performance, and development.
                </p>
              </div>

              <div className="w-full bg-white/60 text-black border border-white/50 backdrop-blur-sm rounded-[8px] p-5 sm:p-6 md:p-8 flex flex-col shadow-xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  {/* Left Column content - Icon block */}
                  <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-[#9c00ff] flex items-center justify-center flex-shrink-0 relative overflow-hidden hidden md:block">
                     <Image src={currentProgram.thumbnail_url || "/pricingComplete.png"} alt={currentProgram.title} fill className="object-cover opacity-80 mix-blend-screen" />
                  </div>
                
                  {/* Right Column content - Text block */}
                  <div className="flex flex-col flex-1 items-start text-left text-black/90 font-medium text-xs sm:text-sm leading-relaxed tracking-wide z-10 w-full">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-black">{currentProgram.title}</h2>
                    <p className="mb-3">
                      {description1}
                    </p>
                    {description2 && (
                      <p className="mb-4">
                        {description2}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls & Button */}
              <div className="flex justify-between items-center mt-2 px-1">
                <div>
                  {isEnrolled ? (
                    <button className="bg-gray-500 text-white px-6 py-2 rounded-[4px] font-semibold text-xs sm:text-sm border border-gray-600 cursor-not-allowed shadow-lg">
                      Purchased
                    </button>
                  ) : (
                    <button 
                      onClick={handleAccess}
                      className="bg-[#00ff00] text-black px-6 py-2 rounded-[4px] font-semibold text-xs sm:text-sm border border-black hover:bg-[#00ff00]/90 transition shadow-lg"
                    >
                      Access
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`w-8 h-8 rounded-full border border-white flex items-center justify-center transition-all ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20"}`}
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={currentIndex === programs.length - 1}
                    className={`w-8 h-8 rounded-full border border-white flex items-center justify-center transition-all ${currentIndex === programs.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20"}`}
                  >
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </main>
  );
}
