"use client"

import Link from "next/link"
import { Logo } from "./Logo"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-black leading-tight">
                <span className="text-indigo-600">JOB</span>
                <span className="text-slate-900">CONNECT</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1 hidden sm:block">La Marketplace des Pros</p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Accueil
            </Link>
            <Link href="/professionals" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Professionnels
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              À propos
            </Link>
          </div>

          {/* Boutons Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Connexion
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md"
            >
              S'inscrire
            </Link>
          </div>

          {/* Menu Mobile */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              <Link href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Accueil</Link>
              <Link href="/professionals" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Professionnels</Link>
              <Link href="/services" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Services</Link>
              <Link href="/about" className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">À propos</Link>
              <div className="border-t pt-3 mt-2 flex flex-col gap-2">
                <Link href="/login" className="px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-lg">Connexion</Link>
                <Link href="/register" className="px-4 py-2 text-center bg-indigo-600 text-white rounded-lg">S'inscrire</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}