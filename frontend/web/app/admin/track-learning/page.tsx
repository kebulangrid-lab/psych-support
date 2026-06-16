"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import axios from "axios";
import { dataCache } from "@/lib/dataCache";
import { useToast } from "@/components/Toast";
import { FaEye, FaCheckCircle } from "react-icons/fa";

export default function AdminTrackLearning() {
  const { addToast } = useToast();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (force = false) => {
    if (!force) {
      const cachedProgs = dataCache.get("programs");
      const cachedEnrollments = dataCache.get("enrollments");
      if (cachedProgs && cachedEnrollments) {
        let revenue = 0;
        const mapped = cachedEnrollments.map((e: any) => {
          const prog = cachedProgs.find((p: any) => p.id === e.program_id);
          const amountStr = prog?.price ? `₦${prog.price}` : "₦0";
          revenue += (prog?.price || 0);

          const profileObj = Array.isArray(e.profiles) ? e.profiles[0] : e.profiles;
          const clientName = profileObj?.full_name || `User ID: ${(e.client_id || e.user_id || "").substring(0, 8)}...`;
          const phone = profileObj?.mobile_number ? `${profileObj.country_code || ''} ${profileObj.mobile_number}`.trim() : "N/A";

          return {
            id: e.id,
            name: clientName,
            phone,
            program: prog?.title || prog?.name || `Program ${e.program_id}`,
            amount: amountStr,
            date: new Date(e.enrolled_at || e.created_at || Date.now()).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
            status: e.payment_status,
            proof_url: e.proof_of_payment_url
          };
        });
        setPayments(mapped);
        setTotalRevenue(revenue);
        setLoading(false);
        return;
      }
    }
    try {
      const [progRes, enrRes] = await Promise.all([
        axios.get("https://psych-support-1.onrender.com/api/programs"),
        axios.get("https://psych-support-1.onrender.com/api/enrollments")
      ]);
      
      const progs = progRes.data;
      const enrs = enrRes.data;
      dataCache.set("programs", progs);
      dataCache.set("enrollments", enrs);

      let revenue = 0;
      const mapped = enrs.map((e: any) => {
        const prog = progs.find((p: any) => p.id === e.program_id);
        const amountStr = prog?.price ? `₦${prog.price}` : "₦0";
        revenue += (prog?.price || 0);

        const profileObj = Array.isArray(e.profiles) ? e.profiles[0] : e.profiles;
        const clientName = profileObj?.full_name || `User ID: ${(e.client_id || e.user_id || "").substring(0, 8)}...`;
        const phone = profileObj?.mobile_number ? `${profileObj.country_code || ''} ${profileObj.mobile_number}`.trim() : "N/A";

        return {
          id: e.id,
          name: clientName,
          phone,
          program: prog?.title || prog?.name || `Program ${e.program_id}`,
          amount: amountStr,
          date: new Date(e.enrolled_at || e.created_at || Date.now()).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
          status: e.payment_status,
          proof_url: e.proof_of_payment_url
        };
      });

      setPayments(mapped);
      setTotalRevenue(revenue);
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch payments data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string) => {
    setVerifyingId(id);
    try {
      await axios.patch(`https://psych-support-1.onrender.com/api/enrollments/${id}`, {
        payment_status: "completed"
      });
      setPayments(payments.map(e => e.id === id ? { ...e, status: "completed" } : e));
      addToast("Payment verified successfully!", "success");
      setPreviewImage(null);
      // Optional: invalidate cache
      dataCache.set("enrollments", null);
    } catch (err) {
      console.error(err);
      addToast("Failed to verify payment.", "error");
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/admin-back.png" alt="Background" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#0a350d]/30" />
      </div>

      <div>
        <Sidebar active="Track Learning" role="admin" />
        <div className="flex-1 sm:ml-[80px] relative z-10 flex flex-col min-h-screen">
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10">
              
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  Manage Payments
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md max-w-xl leading-relaxed">
                  Monitor transactions, pending payments, and manage<br/>student access
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
                <div className="grid grid-cols-2 md:flex gap-4 md:gap-6 w-full md:w-auto">
                  <div className="bg-[#8c97a7] text-[#1a1040] rounded-xl p-4 sm:p-5 w-full md:w-48 font-bold flex flex-col justify-between h-[100px] sm:h-[120px] shadow-md border border-white/20">
                    <div className="text-sm sm:text-lg leading-tight">Total<br/>Revenue</div>
                    <div className="text-lg sm:text-[20px] opacity-80 mt-1 font-extrabold">₦{totalRevenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-[#8c97a7] rounded-xl min-h-[350px] mt-2 shadow-lg text-[#1a1040] p-4 sm:p-5 relative flex flex-col">
                <div className="hidden md:grid grid-cols-5 items-center font-bold text-sm md:text-base mb-4 border-b border-[#1a1040]/10 pb-3">
                  <div>User</div>
                  <div>Program/Plan</div>
                  <div>Amount</div>
                  <div>Date</div>
                  <div>Status / Action</div>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 w-full mt-2 md:mt-0">
                  {loading ? (
                    <p className="text-center italic mt-4 font-bold text-sm">Loading enrollments...</p>
                  ) : payments.length > 0 ? (
                    payments.map((payment) => (
                      <div key={payment.id} className={`bg-white/40 md:bg-transparent rounded-xl p-3 md:p-0 grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0 items-start md:items-center border-b border-[#1a1040]/10 md:pb-3 w-full last:border-0 last:pb-0 shadow-sm md:shadow-none ${payment.status === 'waiting_to_verify' ? 'bg-yellow-100/50 md:bg-yellow-100/20 md:p-2 md:-mx-2 rounded-lg' : ''}`}>
                        
                        <div className="flex flex-col gap-1 md:gap-1 order-1 md:order-none pb-2 md:pb-0 border-b border-[#1a1040]/5 md:border-0">
                          <span className="opacity-90 font-bold md:font-medium text-sm md:text-base text-[#1a1040]">{payment.name}</span>
                          {payment.phone !== "N/A" && (
                            <span className="opacity-75 text-[11px] md:text-xs font-semibold text-[#1a1040]">{payment.phone}</span>
                          )}
                        </div>

                        <div className="flex flex-col md:block order-2 md:order-none">
                          <span className="md:hidden font-bold text-[10px] uppercase tracking-wider opacity-60 mb-0.5 text-[#1a1040]">Program/Plan</span>
                          <span className="opacity-90 font-semibold md:font-medium text-sm text-[#1a1040]">{payment.program}</span>
                        </div>

                        <div className="flex justify-between items-center md:hidden order-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-[10px] uppercase tracking-wider opacity-60 mb-0.5 text-[#1a1040]">Amount</span>
                            <span className="opacity-90 font-bold text-sm text-[#1a1040]">{payment.amount}</span>
                          </div>
                          <div className="flex flex-col text-right">
                             <span className="font-bold text-[10px] uppercase tracking-wider opacity-60 mb-0.5 text-[#1a1040]">Date</span>
                             <span className="opacity-90 font-semibold text-sm text-[#1a1040]">{payment.date}</span>
                          </div>
                        </div>

                        <div className="hidden md:block order-none">
                          <span className="opacity-90 font-medium text-sm text-[#1a1040]">{payment.amount}</span>
                        </div>

                        <div className="hidden md:block order-none">
                           <span className="opacity-90 font-medium text-sm text-[#1a1040]">{payment.date}</span>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-2 order-4 md:order-none mt-2 md:mt-0 pt-2 md:pt-0 border-t border-[#1a1040]/10 md:border-t-0">
                          {payment.status === 'waiting_to_verify' ? (
                            <div className="flex gap-2 w-full md:w-auto">
                              {payment.proof_url && (
                                <button
                                  onClick={() => setPreviewImage(payment.proof_url)}
                                  className="flex-1 md:flex-none bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-sm flex items-center justify-center gap-1 hover:bg-blue-200 transition"
                                >
                                  <FaEye /> Proof
                                </button>
                              )}
                              <button
                                onClick={() => handleVerify(payment.id)}
                                disabled={verifyingId === payment.id}
                                className="flex-1 md:flex-none bg-green-500 text-white px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-green-600 transition disabled:opacity-50"
                              >
                                {verifyingId === payment.id ? "Verifying..." : "Verify"}
                              </button>
                            </div>
                          ) : (
                            <span className="text-green-700 font-bold text-sm flex items-center gap-1">
                              <FaCheckCircle /> Completed
                            </span>
                          )}
                        </div>

                      </div>
                    ))
                  ) : (
                    <p className="text-[#1a1040]/70 italic mt-2">No payments/enrollments found.</p>
                  )}
                </div>
              </div>

              <div className="mt-2 md:mt-4 w-full">
                <Link
                  href="/admin/profile"
                  className="flex sm:inline-flex items-center justify-center px-16 py-3.5 sm:py-3 rounded-2xl bg-[#0d1520]/80 border border-white/30 text-white/90 font-bold text-sm hover:bg-[#0d1520] hover:border-white/50 transition shadow-md w-full sm:w-auto"
                >
                  Back
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
              src={previewImage} 
              alt="Proof of Payment" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg border-2 border-white/20"
            />
            <button 
              onClick={() => setPreviewImage(null)}
              className="mt-4 bg-white/20 hover:bg-white/40 text-white px-6 py-2 rounded-xl font-bold transition"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      <div className="hidden sm:block">
        <Footer />
      </div>
    </main>
  );
}
