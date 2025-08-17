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
      {/* Logo with transparent background and enhanced animations */}
      <motion.div
        className="relative"
        animate={animated ? {
          scale: [1, 1.05, 1],
          rotateY: [0, 5, -5, 0],
          filter: [
            "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) saturate(1)",
            "drop-shadow(0 8px 25px rgba(74, 222, 128, 0.4)) saturate(1.2)",
            "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) saturate(1)"
          ]
        } : undefined}
        transition={animated ? {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        } : undefined}
      >
        {/* Animated glow background */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(74, 222, 128, 0.1), rgba(253, 186, 116, 0.1))",
                "linear-gradient(45deg, rgba(253, 186, 116, 0.2), rgba(74, 222, 128, 0.2))",
                "linear-gradient(45deg, rgba(74, 222, 128, 0.1), rgba(253, 186, 116, 0.1))"
              ],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Main logo image with transparent background */}
        <motion.img
          src="https://cdn.builder.io/api/v1/image/assets%2F16221c591b05447eb0dabdf05112b7b9%2Fe66e00ff226d45b58e3563b1a1168c9f?format=webp&width=800"
          alt="DAM - The House of Insulation - Dar Al Muaazil LLC"
          className={cn(
            sizeClasses[size],
            "w-auto object-contain relative z-10"
          )}
          style={{
            background: 'transparent',
            mixBlendMode: 'normal',
            imageRendering: 'crisp-edges',
            filter: 'drop-shadow(0 2px 12px rgba(0, 0, 0, 0.15))'
          }}
          whileHover={interactive ? {
            scale: 1.05,
            rotateY: 10,
            filter: "drop-shadow(0 12px 30px rgba(74, 222, 128, 0.5))"
          } : undefined}
          animate={animated ? {
            filter: [
              "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))",
              "drop-shadow(0 8px 20px rgba(74, 222, 128, 0.3))",
              "drop-shadow(0 8px 20px rgba(253, 186, 116, 0.3))",
              "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))"
            ]
          } : undefined}
          transition={animated ? {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          } : { duration: 0.3, ease: "easeOut" }}
        />

        {/* Floating particles animation */}
        {animated && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
              animate={{
                y: [-10, -20, -10],
                x: [0, 5, 0],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
              animate={{
                y: [10, 20, 10],
                x: [0, -5, 0],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-gradient-to-r from-green-300 to-orange-300 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </>
        )}
      </motion.div>
      
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
