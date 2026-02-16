import { create } from 'zustand';
import { Patient } from '../types';

interface PatientStore {
  patients: Patient[];
  selectedPatient: Patient | null;
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  setSelectedPatient: (patient: Patient | null) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  selectedPatient: null,
  
  setPatients: (patients) => set({ patients }),
  
  addPatient: (patient) => 
    set((state) => ({ 
      patients: [...state.patients, patient] 
    })),
  
  updatePatient: (id, updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...updatedPatient } : p
      ),
    })),
  
  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    })),
  
  setSelectedPatient: (patient) => 
    set({ selectedPatient: patient }),
}));
