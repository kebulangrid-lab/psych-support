"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import axios from "axios";
import { dataCache } from "@/lib/dataCache";

export default function AdminTimeTable() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (force = false) => {
    if (!force) {
      const cachedProgs = dataCache.get("programs");
      const cachedTimeTables = dataCache.get("time-tables");
      if (cachedProgs && cachedTimeTables) {
        const grouped = cachedProgs.map((p: any) => ({
          id: p.id,
          name: p.title || p.name || `Program ${p.id}`,
          timeTable: cachedTimeTables.filter((t: any) => t.program_id === p.id)
        }));
        setPrograms(grouped);
        setLoading(false);
        return;
      }
    }
    try {
      const [progRes, timeRes] = await Promise.all([
        axios.get("http://localhost:4000/api/programs"),
        axios.get("http://localhost:4000/api/time-tables")
      ]);
      
      const progs = progRes.data;
      const tables = timeRes.data;
      dataCache.set("programs", progs);
      dataCache.set("time-tables", tables);

      const grouped = progs.map((p: any) => ({
        id: p.id,
        name: p.title || p.name || `Program ${p.id}`,
        timeTable: tables.filter((t: any) => t.program_id === p.id)
      }));

      setPrograms(grouped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleUpdate = (progId: string, entryId: string, field: string, value: string) => {
    setPrograms(programs.map(p => {
      if (p.id === progId) {
        return {
          ...p,
          timeTable: p.timeTable.map((entry: any) => 
            entry.id === entryId ? { ...entry, [field]: value, _isDirty: true } : entry
          )
        };
      }
      return p;
    }));
  };

  const handleAddNew = (progId: string) => {
    setPrograms(programs.map(p => {
      if (p.id === progId) {
        return {
          ...p,
          timeTable: [
            ...p.timeTable, 
            { id: `new_${Date.now()}`, program_id: progId, date: "", time: "", topic: "", link: "", _isNew: true }
          ]
        };
      }
      return p;
    }));
  };

  const handleDelete = async (progId: string, entryId: string) => {
    if (!entryId.startsWith('new_')) {
      try {
        await axios.delete(`http://localhost:4000/api/time-tables/${entryId}`);
        dataCache.clear();
      } catch (err) {
        console.error(err);
        return;
      }
    }
    setPrograms(programs.map(p => {
      if (p.id === progId) {
        return { ...p, timeTable: p.timeTable.filter((e: any) => e.id !== entryId) };
      }
      return p;
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      for (const p of programs) {
        for (const t of p.timeTable) {
          const payload = {
            program_id: p.id,
            date: t.date,
            time: t.time,
            topic: t.topic,
            link: t.link
          };
          if (t._isNew) {
            await axios.post("http://localhost:4000/api/time-tables", payload);
          } else if (t._isDirty) {
            await axios.patch(`http://localhost:4000/api/time-tables/${t.id}`, payload);
          }
        }
      }
      dataCache.clear();
      await fetchData(true);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/admin-back.png" alt="Background" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#0a350d]/30" />
      </div>

      <div>
        <Sidebar active="Time Table" role="admin" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10">
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                    Time Table
                  </h1>
                  <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                    Practical resources for continuous growth.
                  </p>
                </div>
                {!isEditing && !loading && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 rounded-xl bg-[#0d3454]/60 border border-white/30 text-white font-semibold text-sm hover:bg-[#0d3454]/80 hover:border-white/50 transition self-start md:mt-4"
                  >
                    Edit Time Table
                  </button>
                )}
              </div>

              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                <div className="flex flex-col w-full gap-4 max-w-4xl mx-auto">
                  {loading ? (
                    <p className="text-center font-bold text-lg">Loading timetables...</p>
                  ) : programs.length > 0 ? (
                    programs.map((prog) => {
                      const isExpanded = expandedId === prog.id;
                      return (
                        <div key={prog.id} className="bg-[#f8f9fa] rounded-xl shadow-sm text-[#1a1040] overflow-hidden transition-all duration-300 border border-gray-200">
                          <div className="px-6 py-4 flex justify-between items-center font-bold text-base md:text-lg cursor-pointer hover:bg-white transition" onClick={() => toggleExpand(prog.id)}>
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
                                          {isEditing ? (
                                            <>
                                              <div className="pr-2"><input type="text" value={row.date || ""} onChange={(e) => handleUpdate(prog.id, row.id, 'date', e.target.value)} className="w-full bg-white border border-[#1a1040]/20 rounded px-2 py-1.5 outline-none text-[#1a1040] focus:border-[#1a1040]/50 transition" placeholder="Date" /></div>
                                              <div className="pr-2"><input type="text" value={row.time || ""} onChange={(e) => handleUpdate(prog.id, row.id, 'time', e.target.value)} className="w-full bg-white border border-[#1a1040]/20 rounded px-2 py-1.5 outline-none text-[#1a1040] focus:border-[#1a1040]/50 transition" placeholder="Time" /></div>
                                              <div className="pr-2"><input type="text" value={row.topic || ""} onChange={(e) => handleUpdate(prog.id, row.id, 'topic', e.target.value)} className="w-full bg-white border border-[#1a1040]/20 rounded px-2 py-1.5 outline-none text-[#1a1040] focus:border-[#1a1040]/50 transition" placeholder="Topic" /></div>
                                              <div className="pr-2 flex gap-2">
                                                <input type="text" value={row.link || ""} onChange={(e) => handleUpdate(prog.id, row.id, 'link', e.target.value)} className="w-full bg-white border border-[#1a1040]/20 rounded px-2 py-1.5 outline-none text-[#1a1040] focus:border-[#1a1040]/50 transition" placeholder="Link" />
                                                <button onClick={() => handleDelete(prog.id, row.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 rounded shadow transition text-xs font-bold shrink-0">Del</button>
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="opacity-80 pr-2 truncate">{row.date}</div>
                                              <div className="opacity-80 pr-2 truncate">{row.time}</div>
                                              <div className="opacity-80 pr-2 break-words whitespace-normal">{row.topic}</div>
                                              <div className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition break-all whitespace-normal pr-2">
                                                {row.link && <a href={row.link.startsWith('http') ? row.link : `https://${row.link}`} target="_blank" rel="noreferrer">{row.link}</a>}
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      ))
                                    ) : (
                                      <div className="py-6 flex flex-col items-center gap-4">
                                        <p className="text-gray-500 italic text-sm">No schedule created for this program.</p>
                                        {!isEditing && (
                                          <button
                                            onClick={() => {
                                              setIsEditing(true);
                                              handleAddNew(prog.id);
                                            }}
                                            className="px-4 py-2 bg-[#1a1040] text-white font-bold text-sm rounded-lg hover:bg-[#1a1040]/80 transition shadow-sm cursor-pointer"
                                          >
                                            + Create Timetable
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {isEditing && (
                                <button onClick={() => handleAddNew(prog.id)} className="mt-4 bg-[#1a1040] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1a1040]/80 transition shadow-sm w-fit text-sm">
                                  + Add New Entry
                                </button>
                              )}

                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center italic">No programs available yet.</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12 mb-4">
                <Link href="/admin/profile" className="w-full sm:w-auto inline-flex items-center justify-center px-10 sm:px-16 py-3 rounded-xl bg-[#0d1520]/80 border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md">
                  Back
                </Link>
                {isEditing && (
                  <button onClick={handleSave} className="w-full sm:w-auto inline-flex items-center justify-center px-10 sm:px-16 py-3 rounded-xl bg-[#00ff00] text-[#1a1040] font-bold text-sm hover:bg-[#00e600] transition shadow-md">
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                )}
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