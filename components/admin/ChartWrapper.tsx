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

    const suppressRechartWarning = (args: any[]) => {
      return args.some((arg, index) => {
        if (typeof arg === 'string') {
          return (
            arg.includes('Support for defaultProps will be removed') ||
            arg.includes('defaultProps will be removed from function components') ||
            (index === 1 && (arg === 'XAxis' || arg === 'YAxis'))
          );
        }
        return false;
      });
    };

    console.error = (...args) => {
      if (suppressRechartWarning(args)) {
        return; // Suppress Recharts warnings
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      if (suppressRechartWarning(args)) {
        return; // Suppress Recharts warnings
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
