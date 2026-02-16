
import React, { useMemo } from 'react';
import { Patient, RoomClass } from '../types';
import { ROOM_CLASSES } from '../constants';

interface DashboardViewProps {
  patients: Patient[];
  onAdd: () => void;
  onViewPatient: (p: Patient) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ patients, onAdd, onViewPatient }) => {
  const displayPatients = useMemo(() => patients.slice(0, 3), [patients]);

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

  // Mock data for Bed Occupancy
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
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <p className="text-text-muted-light dark:text-text-muted-dark font-medium mb-1">Selamat datang kembali, dr. Kennedy Jones!</p>
          <h1 className="text-3xl md:text-4xl font-light text-text-main-light dark:text-text-main-dark leading-tight">
            Total <span className="text-primary font-bold">{patients.length} Pasien Inap</span> <span className="text-text-muted-light/40 dark:text-text-muted-dark/40 italic">/ Saat Ini</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-lg">tune</span>
            <span>Filter</span>
          </button>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform text-sm"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Registrasi Pasien</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayPatients.map((p) => (
          <div key={p.id} className="bg-card-light dark:bg-card-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative group overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => onViewPatient(p)}>
            <div className="flex items-center justify-between mb-6">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                p.status === 'Kritis' ? 'bg-red-100 text-red-600' : 
                p.status === 'Pemulihan' ? 'bg-blue-100 text-blue-600' : 
                'bg-primary/10 text-primary'
              }`}>
                <span className="material-symbols-outlined text-lg">{p.status === 'Kritis' ? 'emergency' : p.status === 'Pemulihan' ? 'healing' : 'bed'}</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
        </div>

        <div className="lg:col-span-1">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
