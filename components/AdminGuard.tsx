'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export function AdminGuard({ children, requireSuperAdmin = false }: AdminGuardProps) {
  const { user, isAdmin, hasAdminAccess } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      if (!user) {
        router.push('/login');
        return;
      }

      const hasValidAccess = requireSuperAdmin ? hasAdminAccess() : isAdmin();
      
      if (!hasValidAccess) {
        setAccessDenied(true);
        // Redirect after showing error
        setTimeout(() => {
          router.push('/');
        }, 3000);
        return;
      }

      setIsChecking(false);
    };

    // Add delay to prevent flash
    const timer = setTimeout(checkAccess, 100);
    return () => clearTimeout(timer);
  }, [user, isAdmin, hasAdminAccess, requireSuperAdmin, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Shield className="h-12 w-12 text-green-600" />
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Verifying Access
          </h2>
          <p className="text-gray-600">
            Checking administrative privileges...
          </p>
        </motion.div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            Access Denied
          </h1>
          <p className="text-red-700 mb-4">
            You don't have the required administrative privileges to access this area.
          </p>
          <p className="text-red-600 text-sm">
            Redirecting to home page in 3 seconds...
          </p>
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-1 bg-red-400 mt-4 rounded"
          />
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
