import { Patient } from "@/types/patient";

const MOCK_PATIENTS: Patient[] = [
  { id: "1", nama: "Ahmad Sudrajat", nik: "3201010101010001", diagnosa: "Demam Berdarah", tanggalMasuk: "2026-02-14", dokter: "dr. Budi Santoso, Sp.PD", ruangan: "Melati 101" },
  { id: "2", nama: "Siti Nurhaliza", nik: "3201020202020002", diagnosa: "Pneumonia", tanggalMasuk: "2026-02-13", dokter: "dr. Rina Wati, Sp.P", ruangan: "Anggrek 203" },
  { id: "3", nama: "Bambang Hermawan", nik: "3201030303030003", diagnosa: "Fraktur Femur", tanggalMasuk: "2026-02-12", dokter: "dr. Agus Pratama, Sp.OT", ruangan: "Dahlia 105" },
  { id: "4", nama: "Dewi Lestari", nik: "3201040404040004", diagnosa: "Appendisitis Akut", tanggalMasuk: "2026-02-15", dokter: "dr. Hendra Wijaya, Sp.B", ruangan: "Melati 102" },
  { id: "5", nama: "Rudi Hartono", nik: "3201050505050005", diagnosa: "Stroke Iskemik", tanggalMasuk: "2026-02-10", dokter: "dr. Budi Santoso, Sp.PD", ruangan: "ICU 01" },
  { id: "6", nama: "Mega Putri", nik: "3201060606060006", diagnosa: "Diabetes Mellitus Tipe 2", tanggalMasuk: "2026-02-11", dokter: "dr. Rina Wati, Sp.P", ruangan: "Anggrek 201" },
  { id: "7", nama: "Joko Widodo", nik: "3201070707070007", diagnosa: "Gastritis Kronis", tanggalMasuk: "2026-02-09", dokter: "dr. Hendra Wijaya, Sp.B", ruangan: "Dahlia 103" },
  { id: "8", nama: "Ani Yudhoyono", nik: "3201080808080008", diagnosa: "Hipertensi Grade II", tanggalMasuk: "2026-02-16", dokter: "dr. Budi Santoso, Sp.PD", ruangan: "Melati 104" },
  { id: "9", nama: "Fajar Nugroho", nik: "3201090909090009", diagnosa: "Asma Bronkial", tanggalMasuk: "2026-02-08", dokter: "dr. Rina Wati, Sp.P", ruangan: "Anggrek 205" },
  { id: "10", nama: "Linda Kusuma", nik: "3201101010100010", diagnosa: "Infeksi Saluran Kemih", tanggalMasuk: "2026-02-07", dokter: "dr. Agus Pratama, Sp.OT", ruangan: "Dahlia 107" },
  { id: "11", nama: "Cahyo Prabowo", nik: "3201111111110011", diagnosa: "Vertigo", tanggalMasuk: "2026-02-06", dokter: "dr. Budi Santoso, Sp.PD", ruangan: "Melati 106" },
  { id: "12", nama: "Ratna Sari", nik: "3201121212120012", diagnosa: "Anemia Defisiensi Besi", tanggalMasuk: "2026-02-05", dokter: "dr. Rina Wati, Sp.P", ruangan: "Anggrek 202" },
];

export function fetchPatients(): Promise<Patient[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_PATIENTS]), 500);
  });
}

let nextId = 13;

export function addPatient(data: Omit<Patient, "id">): Promise<Patient> {
  return new Promise((resolve) => {
    const patient: Patient = { ...data, id: String(nextId++) };
    MOCK_PATIENTS.unshift(patient);
    setTimeout(() => resolve(patient), 500);
  });
}
