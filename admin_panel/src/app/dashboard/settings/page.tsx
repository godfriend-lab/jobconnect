"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Save, RotateCcw, CheckCircle, AlertCircle, Info,
  Globe, Palette, Tag, MapPin, Crown, Shield, Bell, CreditCard,
  Upload, Plus, X, Edit3,
  Lock, Mail, Phone, Building, Zap, DollarSign,
  Settings2, Clock, Smartphone, MailOpen,
  TrendingUp, ChevronRight, Sparkles, Award
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null)

  // État global des paramètres
  const [settings, setSettings] = useState({
    // Général
    site_name: "JobConnect",
    site_tagline: "La marketplace des professionnels au Togo",
    site_description: "Plateforme de mise en relation entre professionnels qualifiés et clients",
    site_url: "https://jobconnect.tg",
    support_email: "support@jobconnect.tg",
    contact_email: "contact@jobconnect.tg",
    contact_phone: "+228 90 00 00 00",
    address: "Lomé, Togo",
    currency: "FCFA",
    language: "fr",
    
    // Apparence
    primary_color: "#4F46E5",
    secondary_color: "#7C3AED",
    logo_url: "",
    favicon_url: "",
    theme: "light",
    
    // Business (ABONNEMENTS + BOOSTS - 0% COMMISSION)
    boost_price: 1000,
    boost_duration_hours: 24,
    require_verification: true,
    starter_price: 5000,
    business_price: 12000,
    premium_price: 20000,
    
    // Sécurité
    require_email_verification: true,
    two_factor_required: false,
    session_duration: 24,
    max_login_attempts: 5,
    password_min_length: 8,
    allow_registration: true,
    maintenance_mode: false,
    
    // Notifications
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    marketing_emails: true,
    new_subscription_notification: true,
    new_message_notification: true,
    review_notification: true,
    new_boost_notification: true,
  })

  const [categories, setCategories] = useState<string[]>([
    "Plomberie", "Électricité", "Maçonnerie", "Peinture", 
    "Immobilier", "Mécanique", "Coiffure", "Couture",
    "Ménage", "Jardinage", "Informatique", "Construction"
  ])

  const [cities, setCities] = useState<string[]>([
    "Lomé", "Kara", "Sokodé", "Kpalimé", "Atakpamé", "Dapaong", "Tsévié"
  ])

  const [newCategory, setNewCategory] = useState("")
  const [newCity, setNewCity] = useState("")

  // Plans cohérents avec le business model
  const [plans, setPlans] = useState([
    { 
      id: "starter", 
      name: "Starter", 
      price: 5000, 
      color: "blue",
      icon: "🚀",
      features: [
        "Profil complet",
        "50 contacts/mois",
        "Messagerie illimitée",
        "Badge vérifié",
        "Support par email"
      ] 
    },
    { 
      id: "business", 
      name: "Business", 
      price: 12000, 
      color: "purple",
      icon: "⭐",
      features: [
        "Tout Starter inclus",
        "Contacts illimités",
        "Statistiques avancées",
        "Portfolio étendu (20 projets)",
        "Support prioritaire",
        "Badge Business"
      ] 
    },
    { 
      id: "premium", 
      name: "Premium", 
      price: 20000, 
      color: "amber",
      icon: "👑",
      features: [
        "Tout Business inclus",
        "Mise en avant #1 recherche",
        "Badge Premium doré",
        "Analytics avancés",
        "Account manager dédié",
        "Portfolio illimité",
        "Support 24/7"
      ] 
    },
  ])

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("app_settings")
        .select("*")
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.warn("⚠️ Table vide, création automatique...")
          await supabase
            .from("app_settings")
            .insert({ 
              id: 1, 
              site_name: 'JobConnect', 
              site_tagline: 'La marketplace des professionnels au Togo',
              starter_price: 5000,
              business_price: 12000,
              premium_price: 20000
            })
          
          const { data: newData } = await supabase
            .from("app_settings")
            .select("*")
            .single()
          
          if (newData) {
            setSettings(prev => ({ ...prev, ...newData }))
          }
        } else {
          console.error("❌ Erreur:", error)
        }
        return
      }
      
      if (data) {
        console.log("✅ Paramètres chargés:", data)
        setSettings(prev => ({ ...prev, ...data }))
      }
    } catch (error: any) {
      console.error("❌ Erreur:", error)
    }
  }

  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from("app_settings")
        .upsert({ 
          id: 1, 
          ...settings, 
          updated_at: new Date().toISOString() 
        }, { 
          onConflict: "id" 
        })
      
      if (error) throw error
      console.log("✅ Paramètres sauvegardés:", settings)
      showToast("success", "✅ Paramètres sauvegardés avec succès !")
    } catch (error: any) {
      console.error("❌ Erreur sauvegarde:", error)
      showToast("error", "❌ Erreur lors de la sauvegarde")
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm("Réinitialiser tous les paramètres aux valeurs par défaut ?")) {
      showToast("info", "🔄 Paramètres réinitialisés")
      fetchSettings()
    }
  }

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory("")
      showToast("success", `✅ Catégorie "${newCategory.trim()}" ajoutée`)
    }
  }

  const removeCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat))
    showToast("info", `🗑️ Catégorie "${cat}" supprimée`)
  }

  const addCity = () => {
    if (newCity.trim() && !cities.includes(newCity.trim())) {
      setCities([...cities, newCity.trim()])
      setNewCity("")
      showToast("success", `✅ Ville "${newCity.trim()}" ajoutée`)
    }
  }

  const removeCity = (city: string) => {
    setCities(cities.filter(c => c !== city))
    showToast("info", `🗑️ Ville "${city}" supprimée`)
  }

  const tabs = [
    { id: "general", label: "Général", icon: Globe },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "categories", label: "Catégories", icon: Tag },
    { id: "cities", label: "Villes", icon: MapPin },
    { id: "plans", label: "Abonnements", icon: Crown },
    { id: "business", label: "Business Model", icon: DollarSign },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Settings2 className="w-8 h-8 text-indigo-600" />
            Paramètres
          </h1>
          <p className="text-slate-600 mt-1">Configuration complète de la plateforme JobConnect</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in ${
          toast.type === "success" ? "bg-green-600 text-white" :
          toast.type === "error" ? "bg-red-600 text-white" :
          "bg-blue-600 text-white"
        }`}>
          {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
          {toast.type === "info" && <Info className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SIDEBAR TABS */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-2 sticky top-6">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition text-left ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* CONTENU */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* GÉNÉRAL */}
          {activeTab === "general" && (
            <>
              <SectionHeader 
                icon={Globe} 
                title="Informations générales" 
                subtitle="Configuration de base de votre plateforme"
              />
              
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                <InputField 
                  label="Nom du site" 
                  value={settings.site_name} 
                  onChange={(v) => setSettings({...settings, site_name: v})}
                  icon={Building}
                />
                <InputField 
                  label="Slogan" 
                  value={settings.site_tagline} 
                  onChange={(v) => setSettings({...settings, site_tagline: v})}
                  icon={Zap}
                />
                <TextAreaField 
                  label="Description" 
                  value={settings.site_description} 
                  onChange={(v) => setSettings({...settings, site_description: v})}
                />
                <InputField 
                  label="URL du site" 
                  value={settings.site_url} 
                  onChange={(v) => setSettings({...settings, site_url: v})}
                  icon={Globe}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <InputField 
                    label="Email support" 
                    value={settings.support_email} 
                    onChange={(v) => setSettings({...settings, support_email: v})}
                    icon={Mail}
                  />
                  <InputField 
                    label="Email contact" 
                    value={settings.contact_email} 
                    onChange={(v) => setSettings({...settings, contact_email: v})}
                    icon={MailOpen}
                  />
                  <InputField 
                    label="Téléphone" 
                    value={settings.contact_phone} 
                    onChange={(v) => setSettings({...settings, contact_phone: v})}
                    icon={Phone}
                  />
                  <InputField 
                    label="Adresse" 
                    value={settings.address} 
                    onChange={(v) => setSettings({...settings, address: v})}
                    icon={MapPin}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <SelectField 
                    label="Devise" 
                    value={settings.currency} 
                    onChange={(v) => setSettings({...settings, currency: v})}
                    options={[
                      { value: "FCFA", label: "FCFA (Franc CFA)" },
                      { value: "EUR", label: "EUR (Euro)" },
                      { value: "USD", label: "USD (Dollar)" },
                    ]}
                  />
                  <SelectField 
                    label="Langue" 
                    value={settings.language} 
                    onChange={(v) => setSettings({...settings, language: v})}
                    options={[
                      { value: "fr", label: "Français" },
                      { value: "en", label: "English" },
                    ]}
                  />
                </div>
              </div>
            </>
          )}

          {/* APPARENCE */}
          {activeTab === "appearance" && (
            <>
              <SectionHeader 
                icon={Palette} 
                title="Apparence & Branding" 
                subtitle="Personnalisez l'identité visuelle de votre plateforme"
              />
              
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Logo du site</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl font-black border-4 border-white shadow-lg">
                      JC
                    </div>
                    <div className="flex-1">
                      <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                        <Upload className="w-4 h-4" />
                        Télécharger un logo
                      </button>
                      <p className="text-xs text-slate-500 mt-2">PNG, JPG ou SVG. Max 2MB. Recommandé: 512x512px</p>
                    </div>
                  </div>
                </div>

                {/* Couleurs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Couleur principale</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={settings.primary_color}
                        onChange={(e) => setSettings({...settings, primary_color: e.target.value})}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                      />
                      <input 
                        type="text" 
                        value={settings.primary_color}
                        onChange={(e) => setSettings({...settings, primary_color: e.target.value})}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-mono text-sm"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {["#4F46E5", "#7C3AED", "#EC4899", "#10B981", "#F59E0B"].map(color => (
                        <button
                          key={color}
                          onClick={() => setSettings({...settings, primary_color: color})}
                          className="w-6 h-6 rounded-full border-2 border-white shadow transition hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Couleur secondaire</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={settings.secondary_color}
                        onChange={(e) => setSettings({...settings, secondary_color: e.target.value})}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                      />
                      <input 
                        type="text" 
                        value={settings.secondary_color}
                        onChange={(e) => setSettings({...settings, secondary_color: e.target.value})}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Thème */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Thème</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Clair", icon: "☀️" },
                      { id: "dark", label: "Sombre", icon: "🌙" },
                      { id: "auto", label: "Auto", icon: "🔄" },
                    ].map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSettings({...settings, theme: theme.id})}
                        className={`p-4 rounded-xl border-2 transition text-center ${
                          settings.theme === theme.id 
                            ? "border-indigo-600 bg-indigo-50" 
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="text-2xl mb-1">{theme.icon}</div>
                        <div className="text-sm font-medium">{theme.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CATÉGORIES */}
          {activeTab === "categories" && (
            <>
              <SectionHeader 
                icon={Tag} 
                title="Catégories de métiers" 
                subtitle={`${categories.length} catégories actives`}
              />
              
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCategory()}
                    placeholder="Ajouter une nouvelle catégorie..."
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    onClick={addCategory}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <div 
                      key={cat} 
                      className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-indigo-600" />
                        <span className="font-medium text-slate-900">{cat}</span>
                      </div>
                      <button
                        onClick={() => removeCategory(cat)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* VILLES */}
          {activeTab === "cities" && (
            <>
              <SectionHeader 
                icon={MapPin} 
                title="Zones géographiques" 
                subtitle={`${cities.length} villes couvertes`}
              />
              
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCity()}
                    placeholder="Ajouter une nouvelle ville..."
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    onClick={addCity}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cities.map((city) => (
                    <div 
                      key={city} 
                      className="group flex items-center justify-between p-3 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 transition"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-slate-900">{city}</span>
                      </div>
                      <button
                        onClick={() => removeCity(city)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ABONNEMENTS */}
          {activeTab === "plans" && (
            <>
              <SectionHeader 
                icon={Crown} 
                title="Plans d'abonnement" 
                subtitle="Gérez les offres pour les professionnels"
              />
              
              {/* Info Business Model */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900">Business Model : 0% Commission</p>
                  <p className="text-sm text-emerald-700 mt-1">
                    Les clients paient directement les pros (T-Money, Flooz, espèces). 
                    JobConnect génère des revenus uniquement via les abonnements et les boosts.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => {
                  const colorClasses: Record<string, string> = {
                    blue: "from-blue-500 to-blue-700",
                    purple: "from-purple-500 to-purple-700",
                    amber: "from-amber-500 to-orange-600",
                  }
                  const bgClasses: Record<string, string> = {
                    blue: "bg-blue-50 border-blue-200",
                    purple: "bg-purple-50 border-purple-200",
                    amber: "bg-amber-50 border-amber-200",
                  }
                  
                  return (
                    <div key={plan.id} className={`rounded-xl border-2 ${bgClasses[plan.color]} p-6 hover:shadow-lg transition`}>
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${colorClasses[plan.color]} mb-3 items-center gap-1`}>
                        <span>{plan.icon}</span>
                        {plan.name.toUpperCase()}
                      </div>
                      <div className="mb-4">
                        <input
                          type="number"
                          value={plan.price}
                          onChange={(e) => {
                            const newPlans = plans.map(p => 
                              p.id === plan.id ? {...p, price: Number(e.target.value)} : p
                            )
                            setPlans(newPlans)
                          }}
                          className="text-3xl font-black text-slate-900 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none w-full"
                        />
                        <span className="text-slate-600 text-sm"> FCFA/mois</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        Modifier les features
                      </button>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* BUSINESS MODEL */}
          {activeTab === "business" && (
            <>
              <SectionHeader 
                icon={DollarSign} 
                title="Business Model" 
                subtitle="Configuration des revenus (abonnements + boosts)"
              />
              
              {/* Rappel du modèle */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-indigo-900">Modèle de revenus JobConnect</h3>
                    <p className="text-sm text-indigo-700 mt-1">
                      Nous ne prenons aucune commission sur les transactions entre clients et pros.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-4 h-4 text-indigo-600" />
                      <p className="text-xs font-semibold text-slate-500 uppercase">Source 1</p>
                    </div>
                    <p className="font-bold text-slate-900">Abonnements mensuels</p>
                    <p className="text-xs text-slate-500 mt-1">Starter, Business, Premium</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-indigo-600" />
                      <p className="text-xs font-semibold text-slate-500 uppercase">Source 2</p>
                    </div>
                    <p className="font-bold text-slate-900">Boosts ponctuels</p>
                    <p className="text-xs text-slate-500 mt-1">Mise en avant temporaire</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                <h3 className="font-bold text-slate-900 text-lg">Configuration des Boosts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NumberField 
                    label="Prix d'un boost" 
                    value={settings.boost_price} 
                    onChange={(v) => setSettings({...settings, boost_price: v})}
                    icon={Zap}
                    suffix="FCFA"
                  />
                  <NumberField 
                    label="Durée d'un boost" 
                    value={settings.boost_duration_hours} 
                    onChange={(v) => setSettings({...settings, boost_duration_hours: v})}
                    icon={Clock}
                    suffix="heures"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <ToggleField 
                    label="Vérification obligatoire des professionnels"
                    description="Les professionnels doivent être vérifiés avant de pouvoir recevoir des missions"
                    checked={settings.require_verification}
                    onChange={(v) => setSettings({...settings, require_verification: v})}
                  />
                </div>
              </div>

              {/* Résumé des prix */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Récapitulatif des tarifs</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <p className="font-semibold text-slate-900">Starter</p>
                        <p className="text-xs text-slate-500">Pour les pros débutants</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-blue-600">{settings.starter_price.toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="font-semibold text-slate-900">Business</p>
                        <p className="text-xs text-slate-500">Pour les pros établis</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-purple-600">{settings.business_price.toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👑</span>
                      <div>
                        <p className="font-semibold text-slate-900">Premium</p>
                        <p className="text-xs text-slate-500">Pour les pros leaders</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-amber-600">{settings.premium_price.toLocaleString()} FCFA</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SÉCURITÉ */}
          {activeTab === "security" && (
            <>
              <SectionHeader 
                icon={Shield} 
                title="Sécurité & Authentification" 
                subtitle="Protégez votre plateforme et vos utilisateurs"
              />
              
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <ToggleField 
                  label="Autoriser les inscriptions"
                  description="Permettre aux nouveaux utilisateurs de créer un compte"
                  checked={settings.allow_registration}
                  onChange={(v) => setSettings({...settings, allow_registration: v})}
                />
                <ToggleField 
                  label="Vérification email obligatoire"
                  description="Les utilisateurs doivent vérifier leur email avant d'utiliser la plateforme"
                  checked={settings.require_email_verification}
                  onChange={(v) => setSettings({...settings, require_email_verification: v})}
                />
                <ToggleField 
                  label="Authentification à deux facteurs (2FA)"
                  description="Exiger le 2FA pour tous les comptes administrateurs"
                  checked={settings.two_factor_required}
                  onChange={(v) => setSettings({...settings, two_factor_required: v})}
                />
                <ToggleField 
                  label="Mode maintenance"
                  description="Désactiver l'accès public à la plateforme"
                  checked={settings.maintenance_mode}
                  onChange={(v) => setSettings({...settings, maintenance_mode: v})}
                  warning
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <NumberField 
                    label="Durée de session (heures)" 
                    value={settings.session_duration} 
                    onChange={(v) => setSettings({...settings, session_duration: v})}
                    icon={Clock}
                  />
                  <NumberField 
                    label="Tentatives de connexion max" 
                    value={settings.max_login_attempts} 
                    onChange={(v) => setSettings({...settings, max_login_attempts: v})}
                    icon={Lock}
                  />
                  <NumberField 
                    label="Longueur min. mot de passe" 
                    value={settings.password_min_length} 
                    onChange={(v) => setSettings({...settings, password_min_length: v})}
                    icon={Lock}
                  />
                </div>
              </div>
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <SectionHeader 
                icon={Bell} 
                title="Notifications" 
                subtitle="Configurez les canaux de communication"
              />
              
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-slate-100">
                  <ChannelCard 
                    icon={Mail} 
                    label="Email" 
                    checked={settings.email_notifications}
                    onChange={(v) => setSettings({...settings, email_notifications: v})}
                    color="blue"
                  />
                  <ChannelCard 
                    icon={Smartphone} 
                    label="SMS" 
                    checked={settings.sms_notifications}
                    onChange={(v) => setSettings({...settings, sms_notifications: v})}
                    color="green"
                  />
                  <ChannelCard 
                    icon={Bell} 
                    label="Push" 
                    checked={settings.push_notifications}
                    onChange={(v) => setSettings({...settings, push_notifications: v})}
                    color="purple"
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <ToggleField 
                    label="Nouvel abonnement"
                    description="Notifier l'admin des nouveaux abonnements pros"
                    checked={settings.new_subscription_notification}
                    onChange={(v) => setSettings({...settings, new_subscription_notification: v})}
                  />
                  <ToggleField 
                    label="Nouveau message"
                    description="Notifier les utilisateurs des nouveaux messages"
                    checked={settings.new_message_notification}
                    onChange={(v) => setSettings({...settings, new_message_notification: v})}
                  />
                  <ToggleField 
                    label="Nouvel avis"
                    description="Notifier les professionnels des nouveaux avis"
                    checked={settings.review_notification}
                    onChange={(v) => setSettings({...settings, review_notification: v})}
                  />
                  <ToggleField 
                    label="Nouveau boost"
                    description="Notifier l'admin des boosts achetés"
                    checked={settings.new_boost_notification}
                    onChange={(v) => setSettings({...settings, new_boost_notification: v})}
                  />
                  <ToggleField 
                    label="Emails marketing"
                    description="Envoyer des offres et newsletters"
                    checked={settings.marketing_emails}
                    onChange={(v) => setSettings({...settings, marketing_emails: v})}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between sticky bottom-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Modifications non sauvegardées</p>
            <p className="text-sm text-slate-600">Cliquez sur Sauvegarder pour appliquer les changements</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Annuler
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// COMPOSANTS RÉUTILISABLES
// ═══════════════════════════════════════════════════════════════════════

function SectionHeader({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-600 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, icon: Icon }: { label: string; value: string; onChange: (v: string) => void; icon?: any }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
        />
      </div>
    </div>
  )
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: any[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function NumberField({ label, value, onChange, icon: Icon, suffix }: { label: string; value: number; onChange: (v: number) => void; icon?: any; suffix?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${suffix ? 'pr-16' : 'pr-4'} py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">{suffix}</span>}
      </div>
    </div>
  )
}

function ToggleField({ label, description, checked, onChange, warning }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void; warning?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border transition ${
      warning && checked ? "bg-red-50 border-red-200" : "bg-slate-50 border-slate-200"
    }`}>
      <div className="flex-1">
        <p className={`font-semibold ${warning && checked ? "text-red-900" : "text-slate-900"}`}>{label}</p>
        <p className="text-sm text-slate-600 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-14 h-7 rounded-full transition ${
          checked ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-7" : "translate-x-0.5"
        }`}></div>
      </button>
    </div>
  )
}

function ChannelCard({ icon: Icon, label, checked, onChange, color }: { icon: any; label: string; checked: boolean; onChange: (v: boolean) => void; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
  }
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`p-4 rounded-xl border-2 transition text-center ${
        checked ? colorClasses[color] : "bg-slate-50 border-slate-200 text-slate-400"
      }`}
    >
      <Icon className="w-6 h-6 mx-auto mb-2" />
      <p className="font-semibold text-sm">{label}</p>
      <p className="text-xs mt-1">{checked ? "Activé" : "Désactivé"}</p>
    </button>
  )
}