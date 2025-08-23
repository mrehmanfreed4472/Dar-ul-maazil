'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Navigation } from 'lucide-react';

export function NavigationTest() {
  const router = useRouter();
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [isRunning, setIsRunning] = useState(false);

  const testRoutes = [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Products' },
    { path: '/services', name: 'Services' },
    { path: '/contact', name: 'Contact' },
    { path: '/cart', name: 'Cart' },
    { path: '/admin', name: 'Admin' }
  ];

  const runNavigationTest = async () => {
    setIsRunning(true);
    const results: Record<string, boolean> = {};

    for (const route of testRoutes) {
      try {
        // Test prefetch
        router.prefetch(route.path);
        results[route.path] = true;
      } catch (error) {
        console.error(`Navigation test failed for ${route.path}:`, error);
        results[route.path] = false;
      }
    }

    setTestResults(results);
    setIsRunning(false);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg z-50 bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Navigation className="h-4 w-4" />
          Navigation Test
        </CardTitle>
        <CardDescription className="text-xs">
          Test navigation to verify RSC fixes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          size="sm" 
          onClick={runNavigationTest} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? 'Testing...' : 'Run Test'}
        </Button>
        
        {Object.keys(testResults).length > 0 && (
          <div className="space-y-1">
            {testRoutes.map((route) => (
              <div key={route.path} className="flex items-center justify-between text-xs">
                <Link 
                  href={route.path}
                  className="hover:text-blue-600 transition-colors"
                >
                  {route.name}
                </Link>
                {testResults[route.path] !== undefined && (
                  testResults[route.path] ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-500" />
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
