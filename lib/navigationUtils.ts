/**
 * Navigation utilities for handling routing errors and improving navigation reliability
 */

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Enhanced navigation hook that handles errors gracefully
 */
export function useEnhancedNavigation() {
  const router = useRouter();

  const navigateTo = useCallback(async (path: string) => {
    try {
      // Use browser navigation for better reliability
      window.location.href = path;
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to router.push
      try {
        router.push(path);
      } catch (fallbackError) {
        console.error('Fallback navigation error:', fallbackError);
        // Final fallback - manual page reload
        window.location.href = path;
      }
    }
  }, [router]);

  const safeNavigate = useCallback((path: string, options?: { replace?: boolean }) => {
    try {
      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    } catch (error) {
      console.error('Safe navigation error:', error);
      // Fallback to browser navigation
      if (options?.replace) {
        window.location.replace(path);
      } else {
        window.location.href = path;
      }
    }
  }, [router]);

  return { navigateTo, safeNavigate };
}

/**
 * Prefetch a route with error handling
 */
export function prefetchRoute(router: any, path: string) {
  try {
    router.prefetch(path);
  } catch (error) {
    console.warn('Prefetch failed for:', path, error);
    // Silently fail - prefetch is not critical
  }
}

/**
 * Check if we're in a client environment
 */
export function isClient() {
  return typeof window !== 'undefined';
}

/**
 * Safe router operations with error handling
 */
export const safeRouterOperations = {
  push: (router: any, path: string) => {
    try {
      router.push(path);
    } catch (error) {
      console.error('Router push failed:', error);
      if (isClient()) {
        window.location.href = path;
      }
    }
  },

  replace: (router: any, path: string) => {
    try {
      router.replace(path);
    } catch (error) {
      console.error('Router replace failed:', error);
      if (isClient()) {
        window.location.replace(path);
      }
    }
  },

  back: (router: any) => {
    try {
      router.back();
    } catch (error) {
      console.error('Router back failed:', error);
      if (isClient()) {
        window.history.back();
      }
    }
  },

  refresh: (router: any) => {
    try {
      router.refresh();
    } catch (error) {
      console.error('Router refresh failed:', error);
      if (isClient()) {
        window.location.reload();
      }
    }
  }
};

/**
 * Handle Link component click with error handling
 */
export function handleLinkClick(href: string, event?: React.MouseEvent) {
  try {
    // Let Next.js handle the navigation naturally
    return true;
  } catch (error) {
    console.error('Link click error:', error);
    // Prevent default and handle manually
    if (event) {
      event.preventDefault();
    }
    if (isClient()) {
      window.location.href = href;
    }
    return false;
  }
}
