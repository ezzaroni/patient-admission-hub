
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import AdmissionForm from './components/AdmissionForm';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import DashboardView from './components/DashboardView';
import StatCards from './components/StatCards';
import SupportChat from './components/SupportChat';
import { Patient, ViewType, FormValues } from './types';
import { MOCK_PATIENTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);

  const fetchPatients = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPatients(MOCK_PATIENTS);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const generateUID = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.floor(1000 + Math.random() * 9000); 
    return `RM-${dateStr}-${randomStr}`;
  };

  const handleAdmission = (formData: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      if (selectedPatient) {
        setPatients(prev => prev.map(p => p.id === selectedPatient.id ? { ...p, ...formData } : p));
      } else {
        const newPatient: Patient = {
          ...formData,
          id: generateUID(),
          status: 'Stabil'
        };
        setPatients(prev => [newPatient, ...prev]);
      }
      setView('inpatient');
      setSelectedPatient(null);
      setLoading(false);
    }, 500);
  };

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setView('details');
  };

  const handleEditPatient = () => {
    setView('admission');
  };

  const handleNavigate = (viewType: ViewType) => {
    setView(viewType);
    if (viewType === 'admission' || viewType === 'inpatient' || viewType === 'dashboard') {
      setSelectedPatient(null);
    }
  };

  const toggleSupportChat = () => {
    setIsSupportChatOpen(prev => !prev);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="h-full flex flex-col items-center justify-center py-40">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-text-muted-light font-bold uppercase tracking-[0.2em] animate-pulse">Sinkronisasi Data SIMRS...</p>
        </div>
      );
    }

    switch (view) {
      case 'dashboard':
        return (
          <DashboardView 
            patients={patients} 
            onAdd={() => handleNavigate('admission')}
            onViewPatient={handleViewDetails}
          />
        );
      case 'admission':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-2">Pendaftaran Rawat Inap</p>
              <h1 className="text-4xl font-light tracking-tight leading-tight">
                {selectedPatient ? 'Ubah Data' : 'Registrasi'} <span className="text-primary font-black">Pasien Baru</span>
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-9">
                <AdmissionForm 
                  onCancel={() => handleNavigate('dashboard')} 
                  onSubmit={handleAdmission} 
                  initialData={selectedPatient}
                />
              </div>
              <div className="lg:col-span-3">
                <StatCards onSupportClick={toggleSupportChat} />
              </div>
            </div>
          </div>
        );
      case 'inpatient':
        return (
          <div className="animate-in fade-in duration-500">
            <PatientList 
              patients={patients} 
              loading={loading} 
              onAdd={() => handleNavigate('admission')}
              onViewDetails={handleViewDetails}
            />
          </div>
        );
      case 'details':
        return selectedPatient ? (
          <PatientDetails 
            patient={selectedPatient} 
            onBack={() => setView('inpatient')} 
            onEdit={handleEditPatient}
          />
        ) : null;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-24 bg-card-light dark:bg-card-dark rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
            <span className="material-symbols-outlined text-7xl text-slate-200 mb-4">construction</span>
            <h2 className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em]">Modul Pengembangan</h2>
            <p className="text-xs text-slate-400 mt-2">Sistem ini sedang diupdate oleh tim IT Support.</p>
            <button 
              onClick={() => setView('dashboard')}
              className="mt-8 px-10 py-3.5 bg-primary text-slate-900 font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              Kembali ke Beranda
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-sans selection:bg-primary/30 overflow-hidden transition-colors duration-300">
      {/* Navigation Sidebar */}
      <Sidebar currentView={view} onNavigate={handleNavigate} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Top Floating Info Bar - Header with Search & User Profile */}
        <div className="sticky top-0 z-30 px-6 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-between border-b border-slate-100/50 dark:border-slate-800/50 gap-8">
          
          {/* Global Search */}
          <div className="relative group flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors group-focus-within:text-primary">search</span>
            <input 
              type="text" 
              placeholder="Cari data pasien, tagihan, atau dokter..." 
              className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-full py-2.5 pl-11 pr-4 text-xs font-medium focus:ring-primary focus:border-primary transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-6">
            {/* Date Display */}
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden xl:block">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

            {/* Notifications */}
            <div className="relative">
              <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">notifications</span>
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-background-light dark:border-background-dark rounded-full"></div>
            </div>

            {/* User Profile Area */}
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

        {/* Main content wrapper */}
        <div className="flex-1 w-full max-w-full px-8 py-6">
          {renderContent()}
          
          <footer className="mt-20 py-10 text-center text-text-muted-light dark:text-text-muted-dark text-[10px]">
            <div className="space-y-4">
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 w-full"></div>
              <p className="uppercase tracking-[0.2em] font-bold opacity-60">© 2024 Medinest Healthcare SIMRS • Integrated Hospital Solutions</p>
            </div>
          </footer>
        </div>
      </main>

      {/* Floating Support Hub */}
      <SupportChat 
        isOpen={isSupportChatOpen} 
        onClose={toggleSupportChat} 
      />
    </div>
  );
};

export default App;
