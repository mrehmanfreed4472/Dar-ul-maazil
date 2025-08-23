'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  hasAdminAccess: () => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('damgcc_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user from localStorage:', error);
        localStorage.removeItem('damgcc_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo credentials - in real app, this would be an API call
    const demoCredentials = {
      'admin@damgcc.com': { password: 'admin123', role: 'admin' as const },
      'user@damgcc.com': { password: 'user123', role: 'user' as const }
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      const userCreds = demoCredentials[email as keyof typeof demoCredentials];
      
      if (userCreds && userCreds.password === password) {
        const loggedInUser: User = {
          id: email === 'admin@damgcc.com' ? 'admin-1' : 'user-1',
          email,
          name: email === 'admin@damgcc.com' ? 'Admin User' : 'Regular User',
          role: userCreds.role
        };
        
        setUser(loggedInUser);
        localStorage.setItem('damgcc_user', JSON.stringify(loggedInUser));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('damgcc_user');
  };

  const isAdmin = () => {
    return user?.role === 'admin' && user?.email === 'admin@damgcc.com';
  };

  const hasAdminAccess = () => {
    const isValidAdmin = isAdmin();
    // Check if user exists and has valid session (simplified validation)
    const hasValidSession = user !== null;
    return isValidAdmin && hasValidSession;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin,
      hasAdminAccess,
      isLoading
    }}>
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
