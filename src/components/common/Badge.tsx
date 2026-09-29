import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'crimson' | 'dark' | 'success';
  hasPulse?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  hasPulse = false,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-label-mono-sm px-2.5 py-1 tracking-wider',
  };

  const variantClasses = {
    neutral: 'bg-surface-container-low text-secondary border border-structural',
    crimson: 'bg-[#ffdad8] text-primary border border-[#e5bdbb] font-semibold',
    dark: 'bg-inverse-surface/80 text-inverse-on-surface border border-white/10 backdrop-blur-sm',
    success: 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-label-mono-sm uppercase rounded ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {hasPulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-container"></span>
        </span>
      )}
      {children}
    </span>
  );
};
