"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/Toast";
import axios from "axios";

export default function ClientTrackLearning() {
  const { user, loading: authLoading, isEnrolled, isEnrolledLoading } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [enrolledPrograms, setEnrolledPrograms] = useState<any[]>([]);
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
        addToast("You must enroll in a program to track learning.", "error");
        router.push("/client/programs");
      }
      return;
    }
    
    const fetchEnrollments = async () => {
      try {
        const [progRes, enrollRes] = await Promise.all([
          axios.get("http://localhost:4000/api/programs"),
          axios.get(`http://localhost:4000/api/enrollments?client_id=${user.id}`)
        ]);

        const programs = progRes.data || [];
        const enrollments = enrollRes.data || [];

        const mapped = enrollments.map((e: any) => {
          const program = programs.find((p: any) => p.id === e.program_id);
          return {
            id: e.id,
            name: program ? program.title : `Program (${e.program_id})`,
            dateEnrolled: e.enrolled_at ? new Date(e.enrolled_at).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }) : "N/A"
          };
        });

        setEnrolledPrograms(mapped);
      } catch (err) {
        console.error("Error fetching learning track:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user, authLoading, isEnrolled, isEnrolledLoading, router, addToast]);

  if (authLoading || isEnrolledLoading || loading) {
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
        <Sidebar active="Track Learning" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          {/* Content */}
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  Enrolled Programs
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  View your currently enrolled programs.
                </p>
              </div>

              {/* Enrolled Programs Cards Area */}
              <div className="flex flex-col gap-4 w-full mt-4">
                {enrolledPrograms.length > 0 ? (
                  enrolledPrograms.map((prog) => (
                    <div 
                      key={prog.id} 
                      className="bg-white/90 rounded-xl p-5 sm:p-6 shadow-md border border-[#1a1040]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:bg-white"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1a1040] mb-2 sm:mb-0">{prog.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600 font-semibold whitespace-nowrap">Enrolled on: {prog.dateEnrolled}</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/10 border-2 border-dashed border-white/30 rounded-xl p-10 flex text-center justify-center items-center font-bold text-white/70">
                    You are not enrolled in any programs yet.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-start items-center mt-6 mb-4 md:pl-2">
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