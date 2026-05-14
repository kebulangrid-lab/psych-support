"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown } from "react-icons/fa";

export default function AdminTrackLearning() {
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
        <Sidebar active="Track Learning" role="admin" />
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-8 pt-6 pb-0 flex flex-col justify-center">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-10 md:p-14 mb-16 flex flex-col gap-10 min-h-[600px]">
              
              {/* Heading */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  MANAGE PROGRAMS
                </h1>
                <p className="text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Add, edit, and manage course content in one place
                </p>
              </div>

              {/* Table Container */}
              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-8 md:p-12 relative flex flex-col flex-1">
                
                {/* Table Headers */}
                <div className="grid grid-cols-4 font-bold text-xl md:text-2xl mb-8">
                  <div>Program</div>
                  <div>Category</div>
                  <div>Duration</div>
                  <div>Status</div>
                </div>

                {/* Table Content */}
                <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
                  
                  {/* Left Column: Dropdowns */}
                  <div className="flex flex-col gap-4 w-full md:w-[65%]">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num} 
                        className="bg-[#f8f9fa] text-[#1a1040] px-6 py-4 rounded-xl flex justify-between items-center font-bold text-base md:text-lg shadow-sm cursor-pointer hover:bg-white transition"
                      >
                        <span>Pych-Support Program {num}</span>
                        <FaAngleDown className="text-[#1a1040]/70" />
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Action Buttons */}
                  <div className="flex flex-col gap-4 w-full md:w-[25%] md:pl-8">
                    <button className="w-full md:w-40 border border-[#1a1040]/70 rounded-[14px] py-2 px-4 font-bold text-sm hover:bg-[#1a1040]/10 transition text-[#1a1040]">
                      View details
                    </button>
                    <button className="w-full md:w-40 border border-[#1a1040]/70 rounded-[14px] py-2 px-4 font-bold text-sm hover:bg-[#1a1040]/10 transition text-[#1a1040]">
                      Edit
                    </button>
                    <button className="w-full md:w-40 border border-[#1a1040]/70 rounded-[14px] py-2 px-4 font-bold text-sm hover:bg-[#1a1040]/10 transition text-[#1a1040]">
                      Delete
                    </button>
                  </div>

                </div>

                {/* Bottom Center Button */}
                <div className="flex justify-center mt-16 md:mt-24">
                  <button className="bg-[#00ff00] text-[#1a1040] font-bold text-lg py-3.5 px-10 rounded-2xl hover:bg-[#00e600] transition shadow-md">
                    Add New Program
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
