import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
      <Header />
      <div className="flex-1 w-full max-w-full px-8 py-6">
        {children}
        <Footer />
      </div>
    </main>
  );
};
