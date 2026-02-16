
export type Gender = 'Laki-laki' | 'Perempuan';
export type Status = 'Kritis' | 'Pemulihan' | 'Stabil';
export type EntryWay = 'IGD' | 'Rawat Jalan-Poli' | 'Rujukan Luar';
export type RoomClass = 'VVIP' | 'VIP' | 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'ICU';
export type PaymentMethod = 'Umum-Pribadi' | 'BPJS Kesehatan' | 'Asuransi Swasta' | 'Jaminan Perusahaan';

export interface Patient {
  // 1. Identitas Pasien
  id: string; // Nomor Rekam Medis (No. RM)
  nik: string;
  name: string;
  pob: string; // Tempat Lahir
  dob: string; // Tanggal Lahir
  gender: Gender;
  phone: string;
  address: string;

  // 2. Registrasi Kunjungan
  regNumber: string; // Nomor Registrasi
  admissionDate: string; // Tanggal & Jam Masuk (ISO String)
  entryWay: EntryWay;
  doctor: string; // DPJP
  diagnosis: string; // Diagnosa Masuk
  chiefComplaint: string; // Keluhan Utama

  // 3. Data Rujukan (Kondisional)
  referralOrigin?: string; // Asal Rujukan
  referralFacility?: string; // Nama Faskes Perujuk
  referralLetterNumber?: string;
  referralDate?: string;
  referralDiagnosis?: string;
  referralFile?: string; // Path/URL file

  // 4. Penempatan Kamar
  roomClass: RoomClass;
  roomName: string; // Bangsal
  bedNumber: string;

  // 5. Penanggung Jawab Pasien
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianAddress: string;

  // 6. Penjaminan Biaya
  paymentMethod: PaymentMethod;
  insuranceNumber?: string; // Nomor Kartu / Polis
  bpjsClass?: string; // Khusus BPJS (Kelas 1, 2, 3)

  status: Status; // Status klinis internal sistem
}

export interface FormValues extends Omit<Patient, 'id' | 'status'> {}

export type ViewType = 'dashboard' | 'admission' | 'inpatient' | 'beds' | 'billing' | 'settings' | 'details';
