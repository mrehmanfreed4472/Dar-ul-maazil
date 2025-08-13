import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { AdminProvider } from '@/contexts/AdminContext'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { RootLayoutClient } from '@/components/RootLayoutClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DAM - The House of Insulation | Premium Insulation Services UAE',
  description: 'DAM - The House of Insulation | Premium insulation services, thermal solutions, and construction materials in UAE. Professional installation and consultation.',
  keywords: 'DAM, house of insulation, thermal insulation, UAE insulation, construction materials, Dar Al Muaazil, building insulation, energy efficiency',
  icons: {
    icon: 'https://cdn.builder.io/api/v1/image/assets%2Fbe317009bb644e719e7cd7d209bca9da%2F36ff582146184a53971e36b118d53fc5?format=webp&width=32',
    apple: 'https://cdn.builder.io/api/v1/image/assets%2Fbe317009bb644e719e7cd7d209bca9da%2F36ff582146184a53971e36b118d53fc5?format=webp&width=180',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <AdminProvider>
              <CartProvider>
                <RootLayoutClient>
                  {children}
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 3000,
                    }}
                  />
                </RootLayoutClient>
              </CartProvider>
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
