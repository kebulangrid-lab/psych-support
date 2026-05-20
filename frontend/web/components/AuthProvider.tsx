"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      checkProtectedRoutes(session?.user, pathname);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkProtectedRoutes(session?.user, pathname);
    });

    return () => subscription.unsubscribe();
  }, [pathname]);

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
    await supabase.auth.signOut();
    const isClient = pathname?.startsWith('/client');
    router.push(isClient ? '/client/sign-in' : '/admin/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}