
import React from 'react';
import { Patient } from '../types';

interface PatientDetailsProps {
  patient: Patient;
  onBack: () => void;
  onEdit: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onBack, onEdit }) => {
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Kritis': return 'bg-red-500 text-white';
      case 'Pemulihan': return 'bg-blue-500 text-white';
      case 'Stabil': return 'bg-teal-600 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const DataRow = ({ label, value, icon, fullWidth }: { label: string; value: string | undefined; icon?: string; fullWidth?: boolean }) => (
    <div className={`py-4 border-b border-slate-50 dark:border-slate-800/50 ${fullWidth ? 'col-span-full' : ''}`}>
      <dt className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1 flex items-center gap-2">
        {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
        {label}
      </dt>
      <dd className="text-sm font-bold text-slate-700 dark:text-slate-200">{value || '-'}</dd>
    </div>
  );

  const SectionHeader = ({ title, number }: { title: string; number: string }) => (
    <div className="flex items-center gap-4 mt-12 mb-6">
      <div className="flex-none w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center text-xs font-black">
        {number}
      </div>
      <h3 className="text-lg font-black tracking-tight text-slate-800 dark:text-slate-100 uppercase">{title}</h3>
      <div className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Action Header */}
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
          KEMBALI KE DAFTAR
        </button>
        <div className="flex gap-3">
          <button onClick={onEdit} className="px-6 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span> UBAH DATA
          </button>
          <button className="px-6 py-2.5 bg-primary text-black rounded-full text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-sm">print</span> CETAK BERKAS
          </button>
        </div>
      </div>

      {/* Profile Info Sheet */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        
        {/* Profile Identity Header (Avatar Removed) */}
        <div className="relative px-10 py-12 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  {patient.name}
                </h1>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(patient.status)} h-fit`}>
                  {patient.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <span className="flex items-center gap-1.5 font-bold"><span className="material-symbols-outlined text-lg opacity-50">fingerprint</span> No. RM: <span className="text-primary">{patient.id}</span></span>
                <span className="flex items-center gap-1.5 font-bold"><span className="material-symbols-outlined text-lg opacity-50">clinical_notes</span> No. Reg: {patient.regNumber}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg opacity-50">wc</span> {patient.gender} • {calculateAge(patient.dob)} thn</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2 text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Penempatan Saat Ini</p>
              <p className="text-2xl font-black text-primary leading-none mb-1">{patient.roomName} / {patient.bedNumber}</p>
              <p className="text-xs font-bold text-slate-500 bg-slate-200/50 dark:bg-slate-700 px-3 py-1 rounded-md">{patient.roomClass}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-10 py-4">
          
          {/* 1. DATA IDENTITAS */}
          <SectionHeader title="Identitas Pasien" number="01" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12">
            <DataRow label="NIK" value={patient.nik} icon="id_card" />
            <DataRow label="Tempat Lahir" value={patient.pob} icon="location_city" />
            <DataRow label="Tanggal Lahir" value={new Date(patient.dob).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} icon="calendar_today" />
            <DataRow label="Nomor Handphone" value={patient.phone} icon="call" />
            <DataRow label="Alamat Domisili" value={patient.address} icon="home" fullWidth />
          </div>

          {/* 2. REGISTRASI KUNJUNGAN */}
          <SectionHeader title="Registrasi Kunjungan" number="02" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12">
            <DataRow label="Waktu Masuk" value={new Date(patient.admissionDate).toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} icon="schedule" />
            <DataRow label="Cara Masuk" value={patient.entryWay} icon="login" />
            <DataRow label="Dokter DPJP" value={patient.doctor} icon="medical_services" />
            <DataRow label="Diagnosa Masuk" value={patient.diagnosis} icon="stethoscope" fullWidth />
            <DataRow label="Keluhan Utama" value={patient.chiefComplaint} icon="error" fullWidth />
          </div>

          {/* 3. DATA RUJUKAN (Conditional) */}
          {patient.entryWay === 'Rujukan Luar' && (
            <>
              <SectionHeader title="Informasi Rujukan" number="03" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 bg-teal-50/30 dark:bg-teal-900/10 px-6 rounded-3xl mb-8">
                <DataRow label="Asal Rujukan" value={patient.referralOrigin} />
                <DataRow label="Faskes Perujuk" value={patient.referralFacility} />
                <DataRow label="Nomor Surat" value={patient.referralLetterNumber} />
                <DataRow label="Tanggal Surat" value={patient.referralDate ? new Date(patient.referralDate).toLocaleDateString('id-ID') : '-'} />
                <DataRow label="Diagnosa Rujukan" value={patient.referralDiagnosis} fullWidth />
              </div>
            </>
          )}

          {/* 4. PENEMPATAN KAMAR */}
          <SectionHeader title="Penempatan Kamar" number={patient.entryWay === 'Rujukan Luar' ? "04" : "03"} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
            <DataRow label="Kelas Perawatan" value={patient.roomClass} icon="hotel_class" />
            <DataRow label="Nama Ruangan / Bangsal" value={patient.roomName} icon="meeting_room" />
            <DataRow label="Nomor Bed" value={patient.bedNumber} icon="bed" />
          </div>

          {/* 5. PENANGGUNG JAWAB */}
          <SectionHeader title="Penanggung Jawab" number={patient.entryWay === 'Rujukan Luar' ? "05" : "04"} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
            <DataRow label="Nama Lengkap" value={patient.guardianName} icon="person" />
            <DataRow label="Hubungan" value={patient.guardianRelation} icon="family_restroom" />
            <DataRow label="Nomor HP Penanggung Jawab" value={patient.guardianPhone} icon="call" />
            <DataRow label="Alamat Penanggung Jawab" value={patient.guardianAddress} icon="location_on" fullWidth />
          </div>

          {/* 6. PENJAMINAN BIAYA */}
          <SectionHeader title="Penjaminan Biaya" number={patient.entryWay === 'Rujukan Luar' ? "06" : "05"} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 mb-12">
            <DataRow label="Cara Bayar" value={patient.paymentMethod} icon="payments" />
            <DataRow label="Nomor Kartu / Polis" value={patient.insuranceNumber || '-'} icon="credit_card" />
            {patient.paymentMethod === 'BPJS Kesehatan' && (
              <DataRow label="Hak Kelas Rawat" value={patient.bpjsClass} icon="verified" />
            )}
          </div>

        </div>

        {/* Footer Sheet Info */}
        <div className="px-10 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dicetak otomatis oleh SIMRS Medinest pada {new Date().toLocaleString('id-ID')}</p>
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <div className="w-8 h-2 rounded-full bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
