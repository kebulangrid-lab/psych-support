"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function AdminTimeTable() {
  const tableData = [
    { date: "17/12/2026", time: "1:30 - 12:30", topic: "Colour Therapy", link: "zoom.com" },
    { date: "17/12/2026", time: "1:30 - 12:30", topic: "Colour Therapy", link: "zoom.com" },
    { date: "17/12/2026", time: "1:30 - 12:30", topic: "Colour Therapy", link: "zoom.com" },
    { date: "17/12/2026", time: "1:30 - 12:30", topic: "Colour Therapy", link: "zoom.com" },
    { date: "17/12/2026", time: "1:30 - 12:30", topic: "Colour Therapy", link: "zoom.com" },
    { date: "17/12/2026", time: "1:30 - 12:30", topic: "Colour Therapy", link: "zoom.com" },
  ];

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/admin-back.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a350d]/30" />
      </div>

      <div>
        {/* Sidebar */}
        <Sidebar active="Time Table" role="admin" />
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-8 pt-6 pb-0 flex flex-col justify-center">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-10 md:p-14 mb-16 flex flex-col gap-10">
              
              {/* Header Flex */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                    Time Table
                  </h1>
                  <p className="text-base md:text-xl text-white/90 font-light drop-shadow-md">
                    Practical resources for continuous growth.
                  </p>
                </div>
                <button className="px-6 py-2.5 rounded-xl bg-[#0d3454]/60 border border-white/30 text-white font-semibold text-sm hover:bg-[#0d3454]/80 hover:border-white/50 transition self-start md:mt-4">
                  Edit Time Table
                </button>
              </div>

              {/* Table Container */}
              <div className="w-full bg-[#8c97a7] rounded-xl overflow-hidden mt-4 shadow-lg text-[#1a1040]">
                <div className="grid grid-cols-4 px-8 py-5 border-b border-[#1a1040]/10">
                  <div className="font-bold text-lg">Date</div>
                  <div className="font-bold text-lg">Time</div>
                  <div className="font-bold text-lg">Topic</div>
                  <div className="font-bold text-lg">Live link</div>
                </div>
                <div className="flex flex-col">
                  {tableData.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 px-8 py-4 font-medium">
                      <div className="opacity-80">{row.date}</div>
                      <div className="opacity-80">{row.time}</div>
                      <div className="opacity-80">{row.topic}</div>
                      <div className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition">
                        {row.link}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-12 mb-4">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center justify-center px-16 py-3 rounded-xl bg-[#0d1520]/80 border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md"
                >
                  Back
                </Link>
                <button className="inline-flex items-center justify-center px-16 py-3 rounded-xl bg-[#00ff00] text-[#1a1040] font-bold text-sm hover:bg-[#00e600] transition shadow-md">
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
