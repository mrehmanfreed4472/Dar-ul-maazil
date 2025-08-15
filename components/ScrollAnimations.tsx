'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollAnimationsProps {
  children: ReactNode
  className?: string
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate' | 'slideUp'
  delay?: number
  duration?: number
}

export function ScrollAnimations({ 
  children, 
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6
}: ScrollAnimationsProps) {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 60 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-10%" }
    },
    fadeLeft: {
      initial: { opacity: 0, x: -60 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, margin: "-10%" }
    },
    fadeRight: {
      initial: { opacity: 0, x: 60 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, margin: "-10%" }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true, margin: "-10%" }
    },
    rotate: {
      initial: { opacity: 0, rotate: -10, scale: 0.9 },
      whileInView: { opacity: 1, rotate: 0, scale: 1 },
      viewport: { once: true, margin: "-10%" }
    },
    slideUp: {
      initial: { opacity: 0, y: 100 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-20%" }
    }
  }

  const selectedVariant = variants[variant]

  return (
    <motion.div
      className={className}
      initial={selectedVariant.initial}
      whileInView={selectedVariant.whileInView}
      viewport={selectedVariant.viewport}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax component for background elements
export function ParallaxElement({ 
  children, 
  className = '',
  speed = 0.5 
}: { 
  children: ReactNode
  className?: string 
  speed?: number 
}) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <motion.div
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for multiple elements
export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: { 
  children: ReactNode
  className?: string
  staggerDelay?: number 
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}
