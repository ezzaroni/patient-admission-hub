import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-10 text-center text-text-muted-light dark:text-text-muted-dark text-[10px]">
      <div className="space-y-4">
        <div className="h-[1px] bg-slate-100 dark:bg-slate-800 w-full"></div>
        <p className="uppercase tracking-[0.2em] font-bold opacity-60">
          © 2024 Medinest Healthcare SIMRS • Integrated Hospital Solutions
        </p>
      </div>
    </footer>
  );
};
