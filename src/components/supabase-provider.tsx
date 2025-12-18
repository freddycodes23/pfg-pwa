'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Define the context state
interface SupabaseContextState {
  supabase: SupabaseClient;
  user: User | null;
  isLoading: boolean;
}

// Create the context
const SupabaseContext = createContext<SupabaseContextState | undefined>(undefined);

// Create the provider
export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => {
    const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const supabaseUrl = (envUrl && envUrl.length > 0) ? envUrl : 'https://placeholder.supabase.co';
    const supabaseAnonKey = (envKey && envKey.length > 0) ? envKey : 'placeholder-key';
    
    return createClient(supabaseUrl, supabaseAnonKey);
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      if (event === 'SIGNED_IN') {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <SupabaseContext.Provider value={{ supabase, user, isLoading }}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Hook to access the Supabase client and user state
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

// Hook specifically for accessing the authenticated user's state
export const useUser = () => {
  const { user, isLoading } = useSupabase();
  return { user, isUserLoading: isLoading, userError: null };
};
