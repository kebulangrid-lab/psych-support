"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";

export default function TimeTablePage() {
  const tableData = Array(6).fill({
    date: "17/12/2026",
    time: "1:30 - 12:30",
    topic: "Colour Therapy",
    link: "zoom.com"
  });

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
          {/* Top Bar */}
          <div className="w-full flex justify-end items-center px-8 pt-4 pb-0">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 w-full max-w-sm shadow-lg">
              <FaSearch className="text-white/60 flex-shrink-0" size={14} />
              <input
                type="text"
                placeholder="Filter by module or program"
                className="bg-transparent text-white/80 placeholder-white/50 text-sm outline-none w-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 pt-6 pb-0 flex flex-col">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[28px] p-6 sm:p-10 md:p-14 mb-8 sm:mb-16 flex flex-col gap-6 sm:gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] tracking-wide">
                  Time Table
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light max-w-2xl leading-relaxed">
                  Track your timetable, manage your courses, and stay on top of your learning goals.
                </p>
              </div>

              {/* Table Area */}
              <div className="w-full bg-[#b2bad5] text-[#1a1a1a] rounded-lg p-6 lg:p-8 text-[15px] font-medium border border-white/30 shadow-inner">
                <div className="grid grid-cols-4 pb-4 mb-2 font-bold text-lg border-b border-black/20">
                  <div>Date</div>
                  <div>Time</div>
                  <div>Topic</div>
                  <div>Live link</div>
                </div>
                {tableData.map((item, i) => (
                  <div key={i} className="grid grid-cols-4 py-3 items-center">
                    <div>{item.date}</div>
                    <div>{item.time}</div>
                    <div>{item.topic}</div>
                    <div>
                      <a href={`https://${item.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                        {item.link}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Button */}
              <div className="mt-2">
                <Link
                  href="/client/dashboard"
                  className="inline-flex items-center justify-center px-10 py-3 rounded-xl bg-[#1d2146] border border-white/20 text-white font-medium text-sm hover:bg-[#1d2146]/80 hover:border-white/40 shadow-md transition"
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
