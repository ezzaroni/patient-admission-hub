import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-40">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-text-muted-light font-bold uppercase tracking-[0.2em] animate-pulse">
        Sinkronisasi Data SIMRS...
      </p>
    </div>
  );
};
