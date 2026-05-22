"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaPhoneAlt, FaCopy, FaCheck } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/navigation";

export default function ClientSupport() {
  const { user, loading: authLoading, isEnrolled, isEnrolledLoading } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [numbers, setNumbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (authLoading || isEnrolledLoading) return;
    if (!user) {
      router.push("/client/sign-in");
      return;
    }

    if (!isEnrolled) {
      if (!redirectingRef.current) {
        redirectingRef.current = true;
        addToast("You must enroll in a program to access support details.", "error");
        router.push("/client/programs");
      }
      return;
    }

    const fetchSupportAndEnrollments = async () => {
      try {
        const [supportRes, enrollmentsRes] = await Promise.all([
          axios.get("https://psych-support-1.onrender.com/api/support"),
          axios.get(`https://psych-support-1.onrender.com/api/enrollments?client_id=${user.id}`)
        ]);

        const mapped = (supportRes.data || []).map((num: any) => ({
          id: num.id,
          value: num.phone_number || num.value || ""
        }));
        setNumbers(mapped);
      } catch (err) {
        console.error("Failed to fetch support and enrollments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupportAndEnrollments();
  }, [user, authLoading, isEnrolled, isEnrolledLoading, router, addToast]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (authLoading || isEnrolledLoading) {
    return (
      <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-lg">Checking dashboard access...</p>
        </div>
      </main>
    );
  }

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
        <Sidebar active="Support" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          
          {/* Top Bar spacing to match other pages */}
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-8 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  Support
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  How can we help you today?
                </p>
              </div>

              {/* Support Container */}
              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                <div className="flex flex-col w-full gap-4 max-w-2xl mx-auto">
                  
                  {/* Numbers List */}
                  {loading ? (
                    <p className="text-center font-bold text-lg text-[#1a1040]">Loading support numbers...</p>
                  ) : numbers.length > 0 ? (
                    numbers.map((num) => (
                      <div key={num.id} className="bg-[#f8f9fa] rounded-xl shadow-sm text-[#1a1040] p-4 flex justify-between items-center transition">
                        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                          <div className="p-2 sm:p-3 bg-[#1a1040]/10 rounded-full flex-shrink-0">
                            <FaPhoneAlt className="text-[#1a1040] text-sm sm:text-lg" />
                          </div>
                          <span className="font-bold text-base sm:text-xl truncate">{num.value}</span>
                        </div>
                        <button 
                          onClick={() => handleCopy(num.id, num.value)} 
                          className="text-[#1a1040] p-2 sm:p-3 hover:bg-[#1a1040]/10 rounded-lg transition border border-transparent flex-shrink-0" 
                          title="Copy Number"
                        >
                          {copiedId === num.id ? <FaCheck className="text-green-600 text-lg" /> : <FaCopy className="text-lg" />}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#1a1040]/80 italic text-center py-6 font-medium">Support numbers will be available soon.</p>
                  )}

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
