"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaCloudUploadAlt, FaAngleDown, FaInfoCircle } from "react-icons/fa";

export default function AdminResources() {
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
        <Sidebar active="Resources" role="admin" />
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-8 pt-6 pb-0 flex flex-col justify-center">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-10 md:p-14 mb-16 flex flex-col gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  Upload Learning Resources
                </h1>
                <p className="text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Practical resources for continuous growth.
                </p>
              </div>

              {/* Main Two Column Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 items-start">
                
                {/* Left Column (Upload Icon & Back) */}
                <div className="flex flex-col items-center gap-12">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-white/40 border border-white/20 rounded-[3rem] flex items-center justify-center shadow-lg relative cursor-pointer hover:bg-white/50 transition">
                    <FaCloudUploadAlt className="text-6xl md:text-8xl text-[#1a1040]" />
                  </div>
                  
                  <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center justify-center px-12 py-3.5 rounded-xl bg-[#0d1520]/80 border border-white/30 text-white/90 font-semibold text-sm hover:bg-[#0d1520] hover:border-white/50 transition"
                  >
                    Back
                  </Link>
                </div>

                {/* Right Column (Form fields) */}
                <div className="flex flex-col gap-5 justify-center md:pt-10">
                  {/* Select Dropdowns */}
                  <div className="relative">
                    <select defaultValue="" className="appearance-none w-full bg-[#8c97a7] text-[#1a1040] font-semibold py-4 px-6 rounded-md outline-none cursor-pointer placeholder-[#1a1040]">
                      <option value="" disabled>Resource Name</option>
                      <option value="1">Resource 1</option>
                    </select>
                    <FaAngleDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#1a1040] pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select defaultValue="" className="appearance-none w-full bg-[#8c97a7] text-[#1a1040] font-semibold py-4 px-6 rounded-md outline-none cursor-pointer placeholder-[#1a1040]">
                      <option value="" disabled>Program</option>
                      <option value="1">Program 1</option>
                    </select>
                    <FaAngleDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#1a1040] pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select defaultValue="" className="appearance-none w-full bg-[#8c97a7] text-[#1a1040] font-semibold py-4 px-6 rounded-md outline-none cursor-pointer placeholder-[#1a1040]">
                      <option value="" disabled>Module</option>
                      <option value="1">Module 1</option>
                    </select>
                    <FaAngleDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#1a1040] pointer-events-none" />
                  </div>

                  {/* Description Box */}
                  <div className="bg-[#8c97a7] rounded-md p-6 mt-4 relative min-h-[140px]">
                    <div className="flex items-center gap-3 mb-2">
                      <FaInfoCircle className="text-red-600 text-xl" />
                      <span className="text-[#1a1040] font-bold text-lg">Insert Description</span>
                    </div>
                    <textarea 
                      className="w-full bg-transparent border-none outline-none text-[#1a1040]/70 placeholder-[#1a1040]/50 text-sm resize-none"
                      rows={3}
                      placeholder="Add a short description to your file"
                    ></textarea>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end mt-2">
                    <button className="bg-[#00ff00] text-[#1a1040] font-bold py-2 px-8 rounded-md hover:bg-[#00e600] transition shadow-md">
                      Save
                    </button>
                  </div>
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
