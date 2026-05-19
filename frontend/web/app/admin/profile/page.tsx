"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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
        <Sidebar active="Profile" role="admin" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          
          {/* Top Bar spacing to match other pages */}
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]">
          </div>

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-2 sm:mb-4">
                  Admin Dashboard
                </h1>
                <p className="text-sm sm:text-sm sm:text-base md:text-xl text-white/90 font-light max-w-sm leading-relaxed">
                  Track your programs,<br/>manage Time Table and stay up to date
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 w-full max-w-3xl mx-auto mt-2 sm:mt-4">
                <Link href="/admin/programs" className="flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0d3454]/60 border border-white/30 text-white/90 hover:border-white/50 hover:bg-[#0d3454]/80 transition text-center text-xs sm:text-sm md:text-base font-semibold">
                  Manage Programs
                </Link>
                <Link href="/admin/resources" className="flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0d3454]/60 border border-white/30 text-white/90 hover:border-white/50 hover:bg-[#0d3454]/80 transition text-center text-xs sm:text-sm md:text-base font-semibold">
                  Manage Resources
                </Link>
                <Link href="/admin/track-learning" className="flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0d3454]/60 border border-white/30 text-white/90 hover:border-white/50 hover:bg-[#0d3454]/80 transition text-center text-xs sm:text-sm md:text-base font-semibold">
                  Track Learning Progress
                </Link>
                <Link href="/admin/track-learning" className="flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0d3454]/60 border border-white/30 text-white/90 hover:border-white/50 hover:bg-[#0d3454]/80 transition text-center text-xs sm:text-sm md:text-base font-semibold">
                  Manage payments
                </Link>
                <Link href="/admin/time-table" className="flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0d3454]/60 border border-white/30 text-white/90 hover:border-white/50 hover:bg-[#0d3454]/80 transition text-center text-xs sm:text-sm md:text-base font-semibold sm:col-span-2 max-w-md mx-auto w-full">
                  <span>Manage<br/>Time table &amp; Live class Links</span>
                </Link>
              </div>

              {/* Back Button */}
              <div className="mt-8 sm:mt-16">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#0d3454]/60 border border-white/30 text-white/90 font-semibold text-xs sm:text-sm hover:bg-[#0d3454]/80 hover:border-white/40 "
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
