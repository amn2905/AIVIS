import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium font-sans rounded-xl transition-all duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5 shadow-clay-sm",
    md: "px-4 py-2 text-xs md:text-sm gap-2 shadow-clay-sm",
    lg: "px-5 py-2.5 text-sm md:text-base gap-2.5 shadow-clay-md"
  };

  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/10 border border-indigo-500/20 font-semibold",
    secondary: "bg-[#F4F5F7] hover:bg-slate-200/80 text-slate-800 border border-[#E8EAF0] font-semibold",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-[#E8EAF0] shadow-clay-sm font-semibold",
    danger: "bg-rose-500 hover:bg-rose-600 text-white border border-rose-400/30 font-semibold",
    ghost: "bg-transparent hover:bg-slate-100/80 text-slate-600 font-medium"
  };

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.015 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.985 } : undefined}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...(props as any)}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
};
