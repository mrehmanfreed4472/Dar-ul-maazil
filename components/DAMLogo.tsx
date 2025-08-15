'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface DAMLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  interactive?: boolean
  withText?: boolean
  href?: string
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-12', 
  lg: 'h-16',
  xl: 'h-20'
}

export function DAMLogo({ 
  className = '',
  size = 'md',
  animated = false,
  interactive = true,
  withText = false,
  href = '/'
}: DAMLogoProps) {
  const logoElement = (
    <motion.div
      className={cn('flex items-center gap-2', className)}
      whileHover={interactive ? {
        scale: 1.05,
        filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))"
      } : undefined}
      animate={animated ? {
        scale: [1, 1.02, 1],
        filter: [
          "brightness(1) saturate(1)",
          "brightness(1.1) saturate(1.2)",
          "brightness(1) saturate(1)"
        ]
      } : undefined}
      transition={animated ? {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      } : { duration: 0.3, ease: "easeOut" }}
    >
      {/* Logo without background - using CSS mix-blend-mode to make background transparent */}
      <motion.img
        src="https://cdn.builder.io/api/v1/image/assets%2F1f92479787d647a5873d822973f760c7%2F4551cf54f8504ccaa05505322826a1fb?format=webp&width=800"
        alt="DAM - The House of Insulation - Dar Al Muaazil LLC"
        className={cn(
          sizeClasses[size],
          "w-auto object-contain filter drop-shadow-lg",
          "mix-blend-multiply dark:mix-blend-screen", // Makes background transparent
          "relative z-10"
        )}
        style={{
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
        }}
      />
      
      {/* Optional text */}
      {withText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl text-foreground">DAM</span>
          <span className="text-sm text-muted-foreground font-medium">
            The House of Insulation
          </span>
        </div>
      )}
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
