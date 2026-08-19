'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../provider/auth-provider';
import { NotificationBadge } from '../notifications/notification-badge';
import { NavigationMenu } from './navigation-menu';

export function TopAppBar() {
  const { currentUser, isAuthReady } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-40 flex justify-between items-center px-margin-mobile md:px-stack-lg h-16 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline duration-200 ease-in-out">
        <button 
          onClick={() => setIsNavOpen(true)}
          className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center"
          aria-label="Open navigation menu"
          aria-expanded={isNavOpen}
        >
          <span aria-hidden="true" className="material-symbols-outlined">menu</span>
        </button>
        
        <Link href="/" className="font-display-lg text-headline-lg-mobile text-primary dark:text-primary-fixed-dim tracking-tight">
          GreatGod
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/give" title="Give" className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined">volunteer_activism</span>
          </Link>
          <Link href="/search" title="Search" className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined">search</span>
          </Link>
          {isAuthReady && currentUser ? (
            <div className="flex items-center gap-1">
              <Link href="/give/manage" title="Manage Stewardship" className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center">
                 <span aria-hidden="true" className="material-symbols-outlined">receipt_long</span>
              </Link>
              <NotificationBadge />
              <Link href="/profile" title="My Profile" aria-label="My Profile" className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center">
                 <span aria-hidden="true" className="material-symbols-outlined">account_circle</span>
              </Link>
            </div>
          ) : (
            <Link href="/sign-in" className="text-sm font-label-sm uppercase tracking-widest text-primary px-3 py-2 hover:bg-surface-container-low rounded">
              Sign In
            </Link>
          )}
        </div>
      </header>
      <NavigationMenu isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
