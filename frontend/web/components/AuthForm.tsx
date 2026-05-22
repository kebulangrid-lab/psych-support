"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import Footer from "./Footer";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
  role: "admin" | "client";
}

export default function AuthForm({ type, role }: AuthFormProps) {
  const isSignIn = type === "sign-in";
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignIn) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Use backend profile checks or simply assume proper route routing.
        if (data.user) {
          if (role === "client") {
            try {
              const res = await axios.get(`http://localhost:4000/api/enrollments?client_id=${data.user.id}`);
              const enrollments = res.data || [];
              if (enrollments.length > 0) {
                router.push("/client/profile");
              } else {
                router.push("/client/programs");
              }
            } catch (err) {
              console.error("Error checking enrollments on sign-in:", err);
              router.push("/client/programs");
            }
          } else {
            router.push("/admin/profile");
          }
        }
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role.toUpperCase(),
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          if (role === "client") {
            try {
              const res = await axios.get(`http://localhost:4000/api/enrollments?client_id=${data.user.id}`);
              const enrollments = res.data || [];
              if (enrollments.length > 0) {
                router.push("/client/profile");
              } else {
                router.push("/client/programs");
              }
            } catch (err) {
              console.error("Error checking enrollments on sign-up:", err);
              router.push("/client/programs");
            }
          } else {
            router.push("/admin/profile");
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className="min-h-screen flex flex-col relative text-white overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/landing.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/20" />
      </div>

      <div className="flex-grow min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[550px] rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl p-6 md:p-8">
          
          <h2 className="text-2xl font-bold text-center mb-4 uppercase tracking-widest text-white/90">
            {role} {isSignIn ? "Login" : "Register"}
          </h2>

          {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-100 text-center font-bold text-sm">{error}</div>}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-black bg-white focus:outline-none focus:ring-4 focus:ring-white/20 placeholder-gray-500 font-medium"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-black bg-white focus:outline-none focus:ring-4 focus:ring-white/20 placeholder-gray-500 font-medium"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-black bg-white focus:outline-none focus:ring-4 focus:ring-white/20 placeholder-gray-500 font-medium"
              required
            />
            
            {!isSignIn && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-black bg-white focus:outline-none focus:ring-4 focus:ring-white/20 placeholder-gray-500 font-medium"
                required
              />
            )}

            {isSignIn && (
              <div className="text-left mt-[-8px]">
                <Link href="#" className="text-white/90 text-sm font-bold hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="text-[15px]">
                {isSignIn ? (
                  <>
                    <span className="text-white">Don't have an account yet? </span>
                    <br className="sm:hidden" />
                    <Link href={`/${role}/sign-up`} className="text-white font-bold underline decoration-2 underline-offset-4 hover:text-gray-300 transition-colors">
                      Register here
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-white">Already have an account? </span>
                    <br className="sm:hidden" />
                    <Link href={`/${role}/sign-in`} className="text-white font-bold underline decoration-2 underline-offset-4 hover:text-gray-300 transition-colors">
                      Log In
                    </Link>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 rounded-2xl bg-[#34A853] hover:bg-[#2d9147] text-white font-semibold transition-all duration-300 shadow-lg whitespace-nowrap disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Please wait...
                  </>
                ) : isSignIn ? (
                  "Log In"
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
