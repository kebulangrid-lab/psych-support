import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
  role: "admin" | "client";
}

export default function AuthForm({ type, role }: AuthFormProps) {
  const isSignIn = type === "sign-in";
  
  return (
    <main className="min-h-screen flex flex-col relative text-white overflow-hidden">
      {/* Background with Image and Gradient Overlay */}
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
        {/* Glassmorphism Card */}
        <div className="w-full max-w-[550px] rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl p-6 md:p-8">
          
          <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest text-white/90">
            {role} {isSignIn ? "Login" : "Register"}
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-2xl text-black bg-white focus:outline-none focus:ring-4 focus:ring-white/20 placeholder-gray-500 font-medium"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-2xl text-black bg-white focus:outline-none focus:ring-4 focus:ring-white/20 placeholder-gray-500 font-medium"
              required
            />
            
            {!isSignIn && (
              <input
                type="password"
                placeholder="Confirm Password"
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
                className="px-8 py-2 rounded-2xl bg-[#34A853] hover:bg-[#2d9147] text-white font-semibold transition-all duration-300 shadow-lg whitespace-nowrap"
              >
                {isSignIn ? "Log In" : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
