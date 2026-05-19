"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [planSelected, setPlanSelected] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

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
          
          <div className="flex-1 px-8 pt-8 pb-0 flex flex-col">

            {!planSelected ? (
              <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-sm rounded-[28px] p-10 md:p-14 mb-10 flex flex-col relative mt-12">
                <div className="mb-10 text-left">
                  <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] tracking-wide">
                  Select a Plan
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-light max-w-xl leading-relaxed">
                  Choose a plan, manage your time, and stay on track.
                </p>
              </div>

              <div className="flex justify-center mb-10">
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-md border border-white/20 p-1">
                  <button 
                    onClick={() => setBillingCycle("monthly")}
                    className={billingCycle === "monthly" ? "bg-white text-black px-4 py-2 rounded-md text-sm font-semibold shadow-sm" : "text-white px-4 py-2 rounded-md text-sm font-medium hover:text-white/80 transition"}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle("yearly")}
                    className={billingCycle === "yearly" ? "bg-white text-black px-4 py-2 rounded-md text-sm font-semibold shadow-sm" : "text-white px-4 py-2 rounded-md text-sm font-medium hover:text-white/80 transition"}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto w-full items-center">
                
                <div className="bg-white text-black rounded-lg p-4 py-8 flex flex-col h-[90%]">
                  <h3 className="text-center font-bold text-xl mb-4">BASIC</h3>
                  <div className="text-center mb-6 flex items-start justify-center">
                    <span className="text-[20px] font-bold mt-2 mr-1">$</span>
                    <span className="text-[64px] font-extrabold leading-none tracking-tight">{billingCycle === "monthly" ? "50" : "600"}</span>
                    <span className="text-[14px] font-semibold text-black/60 mt-auto mb-2 ml-1">/ {billingCycle === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  <ul className="space-y-2 mb-2 text-sm font-medium text-black/70 px-4 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/40" /> List item
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setPlanSelected(true)}
                    className="w-full py-3.5 rounded-xl bg-[#8f00ff] text-white font-semibold hover:bg-[#8f00ff]/90 transition"
                  >
                    Select
                  </button>
                </div>

                <div className="bg-[#9c00ff] text-white rounded-[20px] p-8 flex flex-col relative scale-[1.02] shadow-2xl h-full border border-white/20">
                  <h3 className="text-center font-bold text-[1.35rem] mb-4 text-white">PRENIUM</h3> {/* Following typo in screenshot :) */}
                  <div className="text-center mb-8 flex items-start justify-center text-white">
                    <span className="text-[20px] font-bold mt-2 mr-1">$</span>
                    <span className="text-[64px] font-extrabold leading-none tracking-tight">{billingCycle === "monthly" ? "150" : "1800"}</span>
                    <span className="text-[14px] font-semibold text-white/80 mt-auto mb-2 ml-1">/ {billingCycle === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  <ul className="space-y-4 mb-10 text-[15px] font-medium text-white/90 px-4 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" /> List item
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setPlanSelected(true)}
                    className="w-full py-3.5 rounded-xl bg-[#00ff00] text-black font-bold hover:bg-[#00ff00]/90 transition"
                  >
                    Select
                  </button>
                </div>

                <div className="bg-white text-black rounded-lg p-4 py-8 flex flex-col h-[90%]">
                  <h3 className="text-center font-bold text-xl mb-4">VIP</h3>
                  <div className="text-center mb-6 flex items-start justify-center">
                    <span className="text-[20px] font-bold mt-2 mr-1">$</span>
                    <span className="text-[64px] font-extrabold leading-none tracking-tight">{billingCycle === "monthly" ? "250" : "3000"}</span>
                    <span className="text-[14px] font-semibold text-black/60 mt-auto mb-2 ml-1">/ {billingCycle === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  <ul className="space-y-2 mb-2 text-sm font-medium text-black/70 px-4 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/40" /> List item
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setPlanSelected(true)}
                    className="w-full py-3.5 rounded-xl bg-[#8f00ff] text-white font-semibold hover:bg-[#8f00ff]/90 transition"
                  >
                    Select
                  </button>
                </div>

              </div>
            </div>
            ) : (
              <div className="w-full max-w-[1100px] mb-10 flex flex-col relative mt-12">

                <div className="w-full bg-[#1a2060]/20 border border-white/50 backdrop-blur-sm rounded-[16px] p-6 lg:p-10 flex flex-col md:flex-row gap-8 shadow-xl relative overflow-hidden">

                  <div className="flex flex-col">
                    <div className="mb-10 text-left">
                      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] tracking-wide">
                        Programs
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl leading-relaxed">
                        Explore our specialised programs designed to support growth, performance, and development.
                      </p>
                    </div>

                    <div className="flex gap-6">
                      <div>
                        <Image src="/pricingComplete.png" alt="Stress Management" width={160} height={160} className="object-contain" />
                      </div>
                    
                    {/* Right Column content */}
                    <div className="flex flex-col flex-1 items-start text-left text-white/90 font-medium text-sm md:text-base leading-relaxed tracking-wide z-10 w-full lg:max-w-[70%]">
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">360 &deg; Stress Management</h2>
                      <p className="mb-4">
                        The programme offers smart and new ways of managing stress to overcome its
                        negative psychosocial impacts. Participants would be able to analyse and
                        develop 360&deg; coping strategies and action guide for managing chronic stress that
                        leads to problems in decision making, work attitudes and sabotage, work-life
                        balance, and overall health.
                      </p>
                      <p className="mb-6">
                        Specifically, our programme is designed as a holistic tool for participants&apos;
                        effective management of stress that is a known major trigger for many
                        problems that include: Anger management, chronic diseases, distress in thinking
                        and emotions, sleep disorders, career difficulties, relationship difficulties,
                        accidents, anxiety-related disorders, PTSD, forms of depression, vulnerability to
                        <br /><br />
                        drug use, failure to seek and utilise medical help, non-adherence to medical
                        advice and treatment, domestic and workplace violence, and sudden death.
                      </p>
                      
                      <button className="bg-[#00ff00] text-black px-8 py-2.5 rounded-[8px] font-semibold text-sm hover:bg-[#00ff00]/90 transition shadow-lg">
                        Access
                      </button>
                    </div>
                    </div>
                  </div>
                  
                  {/* Subtle lighting matching the backdrop card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </main>
  );
}
