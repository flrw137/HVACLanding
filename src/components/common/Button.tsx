import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark-outline' | 'dark-solid';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  to,
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-button-text transition-all duration-150 rounded-lg select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeClasses = {
    sm: 'text-[13px] px-3.5 py-1.5 gap-1.5',
    md: 'text-[14px] px-5 py-2.5 gap-2',
    lg: 'text-[15px] px-6 py-3.5 gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-primary-container hover:bg-primary text-on-primary shadow-sm hover:shadow active:bg-[#8E0B20]',
    secondary: 'bg-white hover:bg-surface text-on-surface border border-structural hover:border-on-surface shadow-sm active:bg-surface-container',
    ghost: 'bg-transparent text-secondary hover:text-on-surface hover:bg-surface-container-low active:bg-surface-container',
    'dark-outline': 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm shadow-sm',
    'dark-solid': 'bg-white hover:bg-surface text-on-surface shadow-sm font-semibold',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
