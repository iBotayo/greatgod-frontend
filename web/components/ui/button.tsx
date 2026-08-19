import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-label-lg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-on-primary-fixed focus:ring-primary',
    secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed focus:ring-secondary',
    outline: 'border border-outline text-primary hover:bg-surface-container focus:ring-primary',
    ghost: 'text-primary hover:bg-surface-container-low focus:ring-primary',
    destructive: 'bg-error text-on-error hover:bg-on-error-container focus:ring-error',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
