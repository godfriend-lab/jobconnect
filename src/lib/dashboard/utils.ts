// @ts-nocheck
import { 
  Wrench, Zap, Hammer, Paintbrush, Stethoscope, Scale, 
  GraduationCap, Utensils, Camera, Laptop, Truck, Scissors, 
  Briefcase, Home as HomeIcon, Music, Briefcase as BriefcaseIcon 
} from 'lucide-react'

export const getIconForCategory = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes('plomber') || n.includes('serrur') || n.includes('mécanic') || n.includes('réparat')) return Wrench
  if (n.includes('électric') || n.includes('énerg') || n.includes('soud')) return Zap
  if (n.includes('maçon') || n.includes('charpent') || n.includes('menuis') || n.includes('bâtiment') || n.includes('construct')) return Hammer
  if (n.includes('peintre') || n.includes('décorat')) return Paintbrush
  if (n.includes('médecin') || n.includes('infirm') || n.includes('santé') || n.includes('dentist') || n.includes('pharmac')) return Stethoscope
  if (n.includes('avocat') || n.includes('jurid') || n.includes('notair') || n.includes('juge')) return Scale
  if (n.includes('enseign') || n.includes('profess') || n.includes('formateur')) return GraduationCap
  if (n.includes('cuisin') || n.includes('boulang') || n.includes('restaur') || n.includes('traiteur')) return Utensils
  if (n.includes('photo') || n.includes('vidéo') || n.includes('graphist')) return Camera
  if (n.includes('inform') || n.includes('développ') || n.includes('web') || n.includes('logiciel') || n.includes('data')) return Laptop
  if (n.includes('transport') || n.includes('chauffeur') || n.includes('livreur') || n.includes('logist')) return Truck
  if (n.includes('beauté') || n.includes('coiff') || n.includes('esthét')) return Scissors
  if (n.includes('comptab') || n.includes('financ') || n.includes('banqu') || n.includes('assur')) return BriefcaseIcon
  if (n.includes('jardin') || n.includes('paysag') || n.includes('agricol')) return HomeIcon
  if (n.includes('musiqu') || n.includes('instrument')) return Music
  return Briefcase
}