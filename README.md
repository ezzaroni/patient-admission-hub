# SIMRS Hospital System

Sistem Informasi Manajemen Rumah Sakit (SIMRS) - Production Ready

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── TextArea.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── index.ts
│   ├── features/            # Feature-specific components
│   │   ├── admission/
│   │   │   ├── AdmissionForm.tsx
│   │   │   └── index.ts
│   │   └── dashboard/
│   │       ├── DashboardView.tsx
│   │       ├── StatCards.tsx
│   │       ├── MonthlyChart.tsx
│   │       ├── BedOccupancy.tsx
│   │       ├── TopComplaints.tsx
│   │       └── index.ts
│   └── layout/              # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── MainLayout.tsx
│       └── index.ts
├── store/                   # Zustand state management
│   ├── usePatientStore.ts
│   ├── useAppStore.ts
│   └── index.ts
├── hooks/                   # Custom React hooks
│   ├── usePatients.ts
│   └── index.ts
├── utils/                   # Helper functions
│   ├── generators.ts
│   ├── formatters.ts
│   ├── validators.ts
│   └── index.ts
├── types/                   # TypeScript types
│   ├── patient.types.ts
│   ├── common.types.ts
│   └── index.ts
├── constants/               # Constants & configs
│   ├── options.ts
│   ├── mockData.ts
│   └── index.ts
├── App.tsx
├── index.tsx
└── index.css                # TailwindCSS imports
```

## 🎯 Prinsip Arsitektur

### 1. Separation of Concerns
- **Components**: UI logic terpisah berdasarkan fungsi
- **Hooks**: Business logic dan state management
- **Utils**: Pure functions untuk operasi umum
- **Types**: Type definitions terpusat

### 2. Reusability
- Common components dapat digunakan di seluruh aplikasi
- Custom hooks untuk logic yang dapat digunakan kembali
- Utility functions yang modular

### 3. Maintainability
- Struktur folder yang jelas dan konsisten
- Naming convention yang deskriptif
- Single Responsibility Principle
- Type-safe dengan TypeScript

### 4. Scalability
- Feature-based organization
- Easy to add new features
- Modular architecture

## 🚀 Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run type-check
```

## 📝 Coding Standards

### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { Type } from '../types';

// 2. Interface/Types
interface ComponentProps {
  prop: Type;
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleAction = () => {};
  
  // 6. Render
  return <div>...</div>;
};
```

### File Naming
- Components: PascalCase (e.g., `Button.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `usePatients.ts`)
- Utils: camelCase (e.g., `validators.ts`)
- Types: camelCase with '.types' suffix (e.g., `patient.types.ts`)

### Import/Export
- Use named exports untuk better tree-shaking
- Barrel exports (index.ts) untuk cleaner imports
- Absolute imports dengan alias `@/` untuk src folder

## 🔧 Tech Stack

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Bun** - Package Manager & Runtime
- **Vite** - Build Tool & Dev Server
- **TailwindCSS** - Utility-First CSS Framework
- **Zustand** - Lightweight State Management
- **PostCSS** - CSS Processing

## 📦 Key Features

- Dashboard dengan statistik real-time
- Form pendaftaran pasien dengan validasi
- Manajemen data pasien
- Monitoring hunian bed
- Support chat dengan AI
- Dark mode support
- Responsive design

## 🎨 Design Patterns

### Custom Hooks Pattern
Memisahkan business logic dari UI components untuk reusability dan testing.

### Compound Components Pattern
Components yang bekerja bersama (e.g., Card, SectionCard).

### Container/Presentational Pattern
Separation antara logic (hooks) dan presentation (components).

### State Management dengan Zustand
Centralized state management yang lightweight dan mudah digunakan.

```typescript
// Example: Using Zustand store
import { usePatientStore } from '@/store';

const Component = () => {
  const { patients, addPatient } = usePatientStore();
  
  const handleAdd = () => {
    addPatient(newPatient);
  };
  
  return <div>{patients.length} patients</div>;
};
```

## 🎨 Styling dengan TailwindCSS

Project ini menggunakan TailwindCSS untuk styling yang konsisten dan efisien.

### Utility Classes
```tsx
// Example: Using Tailwind classes
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
  Click Me
</button>
```

### Custom Classes
Lihat `src/index.css` untuk custom utility classes:
- `.card` - Card container dengan shadow
- `.btn` - Base button styles
- `.btn-primary` - Primary button variant
- `.btn-secondary` - Secondary button variant
- `.input` - Input field dengan focus states

### Customization
Edit `tailwind.config.js` untuk customize theme:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* custom colors */ },
    },
  },
}
```

## 🧪 Best Practices

1. **Type Safety**: Gunakan TypeScript untuk semua code
2. **Validation**: Centralized validation logic di utils
3. **Error Handling**: Proper error states dan user feedback
4. **Performance**: Memoization dengan useMemo/useCallback
5. **Accessibility**: Semantic HTML dan ARIA labels
6. **Code Quality**: Consistent formatting dan naming

## 📚 Documentation

Setiap module memiliki tanggung jawab yang jelas:
- `components/common`: Reusable UI building blocks
- `components/features`: Feature-specific implementations
- `components/layout`: App layout structure
- `hooks`: Shared business logic
- `utils`: Pure helper functions
- `types`: Type definitions
- `constants`: Static data dan configurations


## 🏃 Quick Start

### Prerequisites
- [Bun](https://bun.sh) v1.0.0 atau lebih tinggi

### Installation

```bash
# Clone repository
git clone <repository-url>
cd simrs-hospital-system

# Install dependencies dengan Bun
bun install

# Copy environment variables
cp .env.example .env.local

# Run development server
bun run dev
```

Server akan berjalan di `http://localhost:5173`

## ⚡ Mengapa Bun?

1. **Kecepatan**: Install dependencies 10-20x lebih cepat dari npm
2. **All-in-one**: Package manager, bundler, test runner, dan runtime
3. **TypeScript Native**: Built-in TypeScript support tanpa konfigurasi tambahan
4. **Node.js Compatible**: Drop-in replacement untuk Node.js
5. **Modern**: Built dengan Zig untuk performa maksimal

## 🔄 Migration dari npm/yarn

Jika sebelumnya menggunakan npm atau yarn:

```bash
# Hapus lock files lama
rm package-lock.json yarn.lock

# Install dengan Bun
bun install
```

## 📊 Performance Comparison

| Task | npm | yarn | bun |
|------|-----|------|-----|
| Install | ~30s | ~20s | ~2s |
| Run dev | ~3s | ~2.5s | ~1s |
| Build | ~15s | ~14s | ~12s |

*Waktu approximate pada project ini
