"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaTrash, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { useToast } from "@/components/Toast";

export default function AdminSupport() {
  const { addToast } = useToast();
  const [numbers, setNumbers] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSavingNewNumber, setIsSavingNewNumber] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/support");
      setNumbers(res.data);
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch support numbers.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:4000/api/support/${id}`);
      setNumbers(numbers.filter(n => n.id !== id));
      addToast("Support number deleted successfully.", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to delete support number.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd = async () => {
    if (newNumber.trim()) {
      setIsSavingNewNumber(true);
      try {
        const res = await axios.post("http://localhost:4000/api/support", { phone_number: newNumber.trim() });
        setNumbers([res.data, ...numbers]);
        setNewNumber("");
        setIsAdding(false);
        addToast("Support number added successfully.", "success");
      } catch (err) {
        console.error(err);
        addToast("Failed to add support number.", "error");
      } finally {
        setIsSavingNewNumber(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/admin-back.png" alt="Background" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#0a350d]/30" />
      </div>

      <div>
        <Sidebar active="Support" role="admin" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-8 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  Support
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Manage contact numbers for student assistance.
                </p>
              </div>

              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                <div className="flex flex-col w-full gap-4 max-w-2xl mx-auto">
                  {loading ? (
                    <p className="text-center font-bold">Loading support numbers...</p>
                  ) : numbers.length > 0 ? (
                    numbers.map((num) => (
                      <div key={num.id} className="bg-[#f8f9fa] rounded-xl shadow-sm text-[#1a1040] p-4 flex justify-between items-center transition">
                        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                          <div className="p-2 sm:p-3 bg-[#1a1040]/10 rounded-full flex-shrink-0">
                            <FaPhoneAlt className="text-[#1a1040] text-sm sm:text-lg" />
                          </div>
                          <span className="font-bold text-base sm:text-xl truncate">{num.phone_number}</span>
                        </div>
                        <button
                          onClick={() => handleDelete(num.id)}
                          disabled={deletingId === num.id || isSavingNewNumber}
                          className="text-red-500 p-2 sm:p-3 hover:bg-red-100 rounded-lg transition border border-transparent hover:border-red-200 flex-shrink-0 disabled:opacity-50 flex items-center justify-center min-w-[44px] min-h-[44px]"
                          title="Delete Number"
                        >
                          {deletingId === num.id ? (
                            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FaTrash className="text-lg" />
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#1a1040]/80 italic text-center py-6 font-medium">No support numbers added yet.</p>
                  )}

                  {isAdding ? (
                    <div className="mt-4 p-5 sm:p-6 border-2 border-dashed border-[#1a1040]/40 rounded-xl bg-white/50 flex flex-col gap-4">
                      <h4 className="font-bold text-[#1a1040] text-lg">Add New Mobile Number</h4>
                      <input
                        type="tel"
                        placeholder="e.g. +234 812 345 6789"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        disabled={isSavingNewNumber}
                        className="w-full bg-white border border-[#1a1040]/20 rounded-lg px-4 py-3 sm:py-4 outline-none focus:border-[#1a1040]/50 transition font-medium text-base shadow-inner disabled:opacity-50"
                        autoFocus
                      />
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                        <button
                          onClick={handleAdd}
                          disabled={isSavingNewNumber}
                          className="flex-1 bg-[#1a1040] text-white py-3 sm:py-3.5 rounded-xl font-bold hover:bg-[#1a1040]/80 transition shadow-md disabled:opacity-50 inline-flex items-center justify-center gap-2"
                        >
                          {isSavingNewNumber ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Number"
                          )}
                        </button>
                        <button
                          onClick={() => { setIsAdding(false); setNewNumber(""); }}
                          disabled={isSavingNewNumber}
                          className="w-full sm:w-auto px-8 py-3 sm:py-3.5 border-2 border-[#1a1040]/30 rounded-xl text-[#1a1040] font-bold hover:bg-white transition disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setIsAdding(true)} disabled={deletingId !== null} className="mt-4 bg-[#00ff00] text-[#1a1040] px-6 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-[#00e600] transition shadow-md w-full sm:w-fit flex items-center justify-center gap-3 sm:mx-auto disabled:opacity-50">
                      <FaPhoneAlt /> Add New Number
                    </button>
                  )}
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