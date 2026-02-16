import { create } from 'zustand';

interface AppStore {
  currentView: 'dashboard' | 'admission' | 'patients';
  sidebarOpen: boolean;
  setCurrentView: (view: 'dashboard' | 'admission' | 'patients') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentView: 'dashboard',
  sidebarOpen: true,
  
  setCurrentView: (view) => set({ currentView: view }),
  
  toggleSidebar: () => 
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => 
    set({ sidebarOpen: open }),
}));
