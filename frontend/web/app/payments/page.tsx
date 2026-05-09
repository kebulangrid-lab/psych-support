"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function PaymentsPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen bg-[#281b54] text-white flex relative overflow-x-hidden">
      {/* Background Image and Overlays */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/landing.jpg"
          alt="Background"
          fill
          priority
          className="object-cover mix-blend-overlay opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#45265B]/80 to-[#1a113a]/90" />
      </div>

      {/* Sidebar */}
      <Sidebar active="Programs" />

      {/* Main Content Area */}
      <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen relative pt-8 px-8 pb-0">
        
        {/* Huge Glassmorphism Wrapper for Content */}
        <div className="flex-1 w-full max-w-[1400px] mx-auto border border-white/30 bg-white/5 backdrop-blur-xl rounded-t-[40px] p-8 md:p-14 lg:p-20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col">
          
          {/* Header */}
          <div className="mb-14">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] tracking-tight">
              Select a Plan
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl">
              Choose a plan, manage your time, and stay on track.
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-full flex border border-white/20 shadow-inner">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  billingCycle === "monthly" 
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("yearly")}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  billingCycle === "yearly" 
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-center max-w-6xl mx-auto w-full">
            
            {/* BASIC */}
            <div className="bg-white rounded-[24px] p-8 lg:p-10 text-black shadow-2xl flex flex-col items-center transition-all hover:-translate-y-3 duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-wider">BASIC</h3>
              <div className="flex items-end justify-center mb-10">
                <span className="text-3xl font-bold align-top mt-2">$</span>
                <span className="text-7xl font-extrabold leading-none">50</span>
                <span className="text-lg text-gray-500 font-medium ml-1 mb-2">/ mo</span>
              </div>
              <ul className="w-full space-y-4 mb-10 pl-2">
                {Array(5).fill("List item").map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600 font-medium">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-4"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-[#9b2cff] hover:bg-[#8516e8] text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,44,255,0.6)]">
                Select
              </button>
            </div>

            {/* PREMIUM */}
            <div className="bg-[#9b2cff] rounded-[24px] p-8 lg:p-10 text-white shadow-[0_0_40px_rgba(155,44,255,0.6)] flex flex-col items-center transform md:scale-105 z-10 border-2 border-white/20 transition-all hover:-translate-y-3 md:hover:scale-110 duration-500">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-wider drop-shadow-md">PREMIUM</h3>
              <div className="flex items-end justify-center mb-10 drop-shadow-lg">
                <span className="text-3xl font-bold align-top mt-2">$</span>
                <span className="text-7xl font-extrabold leading-none">150</span>
                <span className="text-lg text-white/90 font-medium ml-1 mb-2">/ mo</span>
              </div>
              <ul className="w-full space-y-4 mb-10 pl-2">
                {Array(6).fill("List item").map((item, i) => (
                  <li key={i} className="flex items-center text-white/95 font-medium">
                    <span className="w-1.5 h-1.5 bg-white/80 rounded-full mr-4"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-[#00FF00] hover:bg-[#00e600] text-black font-black text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,0,0.8)] shadow-lg">
                Select
              </button>
            </div>

            {/* VIP */}
            <div className="bg-white rounded-[24px] p-8 lg:p-10 text-black shadow-2xl flex flex-col items-center transition-all hover:-translate-y-3 duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-wider">VIP</h3>
              <div className="flex items-end justify-center mb-10">
                <span className="text-3xl font-bold align-top mt-2">$</span>
                <span className="text-7xl font-extrabold leading-none">250</span>
                <span className="text-lg text-gray-500 font-medium ml-1 mb-2">/ mo</span>
              </div>
              <ul className="w-full space-y-4 mb-10 pl-2">
                {Array(5).fill("List item").map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600 font-medium">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-4"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-[#9b2cff] hover:bg-[#8516e8] text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,44,255,0.6)]">
                Select
              </button>
            </div>

          </div>

        </div>

        {/* Footer sits at the bottom of the main content column */}
        <div className="w-full">
            <Footer />
        </div>
      </div>
    </main>
  );
}
