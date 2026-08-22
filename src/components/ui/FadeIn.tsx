// @ts-nocheck
'use client'

import { motion } from 'framer-motion'

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  className = '' 
}) {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: { y: 0, x: 0 }
  }

  const variants = {
    hidden: { 
      opacity: 0, 
      ...directions[direction] 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1], // Courbe d'accélération "professionnelle" (easeOutExpo)
        delay: delay 
      } 
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // once: true = l'animation ne se joue qu'une seule fois
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}