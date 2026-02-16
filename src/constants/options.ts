import { RoomClass, EntryWay, PaymentMethod } from '../types';

export const DOCTORS = [
  'dr. Kennedy Jones, Sp.PD',
  'dr. Lillie Koss, Sp.B',
  'dr. Amelia Toy, Sp.JP',
  'dr. Julius Kihn, Sp.OT',
  'dr. Siti Aminah, Sp.A',
  'dr. Hendra Wijaya, Sp.An'
];

export const ROOM_CLASSES: RoomClass[] = ['VVIP', 'VIP', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'ICU'];
export const ENTRY_WAYS: EntryWay[] = ['IGD', 'Rawat Jalan-Poli', 'Rujukan Luar'];
export const PAYMENT_METHODS: PaymentMethod[] = ['Umum-Pribadi', 'BPJS Kesehatan', 'Asuransi Swasta', 'Jaminan Perusahaan'];
export const REFERRAL_ORIGINS = ['Puskesmas', 'RS Lain', 'Klinik', 'Dokter Pribadi'];
export const RELATIONS = ['Suami', 'Istri', 'Orang Tua', 'Anak', 'Saudara', 'Lainnya'];
export const ROOMS = ['Paviliun Anggrek', 'Bangsal Mawar', 'Ruang Melati', 'Unit Teratai', 'ICU Central'];
