'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { 
  CheckCircle2, XCircle, Clock, Shield, Lock, 
  Search, Download, Bell, Users, FileText, FileSpreadsheet, FileCode, Wallet, Filter
} from 'lucide-react'

// ✅ IMPORTS CORRIGÉS POUR L'EXPORT
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from 'docx'

// ⚠️ MOT DE PASSE ADMIN - Change-le en production !
const ADMIN_PASSWORD = 'GodfriendKoffi2002'
const VERIFICATION_PRICE = 5000 // Prix par vérification en FCFA

export default function VerifyProfessionals() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // États des filtres
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending'>('all') // ✅ NOUVEAU FILTRE
  
  const [notification, setNotification] = useState<string | null>(null)
  const [showExportMenu, setShowExportMenu] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadProfessionals()
      setupRealtime()
    }
  }, [])

  // 🔔 NOTIFICATION TEMPS RÉEL (Supabase Realtime)
  const setupRealtime = () => {
    const channel = supabase
      .channel('realtime-profiles')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'profiles', filter: 'role=eq.pro' },
        (payload) => {
          setNotification(`🔔 Nouveau professionnel inscrit : ${payload.new.full_name}`)
          setTimeout(() => setNotification(null), 6000)
          loadProfessionals()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      setIsAuthenticated(true)
      loadProfessionals()
      setupRealtime()
    } else {
      setError('Mot de passe incorrect')
    }
  }

  const loadProfessionals = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'pro')
      .order('created_at', { ascending: false })
    
    if (data) setProfessionals(data)
    setLoading(false)
  }

  const verifyProfessional = async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_verified: true, verified_at: new Date().toISOString() })
      .eq('id', userId)
    if (!error) loadProfessionals()
  }

  const unverifyProfessional = async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_verified: false, verified_at: null })
      .eq('id', userId)
    if (!error) loadProfessionals()
  }

  const isBadgeValid = (profile: any) => {
    if (!profile.is_verified || !profile.verified_at) return false
    const verifiedDate = new Date(profile.verified_at)
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1)
    return verifiedDate >= twelveMonthsAgo
  }

  const getExpirationDate = (verifiedAt: string) => {
    const d = new Date(verifiedAt)
    d.setFullYear(d.getFullYear() + 1)
    return d.toLocaleDateString('fr-FR')
  }

  // 💰 CALCUL AUTOMATIQUE DU REVENU
  const verifiedCount = professionals.filter(p => isBadgeValid(p)).length
  const totalRevenue = verifiedCount * VERIFICATION_PRICE
  const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'

  // 🔍 LOGIQUE DE FILTRAGE OPTIMISÉE (Recherche + Statut)
  const filteredProfessionals = useMemo(() => {
    return professionals.filter(pro => {
      // 1. Filtre par texte (nom, email, téléphone)
      const matchesSearch = 
        pro.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.phone?.includes(searchQuery)

      if (!matchesSearch) return false

      // 2. Filtre par statut
      if (statusFilter === 'verified') {
        return isBadgeValid(pro) // Seulement les badges actuellement valides
      }
      if (statusFilter === 'pending') {
        return !pro.is_verified // Ceux qui n'ont jamais été vérifiés
      }

      return true // 'all'
    })
  }, [professionals, searchQuery, statusFilter])

  // 📥 1. EXPORT PDF
  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Rapport des Professionnels ProKorb", 14, 15)
    doc.setFontSize(10)
    doc.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')} | Revenu total : ${formatCurrency(totalRevenue)}`, 14, 22)

    const tableData = filteredProfessionals.map(pro => [
      pro.full_name || 'N/A',
      pro.email || 'N/A',
      pro.phone || '-',
      pro.specialty || '-',
      pro.created_at ? new Date(pro.created_at).toLocaleDateString('fr-FR') : '-',
      isBadgeValid(pro) ? 'Vérifié' : (pro.is_verified ? 'Expiré' : 'Non vérifié')
    ])

    autoTable(doc, {
      head: [['Nom', 'Email', 'Téléphone', 'Spécialité', 'Inscription', 'Statut']],
      body: tableData,
      startY: 28,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }
    })

    doc.save(`rapport_professionnels_${new Date().toISOString().slice(0,10)}.pdf`)
  }

  // 📥 2. EXPORT WORD (DOCX)
  const downloadWord = async () => {
    const tableRows = [
      new TableRow({
        children: ["Nom", "Email", "Téléphone", "Spécialité", "Inscription", "Statut"].map(header =>
          new TableCell({ 
            children: [new Paragraph({ children: [new TextRun({ text: header, bold: true, size: 22 })] })],
            shading: { fill: "4F46E5" },
          })
        )
      }),
      ...filteredProfessionals.map(pro =>
        new TableRow({
          children: [
            pro.full_name || 'N/A',
            pro.email || 'N/A',
            pro.phone || '-',
            pro.specialty || '-',
            pro.created_at ? new Date(pro.created_at).toLocaleDateString('fr-FR') : '-',
            isBadgeValid(pro) ? 'Vérifié' : (pro.is_verified ? 'Expiré' : 'Non vérifié')
          ].map(text =>
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(text), size: 20 })] })] })
          )
        })
      )
    ]

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({ text: `Rapport des Professionnels ProKorb (Revenu: ${formatCurrency(totalRevenue)})`, heading: "Heading1", spacing: { after: 200 } }),
          new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } })
        ]
      }]
    })

    const blob = await Packer.toBlob(doc)
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rapport_professionnels_${new Date().toISOString().slice(0,10)}.docx`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 📥 3. EXPORT CSV (Excel)
  const downloadCSV = () => {
    const headers = ['Nom', 'Email', 'Téléphone', 'Spécialité', 'Date d\'inscription', 'Statut']
    const rows = filteredProfessionals.map(pro => [
      `"${pro.full_name || ''}"`,
      `"${pro.email || ''}"`,
      `"${pro.phone || ''}"`,
      `"${pro.specialty || ''}"`,
      `"${pro.created_at ? new Date(pro.created_at).toLocaleDateString('fr-FR') : ''}"`,
      `"${isBadgeValid(pro) ? 'Vérifié' : (pro.is_verified ? 'Expiré' : 'Non vérifié')}"`
    ])
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n")
      
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `rapport_professionnels_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 📥 4. EXPORT EPUB
  const downloadEPUB = () => {
    const htmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <title>Rapport ProKorb</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #4F46E5; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4F46E5; color: white; }
      </style>
    </head>
    <body>
      <h1>Rapport des Professionnels ProKorb</h1>
      <p>Revenu total généré : <strong>${formatCurrency(totalRevenue)}</strong> (${verifiedCount} vérifications)</p>
      <p>Généré le : ${new Date().toLocaleDateString('fr-FR')}</p>
      <table>
        <tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Spécialité</th><th>Inscription</th><th>Statut</th></tr>
        ${filteredProfessionals.map(pro => `
          <tr>
            <td>${pro.full_name || 'N/A'}</td>
            <td>${pro.email || 'N/A'}</td>
            <td>${pro.phone || '-'}</td>
            <td>${pro.specialty || '-'}</td>
            <td>${pro.created_at ? new Date(pro.created_at).toLocaleDateString('fr-FR') : '-'}</td>
            <td>${isBadgeValid(pro) ? 'Vérifié' : (pro.is_verified ? 'Expiré' : 'Non vérifié')}</td>
          </tr>
        `).join('')}
      </table>
    </body>
    </html>`
    
    const blob = new Blob([htmlContent], { type: 'application/epub+zip' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rapport_professionnels_${new Date().toISOString().slice(0,10)}.epub`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 🔒 ÉCRAN DE CONNEXION
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-black text-white">Admin ProKorb</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Mot de passe administrateur</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
              Accéder au panneau
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ⏳ ÉCRAN DE CHARGEMENT
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>
  )

  // 🎛️ PANNEAU ADMIN
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* NOTIFICATION TEMPS RÉEL */}
        {notification && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 shadow-sm">
            <Bell className="w-5 h-5 animate-bounce text-green-600" />
            <span className="font-semibold">{notification}</span>
            <button onClick={() => setNotification(null)} className="ml-auto text-green-600 hover:text-green-800">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-black text-slate-900">Gestion des Professionnels</h1>
              <p className="text-slate-500 text-sm">Supervisez et validez les comptes en temps réel</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {/* MENU D'EXPORTATION */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-bold flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" /> Exporter
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <button onClick={() => { downloadPDF(); setShowExportMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <FileText className="w-4 h-4 text-red-500" /> Exporter en PDF
                  </button>
                  <button onClick={() => { downloadWord(); setShowExportMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <FileText className="w-4 h-4 text-blue-600" /> Exporter en Word (.docx)
                  </button>
                  <button onClick={() => { downloadCSV(); setShowExportMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <FileSpreadsheet className="w-4 h-4 text-green-600" /> Exporter en CSV (Excel)
                  </button>
                  <button onClick={() => { downloadEPUB(); setShowExportMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <FileCode className="w-4 h-4 text-purple-600" /> Exporter en EPUB
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                sessionStorage.removeItem('admin_auth')
                setIsAuthenticated(false)
              }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-bold"
            >
              Déconnexion
            </button>
          </div>
        </div>
        
        {/* 📊 CARTES DE STATISTIQUES EN TEMPS RÉEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Inscrits</p>
              <p className="text-3xl font-black text-slate-900">{professionals.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Vérifiés</p>
              <p className="text-3xl font-black text-slate-900">{verifiedCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">En attente</p>
              <p className="text-3xl font-black text-slate-900">
                {professionals.filter(p => !p.is_verified).length}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Wallet className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Revenu Généré</p>
              <p className="text-2xl md:text-3xl font-black text-emerald-600">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>

        {/* ✅ NOUVEAU : FILTRES PAR STATUT */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              statusFilter === 'all' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" /> Tous ({professionals.length})
          </button>
          <button
            onClick={() => setStatusFilter('verified')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              statusFilter === 'verified' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Vérifiés ({verifiedCount})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              statusFilter === 'pending' 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" /> En attente ({professionals.filter(p => !p.is_verified).length})
          </button>
        </div>

        {/* 🔍 BARRE DE RECHERCHE */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>
        
        {/* 📋 TABLEAU DES PROFESSIONNELS */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-white">Nom</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-white">Email</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-white">Téléphone</th>
                  <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-bold text-white">Spécialité</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-white">Inscription</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-white">Statut</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProfessionals.length > 0 ? (
                  filteredProfessionals.map((pro) => (
                    <tr key={pro.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="font-bold text-slate-900">{pro.full_name}</div>
                        <div className="text-xs text-slate-500 md:hidden">{pro.specialty || '-'}</div>
                        <div className="text-xs text-slate-500">{pro.city || 'Non renseigné'}</div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 text-slate-600 text-sm">{pro.email}</td>
                      <td className="px-4 md:px-6 py-4 text-slate-600 text-sm font-mono">{pro.phone || '-'}</td>
                      <td className="hidden md:table-cell px-6 py-4 text-slate-600 text-sm">{pro.specialty || '-'}</td>
                      <td className="px-4 md:px-6 py-4 text-slate-600 text-sm whitespace-nowrap">
                        {pro.created_at ? new Date(pro.created_at).toLocaleDateString('fr-FR') : '-'}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        {isBadgeValid(pro) ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            <div>
                              <span className="text-sm font-bold text-green-700">Vérifié</span>
                              <div className="text-xs text-slate-500">Exp: {getExpirationDate(pro.verified_at)}</div>
                            </div>
                          </div>
                        ) : pro.is_verified ? (
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                            <span className="text-sm font-bold text-orange-700">Expiré</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                            <span className="text-sm font-medium text-slate-500">Non vérifié</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        {isBadgeValid(pro) ? (
                          <button
                            onClick={() => unverifyProfessional(pro.id)}
                            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs md:text-sm font-bold flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" /> Retirer
                          </button>
                        ) : (
                          <button
                            onClick={() => verifyProfessional(pro.id)}
                            className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs md:text-sm font-bold flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Vérifier
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <Filter className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                      Aucun professionnel ne correspond à vos critères de filtrage.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}