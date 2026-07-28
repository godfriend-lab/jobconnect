// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapPin, Navigation } from "lucide-react"

// Correction des icônes Leaflet (bug connu avec Next.js/Webpack)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// Composant pour centrer la carte sur la position de l'utilisateur
function LocateUser({ position, setPosition }) {
  const map = useMap()

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = [pos.coords.latitude, pos.coords.longitude]
        setPosition(newPos)
        map.flyTo(newPos, 14, { duration: 1.5 })
      },
      (err) => {
        alert("Impossible de récupérer votre position. Vérifiez vos permissions.")
        console.error(err)
      }
    )
  }

  return (
    <button
      onClick={handleLocate}
      className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-100 transition font-medium text-sm text-[#0F172A]"
    >
      <Navigation className="w-4 h-4 text-[#4F46E5]" />
      Autour de moi
    </button>
  )
}

export default function ProMap({ professionals = [] }) {
  const [position, setPosition] = useState([6.1256, 1.2314]) // Lomé par défaut
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ height: "500px" }}>
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="h-full w-full z-0"
      >
        {/* Tuiles OpenStreetMap (100% Gratuit) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marqueurs des professionnels */}
        {professionals.map((pro) => (
          pro.latitude && pro.longitude ? (
            <Marker key={pro.id} position={[pro.latitude, pro.longitude]}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-[#0F172A]">{pro.full_name}</h3>
                  <p className="text-sm text-[#4F46E5]">{pro.category}</p>
                  <p className="text-xs text-gray-500 mt-1">{pro.bio?.substring(0, 50)}...</p>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>

      {/* Bouton de géolocalisation */}
      <LocateUser position={position} setPosition={setPosition} />
    </div>
  )
}