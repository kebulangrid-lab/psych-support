"use client";

import Link from "next/link";
import Image from "next/image";

const sidebarLinks = [
  { name: "Profile",        icon: "/icons/profile.png",       path: "profile", roles: ["client", "admin"] },
  { name: "Programs",       icon: "/icons/programs.png",      path: "programs", roles: ["client", "admin"] },
  { name: "Time Table",     icon: "/icons/timeTable.png",     path: "time-table", roles: ["client", "admin"] },
  { name: "Resources",      icon: "/icons/resources.png",     path: "resources", roles: ["client", "admin"] },
  { name: "Track Learning", icon: "/icons/trackLearning.png", path: "track-learning", roles: ["client", "admin"] },
  { name: "Support",        icon: "/icons/support.png",       path: "support", roles: ["client", "admin"] },
];

interface SidebarProps {
  active?: string; // matches the name field
  role?: "client" | "admin";
}

export default function Sidebar({ active, role = "client" }: SidebarProps) {
  return (
    <div className="flex sm:flex-col">
      <aside className="fixed bottom-0 left-0 right-0 w-full z-50 flex flex-row items-center sm:top-0 sm:bottom-0 sm:right-auto sm:w-20 sm:flex-col sm:py-6">
        <div className="hidden sm:block h-12"></div>
        <div className="flex flex-row justify-around w-full px-2 py-4 sm:py-2 bg-white/5 backdrop-blur-md border-t sm:border-r sm:border-b border-white/50 sm:py-4 sm:rounded-t-none sm:rounded-tr-xl sm:rounded-br-xl sm:flex-col sm:gap-2 sm:mt-2">
          {sidebarLinks.filter(link => link.roles.includes(role)).map((link) => {
            const isActive = link.name === active;
            const href = `/${role}/${link.path}`;
            return (
              <Link
                key={link.name}
                href={href}
                className={`flex flex-col items-center justify-center sm:flex-none sm:w-[90%] mx-auto py-[10px] px-[10px] sm:flex-1 sm:px-0 sm:py-2 rounded-[5px] transition-all duration-300 group
                  ${isActive
                    ? "bg-white/30 border border-white/20"
                    : "hover:bg-white/10 border border-transparent"
                  }`}
              >
                <div className={`sm:mb-1 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110
                  ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
                >
                  <Image src={link.icon} alt={link.name} width={26} height={26} className="object-contain" />
                </div>
                <span className={`text-[9px] text-center leading-tight font-semibold transition-colors duration-300 hidden sm:block 
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
