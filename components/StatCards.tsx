
import React from 'react';

interface StatCardsProps {
  onSupportClick?: () => void;
}

const StatCards: React.FC<StatCardsProps> = ({ onSupportClick }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-white dark:border-slate-700/50">
        <h3 className="font-bold text-base mb-3 ml-1">Ringkasan Kapasitas</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 pl-4 pr-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">bed</span>
              </div>
              <div>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-tight">Bed Tersedia</p>
                <p className="font-bold text-xs">12 Kamar</p>
              </div>
            </div>
            <span className="text-[9px] bg-primary/20 text-slate-900 dark:text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Aman</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 pl-4 pr-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">groups</span>
              </div>
              <div>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-tight">Petugas On-Duty</p>
                <p className="font-bold text-xs">24 Perawat</p>
              </div>
            </div>
            <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Aktif</span>
          </div>
        </div>
      </div>

      <div className="bg-primary rounded-3xl p-6 text-slate-900 relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="font-bold text-base mb-1">Butuh Bantuan?</h4>
          <p className="text-[11px] opacity-75 mb-4 leading-snug">Hubungi administrator sistem jika Anda mengalami kendala pada pengisian formulir.</p>
          <button 
            onClick={onSupportClick}
            className="bg-slate-900 text-white text-[10px] font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-lg active:scale-95 transition-transform"
          >
            Hubungi Support
          </button>
        </div>
        <span className="material-symbols-outlined absolute -right-5 -bottom-5 text-slate-900/10 text-[100px] rotate-12 transition-transform group-hover:scale-110">help_center</span>
      </div>
    </div>
  );
};

export default StatCards;
