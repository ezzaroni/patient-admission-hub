export type Gender = 'Laki-laki' | 'Perempuan';
export type Status = 'Kritis' | 'Pemulihan' | 'Stabil';
export type EntryWay = 'IGD' | 'Rawat Jalan-Poli' | 'Rujukan Luar';
export type RoomClass = 'VVIP' | 'VIP' | 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'ICU';
export type PaymentMethod = 'Umum-Pribadi' | 'BPJS Kesehatan' | 'Asuransi Swasta' | 'Jaminan Perusahaan';

export interface Patient {
  id: string;
  nik: string;
  name: string;
  pob: string;
  dob: string;
  gender: Gender;
  phone: string;
  address: string;
  regNumber: string;
  admissionDate: string;
  entryWay: EntryWay;
  doctor: string;
  diagnosis: string;
  chiefComplaint: string;
  referralOrigin?: string;
  referralFacility?: string;
  referralLetterNumber?: string;
  referralDate?: string;
  referralDiagnosis?: string;
  referralFile?: string;
  roomClass: RoomClass;
  roomName: string;
  bedNumber: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianAddress: string;
  paymentMethod: PaymentMethod;
  insuranceNumber?: string;
  bpjsClass?: string;
  status: Status;
}

export interface FormValues extends Omit<Patient, 'id' | 'status'> {}
