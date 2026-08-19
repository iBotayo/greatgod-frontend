import React from 'react';

export function Divider() {
  return <div className="flourish-divider w-full"></div>;
}

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function StatusBadge({ status, className = '' }: { status: string, className?: string }) {
  let colorClass = 'bg-surface-variant text-on-surface-variant';
  
  if (status === 'PUBLISHED' || status === 'APPROVED') {
    colorClass = 'bg-secondary-container text-on-secondary-container';
  } else if (status === 'CHANGES_REQUESTED' || status === 'FAILED' || status === 'REJECTED') {
    colorClass = 'bg-error-container text-on-error-container';
  } else if (status === 'IN_REVIEW' || status === 'PROCESSING') {
    colorClass = 'bg-tertiary-container text-on-tertiary-container';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-label-sm uppercase tracking-wider ${colorClass} ${className}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

export function Input({ label, icon, className = '', ...props }: InputProps) {
  return (
    <div className={`flex flex-col gap-unit ${className}`}>
      {label && <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">{label}</label>}
      <div className="relative flex items-center border border-stone-border rounded bg-surface-container-lowest input-focus input-border-transition overflow-hidden">
        {icon && <span className="material-symbols-outlined text-outline ml-3 absolute pointer-events-none">{icon}</span>}
        <input 
          className={`w-full bg-transparent border-none py-3 ${icon ? 'pl-10' : 'pl-3'} pr-3 font-body-md text-on-surface focus:ring-0 placeholder-outline-variant outline-none`} 
          {...props} 
        />
      </div>
    </div>
  );
}
