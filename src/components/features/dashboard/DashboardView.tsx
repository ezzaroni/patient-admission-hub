import React, { useMemo } from 'react';
import { Patient } from '../../../types';
import { StatCards } from './StatCards';
import { MonthlyChart } from './MonthlyChart';
import { BedOccupancy } from './BedOccupancy';
import { TopComplaints } from './TopComplaints';
import { Button } from '../../common';

interface DashboardViewProps {
  patients: Patient[];
  onAdd: () => void;
  onViewPatient: (p: Patient) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ patients, onAdd, onViewPatient }) => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <p className="text-text-muted-light dark:text-text-muted-dark font-medium mb-1">
            Selamat datang kembali, dr. Kennedy Jones!
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-text-main-light dark:text-text-main-dark leading-tight">
            Total <span className="text-primary font-bold">{patients.length} Pasien Inap</span>{' '}
            <span className="text-text-muted-light/40 dark:text-text-muted-dark/40 italic">/ Saat Ini</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-lg">tune</span>
            <span>Filter</span>
          </button>
          <Button onClick={onAdd} icon="add" className="px-5 py-2.5 text-sm">
            Registrasi Pasien
          </Button>
        </div>
      </div>

      <StatCards patients={patients} onAdd={onAdd} onViewPatient={onViewPatient} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MonthlyChart patients={patients} />
          <TopComplaints patients={patients} />
        </div>
        <div className="lg:col-span-1">
          <BedOccupancy patients={patients} />
        </div>
      </div>
    </div>
  );
};
