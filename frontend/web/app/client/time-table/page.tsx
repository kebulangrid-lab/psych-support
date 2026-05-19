"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";

export default function TimeTablePage() {
  const tableData = [
    {
      date: "17/12/2026",
      time: "1:30 - 12:30",
      topic: "Colour Therapy",
      link: "zoom.com"
    }
  ];

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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
        <Sidebar active="Time Table" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          {/* Top Bar spacing to match other pages */}
          <div className="w-full flex justify-end items-center px-8 pt-6 pb-0 min-h-[60px]">
          </div>

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  Time Table
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Track your timetable, manage your courses, and stay on top of your learning goals.
                </p>
              </div>

              {/* Table Area */}
              <div className="w-full bg-[#8c97a7] rounded-xl overflow-x-auto mt-4 shadow-lg text-[#1a1040]">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-4 px-4 sm:px-8 py-4 sm:py-5 border-b border-[#1a1040]/10">
                    <div className="font-bold text-base sm:text-lg">Date</div>
                    <div className="font-bold text-base sm:text-lg">Time</div>
                    <div className="font-bold text-base sm:text-lg">Topic</div>
                    <div className="font-bold text-base sm:text-lg">Live link</div>
                  </div>
                  <div className="flex flex-col">
                    {tableData.map((item, i) => (
                      <div key={i} className="grid grid-cols-4 px-4 sm:px-8 py-4 font-medium text-sm sm:text-base border-b border-[#1a1040]/5 last:border-0 border-dashed items-center">
                        <div className="opacity-80 pr-2 truncate">{item.date}</div>
                        <div className="opacity-80 pr-2 truncate">{item.time}</div>
                        <div className="opacity-80 pr-2 truncate">{item.topic}</div>
                        <div className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition truncate pr-2">
                          <a href={`https://${item.link}`} target="_blank" rel="noreferrer">
                            {item.link}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12 mb-4">
                <Link
                  href="/client/profile"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 sm:px-16 py-3 rounded-xl bg-[#1d2146] border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md"
                >
                  Back
                </Link>
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
