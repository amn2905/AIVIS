import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  onClick
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={clsx(
        "bg-white border border-[#E8EAF0] rounded-[20px] shadow-clay-md transition-all duration-200 overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={clsx("p-5 md:p-6 border-b border-[#E8EAF0] flex items-center justify-between bg-white/50", className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <h3 className={clsx("text-sm md:text-base font-bold text-[#111827] tracking-tight font-sans", className)}>
    {children}
  </h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={clsx("p-5 md:p-6", className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={clsx("p-4 md:p-5 border-t border-[#E8EAF0] bg-[#F4F5F7]/50 rounded-b-[20px] flex items-center justify-between", className)}>
    {children}
  </div>
);
