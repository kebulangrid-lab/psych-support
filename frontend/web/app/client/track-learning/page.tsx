"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaBookOpen, FaPlayCircle } from "react-icons/fa";

export default function TrackLearningPage() {
  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/client-back.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a2060]/70" />
      </div>

      <div>
        {/* Sidebar */}
        <Sidebar active="Track Learning" />
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">
          
          {/* Content */}
          <div className="flex-1 px-8 pt-2 pb-0 flex flex-col mt-[72px]">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[28px] p-10 md:p-14 mb-16 flex flex-col gap-10">
              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
                  Your Progress
                </h1>
                
                {/* Progress bar area */}
                <div className="flex flex-col gap-3 mt-8">
                  {/* Wavy line or gradient bar */}
                  <div className="flex items-center w-full max-w-[300px]">
                    {/* We simulate the wavy line with a styled div */}
                    <svg width="240" height="20" viewBox="0 0 240 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <path d="M0 10 Q 15 0, 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" fill="none"/>
                    </svg>
                    <div className="h-1.5 w-16 bg-white/40 rounded-full ml-1" />
                  </div>
                  <p className="text-lg md:text-xl text-white/90">Great progress!- 80% complete</p>
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((v) => (
                  <div key={v} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col text-[#1a1a1a]">
                    <div className="flex-1 py-14 flex items-center justify-center relative">
                      <div className="relative text-[#6b1c7c]">
                        <FaBookOpen className="text-[70px]" />
                        <div className="absolute -bottom-1 -right-4 bg-white rounded-full p-1">
                          <FaPlayCircle className="text-[34px] bg-white rounded-full text-[#6b1c7c]" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#a0a8be] p-4 py-3 flex flex-col">
                      <div className="font-bold text-[15px]">Completed <span className="text-[#6b1c7c]">Modules</span></div>
                      <div className="text-[13px] font-medium text-black/80 mt-0.5">You have 3 ongoing modules</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modules table */}
              <div className="w-full bg-white text-[#1a1a1a] rounded-[16px] p-6 lg:p-8 text-[15px] shadow-inner mt-4">
                <div className="grid grid-cols-4 pb-4 mb-4 font-extrabold text-base border-b border-black/20 text-black/70">
                  <div>Modules</div>
                  <div>Status</div>
                  <div>Progress</div>
                  <div></div>
                </div>
                <div className="flex flex-col gap-5 text-[15px] font-semibold text-black/80">
                  <div className="grid grid-cols-4 items-center">
                    <div>Module 1</div>
                    <div>Completed</div>
                    <div>100%</div>
                    <div className="flex justify-end">
                      <button className="px-5 py-2 w-[180px] rounded-full border border-black/40 text-sm whitespace-nowrap hover:bg-black/5 transition">Review</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <div>Module 2</div>
                    <div>In Progress</div>
                    <div>65%</div>
                    <div className="flex justify-end">
                      <button className="px-5 py-2 w-[180px] rounded-full border border-black/40 text-sm whitespace-nowrap hover:bg-black/5 transition">Continue learning</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <div>Module 3</div>
                    <div>Not Started</div>
                    <div>0%</div>
                    <div className="flex justify-end">
                      <button className="px-5 py-2 w-[180px] rounded-full border border-black/40 text-sm whitespace-nowrap hover:bg-black/5 transition">Start</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-4">
                <Link
                  href="/client/dashboard"
                  className="inline-flex items-center justify-center px-16 py-3 rounded-[12px] bg-[#1d2146] border border-white/20 text-white font-medium text-sm hover:bg-[#1d2146]/80 hover:border-white/40 shadow-md transition"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}