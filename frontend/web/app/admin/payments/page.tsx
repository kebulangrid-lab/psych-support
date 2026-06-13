"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import axios from "axios";
import { useToast } from "@/components/Toast";
import { FaCheckCircle, FaSearch, FaEye } from "react-icons/fa";

export default function AdminPayments() {
  const { addToast } = useToast();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get("https://psych-support-1.onrender.com/api/enrollments");
      setEnrollments(res.data);
    } catch (err) {
      console.error("Failed to fetch enrollments", err);
      addToast("Failed to fetch enrollments.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleVerify = async (id: string) => {
    setVerifyingId(id);
    try {
      await axios.patch(`https://psych-support-1.onrender.com/api/enrollments/${id}`, {
        payment_status: "completed"
      });
      setEnrollments(enrollments.map(e => e.id === id ? { ...e, payment_status: "completed" } : e));
      addToast("Payment verified successfully!", "success");
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      addToast("Failed to verify payment.", "error");
    } finally {
      setVerifyingId(null);
    }
  };

  const pendingEnrollments = enrollments.filter(e => e.payment_status === "waiting_to_verify");
  const completedEnrollments = enrollments.filter(e => e.payment_status === "completed");

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/admin-back.png" alt="Background" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#0a350d]/30" />
      </div>

      <div>
        <Sidebar active="Payments" role="admin" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />
          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-6 sm:p-10 md:p-14 mb-24 sm:mb-16 flex flex-col gap-6 sm:gap-10 min-h-[auto] sm:min-h-[600px]">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold mb-3 drop-shadow-lg uppercase tracking-wide">
                  MANAGE PAYMENTS
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  Verify bank transfers and monitor completed payments.
                </p>
              </div>

              <div className="w-full bg-[#8c97a7] rounded-[16px] mt-2 shadow-lg text-[#1a1040] p-6 sm:p-8 md:p-12 relative flex flex-col flex-1">
                {loading ? (
                  <p className="text-center font-bold">Loading payments...</p>
                ) : (
                  <div className="flex flex-col w-full gap-8 max-w-4xl mx-auto">
                    
                    {/* Pending Section */}
                    <div>
                      <h2 className="text-2xl font-bold mb-4 border-b border-gray-400 pb-2">Pending Verification</h2>
                      {pendingEnrollments.length === 0 ? (
                        <p className="text-gray-600 font-medium">No pending payments.</p>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {pendingEnrollments.map((enrollment) => (
                            <div key={enrollment.id} className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <p className="font-bold text-lg text-[#1a1040]">{enrollment.profiles?.full_name || "Unknown Client"}</p>
                                <p className="text-sm text-gray-500 font-medium">Ref: {enrollment.payment_reference}</p>
                                <p className="text-sm text-gray-500 font-medium">Amount: ₦{Number(enrollment.amount_paid).toFixed(2)}</p>
                              </div>
                              <div className="flex gap-2 w-full sm:w-auto">
                                {enrollment.proof_of_payment_url && (
                                  <button
                                    onClick={() => setPreviewImage(enrollment.proof_of_payment_url)}
                                    className="flex-1 sm:flex-none bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-200 transition"
                                  >
                                    <FaEye /> View Proof
                                  </button>
                                )}
                                <button
                                  onClick={() => handleVerify(enrollment.id)}
                                  disabled={verifyingId === enrollment.id}
                                  className="flex-1 sm:flex-none bg-green-500 text-white px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition disabled:opacity-50"
                                >
                                  {verifyingId === enrollment.id ? "Verifying..." : "Verify"}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Completed Section */}
                    <div className="mt-8">
                      <h2 className="text-2xl font-bold mb-4 border-b border-gray-400 pb-2">Successful Payments</h2>
                      {completedEnrollments.length === 0 ? (
                        <p className="text-gray-600 font-medium">No successful payments yet.</p>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {completedEnrollments.map((enrollment) => (
                            <div key={enrollment.id} className="bg-white/50 rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <p className="font-bold text-lg text-[#1a1040]">{enrollment.profiles?.full_name || "Unknown Client"}</p>
                                <p className="text-sm text-gray-500 font-medium">Ref: {enrollment.payment_reference}</p>
                              </div>
                              <div className="flex items-center gap-2 text-green-600 font-bold">
                                <FaCheckCircle /> Completed
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}
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
