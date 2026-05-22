"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown, FaAngleUp, FaFilePdf, FaDownload } from "react-icons/fa";
import axios from "axios";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/components/AuthProvider";

export default function ClientResources() {
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
        addToast("You must enroll in a program to view resources.", "error");
        router.push("/client/programs");
      }
      return;
    }
    fetchData();
  }, [user, authLoading, isEnrolled, isEnrolledLoading]);

  const fetchData = async () => {
    if (!user) return;
    try {
      const [progRes, enrollRes, resRes] = await Promise.all([
        axios.get("http://localhost:4000/api/programs"),
        axios.get(`http://localhost:4000/api/enrollments?client_id=${user.id}`),
        axios.get(`http://localhost:4000/api/resources?client_id=${user.id}`)
      ]);
      
      const progs = progRes.data || [];
      const enrollments = enrollRes.data || [];
      const allResources = resRes.data || [];

      // Filter programs to only enrolled ones
      const enrolledProgs = progs.filter((p: any) => 
        enrollments.some((e: any) => e.program_id === p.id)
      );

      const grouped = enrolledProgs.map((p: any) => ({
        id: p.id,
        name: p.title || p.name || `Program ${p.id}`,
        resources: allResources.filter((r: any) => r.program_id === p.id)
      }));

      setPrograms(grouped);
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch learning resources.", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      addToast("Downloading resource...", "info");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      addToast("Download completed!", "success");
    } catch (err) {
      console.error("Download error:", err);
      addToast("Failed to download PDF. Please try again.", "error");
    }
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
                  {loading ? (
                    <p className="text-center font-bold text-lg">Loading resources...</p>
                  ) : programs.length > 0 ? (
                    programs.map((prog) => {
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
                              {prog.resources && prog.resources.length > 0 ? (
                                <div className="flex flex-col gap-3 mt-2">
                                  {prog.resources.map((res: any) => (
                                    <div key={res.id} className="flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm">
                                      <div className="flex items-center gap-3 w-[85%]">
                                        <FaFilePdf className="text-red-500 text-2xl flex-shrink-0" />
                                        <span className="font-semibold text-sm md:text-base break-words">
                                          {res.title || res.name || 'Resource'}.pdf
                                        </span>
                                      </div>
                                      <button 
                                        onClick={() => handleDownload(res.cloudinary_url, `${res.title || 'Resource'}.pdf`)}
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
                    })
                  ) : (
                    <p className="text-center italic mt-4 font-bold text-lg">No programs found.</p>
                  )}
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
