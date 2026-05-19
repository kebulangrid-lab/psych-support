"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function AdminPrograms() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [programs, setPrograms] = useState([
    { id: 1, name: "360 ° Stress Management" },
    { id: 2, name: "Psych-Support Program 2" }
  ]);

  const handleAddNewProgram = () => {
    const newId = Date.now();
    setPrograms([...programs, { id: newId, name: "" }]);
    setExpandedId(newId);
  };

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
        <Sidebar active="Programs" role="admin" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  MANAGE PROGRAMS
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Add, edit, and manage course content in one place
                </p>
              </div>

              {/* Table Container */}
              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                

                {/* Table Content */}
                <div className="flex flex-col w-full gap-4 max-w-4xl mx-auto">
                  {programs.map((prog) => {
                    const isExpanded = expandedId === prog.id;
                    return (
                      <div 
                        key={prog.id} 
                        className="bg-[#f8f9fa] rounded-xl shadow-sm text-[#1a1040] overflow-hidden transition-all duration-300"
                      >
                        <div 
                          className="px-6 py-4 flex justify-between items-center font-bold text-base md:text-lg cursor-pointer hover:bg-white transition"
                          onClick={() => setExpandedId(isExpanded ? null : prog.id)}
                        >
                          <span>{prog.name || "New Program"}</span>
                          {isExpanded ? <FaAngleUp className="text-[#1a1040]/70" /> : <FaAngleDown className="text-[#1a1040]/70" />}
                        </div>
                        
                        {isExpanded && (
                          <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                            <input 
                              type="text" 
                              defaultValue={prog.name}
                              placeholder="Program Name"
                              className="w-full bg-white border border-[#1a1040]/10 rounded-xl px-4 py-3 outline-none focus:border-[#1a1040]/30 transition font-bold text-base md:text-lg"
                            />
                            <input 
                              type="text" 
                              placeholder="Upload Live Link" 
                              className="w-full bg-white border border-[#1a1040]/10 rounded-xl px-4 py-3 outline-none focus:border-[#1a1040]/30 transition font-semibold"
                            />
                            <textarea 
                              placeholder="Add description" 
                              className="w-full bg-white border border-[#1a1040]/10 rounded-xl px-4 py-3 outline-none focus:border-[#1a1040]/30 transition min-h-[100px] resize-y font-semibold"
                            />
                            <div className="flex gap-4 mt-2">
                                <button className="bg-[#00ff00] text-[#1a1040] px-8 py-2.5 rounded-xl font-bold hover:bg-[#00e600] transition shadow-sm">
                                  Save
                                </button>
                                <button className="bg-transparent border border-[#1a1040]/50 text-[#1a1040] px-8 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:border-red-500 hover:text-white transition shadow-sm">
                                  Delete
                                </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Center Button */}
                <div className="flex justify-center mt-10 md:mt-24">
                  <button 
                    onClick={handleAddNewProgram}
                    className="bg-[#00ff00] text-[#1a1040] font-bold text-sm sm:text-lg py-3 sm:py-3.5 px-6 sm:px-10 rounded-xl sm:rounded-2xl hover:bg-[#00e600] transition shadow-md"
                  >
                    Add New Program
                  </button>
                </div>

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
