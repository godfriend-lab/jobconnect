"use client"

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100" height="100" rx="20" fill="url(#jc-gradient-public)" />
    <circle cx="35" cy="38" r="11" stroke="white" strokeWidth="4" fill="none" />
    <circle cx="65" cy="38" r="11" stroke="white" strokeWidth="4" fill="none" />
    <circle cx="50" cy="68" r="11" stroke="white" strokeWidth="4" fill="none" />
    <path d="M 43 44 L 47 60" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M 57 44 L 53 60" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M 46 38 L 54 38" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <defs>
      <linearGradient id="jc-gradient-public" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
)