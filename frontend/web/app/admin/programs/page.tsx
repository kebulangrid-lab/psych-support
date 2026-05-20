"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import axios from "axios";
import { dataCache } from "@/lib/dataCache";

export default function AdminPrograms() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs from backend
  const fetchPrograms = async (force = false) => {
    if (!force) {
      const cached = dataCache.get("programs");
      if (cached) {
        setPrograms(cached);
        setLoading(false);
        return;
      }
    }
    try {
      const res = await axios.get("http://localhost:4000/api/programs");
      setPrograms(res.data);
      dataCache.set("programs", res.data);
    } catch (err) {
      console.error("Failed to fetch programs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleAddNewProgram = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/programs", {
        title: "New Program",
        description: "",
        price: 0
      });
      setPrograms([res.data, ...programs]);
      setExpandedId(res.data.id);
      dataCache.clear();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, updates: any) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/programs/${id}`, updates);
      setPrograms(programs.map(p => p.id === id ? res.data : p));
      dataCache.clear();
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program? This will delete all related schedule, resources and enrollments!")) return;
    try {
      await axios.delete(`http://localhost:4000/api/programs/${id}`);
      setPrograms(programs.filter(p => p.id !== id));
      setExpandedId(null);
      dataCache.clear();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/admin-back.png" alt="Background" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#0a350d]/30" />
      </div>

      <div>
        <Sidebar active="Programs" role="admin" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  MANAGE PROGRAMS
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Add, edit, and manage course content in one place
                </p>
              </div>

              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                {loading ? (
                  <p className="text-center font-bold">Loading programs...</p>
                ) : (
                  <div className="flex flex-col w-full gap-4 max-w-4xl mx-auto">
                    {programs.map((prog) => {
                      const isExpanded = expandedId === prog.id;
                      return (
                        <div key={prog.id} className="bg-[#f8f9fa] rounded-xl shadow-sm text-[#1a1040] overflow-hidden transition-all duration-300">
                          <div 
                            className="px-6 py-4 flex justify-between items-center font-bold text-base md:text-lg cursor-pointer hover:bg-white transition"
                            onClick={() => setExpandedId(isExpanded ? null : prog.id)}
                          >
                            <span>{prog.title || "New Program"}</span>
                            {isExpanded ? <FaAngleUp className="text-[#1a1040]/70" /> : <FaAngleDown className="text-[#1a1040]/70" />}
                          </div>
                          
                          {isExpanded && (
                            <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                              <input 
                                type="text" 
                                value={prog.title || ""}
                                onChange={(e) => setPrograms(programs.map(p => p.id === prog.id ? { ...p, title: e.target.value } : p))}
                                placeholder="Program Name"
                                className="w-full bg-white border border-[#1a1040]/10 rounded-xl px-4 py-3 outline-none focus:border-[#1a1040]/30 transition font-bold text-base md:text-lg"
                              />
                              <textarea 
                                value={prog.description || ""}
                                onChange={(e) => setPrograms(programs.map(p => p.id === prog.id ? { ...p, description: e.target.value } : p))}
                                placeholder="Add description" 
                                className="w-full bg-white border border-[#1a1040]/10 rounded-xl px-4 py-3 outline-none focus:border-[#1a1040]/30 transition min-h-[100px] resize-y font-semibold"
                              />
                              <div className="flex gap-4 mt-2">
                                  <button onClick={() => handleUpdate(prog.id, { title: prog.title, description: prog.description })} className="bg-[#00ff00] text-[#1a1040] px-8 py-2.5 rounded-xl font-bold hover:bg-[#00e600] transition shadow-sm">
                                    Save
                                  </button>
                                  <button onClick={() => handleDelete(prog.id)} className="bg-transparent border border-[#1a1040]/50 text-[#1a1040] px-8 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:border-red-500 hover:text-white transition shadow-sm">
                                    Delete
                                  </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-center mt-10 md:mt-24">
                  <button 
                    onClick={handleAddNewProgram}
                    className="bg-[#00ff00] text-[#1a1040] font-bold text-sm sm:text-lg py-3 sm:py-3.5 px-6 sm:px-10 rounded-xl sm:rounded-2xl hover:bg-[#00e600] transition shadow-md"
                  >
                    Add New Program
                  </button>
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
