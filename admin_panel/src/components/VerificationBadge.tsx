// @ts-nocheck
'use client'

import { Check } from 'lucide-react'

interface VerificationBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function VerificationBadge({ size = 'md', className = '' }: VerificationBadgeProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }

  return (
    <span 
      className={`inline-flex items-center justify-center rounded-full bg-blue-600 text-white ${sizes[size]} ${className}`}
      title="Profil vérifié"
    >
      <Check className="w-[60%] h-[60%] stroke-[4]" />
    </span>
  )
}