import React, { useMemo } from 'react';
import { Patient } from '../../../types';

interface MonthlyChartProps {
  patients: Patient[];
}

export const MonthlyChart: React.FC<MonthlyChartProps> = ({ patients }) => {
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const counts = new Array(12).fill(0);
    
    patients.forEach(p => {
      const monthIndex = new Date(p.admissionDate).getMonth();
      counts[monthIndex]++;
    });

    const maxVal = Math.max(...counts, 1);
    
    return months.map((label, i) => ({
      label,
      count: counts[i],
      height: `${Math.max(10, (counts[i] / maxVal) * 100)}%`,
      active: i === new Date().getMonth()
    }));
  }, [patients]);

  return (
    <div className="bg-card-light dark:bg-card-dark p-7 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Tren Pasien Masuk</h2>
          <p className="text-xs text-text-muted-light">Statistik berdasarkan {patients.length} pasien terakhir</p>
        </div>
        <div className="bg-primary/10 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
          Tahun 2024
        </div>
      </div>
      
      <div className="relative h-56 flex items-end justify-between gap-2 px-1 mt-12">
        {monthlyData.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center flex-1 relative h-full justify-end">
            <div 
              style={{ height: bar.height }}
              className={`w-full group rounded-t-md transition-all duration-1000 relative ${
                bar.active 
                  ? 'bg-primary shadow-lg shadow-primary/40' 
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-primary/30'
              }`}
            >
              <span className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-black ${bar.active ? 'text-primary' : 'text-slate-400'}`}>
                {bar.count}
              </span>
            </div>
            <span className={`text-[9px] mt-2 uppercase font-bold tracking-tighter ${bar.active ? 'text-primary' : 'text-text-muted-light'}`}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
