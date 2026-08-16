// @ts-nocheck
export default function QuickAction({ icon: Icon, title, subtitle, color, onClick }: any) {
  return (
    <button onClick={onClick} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left w-full">
      <div className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-sm text-slate-900 dark:text-white">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </button>
  )
}