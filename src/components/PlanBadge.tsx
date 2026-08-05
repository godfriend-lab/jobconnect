// @ts-nocheck
'use client'

import Image from 'next/image'

// Importe tes 3 images de badges (à placer dans /public/badges/)
// - badge-starter.png (vert)
// - badge-business.png (bleu)  
// - badge-premium.png (doré)

export default function PlanBadge({ plan, size = 'md' }: { plan: string; size?: 'sm' | 'md' | 'lg' }) {
  if (!plan || plan === 'Gratuit') return null

  const badgeMap: Record<string, string> = {
    'Starter': '/badges/badge-starter.png',
    'Business': '/badges/badge-business.png',
    'Premium': '/badges/badge-premium.png'
  }

  const sizeMap: Record<string, string> = {
    'sm': 'w-5 h-5',
    'md': 'w-7 h-7',
    'lg': 'w-10 h-10'
  }

  const badgeUrl = badgeMap[plan]
  if (!badgeUrl) return null

  return (
    <div className="relative inline-flex items-center justify-center">
      <Image
        src={badgeUrl}
        alt={`Badge ${plan}`}
        width={size === 'sm' ? 20 : size === 'md' ? 28 : 40}
        height={size === 'sm' ? 20 : size === 'md' ? 28 : 40}
        className={`${sizeMap[size]} drop-shadow-md`}
        priority
      />
    </div>
  )
}