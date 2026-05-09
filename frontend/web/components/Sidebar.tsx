"use client";

import Link from "next/link";
import { 
  FaRegUser,
  FaLaptopCode, 
  FaRegCalendarAlt, 
  FaDownload, 
  FaBrain, 
  FaHeadset 
} from "react-icons/fa";

const sidebarLinks = [
  { name: "Profile",        icon: FaRegUser,         href: "#" },
  { name: "Programs",       icon: FaLaptopCode,      href: "#" },
  { name: "Time Table",     icon: FaRegCalendarAlt,  href: "#" },
  { name: "Resources",      icon: FaDownload,        href: "#" },
  { name: "Track Learning", icon: FaBrain,           href: "#" },
  { name: "Support",        icon: FaHeadset,         href: "#" },
];

interface SidebarProps {
  active?: string; // matches the name field
}

export default function Sidebar({ active }: SidebarProps) {
  return (
    <div className="flex flex-col">
      <aside className="fixed left-0 top-0 bottom-0 w-20 z-20 flex flex-col items-center py-6">
        <div className="h-12"></div>
        <div className="flex flex-col gap-2 mt-2 w-full px-2 bg-white/5 backdrop-blur-sm border-r border-t border-b border-white/50 py-4 rounded-tr-xl rounded-br-xl">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.name === active;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center w-full py-2 rounded-[16px] transition-all duration-300 group
                  ${isActive
                    ? "bg-white/20 border border-white/20"
                    : "hover:bg-white/10 border border-transparent"
                  }`}
              >
                <div className={`mb-1 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110
                  ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}
                >
                  <Icon size={22} />
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
