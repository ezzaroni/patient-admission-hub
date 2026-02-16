
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const navItems: { label: string; view: ViewType; icon: string }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: 'dashboard' },
    { label: 'Registrasi', view: 'admission', icon: 'person_add' },
    { label: 'Daftar Pasien', view: 'inpatient', icon: 'groups' },
    { label: 'Kapasitas Bed', view: 'beds', icon: 'bed' },
    { label: 'Tagihan', view: 'billing', icon: 'receipt_long' },
    { label: 'Pengaturan', view: 'settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 h-screen flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col sticky top-0 z-40 transition-all duration-300">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 rotate-3 flex-shrink-0">
          <span className="material-symbols-outlined text-white text-xl font-black">bolt</span>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-lg font-black tracking-tight text-slate-800 dark:text-white leading-none truncate">Medinest</h1>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Main Menu</p>
        {navItems.map((item) => {
          const isActive = currentView === item.view || (item.view === 'inpatient' && currentView === 'details');
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] transition-transform duration-300 ${isActive ? 'font-bold scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className={`text-[13px] font-bold tracking-tight truncate ${isActive ? '' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section: Config */}
      <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-lg">dark_mode</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">Tampilan</span>
          </div>
          <div className="w-7 h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full relative p-0.5">
            <div className="dark:translate-x-3 translate-x-0 w-2.5 h-2.5 bg-white dark:bg-primary rounded-full transition-transform duration-300 shadow-sm"></div>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
