"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaAngleDown, FaAngleUp, FaFilePdf, FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { dataCache } from "@/lib/dataCache";
import { useToast } from "@/components/Toast";

export default function AdminResources() {
  const { addToast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [newResourceName, setNewResourceName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (force = false) => {
    if (!force) {
      const cachedProgs = dataCache.get("programs");
      const cachedResources = dataCache.get("resources");
      if (cachedProgs && cachedResources) {
        const grouped = cachedProgs.map((p: any) => ({
          id: p.id,
          name: p.title || p.name || `Program ${p.id}`,
          resources: cachedResources.filter((r: any) => r.program_id === p.id)
        }));
        setPrograms(grouped);
        setLoading(false);
        return;
      }
    }
    try {
      const [progRes, resRes] = await Promise.all([
        axios.get("http://localhost:4000/api/programs"),
        axios.get("http://localhost:4000/api/resources")
      ]);

      const progs = progRes.data;
      const allResources = resRes.data;
      dataCache.set("programs", progs);
      dataCache.set("resources", allResources);

      const grouped = progs.map((p: any) => ({
        id: p.id,
        name: p.title || p.name || `Program ${p.id}`,
        resources: allResources.filter((r: any) => r.program_id === p.id)
      }));

      setPrograms(grouped);
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch resources.", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
    setUploadingFor(null);
    setNewResourceName("");
  };

  const handleDeleteResource = async (progId: string, resId: string) => {
    setDeletingId(resId);
    try {
      await axios.delete(`http://localhost:4000/api/resources/${resId}`);
      dataCache.clear();
      setPrograms(programs.map(p => {
        if (p.id === progId) {
          return { ...p, resources: p.resources.filter((r: any) => r.id !== resId) };
        }
        return p;
      }));
      addToast("Resource deleted successfully.", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to delete resource.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const triggerFileSelect = () => {
    if (!newResourceName.trim()) {
      addToast("Please enter a resource name first.", "error");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, progId: string) => {
    const file = e.target.files?.[0];
    if (file && newResourceName.trim()) {
      setIsUploading(true);
      // Create FormData properly
      const formData = new FormData();
      formData.append('file', file);
      formData.append('program_id', progId);
      formData.append('title', newResourceName);

      try {
        const res = await axios.post("http://localhost:4000/api/resources", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        dataCache.clear();
        setPrograms(programs.map(p => {
          if (p.id === progId) {
            return { ...p, resources: [...p.resources, res.data] };
          }
          return p;
        }));
        addToast("Upload successful!", "success");
      } catch (err) {
        console.error(err);
        addToast("Upload failed. Backend Cloudinary setup may be incomplete.", "error");
      } finally {
        setIsUploading(false);
        setUploadingFor(null);
        setNewResourceName("");
      }
    }
    if (e.target) e.target.value = '';
  };

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/admin-back.png" alt="Background" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#0a350d]/30" />
      </div>

      <div>
        <Sidebar active="Resources" role="admin" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  Learning Resources
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Practical resources for continuous growth.
                </p>
              </div>

              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                <div className="flex flex-col w-full gap-4 max-w-4xl mx-auto">
                  {loading ? (
                    <p className="text-center font-bold text-lg">Loading resources...</p>
                  ) : programs.length > 0 ? (
                    programs.map((prog) => {
                      const isExpanded = expandedId === prog.id;
                      return (
                        <div key={prog.id} className="bg-[#f8f9fa] rounded-xl shadow-sm text-[#1a1040] overflow-hidden transition-all duration-300">
                          <div className="px-6 py-4 flex justify-between items-center font-bold text-base md:text-lg cursor-pointer hover:bg-white transition" onClick={() => toggleExpand(prog.id)}>
                            <span>{prog.name}</span>
                            {isExpanded ? <FaAngleUp className="text-[#1a1040]/70" /> : <FaAngleDown className="text-[#1a1040]/70" />}
                          </div>

                          {isExpanded && (
                            <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-gray-200">

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
                                      <button onClick={() => handleDeleteResource(prog.id, res.id)} disabled={deletingId === res.id} className="text-red-500 p-2 hover:bg-red-50 rounded-md transition flex-shrink-0 disabled:opacity-50 flex items-center justify-center" title="Delete Resource">
                                        {deletingId === res.id ? (
                                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                          <FaTrash />
                                        )}
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic text-sm mt-2">No resources added yet.</p>
                              )}

                              {uploadingFor === prog.id ? (
                                <div className="mt-4 p-4 md:p-6 border-2 border-dashed border-[#1a1040]/40 rounded-xl bg-gray-100/50 flex flex-col gap-4 items-start">
                                  <h4 className="font-bold text-[#1a1040]">Upload New PDF</h4>
                                  <input type="text" disabled={isUploading} placeholder="Enter resource name..." value={newResourceName} onChange={(e) => setNewResourceName(e.target.value)} className="w-full bg-white border border-[#1a1040]/20 rounded-lg px-4 py-3 outline-none focus:border-[#1a1040]/50 transition font-medium text-sm md:text-base shadow-inner disabled:opacity-50" />
                                  <input type="file" accept=".pdf" ref={fileInputRef} onChange={(e) => handleFileChange(e, prog.id)} className="hidden" />
                                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                                    <button onClick={triggerFileSelect} disabled={isUploading} className="flex-1 bg-[#1a1040] text-white py-3 rounded-lg font-bold hover:bg-[#1a1040]/80 transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
                                      {isUploading ? (
                                        <>
                                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                          Uploading...
                                        </>
                                      ) : (
                                        <>
                                          <FaCloudUploadAlt className="text-xl" /> Select PDF & Upload
                                        </>
                                      )}
                                    </button>
                                    <button onClick={() => setUploadingFor(null)} disabled={isUploading} className="px-6 py-3 sm:py-0 border border-[#1a1040]/30 rounded-lg text-[#1a1040] font-bold hover:bg-gray-200 transition disabled:opacity-50">
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button onClick={() => { setUploadingFor(prog.id); setNewResourceName(""); }} className="mt-4 bg-[#00ff00] text-[#1a1040] px-6 py-3 rounded-xl font-bold hover:bg-[#00e600] transition shadow-md w-fit flex items-center gap-2">
                                  + Upload Resource
                                </button>
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

              <div className="flex justify-start items-center mt-2 mb-4 md:pl-2">
                <Link href="/admin/profile" className="w-full sm:w-auto inline-flex items-center justify-center px-10 sm:px-16 py-3 rounded-xl bg-[#0d1520]/80 border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md">
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
