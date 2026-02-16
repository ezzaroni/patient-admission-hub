# State Management dengan Zustand

## Overview

Project ini menggunakan Zustand untuk state management yang lightweight, simple, dan performant.

## Stores

### 1. Patient Store (`usePatientStore`)

Mengelola data pasien di aplikasi.

```typescript
import { usePatientStore } from '@/store';

// Get state
const patients = usePatientStore((state) => state.patients);
const selectedPatient = usePatientStore((state) => state.selectedPatient);

// Get actions
const { addPatient, updatePatient, deletePatient } = usePatientStore();
```

#### Available State
- `patients: Patient[]` - Array semua pasien
- `selectedPatient: Patient | null` - Pasien yang sedang dipilih

#### Available Actions
- `setPatients(patients: Patient[])` - Set semua pasien
- `addPatient(patient: Patient)` - Tambah pasien baru
- `updatePatient(id: string, patient: Partial<Patient>)` - Update data pasien
- `deletePatient(id: string)` - Hapus pasien
- `setSelectedPatient(patient: Patient | null)` - Set pasien yang dipilih

### 2. App Store (`useAppStore`)

Mengelola state aplikasi global seperti navigation dan UI state.

```typescript
import { useAppStore } from '@/store';

// Get state
const currentView = useAppStore((state) => state.currentView);
const sidebarOpen = useAppStore((state) => state.sidebarOpen);

// Get actions
const { setCurrentView, toggleSidebar } = useAppStore();
```

#### Available State
- `currentView: 'dashboard' | 'admission' | 'patients'` - View yang aktif
- `sidebarOpen: boolean` - Status sidebar

#### Available Actions
- `setCurrentView(view)` - Ganti view aktif
- `toggleSidebar()` - Toggle sidebar open/close
- `setSidebarOpen(open: boolean)` - Set sidebar state

## Usage Examples

### Example 1: Menambah Pasien

```typescript
import { usePatientStore } from '@/store';
import { generateId } from '@/utils';

const AdmissionForm = () => {
  const addPatient = usePatientStore((state) => state.addPatient);
  
  const handleSubmit = (formData) => {
    const newPatient = {
      id: generateId(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    
    addPatient(newPatient);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Example 2: Menampilkan List Pasien

```typescript
import { usePatientStore } from '@/store';

const PatientList = () => {
  const patients = usePatientStore((state) => state.patients);
  const setSelectedPatient = usePatientStore((state) => state.setSelectedPatient);
  
  return (
    <div>
      {patients.map((patient) => (
        <div 
          key={patient.id}
          onClick={() => setSelectedPatient(patient)}
        >
          {patient.name}
        </div>
      ))}
    </div>
  );
};
```

### Example 3: Update Pasien

```typescript
import { usePatientStore } from '@/store';

const PatientDetails = ({ patientId }) => {
  const updatePatient = usePatientStore((state) => state.updatePatient);
  
  const handleUpdate = (updates) => {
    updatePatient(patientId, updates);
  };
  
  return <form onSubmit={handleUpdate}>...</form>;
};
```

### Example 4: Navigation dengan App Store

```typescript
import { useAppStore } from '@/store';

const Navigation = () => {
  const currentView = useAppStore((state) => state.currentView);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  
  return (
    <nav>
      <button 
        onClick={() => setCurrentView('dashboard')}
        className={currentView === 'dashboard' ? 'active' : ''}
      >
        Dashboard
      </button>
      <button 
        onClick={() => setCurrentView('admission')}
        className={currentView === 'admission' ? 'active' : ''}
      >
        Admission
      </button>
    </nav>
  );
};
```

## Best Practices

### 1. Selective Subscription

Hanya subscribe ke state yang dibutuhkan untuk menghindari unnecessary re-renders:

```typescript
// ❌ Bad - subscribes to entire store
const store = usePatientStore();

// ✅ Good - subscribes only to patients
const patients = usePatientStore((state) => state.patients);
```

### 2. Separate Actions

Destructure actions terpisah dari state:

```typescript
// ✅ Good
const patients = usePatientStore((state) => state.patients);
const { addPatient, deletePatient } = usePatientStore();
```

### 3. Computed Values

Untuk derived state, gunakan useMemo:

```typescript
import { useMemo } from 'react';
import { usePatientStore } from '@/store';

const Dashboard = () => {
  const patients = usePatientStore((state) => state.patients);
  
  const totalPatients = useMemo(
    () => patients.length,
    [patients]
  );
  
  const activePatients = useMemo(
    () => patients.filter(p => p.status === 'active').length,
    [patients]
  );
  
  return <div>Total: {totalPatients}, Active: {activePatients}</div>;
};
```

### 4. Async Actions

Untuk operasi async, buat custom hooks:

```typescript
import { usePatientStore } from '@/store';

export const usePatientActions = () => {
  const { setPatients, addPatient } = usePatientStore();
  
  const fetchPatients = async () => {
    const response = await fetch('/api/patients');
    const data = await response.json();
    setPatients(data);
  };
  
  const createPatient = async (patientData) => {
    const response = await fetch('/api/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
    const newPatient = await response.json();
    addPatient(newPatient);
  };
  
  return { fetchPatients, createPatient };
};
```

## Debugging

Zustand memiliki DevTools support. Install Redux DevTools extension dan tambahkan middleware:

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const usePatientStore = create(
  devtools(
    (set) => ({
      // ... store implementation
    }),
    { name: 'PatientStore' }
  )
);
```

## Migration dari useState/useContext

Jika sebelumnya menggunakan useState atau Context API:

```typescript
// Before (useState)
const [patients, setPatients] = useState([]);

// After (Zustand)
const patients = usePatientStore((state) => state.patients);
const setPatients = usePatientStore((state) => state.setPatients);
```

## Performance Tips

1. Gunakan shallow comparison untuk objects/arrays
2. Split stores berdasarkan domain (patient, app, etc.)
3. Avoid storing derived state
4. Use selectors untuk computed values
5. Memoize expensive computations dengan useMemo

## Resources

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Zustand Best Practices](https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions)
