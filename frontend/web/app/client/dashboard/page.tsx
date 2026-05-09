import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";

export default function ClientDashboard() {
  const quickLinks = [
    { label: "View Programs",              href: "#" },
    { label: "Time table & Live class Links", href: "#" },
    { label: "Download Resources",         href: "#" },
    { label: "Download Resources",         href: "#" },
  ];

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 z-0">
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
        <div className="flex-1 ml-[80px] z-10 flex flex-col min-h-screen">

          {/* Top Bar */}
          <div className="w-full flex justify-end items-center px-8 pt-6 pb-0">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 w-full max-w-sm shadow-lg">
              <FaSearch className="text-white/60 flex-shrink-0" size={14} />
              <input
                type="text"
                placeholder="Filter by module or program"
                className="bg-transparent text-white/80 placeholder-white/50 text-sm outline-none w-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 pt-8 pb-0 flex flex-col">

            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-sm rounded-[28px] p-10 md:p-14 flex flex-col gap-10">

              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-5">
                  My Dashboard
                </h1>
                <p className="text-base md:text-xl text-white/85 font-light max-w-md leading-relaxed">
                  Track your progress,<br />
                  manage your courses and stay on top of your<br />
                  learning goals..
                </p>
              </div>

              {/* Quick Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {quickLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center justify-center px-6 py-4 rounded-2xl bg-[#0d1040]/60 border border-white/30 text-white/90 font-semibold text-sm md:text-base hover:bg-[#0d1040]/80 hover:border-white/40"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Back Button */}
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-10 py-3.5 rounded-2xl bg-[#0d1040]/60 border border-white/30 text-white/90 font-semibold text-sm hover:bg-[#0d1040]/80 hover:border-white/40 "
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
