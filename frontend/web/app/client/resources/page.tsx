"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown, FaAngleUp, FaFilePdf, FaDownload } from "react-icons/fa";

export default function ClientResources() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [programs] = useState([
    { id: 1, name: "360 ° Stress Management", resources: [{ id: 101, name: "Stress Relief Guide" }] },
    { id: 2, name: "Psych-Support Program 2", resources: [] }
  ]);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/client-back.jpg"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a2060]/70" />
      </div>

      <div>
        {/* Sidebar */}
        <Sidebar active="Resources" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  Learning Resources
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Practical resources for continuous growth.
                </p>
              </div>

              {/* Accordion Container */}
              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
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
                          onClick={() => toggleExpand(prog.id)}
                        >
                          <span>{prog.name}</span>
                          {isExpanded ? <FaAngleUp className="text-[#1a1040]/70" /> : <FaAngleDown className="text-[#1a1040]/70" />}
                        </div>
                        
                        {isExpanded && (
                          <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-gray-200">
                            
                            {/* Resources List */}
                            {prog.resources.length > 0 ? (
                              <div className="flex flex-col gap-3 mt-2">
                                {prog.resources.map(res => (
                                  <div key={res.id} className="flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-3 w-[85%]">
                                      <FaFilePdf className="text-red-500 text-2xl flex-shrink-0" />
                                      <span className="font-semibold text-sm md:text-base break-words">{res.name}.pdf</span>
                                    </div>
                                    <button 
                                      className="text-blue-500 p-2 hover:bg-blue-50 rounded-md transition flex-shrink-0"
                                      title="Download Resource"
                                    >
                                      <FaDownload />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic text-sm mt-2">No resources available.</p>
                            )}

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-start items-center mt-2 mb-4 md:pl-2">
                <Link
                  href="/client/profile"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 sm:px-16 py-3 rounded-xl bg-[#1d2146] border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md"
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
