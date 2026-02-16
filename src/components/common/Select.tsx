import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  error, 
  required = true,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select 
        className={`w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-primary focus:border-primary transition-all text-sm appearance-none ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-[10px] text-red-500 ml-1">{error}</p>}
    </div>
  );
};
