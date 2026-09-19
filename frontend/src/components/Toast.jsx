import React from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-900/90 text-emerald-100 border-emerald-500/50',
    error: 'bg-rose-900/90 text-rose-100 border-rose-500/50',
    info: 'bg-slate-900/90 text-slate-100 border-campus-500/50'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-campus-400 shrink-0" />
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 max-w-md ${bgStyles[type]}`}>
      {icons[type]}
      <p className="text-sm font-medium pr-2">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-auto text-slate-300 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
