import { Patient } from '../types';
import { DOCTORS, ROOM_CLASSES, ENTRY_WAYS, PAYMENT_METHODS, REFERRAL_ORIGINS, RELATIONS, ROOMS } from './options';

const DIAGNOSES = [
  'Demam Berdarah Dengue (DBD)', 
  'Tipes (Typhoid Fever)', 
  'Radang Paru (Pneumonia)', 
  'Diabetes Melitus', 
  'Hipertensi', 
  'Appendisitis Akut', 
  'Fraktur Femur', 
  'Stroke Iskemik',
  'Gagal Ginjal Akut',
  'Asma Bronkial',
  'Gastritis Akut',
  'Infeksi Saluran Kemih'
];

const NAMES = [
  'Andi Pratama', 'Siti Aminah', 'Budi Santoso', 'Dewi Lestari', 
  'Eko Wijaya', 'Fitri Rahayu', 'Guntur Saputra', 'Hani Permata',
  'Iwan Setiawan', 'Joko Susilo', 'Kartika Sari', 'Lina Marlina',
  'Maman Abdurrahman', 'Nina Zatulini', 'Oman Sukirman', 'Putri Wangi',
  'Qory Sandioriva', 'Rian D\'Masiv', 'Siska Amelia', 'Taufik Hidayat'
];

const generateMockPatients = (): Patient[] => {
  const patients: Patient[] = [];
  const statuses: Patient['status'][] = ['Stabil', 'Kritis', 'Pemulihan'];

  for (let i = 1; i <= 200; i++) {
    const admissionDate = new Date();
    admissionDate.setDate(admissionDate.getDate() - Math.floor(Math.random() * 365));
    
    patients.push({
      id: `RM-${2024000 + i}`,
      nik: `3273${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      name: NAMES[i % NAMES.length] + ' ' + (i % 3 === 0 ? 'Jr.' : ''),
      pob: 'Jakarta',
      dob: '1990-05-15',
      gender: i % 2 === 0 ? 'Laki-laki' : 'Perempuan',
      phone: `0812${Math.floor(10000000 + Math.random() * 90000000)}`,
      address: 'Jl. Raya Kesehatan No. ' + i,
      regNumber: `REG-${2024000000 + i}`,
      admissionDate: admissionDate.toISOString(),
      entryWay: i % 3 === 0 ? 'Rujukan Luar' : 'IGD',
      doctor: DOCTORS[i % DOCTORS.length],
      diagnosis: DIAGNOSES[i % DIAGNOSES.length],
      chiefComplaint: 'Keluhan pasien nomor ' + i + ' perlu diobservasi lebih lanjut.',
      roomClass: ROOM_CLASSES[i % ROOM_CLASSES.length],
      roomName: ROOMS[i % ROOMS.length],
      bedNumber: `Bed ${(i % 10) + 1}`,
      guardianName: 'Wali dari ' + NAMES[i % NAMES.length],
      guardianRelation: RELATIONS[i % RELATIONS.length],
      guardianPhone: '081200001111',
      guardianAddress: 'Sama dengan pasien',
      paymentMethod: PAYMENT_METHODS[i % PAYMENT_METHODS.length],
      insuranceNumber: i % 2 === 0 ? `INS-${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
      bpjsClass: i % 2 === 0 ? 'Kelas 1' : undefined,
      status: statuses[i % statuses.length],
      referralOrigin: i % 3 === 0 ? REFERRAL_ORIGINS[i % REFERRAL_ORIGINS.length] : undefined,
      referralFacility: i % 3 === 0 ? 'Puskesmas/Klinik ' + (i % 5) : undefined,
      referralLetterNumber: i % 3 === 0 ? `LTR-${i}-2024` : undefined,
      referralDate: i % 3 === 0 ? '2024-01-01' : undefined
    });
  }
  
  return patients.sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime());
};

export const MOCK_PATIENTS = generateMockPatients();
