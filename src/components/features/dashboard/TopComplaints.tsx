import React, { useMemo } from 'react';
import { Patient } from '../../../types';

interface TopComplaintsProps {
  patients: Patient[];
}

export const TopComplaints: React.FC<TopComplaintsProps> = ({ patients }) => {
  const topComplaints = useMemo(() => {
    const counts: Record<string, number> = {};
    patients.forEach(p => {
      counts[p.diagnosis] = (counts[p.diagnosis] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [patients]);

  return (
    <div className="bg-card-light dark:bg-card-dark p-7 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Top 10 Tren Keluhan</h2>
          <p className="text-xs text-text-muted-light">Analisis diagnosa masuk paling sering</p>
        </div>
        <span className="material-symbols-outlined text-primary text-2xl">insights</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        {topComplaints.map((item, index) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">#{index + 1}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{item.name}</span>
              </div>
              <span className="font-bold text-primary">{item.count} Kasus</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(5, (item.count / (topComplaints[0]?.count || 1)) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
