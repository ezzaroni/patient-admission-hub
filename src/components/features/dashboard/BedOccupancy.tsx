import React, { useMemo } from 'react';
import { Patient, RoomClass } from '../../../types';
import { ROOM_CLASSES } from '../../../constants';

interface BedOccupancyProps {
  patients: Patient[];
}

export const BedOccupancy: React.FC<BedOccupancyProps> = ({ patients }) => {
  const bedOccupancy = useMemo(() => {
    const capacities: Record<RoomClass, number> = {
      'VVIP': 10,
      'VIP': 20,
      'Kelas 1': 40,
      'Kelas 2': 60,
      'Kelas 3': 100,
      'ICU': 15
    };

    const usage: Record<string, number> = {};
    patients.forEach(p => {
      usage[p.roomClass] = (usage[p.roomClass] || 0) + 1;
    });

    return ROOM_CLASSES.map(cls => {
      const occupied = usage[cls] || 0;
      const total = capacities[cls];
      const percentage = Math.min(100, Math.floor((occupied / total) * 100));
      return {
        class: cls,
        occupied,
        total,
        percentage,
        status: percentage > 90 ? 'Penuh' : percentage > 70 ? 'Terbatas' : 'Tersedia'
      };
    });
  }, [patients]);

  const totalOccupancy = useMemo(() => {
    const totalBeds = bedOccupancy.reduce((acc, curr) => acc + curr.total, 0);
    const occupiedBeds = bedOccupancy.reduce((acc, curr) => acc + curr.occupied, 0);
    return Math.floor((occupiedBeds / totalBeds) * 100);
  }, [bedOccupancy]);

  return (
    <div className="bg-card-light dark:bg-card-dark p-7 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 h-full sticky top-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold">Hunian Bed</h2>
          <p className="text-[10px] text-text-muted-light uppercase font-black tracking-widest mt-1">Live Monitoring</p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex flex-col items-center justify-center text-primary">
          <p className="text-sm font-black">{totalOccupancy}%</p>
          <p className="text-[7px] font-bold uppercase">Total</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {bedOccupancy.map((bed) => (
          <div key={bed.class} className="group cursor-default">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  bed.status === 'Penuh' ? 'bg-red-500' : bed.status === 'Terbatas' ? 'bg-amber-500' : 'bg-primary'
                }`}></span>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{bed.class}</p>
              </div>
              <p className="text-[10px] font-black text-slate-400">
                {bed.occupied} / {bed.total} <span className="ml-1 opacity-50 uppercase">Beds</span>
              </p>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  bed.percentage > 90 ? 'bg-red-500' : bed.percentage > 70 ? 'bg-amber-500' : 'bg-primary'
                }`}
                style={{ width: `${bed.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}

        <div className="pt-6 border-t border-slate-50 dark:border-slate-800 mt-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl space-y-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Aksi Cepat</p>
            <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold hover:border-primary transition-all">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">swap_horiz</span>
                Mutasi Pasien (Bed)
              </span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold hover:border-primary transition-all">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">cleaning_services</span>
                Request Kebersihan
              </span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-2xl border border-primary/20">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-lg">info</span>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Rangkuman Kapasitas</p>
              <p className="text-[9px] text-slate-500 leading-relaxed">
                Terdapat <span className="font-bold text-primary">12 bed kosong</span> hari ini. ICU terpantau stabil dengan okupansi <span className="font-bold">75%</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
