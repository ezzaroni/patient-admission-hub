import React, { useState } from 'react';
import { ViewType, Patient, FormValues } from './types';
import { usePatients } from './hooks';
import { MainLayout } from './components/layout';
import { DashboardView } from './components/features/dashboard';
import { AdmissionForm } from './components/features/admission';
import { LoadingSpinner } from './components/common';
import Sidebar from './components/Sidebar';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import StatCards from './components/StatCards';
import SupportChat from './components/SupportChat';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
  
  const { patients, loading, addPatient, updatePatient } = usePatients();

  const handleAdmission = (formData: FormValues) => {
    if (selectedPatient) {
      updatePatient(selectedPatient.id, formData);
    } else {
      addPatient(formData);
    }
    setView('inpatient');
    setSelectedPatient(null);
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
      return <LoadingSpinner />;
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
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-2">
                Pendaftaran Rawat Inap
              </p>
              <h1 className="text-4xl font-light tracking-tight leading-tight">
                {selectedPatient ? 'Ubah Data' : 'Registrasi'}{' '}
                <span className="text-primary font-black">Pasien Baru</span>
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
      <Sidebar currentView={view} onNavigate={handleNavigate} />
      <MainLayout>
        {renderContent()}
      </MainLayout>
      <SupportChat isOpen={isSupportChatOpen} onClose={toggleSupportChat} />
    </div>
  );
};

export default App;
