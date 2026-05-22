"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEnrolled: boolean;
  isEnrolledLoading: boolean;
  refreshEnrollmentStatus: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isEnrolled: false,
  isEnrolledLoading: true,
  refreshEnrollmentStatus: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("isEnrolled") === "true";
    }
    return false;
  });
  const [isEnrolledLoading, setIsEnrolledLoading] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("isEnrolled") === null;
    }
    return true;
  });
  const router = useRouter();
  const pathname = usePathname();

  const fetchEnrollment = async (userId: string) => {
    const cachedUser = typeof window !== "undefined" ? sessionStorage.getItem("enrolledUserId") : null;
    const hasCache = cachedUser === userId && (typeof window !== "undefined" ? sessionStorage.getItem("isEnrolled") : null) !== null;

    if (!hasCache) {
      setIsEnrolledLoading(true);
    }

    try {
      const res = await axios.get(`https://psych-support-1.onrender.com/api/enrollments?client_id=${userId}`);
      const enrolled = (res.data || []).length > 0;
      setIsEnrolled(enrolled);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("isEnrolled", String(enrolled));
        sessionStorage.setItem("enrolledUserId", userId);
      }
    } catch (err) {
      console.error("Error fetching enrollment status in AuthProvider:", err);
      setIsEnrolled(false);
    } finally {
      setIsEnrolledLoading(false);
    }
  };

  const refreshEnrollmentStatus = async () => {
    if (user) {
      await fetchEnrollment(user.id);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      const role = user.user_metadata?.role;
      if (role === "CLIENT") {
        fetchEnrollment(user.id);
      } else {
        setIsEnrolled(false);
        setIsEnrolledLoading(false);
      }
    } else {
      setIsEnrolled(false);
      setIsEnrolledLoading(false);
    }
  }, [user, loading]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      checkProtectedRoutes(user, pathname);
    }
  }, [user, loading, pathname]);

  const checkProtectedRoutes = (currentUser: User | null | undefined, currentPath: string | null) => {
    if (!currentPath) return;
    
    const isAdminRoute = currentPath.startsWith('/admin') && !currentPath.includes('sign-in') && !currentPath.includes('sign-up');
    const isClientRoute = currentPath.startsWith('/client') && !currentPath.includes('sign-in') && !currentPath.includes('sign-up');

    if (isAdminRoute || isClientRoute) {
      if (!currentUser) {
        // Not logged in
        router.push(isAdminRoute ? '/admin/sign-in' : '/client/sign-in');
        return;
      }

      // Check role
      const role = currentUser.user_metadata?.role;
      if (isAdminRoute && role !== 'ADMIN') {
        router.push('/client/profile');
      } else if (isClientRoute && role !== 'CLIENT') {
        router.push('/admin/profile');
      }
    }
  };

  const signOut = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("isEnrolled");
      sessionStorage.removeItem("enrolledUserId");
    }
    await supabase.auth.signOut();
    const isClient = pathname?.startsWith('/client');
    router.push(isClient ? '/client/sign-in' : '/admin/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isEnrolled, isEnrolledLoading, refreshEnrollmentStatus, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}