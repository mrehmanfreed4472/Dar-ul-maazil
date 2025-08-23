'use client'

import { useEffect } from 'react';

interface WarningSuppressionProviderProps {
  children: React.ReactNode;
}

export function WarningSuppressionProvider({ children }: WarningSuppressionProviderProps) {
  useEffect(() => {
    // Only suppress warnings in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const originalError = console.error;
    const originalWarn = console.warn;

    // Override console.error to suppress specific React warnings
    console.error = (...args) => {
      const message = typeof args[0] === 'string' ? args[0] : '';
      
      // Suppress Recharts defaultProps warnings
      if (
        message.includes('Support for defaultProps will be removed from function components') &&
        (message.includes('XAxis') || message.includes('YAxis'))
      ) {
        return;
      }

      // Suppress nested anchor tag warnings if they're from our fixed components
      if (
        message.includes('In HTML') &&
        message.includes('cannot be a descendant of') &&
        message.includes('<a>')
      ) {
        return;
      }

      originalError.apply(console, args);
    };

    // Override console.warn to suppress specific warnings
    console.warn = (...args) => {
      const message = typeof args[0] === 'string' ? args[0] : '';
      
      // Suppress defaultProps warnings
      if (
        message.includes('Support for defaultProps will be removed from function components') &&
        (message.includes('XAxis') || message.includes('YAxis'))
      ) {
        return;
      }

      originalWarn.apply(console, args);
    };

    // Cleanup function to restore original console methods
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return <>{children}</>;
}
