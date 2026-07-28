import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ✅ Fonction requise par les composants UI (shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ✅ Ta fonction personnalisée existante
export function isAdmin(profile: any) {
  return profile?.role === 'admin'
}