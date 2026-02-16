import React from 'react';
import { Patient } from '../../../types';

interface StatCardsProps {
  patients: Patient[];
  onAdd: () => void;
  onViewPatient: (p: Patient) => void;
}

export const StatCards: React.FC<StatCardsProps> = ({ patients, onAdd, onViewPatient }) => {
  const displayPatients = patients.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayPatients.map((p) => (
        <div 
          key={p.id} 
          className="bg-card-light dark:bg-card-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative group overflow-hidden hover:shadow-md transition-shadow cursor-pointer" 
          onClick={() => onViewPatient(p)}
        >
          <div className="flex items-center justify-between mb-6">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              p.status === 'Kritis' ? 'bg-red-100 text-red-600' : 
              p.status === 'Pemulihan' ? 'bg-blue-100 text-blue-600' : 
              'bg-primary/10 text-primary'
            }`}>
              <span className="material-symbols-outlined text-lg">
                {p.status === 'Kritis' ? 'emergency' : p.status === 'Pemulihan' ? 'healing' : 'bed'}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider font-bold">
                {new Date(p.admissionDate).toLocaleString('id-ID', { month: 'short' })}
              </p>
              <p className="text-xl font-bold leading-none">
                {new Date(p.admissionDate).getDate()}
              </p>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-0.5 truncate">{p.name}</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark text-xs mb-5 truncate">{p.roomName}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                {p.name[0]}
              </div>
              <span className="text-[10px] font-medium text-text-muted-light dark:text-text-muted-dark">{p.status}</span>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-full border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={(e) => e.stopPropagation()}>
                <span className="material-symbols-outlined text-sm">visibility</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div 
        onClick={onAdd}
        className="bg-card-light dark:bg-card-dark p-5 rounded-2xl shadow-sm border border-primary/30 border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/5 transition-colors group"
      >
        <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center mb-3 transition-colors">
          <span className="material-symbols-outlined text-primary text-2xl">groups</span>
        </div>
        <p className="font-bold text-xl">{patients.length}</p>
        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Data Pasien Tersimpan</p>
      </div>
    </div>
  );
};
