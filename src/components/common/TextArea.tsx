import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ 
  label, 
  error, 
  required = true,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1.5 md:col-span-2 lg:col-span-3">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        rows={3}
        className={`w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-primary focus:border-primary transition-all text-sm ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-[10px] text-red-500 ml-1">{error}</p>}
    </div>
  );
};
