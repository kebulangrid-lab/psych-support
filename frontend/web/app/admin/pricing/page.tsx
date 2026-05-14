"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";

export default function AdminPricing() {
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
        <Sidebar active="" role="admin" />
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-8 pt-6 pb-0 flex flex-col justify-center">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-10 md:p-14 mb-16 flex flex-col gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  Manage Payments
                </h1>
                <p className="text-base md:text-xl text-white/90 font-light drop-shadow-md max-w-xl leading-relaxed">
                  Monitor transactions, pending payments, and manage<br/>student access
                </p>
              </div>

              {/* Stats & Search */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
                <div className="flex gap-6">
                  {/* Stat Card 1 */}
                  <div className="bg-[#8c97a7] text-[#1a1040] rounded-xl p-5 w-40 md:w-48 font-bold flex flex-col justify-between h-[120px] shadow-md border border-white/20">
                    <div className="text-lg leading-tight">Total<br/>Revenue</div>
                    <div className="text-[20px] opacity-80 mt-1 font-extrabold">₦857k</div>
                  </div>
                  {/* Stat Card 2 */}
                  <div className="bg-[#8c97a7] text-[#1a1040] rounded-xl p-5 w-40 md:w-48 font-bold flex flex-col justify-between h-[120px] shadow-md border border-white/20">
                    <div className="text-lg leading-tight">Payments<br/>Received</div>
                    <div>
                      <div className="text-xl leading-none">7</div>
                      <div className="text-xs font-semibold opacity-70 mt-1">Of 12 students</div>
                    </div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-md mt-4 md:mt-0 mb-1">
                  <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70" />
                  <input 
                    type="text" 
                    className="w-full bg-[#0d1520]/80 border border-white/30 rounded-2xl py-3.5 pl-14 pr-4 text-white outline-none focus:border-white/50 transition shadow-inner"
                  />
                </div>
              </div>

              {/* Table Container */}
              <div className="w-full bg-[#8c97a7] rounded-xl min-h-[350px] mt-2 shadow-lg text-[#1a1040] p-8 relative flex flex-col">
                
                {/* Table Headers */}
                <div className="grid grid-cols-1 md:grid-cols-6 items-center font-bold text-lg md:text-[22px] mb-8">
                  <div className="flex items-center gap-4 col-span-2">
                    <input type="checkbox" className="w-5 h-5 rounded border-white/50 bg-white/20 outline-none cursor-pointer" />
                    <span>Name</span>
                  </div>
                  <div>Program/Plan</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>

                {/* Table Row (Mocked as per image) */}
                <div className="flex flex-col md:flex-row justify-between items-start border-b border-[#1a1040]/10 pb-6 w-full">
                  <div className="flex items-center gap-4 text-xl">
                    <input type="checkbox" className="w-5 h-5 rounded border-[#1a1040] accent-[#1a1040] bg-transparent outline-none cursor-pointer" />
                    <span className="opacity-90 font-medium">Student name</span>
                  </div>

                  {/* Action Buttons Right Aligned */}
                  <div className="flex flex-col gap-3 mt-4 md:mt-0 md:mr-10">
                    <button className="border border-[#1a1040]/70 rounded-[10px] px-6 py-1.5 text-[15px] font-semibold hover:bg-[#1a1040]/10 bg-transparent transition md:w-48 text-center text-[#1a1040]">
                      View details
                    </button>
                    <button className="border border-[#1a1040]/70 rounded-[10px] px-6 py-1.5 text-[15px] font-semibold hover:bg-[#1a1040]/10 bg-transparent transition md:w-48 text-center text-[#1a1040]">
                      Download receipt
                    </button>
                    <button className="border border-[#1a1040]/70 rounded-[10px] px-6 py-1.5 text-[15px] font-semibold hover:bg-[#1a1040]/10 bg-transparent transition md:w-48 text-center text-[#1a1040]">
                      Approve payments
                    </button>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-4">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center justify-center px-16 py-3 rounded-2xl bg-[#0d1520]/80 border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md"
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
