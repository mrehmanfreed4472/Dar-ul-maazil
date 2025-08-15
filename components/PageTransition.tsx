'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  }
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.4
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-500/4 to-green-500/4 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
          
          {/* Floating geometric shapes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 ${
                i % 2 === 0 ? 'bg-green-400/20' : 'bg-emerald-400/20'
              } rounded-full`}
              animate={{
                x: [0, 200 + i * 50, 0],
                y: [0, -150 + i * 30, 0],
                rotate: [0, 360, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
