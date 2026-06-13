"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaUniversity, FaCopy, FaCheckCircle, FaArrowLeft, FaCloudUploadAlt, FaRegClock } from "react-icons/fa";
import { useAuth } from "@/components/AuthProvider";
import axios from "axios";

export default function BankTransferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshEnrollmentStatus } = useAuth();
  const programId = searchParams.get("programId");

  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);

  useEffect(() => {
    if (!programId) {
      router.push("/client/programs");
      return;
    }

    const fetchProgramAndEnrollment = async () => {
      try {
        const res = await axios.get(`https://psych-support-1.onrender.com/api/programs/${programId}`);
        setProgram(res.data);

        if (user) {
          const enrollRes = await axios.get(`https://psych-support-1.onrender.com/api/enrollments?client_id=${user.id}`);
          const enrollment = enrollRes.data.find((e: any) => e.program_id === programId);
          
          if (enrollment?.payment_status === 'completed') {
            await refreshEnrollmentStatus();
            router.push("/client/profile");
            return;
          }

          if (enrollment?.payment_status === 'waiting_to_verify') {
            setExistingEnrollment(enrollment);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramAndEnrollment();

    // Poll for verification status if already waiting
    if (!user || !programId) return;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`https://psych-support-1.onrender.com/api/enrollments?client_id=${user.id}`);
        const completed = res.data.find((e: any) => e.program_id === programId && e.payment_status === 'completed');
        if (completed) {
          await refreshEnrollmentStatus();
          router.push("/client/profile");
        }
      } catch (err) {
        // ignore polling errors
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [programId, router, user, refreshEnrollmentStatus]);

  const handlePaymentComplete = async () => {
    if (!user || !program || paying) return;
    if (!file) {
      alert("Please upload proof of payment.");
      return;
    }
    setPaying(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadRes = await axios.post("https://psych-support-1.onrender.com/api/resources/image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const imageUrl = uploadRes.data.url;

      await axios.post("https://psych-support-1.onrender.com/api/enrollments", {
        client_id: user.id,
        program_id: program.id,
        amount_paid: program.price || 0,
        payment_status: "waiting_to_verify",
        proof_of_payment_url: imageUrl,
        payment_reference: `TRF-${Math.random().toString(36).substring(2, 11).toUpperCase()}`
      });

      await refreshEnrollmentStatus();
      setExistingEnrollment(true);
    } catch (err) {
      console.error("Error completing payment:", err);
      alert("Failed to process payment. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-lg">Loading transfer details...</p>
        </div>
      </main>
    );
  }

  if (!program) {
    return (
      <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden justify-center items-center">
        <p className="font-bold text-xl">Program not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a1040] text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/landing2.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/20" />
      </div>

      <div>
        <Sidebar active="Programs" />
        <div className="flex-1 sm:ml-[80px] pb-24 sm:pb-0 relative z-10 flex flex-col min-h-screen">
          <div className="w-full flex justify-start px-8 pt-6 pb-0 min-h-[60px]" />

          <div className="flex-1 px-[12px] sm:px-8 sm:pt-6 pb-0 flex flex-col justify-start">
            <div className="w-full max-w-[1100px] border border-white/50 bg-[#1a2060]/10 backdrop-blur-md rounded-[16px] p-5 sm:p-8 md:p-10 mb-24 sm:mb-16 flex flex-col gap-4 sm:gap-6 min-h-[auto] sm:min-h-[600px]">

              <div className="text-left flex items-center gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-lg tracking-wide">
                    Bank Transfer
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-white/90 font-light drop-shadow-md">
                    Complete your payment using the account details below.
                  </p>
                </div>
              </div>

              <div className="w-full bg-white text-black rounded-[12px] p-5 sm:p-6 md:p-8 flex flex-col shadow-2xl mt-2 max-w-3xl mx-auto">

                {/* Program Summary Card */}
                <div className="w-full bg-purple-950/5 border border-purple-950/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#1a1040]">{program.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Specialised Learning Program Enrollment</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-purple-950">₦{program.price !== undefined ? Number(program.price).toFixed(2) : "0.00"}</span>
                  </div>
                </div>
                {existingEnrollment ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <FaRegClock className="text-6xl text-orange-400 mb-4 animate-pulse" />
                    <h2 className="text-2xl font-bold text-[#1a1040] mb-2">Waiting to Verify</h2>
                    <p className="text-gray-500 max-w-md">
                      We have received your proof of payment for <span className="font-bold">{program.title}</span>. 
                      Our team is currently reviewing your transfer. You will be granted access to the program once verified.
                    </p>
                    <button
                      onClick={() => router.push("/client/programs")}
                      className="mt-8 bg-[#1a1040] text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-900 transition"
                    >
                      Back to Programs
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FaUniversity className="text-green-600 text-xl" />
                        <h2 className="text-lg font-bold">Transfer Details</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                          <span className="text-sm text-gray-500">Bank Name</span>
                          <span className="font-bold text-[#1a1040]">{program.bank_name || "Contact Support"}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                          <span className="text-sm text-gray-500">Account Name</span>
                          <span className="font-bold text-[#1a1040]">{program.account_name || "Contact Support"}</span>
                        </div>

                        <div className="flex justify-between items-center pb-1">
                          <span className="text-sm text-gray-500">Account Number</span>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-xl tracking-wider text-[#1a1040]">{program.account_number || "N/A"}</span>
                            <button 
                              onClick={() => copyToClipboard(program.account_number || "")}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="Copy Account Number"
                            >
                              {copied ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 flex flex-col items-center">
                      <FaCloudUploadAlt className="text-blue-500 text-4xl mb-2" />
                      <h3 className="font-bold text-[#1a1040] mb-1">Upload Proof of Payment</h3>
                      <p className="text-xs text-gray-500 text-center mb-4">Upload a screenshot or receipt of your successful transfer</p>
                      
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-100 file:text-blue-700
                          hover:file:bg-blue-200 transition"
                      />
                    </div>

                    <p className="text-sm text-gray-500 text-center mb-6">
                      Please ensure you transfer exactly <span className="font-bold text-black">₦{program.price !== undefined ? Number(program.price).toFixed(2) : "0.00"}</span>. 
                      Once your transfer is successful and receipt uploaded, click the button below to confirm.
                    </p>

                    <button
                      onClick={handlePaymentComplete}
                      disabled={paying || !file}
                      className={`w-full py-4 rounded-xl font-bold text-white text-lg transition flex justify-center items-center gap-2 ${(paying || !file) ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {paying ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "I Have Sent the Money & Uploaded Proof"
                      )}
                    </button>
                  </>
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
