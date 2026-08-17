// @ts-nocheck
import { ShieldCheck } from 'lucide-react'

export default function PlanBadge({ plan }: { plan: string }) {
  if (!plan || plan === 'Gratuit') return null

  const config: Record<string, { iconColor: string; bgColor: string; tooltip: string }> = {
    'Starter': { iconColor: 'text-emerald-400', bgColor: 'bg-emerald-900/30', tooltip: 'Forfait Starter' },
    'Business': { iconColor: 'text-blue-400', bgColor: 'bg-blue-900/30', tooltip: 'Forfait Business' },
    'Premium': { iconColor: 'text-amber-400', bgColor: 'bg-amber-900/30', tooltip: 'Forfait Premium' }
  }

  const { iconColor, bgColor, tooltip } = config[plan] || config['Starter']

  return (
    <div className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${bgColor} ${iconColor} flex-shrink-0 transition-all duration-300 hover:scale-110 cursor-help relative border border-current/20`} title={tooltip}>
      <span className={`absolute inline-flex h-full w-full rounded-full ${iconColor} opacity-20 animate-ping`}></span>
      <ShieldCheck className="w-3.5 h-3.5 relative z-10" />
    </div>
  )
}