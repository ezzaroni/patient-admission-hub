import React, { useState } from 'react';
import { FormValues, Patient } from '../../../types';
import { DOCTORS, ROOM_CLASSES, ENTRY_WAYS, PAYMENT_METHODS, REFERRAL_ORIGINS, RELATIONS } from '../../../constants';
import { validatePatientForm, generateRegNumber } from '../../../utils';
import { Input, Select, TextArea, Button, SectionCard } from '../../common';

interface AdmissionFormProps {
  onCancel: () => void;
  onSubmit: (patient: FormValues) => void;
  initialData?: Patient | null;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ onCancel, onSubmit, initialData }) => {
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
      regNumber: generateRegNumber(),
      admissionDate: now.toISOString().slice(0, 16),
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

  const [errors, setErrors] = useState<ReturnType<typeof validatePatientForm>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePatientForm(values);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="space-y-8">
        <SectionCard title="1. Identitas Pasien" icon="person">
          <Input label="No. Rekam Medis (Auto)" name="id" placeholder="Generate Otomatis" required={false} disabled />
          <Input label="NIK (16 Digit)" name="nik" value={values.nik} onChange={handleChange} placeholder="Contoh: 3273..." error={errors.nik} />
          <Input label="Nama Lengkap" name="name" value={values.name} onChange={handleChange} placeholder="Sesuai KTP" error={errors.name} />
          <Input label="Tempat Lahir" name="pob" value={values.pob} onChange={handleChange} placeholder="Kota" required={false} />
          <Input label="Tanggal Lahir" name="dob" type="date" value={values.dob} onChange={handleChange} error={errors.dob} />
          <Select label="Jenis Kelamin" name="gender" value={values.gender} onChange={handleChange} options={['Laki-laki', 'Perempuan']} />
          <Input label="No. Handphone" name="phone" value={values.phone} onChange={handleChange} placeholder="08xxxxxxxx" error={errors.phone} />
          <TextArea label="Alamat Domisili" name="address" value={values.address} onChange={handleChange} placeholder="Alamat lengkap saat ini" />
        </SectionCard>

        <SectionCard title="2. Registrasi Kunjungan" icon="clinical_notes">
          <Input label="No. Registrasi (Auto)" name="regNumber" value={values.regNumber} placeholder="Generate Otomatis" required={false} disabled />
          <Input label="Tanggal & Jam Masuk" name="admissionDate" type="datetime-local" value={values.admissionDate} onChange={handleChange} />
          <Select label="Cara Masuk" name="entryWay" value={values.entryWay} onChange={handleChange} options={ENTRY_WAYS} />
          <Select label="Dokter DPJP" name="doctor" value={values.doctor} onChange={handleChange} options={DOCTORS} error={errors.doctor} />
          <Input label="Diagnosa Masuk" name="diagnosis" value={values.diagnosis} onChange={handleChange} placeholder="Diagnosa awal" />
          <TextArea label="Keluhan Utama" name="chiefComplaint" value={values.chiefComplaint} onChange={handleChange} placeholder="Alasan utama dirawat" required={false} />
        </SectionCard>

        {values.entryWay === 'Rujukan Luar' && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <SectionCard title="3. Data Rujukan" icon="assignment_return">
              <Select label="Asal Rujukan" name="referralOrigin" value={values.referralOrigin || ''} onChange={handleChange} options={REFERRAL_ORIGINS} />
              <Input label="Nama Faskes Perujuk" name="referralFacility" value={values.referralFacility || ''} onChange={handleChange} placeholder="Contoh: RSUD Madiun" error={errors.referralFacility} />
              <Input label="No. Surat Rujukan" name="referralLetterNumber" value={values.referralLetterNumber || ''} onChange={handleChange} placeholder="Nomor surat rujukan" error={errors.referralLetterNumber} />
              <Input label="Tanggal Surat Rujukan" name="referralDate" type="date" value={values.referralDate || ''} onChange={handleChange} />
              <Input label="Diagnosa Rujukan" name="referralDiagnosis" value={values.referralDiagnosis || ''} onChange={handleChange} placeholder="Diagnosa dari pengirim" required={false} />
            </SectionCard>
          </div>
        )}

        <SectionCard title="4. Penempatan Kamar" icon="bed">
          <Select label="Kelas Perawatan" name="roomClass" value={values.roomClass} onChange={handleChange} options={ROOM_CLASSES} />
          <Input label="Nama Ruangan / Bangsal" name="roomName" value={values.roomName} onChange={handleChange} placeholder="Contoh: Paviliun Anggrek" error={errors.roomName} />
          <Input label="Nomor Bed" name="bedNumber" value={values.bedNumber} onChange={handleChange} placeholder="Contoh: Bed 01" />
        </SectionCard>

        <SectionCard title="5. Penanggung Jawab Pasien" icon="family_restroom">
          <Input label="Nama Penanggung Jawab" name="guardianName" value={values.guardianName} onChange={handleChange} placeholder="Nama lengkap wali" />
          <Select label="Hubungan" name="guardianRelation" value={values.guardianRelation} onChange={handleChange} options={RELATIONS} />
          <Input label="No. HP Penanggung Jawab" name="guardianPhone" value={values.guardianPhone} onChange={handleChange} placeholder="08xxxx" />
          <TextArea label="Alamat Penanggung Jawab" name="guardianAddress" value={values.guardianAddress} onChange={handleChange} placeholder="Isi jika berbeda dengan pasien" required={false} />
        </SectionCard>

        <SectionCard title="6. Penjaminan Biaya" icon="payments">
          <Select label="Cara Bayar" name="paymentMethod" value={values.paymentMethod} onChange={handleChange} options={PAYMENT_METHODS} />
          {values.paymentMethod !== 'Umum-Pribadi' && (
            <Input label="Nomor Kartu / Polis" name="insuranceNumber" value={values.insuranceNumber || ''} onChange={handleChange} placeholder="Masukkan nomor kartu" />
          )}
          {values.paymentMethod === 'BPJS Kesehatan' && (
            <Select label="Kelas Hak Rawat" name="bpjsClass" value={values.bpjsClass || ''} onChange={handleChange} options={['Kelas 1', 'Kelas 2', 'Kelas 3']} />
          )}
        </SectionCard>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 pb-12">
          <Button type="submit" icon="save" className="w-full sm:w-auto px-12 py-4">
            {initialData ? 'Update Data Pasien' : 'Simpan Pendaftaran'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel} className="w-full sm:w-auto px-12 py-4">
            Batalkan
          </Button>
        </div>
      </form>
    </div>
  );
};
