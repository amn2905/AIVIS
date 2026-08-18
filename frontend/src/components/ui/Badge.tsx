import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  dot = false
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs"
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    warning: "bg-amber-50 text-amber-800 border-amber-200/80",
    danger: "bg-rose-50 text-rose-800 border-rose-200/80",
    info: "bg-sky-50 text-sky-800 border-sky-200/80",
    purple: "bg-purple-50 text-purple-800 border-purple-200/80"
  };

  const dotColors = {
    default: "bg-slate-400",
    primary: "bg-indigo-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-sky-500",
    purple: "bg-purple-500"
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-semibold font-mono rounded-full border shadow-2xs transition-colors select-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0 animate-pulse", dotColors[variant])} />
      )}
      <span>{children}</span>
    </span>
  );
};

export const ClaimStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let variant: 'success' | 'warning' | 'danger' | 'primary' | 'info' = 'warning';
  if (status === 'APPROVED' || status === 'CLOSED_APPROVED') variant = 'success';
  if (status === 'REJECTED' || status === 'DENIED' || status === 'FRAUD_CONFIRMED') variant = 'danger';
  if (status === 'UNDER_INVESTIGATION') variant = 'warning';
  return <Badge variant={variant} dot>{status}</Badge>;
};

export const RiskBadge: React.FC<{ level: string; score?: number }> = ({ level, score }) => {
  let variant: 'success' | 'warning' | 'danger' | 'purple' = 'success';

  if (level === 'CRITICAL' || level === 'FRAUDULENT' || (score && score > 80)) {
    variant = 'danger';
  } else if (level === 'HIGH' || level === 'SUSPICIOUS' || (score && score > 50)) {
    variant = 'warning';
  } else if (level === 'MEDIUM') {
    variant = 'purple';
  }

  return (
    <Badge variant={variant} dot>
      {level} {score !== undefined ? `(${score})` : ''}
    </Badge>
  );
};
