"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";

export default function AdminTrackLearning() {
  const dummyPayments = [
    { id: 1, name: "Student name", program: "360 ° Stress Management", amount: "₦120k", date: "Oct 12, 2023" },
    { id: 2, name: "Jane Doe", program: "Psych-Support Basic", amount: "₦50k", date: "Nov 01, 2023" },
    { id: 3, name: "John Smith", program: "Advanced Counseling", amount: "₦75k", date: "Nov 15, 2023" },
  ];

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
        <Sidebar active="Track Learning" role="admin" />
        <div className="flex-1 sm:ml-[80px] relative z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  Manage Payments
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md max-w-xl leading-relaxed">
                  Monitor transactions, pending payments, and manage<br/>student access
                </p>
              </div>

              {/* Stats & Search */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
                <div className="grid grid-cols-2 md:flex gap-4 md:gap-6 w-full md:w-auto">
                  {/* Stat Card 1 */}
                  <div className="bg-[#8c97a7] text-[#1a1040] rounded-xl p-4 sm:p-5 w-full md:w-48 font-bold flex flex-col justify-between h-[100px] sm:h-[120px] shadow-md border border-white/20">
                    <div className="text-sm sm:text-lg leading-tight">Total<br/>Revenue</div>
                    <div className="text-lg sm:text-[20px] opacity-80 mt-1 font-extrabold">₦857k</div>
                  </div>
                  {/* Stat Card 2 */}
                  <div className="bg-[#8c97a7] text-[#1a1040] rounded-xl p-4 sm:p-5 w-full md:w-48 font-bold flex flex-col justify-between h-[100px] sm:h-[120px] shadow-md border border-white/20">
                    <div className="text-sm sm:text-lg leading-tight">Payments<br/>Received</div>
                    <div>
                      <div className="text-lg sm:text-xl leading-none">7</div>
                      <div className="text-[10px] sm:text-xs font-semibold opacity-70 mt-1">Of 12 students</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="w-full bg-[#8c97a7] rounded-xl min-h-[350px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 relative flex flex-col">
                
                {/* Table Headers */}
                <div className="hidden md:grid grid-cols-4 items-center font-bold text-lg md:text-xl mb-6 border-b border-[#1a1040]/10 pb-4">
                  <div>Name</div>
                  <div>Program/Plan</div>
                  <div>Amount</div>
                  <div>Date</div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col gap-4 md:gap-6 w-full mt-2 md:mt-0">
                  {dummyPayments.map((payment) => (
                    <div key={payment.id} className="bg-white/40 md:bg-transparent rounded-xl p-4 md:p-0 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 items-start border-b border-[#1a1040]/10 md:pb-6 w-full last:border-0 last:pb-0 shadow-sm md:shadow-none">
                      
                      <div className="flex flex-col gap-2 md:gap-4 order-1 md:order-none pb-2 md:pb-0 border-b border-[#1a1040]/5 md:border-0">
                        <span className="opacity-90 font-bold md:font-medium text-lg md:text-xl text-[#1a1040]">{payment.name}</span>
                        <button className="hidden md:block border border-[#1a1040]/70 rounded-[10px] px-4 py-1.5 text-[14px] font-semibold hover:bg-[#1a1040]/10 bg-transparent transition w-fit text-[#1a1040]">
                          Download receipt
                        </button>
                      </div>

                      <div className="flex flex-col md:block order-2 md:order-none">
                        <span className="md:hidden font-bold text-[11px] uppercase tracking-wider opacity-60 mb-0.5 text-[#1a1040]">Program/Plan</span>
                        <span className="opacity-90 font-semibold md:font-medium text-[15px] md:text-base text-[#1a1040]">{payment.program}</span>
                      </div>

                      {/* Mobile: Amount & Date together */}
                      <div className="flex justify-between items-center md:hidden order-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-[11px] uppercase tracking-wider opacity-60 mb-0.5 text-[#1a1040]">Amount</span>
                          <span className="opacity-90 font-bold text-[15px] text-[#1a1040]">{payment.amount}</span>
                        </div>
                        <div className="flex flex-col text-right">
                           <span className="font-bold text-[11px] uppercase tracking-wider opacity-60 mb-0.5 text-[#1a1040]">Date</span>
                           <span className="opacity-90 font-semibold text-[15px] text-[#1a1040]">{payment.date}</span>
                        </div>
                      </div>

                      {/* Desktop: Amount */}
                      <div className="hidden md:block order-none">
                        <span className="opacity-90 font-medium text-base text-[#1a1040]">{payment.amount}</span>
                      </div>

                      {/* Desktop: Date */}
                      <div className="hidden md:block order-none">
                         <span className="opacity-90 font-medium text-base text-[#1a1040]">{payment.date}</span>
                      </div>

                      <div className="mt-3 md:hidden order-4 md:order-none w-full">
                        <button className="border border-[#1a1040]/30 bg-white/60 rounded-[10px] px-4 py-2.5 text-[14px] font-bold hover:bg-[#1a1040]/10 transition w-full text-[#1a1040] text-center shadow-sm">
                          Download receipt
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-2 md:mt-4 w-full">
                <Link
                  href="/admin/profile"
                  className="flex sm:inline-flex items-center justify-center px-16 py-3.5 sm:py-3 rounded-2xl bg-[#0d1520]/80 border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md w-full sm:w-auto"
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
