"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaCreditCard, FaUniversity, FaChevronRight, FaLock, FaShieldAlt, FaHeadset } from "react-icons/fa";

export default function PaymentPage() {
  const router = useRouter();

  const handlePaymentComplete = () => {
    // Navigate back to programs and they would see "purchased" (simulated via local state or global context in real app)
    router.push("/client/programs");
  };

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
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-5 sm:p-8 md:p-10 mb-24 sm:mb-16 flex flex-col gap-4 sm:gap-6 min-h-[auto] sm:min-h-[600px]">

              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-lg tracking-wide">
                  Make Payment
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 font-light drop-shadow-md">
                  Choose a plan, manage your time, and stay on track.
                </p>
              </div>

              <div className="w-full bg-white text-black rounded-[12px] p-5 sm:p-6 md:p-8 flex flex-col shadow-2xl mt-2 max-w-3xl mx-auto">
                
                <h2 className="text-xl md:text-2xl font-bold mb-1">Select Payment Method</h2>
                <p className="text-gray-500 mb-6 font-medium text-xs sm:text-sm">Choose how you would like to complete your payment.</p>

                <div className="flex flex-col gap-4">
                  {/* Card Payment Option */}
                  <button 
                    onClick={handlePaymentComplete}
                    className="border-2 border-blue-500 rounded-xl p-4 sm:p-5 flex items-center justify-between hover:bg-blue-50/50 transition group"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500 text-2xl sm:text-3xl">
                        <FaCreditCard />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-base sm:text-lg mb-1">Card Payment</h3>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium">Pay securely using your debit or credit card.</p>
                        <div className="flex gap-2 mt-2">
                           {/* Placeholder for card logos like VISA, Mastercard, etc. */}
                           <div className="h-5 w-8 bg-blue-800 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VISA</div>
                           <div className="h-5 w-8 bg-orange-500 rounded flex items-center justify-center text-[7px] text-white font-bold">MasterCard</div>
                        </div>
                      </div>
                    </div>
                    <FaChevronRight className="text-blue-500 text-lg sm:text-xl group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Bank Transfer Option */}
                  <button 
                    onClick={handlePaymentComplete}
                    className="border-2 border-gray-200 rounded-xl p-4 sm:p-5 flex items-center justify-between hover:border-green-500 hover:bg-green-50/50 transition group"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-500 text-2xl sm:text-3xl">
                        <FaUniversity />
                      </div>
                      <div className="text-left flex-1 min-w-[200px]">
                        <h3 className="font-bold text-base sm:text-lg mb-1">Bank Transfer</h3>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium">Pay directly from your bank account.</p>
                      </div>
                    </div>
                    <FaChevronRight className="text-gray-400 group-hover:text-green-500 text-lg sm:text-xl group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Footer Security Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-6 flex-shrink-0 text-center text-gray-400 text-xl pt-0.5">
                      <FaLock />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm">Secure Payment</h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Your payment is 100% secure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 flex-shrink-0 text-center text-gray-400 text-xl pt-0.5">
                      <FaShieldAlt />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm">Encrypted</h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">SSL encrypted transaction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 flex-shrink-0 text-center text-gray-400 text-xl pt-0.5">
                      <FaHeadset />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm">24/7 Support</h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">We're here to help</p>
                    </div>
                  </div>
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