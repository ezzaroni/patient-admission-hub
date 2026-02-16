export interface Patient {
  id: string;
  nama: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokter: string;
  ruangan: string;
}

export interface PatientFormData {
  nama: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokter: string;
  ruangan: string;
}

export type SortField = "nama" | "tanggalMasuk";
export type SortOrder = "asc" | "desc";
