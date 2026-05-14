"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaSearch, FaDownload } from "react-icons/fa";

export default function ResourcesPage() {
  const resourceCards = Array(6).fill({
    title: "Resources Name",
    subtitle: "PDF | Click to download",
  });

  const uploadHistory = [
    {
      title: "Pyschology beginners guide",
      module: "2.4",
      type: "PDF",
      date: "14/03/2026",
    },
    {
      title: "Therapy beginners guide",
      module: "2.4",
      type: "PDF",
      date: "14/03/2026",
    },
  ];

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
        <Sidebar active="Resources" />
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">
          
          {/* Top Bar */}
          <div className="w-full flex justify-end items-center px-8 pt-4 pb-0">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 w-full max-w-sm shadow-lg">
              <FaSearch className="text-white/60 flex-shrink-0" size={14} />
              <input
                type="text"
                placeholder="Type to search resources"
                className="bg-transparent text-white/80 placeholder-white/50 text-sm outline-none w-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 pt-6 pb-0 flex flex-col">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[28px] p-10 md:p-14 mb-16 flex flex-col gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
                  Resources
                </h1>
                <p className="text-base md:text-xl text-white/90 font-light max-w-2xl leading-relaxed">
                  Practical resources for continuous growth.
                </p>
              </div>

              {/* Resource Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceCards.map((item, i) => (
                  <button key={i} className="bg-[#b2bad5] hover:bg-[#b2bad5]/90 transition text-[#1a1a1a] rounded-xl p-4 flex items-center gap-4 text-left shadow-md">
                    <FaDownload className="text-2xl text-black/70 flex-shrink-0 ml-2" />
                    <div>
                      <div className="font-bold text-lg leading-tight">{item.title}</div>
                      <div className="text-xs text-black/60 font-medium">{item.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Upload History */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Upload History</h2>
                
                <div className="w-full bg-[#b2bad5] text-[#1a1a1a] rounded-xl p-6 lg:p-8 text-[15px] font-medium shadow-inner">
                  <div className="grid grid-cols-5 pb-4 mb-4 font-bold text-base border-b border-black/20">
                    <div className="col-span-1">Resource Title</div>
                    <div className="text-center">Module</div>
                    <div className="text-center">Type</div>
                    <div className="text-center">Date</div>
                    <div className="text-center">Action</div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {uploadHistory.map((item, i) => (
                      <div key={i} className="grid grid-cols-5 items-center">
                        <div className="col-span-1 pr-4">{item.title}</div>
                        <div className="text-center">{item.module}</div>
                        <div className="text-center">{item.type}</div>
                        <div className="text-center">{item.date}</div>
                        <div className="flex justify-center">
                          <button className="px-6 py-1.5 rounded-full border border-black/30 text-sm hover:bg-black/5 transition">
                            Open
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
      <Footer />
    </main>
  );
}
