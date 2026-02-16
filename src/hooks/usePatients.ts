import { useState, useEffect, useCallback } from 'react';
import { Patient, FormValues } from '../types';
import { MOCK_PATIENTS } from '../constants';
import { generateUID } from '../utils';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPatients(MOCK_PATIENTS);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const addPatient = useCallback((formData: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      const newPatient: Patient = {
        ...formData,
        id: generateUID(),
        status: 'Stabil'
      };
      setPatients(prev => [newPatient, ...prev]);
      setLoading(false);
    }, 500);
  }, []);

  const updatePatient = useCallback((id: string, formData: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      setPatients(prev => prev.map(p => p.id === id ? { ...p, ...formData } : p));
      setLoading(false);
    }, 500);
  }, []);

  return {
    patients,
    loading,
    fetchPatients,
    addPatient,
    updatePatient
  };
};
