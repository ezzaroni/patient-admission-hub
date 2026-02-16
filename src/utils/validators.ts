import { FormValues } from '../types';

export type ValidationErrors = Partial<Record<keyof FormValues, string>>;

export const validatePatientForm = (values: FormValues): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!values.name.trim()) errors.name = 'Wajib diisi';
  if (values.nik.length !== 16) errors.nik = 'NIK harus 16 digit';
  if (!values.phone) errors.phone = 'Wajib diisi';
  if (!values.dob) errors.dob = 'Wajib diisi';
  if (!values.doctor) errors.doctor = 'Pilih dokter';
  if (!values.roomName) errors.roomName = 'Wajib diisi';
  
  if (values.entryWay === 'Rujukan Luar') {
    if (!values.referralFacility) errors.referralFacility = 'Wajib diisi';
    if (!values.referralLetterNumber) errors.referralLetterNumber = 'Wajib diisi';
  }

  return errors;
};
