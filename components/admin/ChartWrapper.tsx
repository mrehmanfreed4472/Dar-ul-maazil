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

    // Suppress console errors
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' && (
          (args[0].includes('Support for defaultProps will be removed from function components') &&
           (args[0].includes('XAxis') || args[0].includes('YAxis'))) ||
          args[0].includes('Warning: In HTML') ||
          args[0].includes('This will cause a hydration error')
        )
      ) {
        return; // Suppress these specific warnings
      }
      originalError.apply(console, args);
    };

    // Suppress console warnings
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' && (
          (args[0].includes('Support for defaultProps will be removed from function components') &&
           (args[0].includes('XAxis') || args[0].includes('YAxis'))) ||
          args[0].includes('defaultProps') ||
          args[0].includes('Warning:')
        )
      ) {
        return; // Suppress these specific warnings
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return <div suppressHydrationWarning>{children}</div>;
}
