import React from 'react';
import { formatDate } from '../../utils';

export const Header: React.FC = () => {
  return (
    <div className="sticky top-0 z-30 px-6 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-between border-b border-slate-100/50 dark:border-slate-800/50 gap-8">
      <div className="relative group flex-1 max-w-xl">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors group-focus-within:text-primary">
          search
        </span>
        <input 
          type="text" 
          placeholder="Cari data pasien, tagihan, atau dokter..." 
          className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-full py-2.5 pl-11 pr-4 text-xs font-medium focus:ring-primary focus:border-primary transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden xl:block">
          {formatDate(new Date())}
        </p>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

        <div className="relative">
          <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            notifications
          </span>
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-background-light dark:border-background-dark rounded-full"></div>
        </div>

        <div className="flex items-center gap-4 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-800 dark:text-white leading-none">dr. Kennedy Jones</p>
            <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-1">Administrator</p>
          </div>
          <div className="relative group cursor-pointer">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
              src="https://picsum.photos/seed/medinest-admin/100/100"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-primary border-2 border-background-light dark:border-background-dark rounded-full"></div>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
