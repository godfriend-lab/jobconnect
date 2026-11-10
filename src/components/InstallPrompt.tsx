'use client'

import { useState, useEffect } from 'react'
import { X, Download, Smartphone, SmartphoneIcon } from 'lucide-react'

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Détection iOS
    const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isAppleDevice)

    // Vérifier si déjà installé
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isInstalled = localStorage.getItem('prokorb-installed') === 'true'

    if (isStandalone || isInstalled) {
      return
    }

    // Vérifier si l'utilisateur a fermé le prompt (session actuelle)
    const sessionDismissed = sessionStorage.getItem('prokorb-prompt-dismissed')
    if (sessionDismissed === 'true') {
      return
    }

    // Écouter l'événement beforeinstallprompt (Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Afficher après 5 secondes (plus poli)
      setTimeout(() => {
        setShowPrompt(true)
        setIsVisible(true)
      }, 5000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setShowPrompt(false)
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      localStorage.setItem('prokorb-installed', 'true')
    }
    
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setShowPrompt(false), 300)
    sessionStorage.setItem('prokorb-prompt-dismissed', 'true')
  }

  if (!showPrompt) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          {/* Icône avec flèche de téléchargement bien visible */}
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              {isIOS ? 'Installer ProKorb' : 'Installer l\'application'}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              {isIOS 
                ? 'Appuyez sur Partager puis "Sur l\'écran d\'accueil"' 
                : 'Accédez rapidement à ProKorb sans ouvrir le navigateur'}
            </p>
            
            {/* Bouton Installer pour Android */}
            {!isIOS && deferredPrompt && (
              <button
                onClick={handleInstall}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                Installer maintenant
              </button>
            )}
            
            {/* Instructions pour iOS */}
            {isIOS && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                <Smartphone className="w-4 h-4 flex-shrink-0" />
                <span>Disponible sur Safari uniquement</span>
              </div>
            )}
          </div>

          {/* Bouton fermer */}
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}