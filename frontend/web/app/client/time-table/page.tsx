"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/Toast";

export default function TimeTablePage() {
  const router = useRouter();
  const { user, loading: authLoading, isEnrolled, isEnrolledLoading } = useAuth();
  const { addToast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [programs, setPrograms] = useState<any[]>([]);
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
        addToast("You must enroll in a program to view timetables.", "error");
        router.push("/client/programs");
      }
      return;
    }
    fetchData();
  }, [user, authLoading, isEnrolled, isEnrolledLoading]);

  const fetchData = async () => {
    if (!user) return;
    try {
      const [progRes, enrollRes, timeRes] = await Promise.all([
        axios.get("http://localhost:4000/api/programs"),
        axios.get(`http://localhost:4000/api/enrollments?client_id=${user.id}`),
        axios.get(`http://localhost:4000/api/time-tables?client_id=${user.id}`)
      ]);
      
      const progs = progRes.data || [];
      const enrollments = enrollRes.data || [];
      const tables = timeRes.data || [];

      // Only show programs client is enrolled in
      const enrolledProgs = progs.filter((p: any) => 
        enrollments.some((e: any) => e.program_id === p.id)
      );

      const grouped = enrolledProgs.map((p: any) => ({
        id: p.id,
        name: p.title || p.name || `Program ${p.id}`,
        timeTable: tables.filter((t: any) => t.program_id === p.id)
      }));

      setPrograms(grouped);
    } catch (err) {
      console.error(err);
      addToast("Failed to load timetables.", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
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
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a2060]/70" />
      </div>

      <div>
        {/* Sidebar */}
        <Sidebar active="Time Table" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          {/* Top Bar spacing to match other pages */}
          <div className="w-full flex justify-end items-center px-8 pt-6 pb-0 min-h-[60px]">
          </div>

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  Time Table
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Track your timetable, manage your courses, and stay on top of your learning goals.
                </p>
              </div>

              {/* Accordion Container */}
              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                <div className="flex flex-col w-full gap-4 max-w-4xl mx-auto">
                  {loading ? (
                    <p className="text-center font-bold text-lg text-[#1a1040]">Loading timetables...</p>
                  ) : programs.length > 0 ? (
                    programs.map((prog) => {
                      const isExpanded = expandedId === prog.id;
                      return (
                        <div 
                          key={prog.id} 
                          className="bg-[#f8f9fa] rounded-xl shadow-sm text-[#1a1040] overflow-hidden transition-all duration-300 border border-gray-200"
                        >
                          <div 
                            className="px-6 py-4 flex justify-between items-center font-bold text-base md:text-lg cursor-pointer hover:bg-white transition"
                            onClick={() => toggleExpand(prog.id)}
                          >
                            <span>{prog.name}</span>
                            {isExpanded ? <FaAngleUp className="text-[#1a1040]/70" /> : <FaAngleDown className="text-[#1a1040]/70" />}
                          </div>
                          
                          {isExpanded && (
                            <div className="px-4 sm:px-6 pb-6 pt-2 flex flex-col border-t border-gray-200">
                              
                              <div className="w-full rounded-xl overflow-x-auto mt-2">
                                <div className="min-w-[600px]">
                                  <div className="grid grid-cols-4 px-2 py-3 border-b border-[#1a1040]/20">
                                    <div className="font-bold text-sm sm:text-base">Date</div>
                                    <div className="font-bold text-sm sm:text-base">Time</div>
                                    <div className="font-bold text-sm sm:text-base">Topic</div>
                                    <div className="font-bold text-sm sm:text-base">Live link</div>
                                  </div>
                                  <div className="flex flex-col">
                                    {prog.timeTable && prog.timeTable.length > 0 ? (
                                      prog.timeTable.map((row: any) => (
                                        <div key={row.id} className="grid grid-cols-4 px-2 py-3 font-medium text-sm border-b border-[#1a1040]/10 last:border-0 items-center">
                                          <div className="opacity-80 pr-2 truncate">{row.date}</div>
                                          <div className="opacity-80 pr-2 truncate">{row.time}</div>
                                          <div className="opacity-80 pr-2 break-words whitespace-normal">{row.topic}</div>
                                          <div className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition break-all whitespace-normal pr-2">
                                            {row.link && (
                                              <a href={row.link.startsWith('http') ? row.link : `https://${row.link}`} target="_blank" rel="noreferrer">
                                                {row.link}
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-gray-500 italic text-sm py-4">No schedule available for this program.</p>
                                    )}
                                  </div>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center italic mt-4 font-bold text-lg text-[#1a1040]">No programs found.</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12 mb-4">
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
