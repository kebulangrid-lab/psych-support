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

export default function ClientDashboard() {
  const { user, loading: authLoading, isEnrolled, isEnrolledLoading, signOut } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const redirectingRef = useRef(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    if (authLoading || isEnrolledLoading) return;
    if (!user) {
      router.push("/client/sign-in");
      return;
    }

    if (!isEnrolled) {
      if (!redirectingRef.current) {
        redirectingRef.current = true;
        addToast("You must enroll in a program to access your dashboard.", "error");
        router.push("/client/programs");
      }
      return;
    }
  }, [user, authLoading, isEnrolled, isEnrolledLoading, router, addToast]);

  const quickLinks = [
    { label: "View Programs",                 href: "/client/programs" },
    { label: "Time table & Live class Links", href: "/client/time-table" },
    { label: "Track Learning",                href: "/client/track-learning" },
    { label: "Download Resources",            href: "/client/resources" },
  ];

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
        <Sidebar active="Profile" />
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
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-2 sm:mb-4">
                  My Dashboard
                </h1>
                <p className="text-sm sm:text-sm sm:text-base md:text-xl text-white/90 font-light max-w-sm leading-relaxed">
                  Track your progress,<br />
                  manage your courses and stay on top of your<br />
                  learning goals..
                </p>
              </div>

              {/* Quick Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 w-full max-w-3xl mx-auto mt-2 sm:mt-4">
                {quickLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0d1040]/60 border border-white/30 text-white/90 hover:border-white/50 hover:bg-[#0d1040]/80 transition text-center text-xs sm:text-sm md:text-base font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Log Out Button */}
              <div className="mt-8 sm:mt-16">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 sm:px-10 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#0d1040]/60 border border-white/30 text-white/90 font-semibold text-xs sm:text-sm hover:bg-[#0d1040]/80 hover:border-white/40 transition cursor-pointer disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    "Log Out"
                  )}
                </button>
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
