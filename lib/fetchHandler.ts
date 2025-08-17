// Development fetch error handler
export const createSafeFetch = () => {
  if (typeof window === 'undefined') return fetch;

  const originalFetch = window.fetch;

  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    try {
      const response = await originalFetch(input, init);
      
      // Handle failed responses gracefully
      if (!response.ok && process.env.NODE_ENV === 'development') {
        console.warn(`Fetch failed: ${response.status} ${response.statusText} for ${input}`);
        
        // For development server issues, return a mock response to prevent crashes
        if (response.status >= 500 || response.status === 0) {
          return new Response(
            JSON.stringify({ error: 'Development server error', status: response.status }),
            {
              status: 200,
              statusText: 'OK (Mocked)',
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      }
      
      return response;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Fetch error caught and handled:', error);
        
        // Return a fallback response for development
        return new Response(
          JSON.stringify({ 
            error: 'Network error', 
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          }),
          {
            status: 200,
            statusText: 'OK (Fallback)',
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      throw error;
    }
  };
};

// Install the safe fetch handler in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Only override in development to prevent production issues
  const safeFetch = createSafeFetch();
  
  // Store original for restoration if needed
  (window as any).__originalFetch = window.fetch;
  
  // Override global fetch
  window.fetch = safeFetch;
}
