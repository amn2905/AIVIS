import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full space-y-1 font-sans">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 font-sans">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full bg-[#F4F5F7]/80 hover:bg-[#F4F5F7] focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs md:text-sm font-sans rounded-xl border border-[#E8EAF0] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 shadow-clay-inset",
            icon ? "pl-9 pr-3.5 py-2" : "px-3.5 py-2",
            error && "border-rose-400 focus:ring-rose-500/20 focus:border-rose-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[11px] text-rose-500 font-medium font-sans mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
