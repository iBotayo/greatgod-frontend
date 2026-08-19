'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../provider/auth-provider';

export function TopAppBar() {
  const { currentUser } = useAuth();

  return (
    <header className="fixed top-0 w-full z-40 flex justify-between items-center px-margin-mobile md:px-stack-lg h-16 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline duration-200 ease-in-out">
      <button className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center">
        <span aria-hidden="true" className="material-symbols-outlined">menu</span>
      </button>
      
      <Link href="/" className="font-display-lg text-headline-lg-mobile text-primary dark:text-primary-fixed-dim tracking-tight">
        GreatGod
      </Link>
      
      <div className="flex items-center gap-2">
        <button className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center">
          <span aria-hidden="true" className="material-symbols-outlined">search</span>
        </button>
        {currentUser ? (
          <Link href="/reader" className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center">
             <span aria-hidden="true" className="material-symbols-outlined">account_circle</span>
          </Link>
        ) : (
          <Link href="/sign-in" className="text-sm font-label-sm uppercase tracking-widest text-primary px-3 py-2 hover:bg-surface-container-low rounded">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
