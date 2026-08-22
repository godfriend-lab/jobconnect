// @ts-nocheck
'use client'

import { Crown, Star, Zap, ShieldCheck } from 'lucide-react'

interface PlanBadgeProps {
  plan: string
  size?: 'small' | 'medium' | 'large'
}

export default function PlanBadge({ plan, size = 'medium' }: PlanBadgeProps) {
  if (!plan || plan === 'Gratuit') return null

  const config: Record<string, { 
    icon: any
    label: string
    bgColor: string
    textColor: string
    borderColor: string
    glow: string
  }> = {
    'Premium': {
      icon: Crown,
      label: 'PREMIUM',
      bgColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
      textColor: 'text-white',
      borderColor: 'border-amber-400',
      glow: 'shadow-amber-500/50'
    },
    'Business': {
      icon: Star,
      label: 'BUSINESS',
      bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      textColor: 'text-white',
      borderColor: 'border-blue-400',
      glow: 'shadow-blue-500/50'
    },
    'Starter': {
      icon: Zap,
      label: 'STARTER',
      bgColor: 'bg-gradient-to-r from-emerald-500 to-green-600',
      textColor: 'text-white',
      borderColor: 'border-emerald-400',
      glow: 'shadow-emerald-500/30'
    }
  }

  const { icon: Icon, label, bgColor, textColor, borderColor, glow } = config[plan] || config['Starter']

  const sizeClasses = {
    small: 'px-2 py-0.5 text-[10px]',
    medium: 'px-3 py-1 text-xs',
    large: 'px-4 py-1.5 text-sm'
  }

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-3.5 h-3.5',
    large: 'w-4 h-4'
  }

  return (
    <div 
      className={`
        inline-flex items-center gap-1.5 
        ${bgColor} ${textColor} 
        ${sizeClasses[size]} 
        font-bold rounded-full 
        border ${borderColor}
        shadow-lg ${glow}
        animate-pulse-slow
      `}
    >
      <Icon className={iconSizes[size]} />
      <span>{label}</span>
    </div>
  )
}