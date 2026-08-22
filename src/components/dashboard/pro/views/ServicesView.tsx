// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Package, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Service {
  id: string
  title: string
  description: string
  category: string
  price: string
  is_active: boolean
  created_at: string
}

export default function ServicesView({ services, uploading, publishService, updateService }: any) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    priceType: 'fixed' as 'fixed' | 'from' | 'quote'
  })
  const [customCategory, setCustomCategory] = useState('')
  const [showCustomCategory, setShowCustomCategory] = useState(false)

  const categories = [
    'Développeur Full Stack',
    'Plomberie',
    'Électricité',
    'Maçonnerie',
    'Peinture',
    'Couture',
    'Mécanique',
    'Informatique',
    'Médecine',
    'Autre'
  ]

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      priceType: 'from'
    })
    setCustomCategory('')
    setShowCustomCategory(false)
    setIsCreating(false)
    setEditingService(null)
  }

  const handleCreate = () => {
    resetForm()
    setIsCreating(true)
  }

  const handleEdit = (service: Service) => {
    // Déterminer le type de prix
    let priceType: 'fixed' | 'from' | 'quote' = 'fixed'
    let cleanPrice = service.price

    if (service.price.toLowerCase().includes('devis')) {
      priceType = 'quote'
      cleanPrice = ''
    } else if (service.price.toLowerCase().includes('à partir de') || service.price.toLowerCase().includes('apartir de')) {
      priceType = 'from'
      cleanPrice = service.price.replace(/à partir de|apartir de/gi, '').replace(/fcfa/gi, '').trim()
    }

    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      price: cleanPrice,
      priceType
    })
    setEditingService(service)
    setIsCreating(true)
  }

  const handleSave = async () => {
    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    if (formData.priceType !== 'quote' && (!formData.price || isNaN(Number(formData.price)))) {
      alert('Veuillez entrer un prix valide')
      return
    }

    // Formater le prix selon le type
    let formattedPrice = ''
    if (formData.priceType === 'quote') {
      formattedPrice = 'Sur devis'
    } else if (formData.priceType === 'from') {
      formattedPrice = `À partir de ${Number(formData.price).toLocaleString('fr-FR')} FCFA`
    } else {
      formattedPrice = `${Number(formData.price).toLocaleString('fr-FR')} FCFA`
    }

    const serviceData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category === 'Autre' ? customCategory : formData.category,
      price: formattedPrice,
      is_active: true
    }

    try {
      if (editingService) {
        await updateService(editingService.id, serviceData)
      } else {
        await publishService(serviceData)
      }
      resetForm()
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'enregistrement du service')
    }
  }

  const handleCancel = () => {
    resetForm()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id)
        
        if (error) throw error
        alert('Service supprimé avec succès')
      } catch (error) {
        console.error('Erreur suppression:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Mes Services</h2>
          <p className="text-slate-400 text-sm">Gérez vos offres de services</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/30"
        >
          <Plus className="w-5 h-5" />
          Nouveau Service
        </button>
      </div>

      {/* Formulaire de création/édition */}
      {isCreating && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-indigo-400" />
            {editingService ? 'Modifier mon service' : 'Créer un nouveau service'}
          </h3>

          <div className="space-y-5">
            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Titre du service *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Développement Full Stack"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Description détaillée *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez votre service en détail..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === 'Autre') {
                    setShowCustomCategory(true)
                  } else {
                    setShowCustomCategory(false)
                  }
                  setFormData({ ...formData, category: e.target.value })
                }}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {showCustomCategory && (
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Précisez votre catégorie"
                  className="mt-3 w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Type de prix */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Type de tarification *
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priceType: 'from' })}
                  className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                    formData.priceType === 'from'
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  À partir de
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priceType: 'fixed' })}
                  className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                    formData.priceType === 'fixed'
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Prix fixe
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priceType: 'quote' })}
                  className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                    formData.priceType === 'quote'
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  Sur devis
                </button>
              </div>
            </div>

            {/* Prix (seulement si pas "Sur devis") */}
            {formData.priceType !== 'quote' && (
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Prix minimum (FCFA) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                    {formData.priceType === 'from' ? 'À partir de ' : ''}
                  </span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="5000"
                    min="0"
                    className="w-full pl-32 pr-20 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                    FCFA
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {formData.priceType === 'from' 
                    ? 'Affichera: "À partir de X FCFA"' 
                    : 'Affichera: "X FCFA"'}
                </p>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    {editingService ? 'Mettre à jour' : 'Publier le service'}
                  </>
                )}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des services */}
      <div className="grid gap-4">
        {services?.map((service: Service) => (
          <div
            key={service.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    service.is_active 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-slate-700 text-slate-400 border border-slate-600'
                  }`}>
                    {service.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-500">
                    <span className="text-slate-400 font-semibold">Catégorie:</span> {service.category}
                  </span>
                  <span className="text-indigo-400 font-bold">
                    {service.price}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                  title="Modifier"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!services || services.length === 0) && !isCreating && (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Aucun service publié</h3>
            <p className="text-slate-400 mb-6">Commencez par créer votre premier service</p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all"
            >
              <Plus className="w-5 h-5" />
              Créer mon premier service
            </button>
          </div>
        )}
      </div>
    </div>
  )
}