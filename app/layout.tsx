import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { AdminProvider } from '@/contexts/AdminContext'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { RootLayoutClient } from '@/components/RootLayoutClient'
import { WarningSuppressionProvider } from '@/components/WarningSuppressionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DAM - Dar Al Muaazil LLC | Professional Waterproofing & Insulation Solutions',
  description: 'DAM - Dar Al Muaazil LLC provides professional waterproofing, thermal insulation, and construction materials in UAE. Expert installation and consultation services.',
  keywords: 'DAM, Dar Al Muaazil, waterproofing, thermal insulation, UAE construction, building materials, professional insulation, energy efficiency',
  icons: {
    icon: 'https://cdn.builder.io/api/v1/image/assets%2F1f92479787d647a5873d822973f760c7%2F038432f1035b4e15868079ba9991d3e9?format=webp&width=32',
    apple: 'https://cdn.builder.io/api/v1/image/assets%2F1f92479787d647a5873d822973f760c7%2F038432f1035b4e15868079ba9991d3e9?format=webp&width=180',
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
        <WarningSuppressionProvider>
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
        </WarningSuppressionProvider>
      </body>
    </html>
  )
}
