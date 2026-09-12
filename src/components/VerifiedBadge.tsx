'use client'

import { useMemo } from 'react'
import { Clock } from 'lucide-react'

interface VerifiedBadgeProps {
  isVerified: boolean
  verifiedAt: string | null
  className?: string
  size?: number
  showLabel?: boolean
  showExpiration?: boolean
}

export default function VerifiedBadge({
  isVerified,
  verifiedAt,
  className = '',
  size = 18,
  showLabel = false,
  showExpiration = true,
}: VerifiedBadgeProps) {

  // ============================================
  // CALCUL DE LA VALIDITÉ
  // ============================================

  const verification = useMemo(() => {
    if (!isVerified || !verifiedAt) {
      return {
        valid: false,
        expirationDate: null,
      }
    }

    const verifiedDate = new Date(verifiedAt)

    if (Number.isNaN(verifiedDate.getTime())) {
      return {
        valid: false,
        expirationDate: null,
      }
    }

    const expirationDate = new Date(verifiedDate)

    // Vérification valable 12 mois
    expirationDate.setFullYear(
      expirationDate.getFullYear() + 1
    )

    const valid = new Date() < expirationDate

    return {
      valid,
      expirationDate,
    }
  }, [isVerified, verifiedAt])

  // ============================================
  // SI NON VÉRIFIÉ OU EXPIRÉ
  // ============================================

  if (!verification.valid) {
    return null
  }

  const formattedExpirationDate =
    verification.expirationDate?.toLocaleDateString(
      'fr-FR',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    )

  // ============================================
  // BADGE
  // ============================================

  return (
    <div
      className={`
        inline-flex
        items-center
        ${showLabel ? 'gap-1.5 px-2 py-1 rounded-full bg-blue-50 border border-blue-100' : ''}
        ${className}
      `}
    >

      {/* ========================================
          BADGE SVG
      ========================================= */}

      <span
        className="group relative inline-flex items-center justify-center flex-shrink-0"
        title={
          formattedExpirationDate
            ? `Profil vérifié • Expire le ${formattedExpirationDate}`
            : 'Profil vérifié'
        }
      >

        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Profil vérifié"
          className="
            flex-shrink-0
            drop-shadow-[0_1px_2px_rgba(37,99,235,0.25)]
          "
        >

          <defs>

            {/* Dégradé bleu ProKorb */}
            <linearGradient
              id="verifiedBlue"
              x1="10"
              y1="5"
              x2="38"
              y2="43"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0"
                stopColor="#3B82F6"
              />

              <stop
                offset="0.5"
                stopColor="#2563EB"
              />

              <stop
                offset="1"
                stopColor="#1D4ED8"
              />
            </linearGradient>

            {/* Légère lumière */}
            <linearGradient
              id="verifiedHighlight"
              x1="12"
              y1="8"
              x2="36"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0"
                stopColor="white"
                stopOpacity="0.18"
              />

              <stop
                offset="1"
                stopColor="white"
                stopOpacity="0"
              />
            </linearGradient>

          </defs>

          {/* ====================================
              FORME DU BADGE
          ==================================== */}

          <path
            d="
              M24 2.5
              L28.4 4.4
              L33.1 3.8
              L35.8 7.7
              L40.1 9.6
              L40.4 14.3
              L43.2 18.1
              L41.7 22.5
              L43.2 26.9
              L40.4 30.7
              L40.1 35.4
              L35.8 37.3
              L33.1 41.2
              L28.4 40.6
              L24 42.5
              L19.6 40.6
              L14.9 41.2
              L12.2 37.3
              L7.9 35.4
              L7.6 30.7
              L4.8 26.9
              L6.3 22.5
              L4.8 18.1
              L7.6 14.3
              L7.9 9.6
              L12.2 7.7
              L14.9 3.8
              L19.6 4.4
              Z
            "
            fill="url(#verifiedBlue)"
          />

          {/* ====================================
              LÉGÈRE LUMIÈRE INTERNE
          ==================================== */}

          <path
            d="
              M24 4
              L28.2 5.8
              L32.7 5.2
              L35.3 9
              L39.4 10.8
              L39.7 15.2
              L42.3 18.8
              L40.8 23
              L42.3 27.2
              L39.7 30.8
              L39.4 35.2
              L35.3 37
              L32.7 40.8
              L28.2 40.2
              L24 42
              L19.8 40.2
              L15.3 40.8
              L12.7 37
              L8.6 35.2
              L8.3 30.8
              L5.7 27.2
              L7.2 23
              L5.7 18.8
              L8.3 15.2
              L8.6 10.8
              L12.7 9
              L15.3 5.2
              L19.8 5.8
              Z
            "
            fill="url(#verifiedHighlight)"
            opacity="0.35"
          />

          {/* ====================================
              COCHE BLANCHE
          ==================================== */}

          <path
            d="
              M14.5 23.7
              L20.7 29.7
              L34.2 16.6
            "
            stroke="white"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

        </svg>

        {/* ======================================
            TOOLTIP
        ======================================= */}

        {showExpiration && formattedExpirationDate && (
          <span
            className="
              pointer-events-none
              absolute
              bottom-full
              left-1/2
              z-[100]
              mb-2
              -translate-x-1/2
              whitespace-nowrap
              rounded-lg
              bg-slate-950
              px-3
              py-2
              text-[11px]
              font-medium
              text-white
              opacity-0
              shadow-xl
              transition-all
              duration-200
              group-hover:translate-y-0
              group-hover:opacity-100
              translate-y-1
            "
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-400" />

              Vérifié jusqu'au{' '}
              {formattedExpirationDate}
            </span>

            {/* Flèche */}
            <span
              className="
                absolute
                left-1/2
                top-full
                -translate-x-1/2
                border-[5px]
                border-transparent
                border-t-slate-950
              "
            />
          </span>
        )}

      </span>

      {/* ========================================
          LABEL OPTIONNEL
      ========================================= */}

      {showLabel && (
        <span
          className="
            text-xs
            font-semibold
            text-blue-700
            leading-none
          "
        >
          Vérifié
        </span>
      )}

    </div>
  )
} 