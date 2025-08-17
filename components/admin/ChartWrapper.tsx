'use client'

import { useEffect } from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
}

export function ChartWrapper({ children }: ChartWrapperProps) {
  useEffect(() => {
    // Suppress specific Recharts defaultProps warnings
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' && 
        args[0].includes('Support for defaultProps will be removed from function components') &&
        (args[0].includes('XAxis') || args[0].includes('YAxis'))
      ) {
        return; // Suppress this specific warning
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' && 
        args[0].includes('Support for defaultProps will be removed from function components') &&
        (args[0].includes('XAxis') || args[0].includes('YAxis'))
      ) {
        return; // Suppress this specific warning
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return <>{children}</>;
}
