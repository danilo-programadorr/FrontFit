import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Tipos melhorados
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mapeamento de erros do Supabase para mensagens amigáveis
const ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'E-mail ou senha inválidos. Por favor, tente novamente.',
  'Email not confirmed': 'Por favor, confirme seu e-mail antes de fazer login.',
  'User already registered': 'Este e-mail já está cadastrado. Faça login ou recupere sua senha.',
  'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const handleAuthError = useCallback((error: AuthError): never => {
    const message = ERROR_MESSAGES[error.message] || 
                   'Ocorreu um erro inesperado. Por favor, tente novamente.';
    throw new Error(message);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      clearError();
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) handleAuthError(error);
      
    } finally {
      setLoading(false);
    }
  }, [clearError, handleAuthError]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      clearError();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            // Adicione outros metadados se necessário
          },
        },
      });

      if (error) handleAuthError(error);

    } finally {
      setLoading(false);
    }
  }, [clearError, handleAuthError]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) handleAuthError(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        signIn, 
        signUp, 
        signOut,
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}