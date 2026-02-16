
import React, { useState } from 'react';
import { 
  DOCTORS, ROOM_CLASSES, ENTRY_WAYS, PAYMENT_METHODS, 
  REFERRAL_ORIGINS, RELATIONS 
} from '../constants';
import { FormValues, Patient } from '../types';

interface SectionCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

// Move SectionCard outside to fix scope and children type inference issues
const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-6">
    <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-700 pb-4 mb-6">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

interface AdmissionFormProps {
  onCancel: () => void;
  onSubmit: (patient: FormValues) => void;
  initialData?: Patient | null;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ onCancel, onSubmit, initialData }) => {
  const [values, setValues] = useState<FormValues>(() => {
    if (initialData) {
      const { id, status, ...rest } = initialData;
      return rest;
    }
    const now = new Date();
    return {
      name: '',
      nik: '',
      gender: 'Laki-laki',
      pob: '',
      dob: '',
      phone: '',
      address: '',
      regNumber: `REG-${Date.now().toString().slice(-8)}`,
      admissionDate: now.toISOString().slice(0, 16), // Format for datetime-local
      entryWay: 'IGD',
      doctor: '',
      diagnosis: '',
      chiefComplaint: '',
      roomClass: 'Kelas 1',
      roomName: '',
      bedNumber: '',
      guardianName: '',
      guardianRelation: 'Lainnya',
      guardianPhone: '',
      guardianAddress: '',
      paymentMethod: 'Umum-Pribadi',
      insuranceNumber: '',
      bpjsClass: '',
      referralOrigin: '',
      referralFacility: '',
      referralLetterNumber: '',
      referralDate: '',
      referralDiagnosis: ''
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) newErrors.name = 'Wajib diisi';
    if (values.nik.length !== 16) newErrors.nik = 'NIK harus 16 digit';
    if (!values.phone) newErrors.phone = 'Wajib diisi';
    if (!values.dob) newErrors.dob = 'Wajib diisi';
    if (!values.doctor) newErrors.doctor = 'Pilih dokter';
    if (!values.roomName) newErrors.roomName = 'Wajib diisi';
    
    // Conditional validation for referral
    if (values.entryWay === 'Rujukan Luar') {
      if (!values.referralFacility) newErrors.referralFacility = 'Wajib diisi';
      if (!values.referralLetterNumber) newErrors.referralLetterNumber = 'Wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const Input = ({ label, name, type = "text", placeholder, options, required = true, isTextArea = false }: any) => (
    <div className={`space-y-1.5 ${isTextArea ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select 
          name={name}
          value={(values as any)[name]}
          onChange={handleChange}
          className={`w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-primary focus:border-primary transition-all text-sm appearance-none ${errors[name as keyof FormValues] ? 'border-red-500' : ''}`}
        >
          <option value="">-- Pilih --</option>
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : isTextArea ? (
        <textarea
          name={name}
          value={(values as any)[name]}
          onChange={handleChange}
          rows={3}
          placeholder={placeholder}
          className={`w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-primary focus:border-primary transition-all text-sm ${errors[name as keyof FormValues] ? 'border-red-500' : ''}`}
        />
      ) : (
        <input 
          type={type}
          name={name}
          value={(values as any)[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-primary focus:border-primary transition-all text-sm ${errors[name as keyof FormValues] ? 'border-red-500' : ''}`}
        />
      )}
      {errors[name as keyof FormValues] && <p className="text-[10px] text-red-500 ml-1">{errors[name as keyof FormValues]}</p>}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <form onSubmit={(e) => { e.preventDefault(); if (validate()) onSubmit(values); }} className="space-y-8">
        
        {/* 1. DATA IDENTITAS */}
        <SectionCard title="1. Identitas Pasien" icon="person">
          <Input label="No. Rekam Medis (Auto)" name="id" placeholder="Generate Otomatis" required={false} />
          <Input label="NIK (16 Digit)" name="nik" placeholder="Contoh: 3273..." />
          <Input label="Nama Lengkap" name="name" placeholder="Sesuai KTP" />
          <Input label="Tempat Lahir" name="pob" placeholder="Kota" required={false} />
          <Input label="Tanggal Lahir" name="dob" type="date" />
          <Input label="Jenis Kelamin" name="gender" options={['Laki-laki', 'Perempuan']} />
          <Input label="No. Handphone" name="phone" placeholder="08xxxxxxxx" />
          <Input label="Alamat Domisili" name="address" isTextArea placeholder="Alamat lengkap saat ini" />
        </SectionCard>

        {/* 2. DATA REGISTRASI */}
        <SectionCard title="2. Registrasi Kunjungan" icon="clinical_notes">
          <Input label="No. Registrasi (Auto)" name="regNumber" placeholder="Generate Otomatis" required={false} />
          <Input label="Tanggal & Jam Masuk" name="admissionDate" type="datetime-local" />
          <Input label="Cara Masuk" name="entryWay" options={ENTRY_WAYS} />
          <Input label="Dokter DPJP" name="doctor" options={DOCTORS} />
          <Input label="Diagnosa Masuk" name="diagnosis" placeholder="Diagnosa awal" />
          <Input label="Keluhan Utama" name="chiefComplaint" isTextArea placeholder="Alasan utama dirawat" required={false} />
        </SectionCard>

        {/* 3. DATA RUJUKAN - KONDISIONAL */}
        {values.entryWay === 'Rujukan Luar' && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <SectionCard title="3. Data Rujukan" icon="assignment_return">
              <Input label="Asal Rujukan" name="referralOrigin" options={REFERRAL_ORIGINS} />
              <Input label="Nama Faskes Perujuk" name="referralFacility" placeholder="Contoh: RSUD Madiun" />
              <Input label="No. Surat Rujukan" name="referralLetterNumber" placeholder="Nomor surat rujukan" />
              <Input label="Tanggal Surat Rujukan" name="referralDate" type="date" />
              <Input label="Diagnosa Rujukan" name="referralDiagnosis" placeholder="Diagnosa dari pengirim" required={false} />
            </SectionCard>
          </div>
        )}

        {/* 4. PENEMPATAN KAMAR */}
        <SectionCard title="4. Penempatan Kamar" icon="bed">
          <Input label="Kelas Perawatan" name="roomClass" options={ROOM_CLASSES} />
          <Input label="Nama Ruangan / Bangsal" name="roomName" placeholder="Contoh: Paviliun Anggrek" />
          <Input label="Nomor Bed" name="bedNumber" placeholder="Contoh: Bed 01" />
        </SectionCard>

        {/* 5. PENANGGUNG JAWAB */}
        <SectionCard title="5. Penanggung Jawab Pasien" icon="family_restroom">
          <Input label="Nama Penanggung Jawab" name="guardianName" placeholder="Nama lengkap wali" />
          <Input label="Hubungan" name="guardianRelation" options={RELATIONS} />
          <Input label="No. HP Penanggung Jawab" name="guardianPhone" placeholder="08xxxx" />
          <Input label="Alamat Penanggung Jawab" name="guardianAddress" isTextArea placeholder="Isi jika berbeda dengan pasien" required={false} />
        </SectionCard>

        {/* 6. PENJAMINAN BIAYA */}
        <SectionCard title="6. Penjaminan Biaya" icon="payments">
          <Input label="Cara Bayar" name="paymentMethod" options={PAYMENT_METHODS} />
          {values.paymentMethod !== 'Umum-Pribadi' && (
            <Input label="Nomor Kartu / Polis" name="insuranceNumber" placeholder="Masukkan nomor kartu" />
          )}
          {values.paymentMethod === 'BPJS Kesehatan' && (
            <Input label="Kelas Hak Rawat" name="bpjsClass" options={['Kelas 1', 'Kelas 2', 'Kelas 3']} />
          )}
        </SectionCard>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 pb-12">
          <button type="submit" className="w-full sm:w-auto px-12 py-4 bg-primary text-black font-black rounded-full hover:brightness-110 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">save</span>
            {initialData ? 'Update Data Pasien' : 'Simpan Pendaftaran'}
          </button>
          <button type="button" onClick={onCancel} className="w-full sm:w-auto px-12 py-4 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-full hover:bg-slate-300 transition-all">
            Batalkan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
