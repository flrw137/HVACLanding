import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  badge?: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  badge,
  dark = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-space-sm">
          <span className="w-2 h-2 rounded-full bg-primary-container shrink-0"></span>
          <span
            className={`font-label-technical text-label-technical tracking-widest uppercase font-semibold ${
              dark ? 'text-inverse-primary' : 'text-primary'
            }`}
          >
            {eyebrow}
          </span>
          {badge}
        </div>
      )}
      <h2
        className={`font-display-xl-mobile sm:font-headline-lg lg:font-display-xl tracking-tight leading-tight mb-space-sm ${
          dark ? 'text-white' : 'text-on-surface'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`font-body-md sm:font-body-lg max-w-3xl leading-relaxed ${
            dark ? 'text-surface-dim' : 'text-secondary'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
