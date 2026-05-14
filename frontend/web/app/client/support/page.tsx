"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function SupportPage() {
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
        <Sidebar active="Support" />
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">
          
          {/* Top Bar spacing to match other pages */}
          <div className="w-full flex justify-end items-center px-8 pt-6 pb-0 min-h-[60px]">
          </div>

          {/* Content */}
          <div className="flex-1 px-8 pt-6 pb-0 flex flex-col">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[28px] p-10 md:p-14 mb-16 flex flex-col gap-10 min-h-[50vh]">
              
              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
                  Support
                </h1>
                <p className="text-base md:text-xl text-white/90 font-light max-w-2xl leading-relaxed">
                  How can we help you today?
                </p>
              </div>

              {/* Empty placeholder area for future content */}
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-10">
                <p className="text-white/50 text-lg">Support contents coming soon...</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
