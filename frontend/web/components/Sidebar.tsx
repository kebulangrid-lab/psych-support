"use client";

import Link from "next/link";
import Image from "next/image";

const sidebarLinks = [
  { name: "Profile",        icon: "/icons/profile.png",       path: "dashboard" },
  { name: "Programs",       icon: "/icons/programs.png",      path: "pricing" },
  { name: "Time Table",     icon: "/icons/timeTable.png",     path: "time-table" },
  { name: "Resources",      icon: "/icons/resources.png",     path: "resources" },
  { name: "Track Learning", icon: "/icons/trackLearning.png", path: "track-learning" },
  { name: "Support",        icon: "/icons/support.png",       path: "support" },
];

interface SidebarProps {
  active?: string; // matches the name field
  role?: "client" | "admin";
}

export default function Sidebar({ active, role = "admin" }: SidebarProps) {
  return (
    <div className="flex flex-col">
      <aside className="fixed left-0 top-0 bottom-0 w-20 z-20 flex flex-col items-center py-6">
        <div className="h-12"></div>
        <div className="flex flex-col gap-2 mt-2 w-full px-2 bg-white/5 backdrop-blur-sm border-r border-t border-b border-white/50 py-4 rounded-tr-xl rounded-br-xl">
          {sidebarLinks.map((link) => {
            const isActive = link.name === active;
            const href = `/${role}/${link.path}`;
            return (
              <Link
                key={link.name}
                href={href}
                className={`flex flex-col items-center justify-center w-[90%] mx-auto py-2 rounded-[5px] transition-all duration-300 group
                  ${isActive
                    ? "bg-white/30 border border-white/20"
                    : "hover:bg-white/10 border border-transparent"
                  }`}
              >
                <div className={`mb-1 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110
                  ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
                >
                  <Image src={link.icon} alt={link.name} width={22} height={22} className="object-contain" />
                </div>
                <span className={`text-[9px] text-center leading-tight font-semibold transition-colors duration-300
                  ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
