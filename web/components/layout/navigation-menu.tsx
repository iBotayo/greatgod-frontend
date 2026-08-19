'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../provider/auth-provider';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const { currentUser, isAuthReady, hasRole, switchUser } = useAuth();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isAuthReady) return null;

  const handleLogout = () => {
    switchUser(null);
    onClose();
  };

  const renderLinks = () => {
    if (!currentUser) {
      return (
        <>
          <div className="py-2">
            <Link href="/" onClick={onClose} className="block px-4 py-3 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Home</Link>
            <Link href="/give" onClick={onClose} className="block px-4 py-3 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Give</Link>
          </div>
          <div className="border-t border-outline-variant my-2 py-2">
            <Link href="/sign-in" onClick={onClose} className="block px-4 py-3 text-primary font-label-md uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container rounded-md transition-colors">Sign In</Link>
            <Link href="/register" onClick={onClose} className="block px-4 py-3 text-primary font-label-md uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container rounded-md transition-colors">Sign Up</Link>
          </div>
        </>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {/* Reader Links (Everyone authenticated has these implicitly or explicitly) */}
        <div className="py-2">
          <span className="px-4 text-xs font-label-sm uppercase tracking-widest text-outline mb-2 block">Discover</span>
          <Link href="/" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Home</Link>
          <Link href="/reader" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">My Library</Link>
          <Link href="/give" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Give</Link>
        </div>

        {/* Author Links */}
        {hasRole('AUTHOR') && (
          <div className="py-2 border-t border-outline-variant">
            <span className="px-4 text-xs font-label-sm uppercase tracking-widest text-outline mb-2 block">Author</span>
            <Link href="/author" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Author Dashboard</Link>
          </div>
        )}

        {/* Editor Links */}
        {hasRole('EDITOR') && (
          <div className="py-2 border-t border-outline-variant">
            <span className="px-4 text-xs font-label-sm uppercase tracking-widest text-outline mb-2 block">Editorial</span>
            <Link href="/editor" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Editor Dashboard</Link>
          </div>
        )}

        {/* Moderator Links */}
        {hasRole('MODERATOR') && (
          <div className="py-2 border-t border-outline-variant">
            <span className="px-4 text-xs font-label-sm uppercase tracking-widest text-outline mb-2 block">Moderation</span>
            <Link href="/moderator" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Moderator Dashboard</Link>
          </div>
        )}

        {/* Admin Links */}
        {hasRole('ADMIN') && (
          <div className="py-2 border-t border-outline-variant">
            <span className="px-4 text-xs font-label-sm uppercase tracking-widest text-outline mb-2 block">Administration</span>
            <Link href="/admin" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Admin Dashboard</Link>
            <Link href="/admin/users" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Users & Roles</Link>
            <Link href="/admin/content" onClick={onClose} className="block px-4 py-2 text-on-surface hover:bg-surface-bright rounded-md font-body-md transition-colors">Content & Media</Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-surface border-r border-outline-variant shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-outline-variant">
          <span className="font-display-lg text-primary text-xl">GreatGod</span>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          {renderLinks()}
        </div>

        {currentUser && (
          <div className="border-t border-outline-variant p-4 bg-surface-bright">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="font-label-md text-on-surface">{currentUser.name}</p>
                <p className="text-xs text-on-surface-variant">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="/profile" onClick={onClose} className="px-3 py-2 text-sm text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">account_circle</span> My Profile
              </Link>
              <button onClick={handleLogout} className="px-3 py-2 text-sm text-error hover:bg-error-container hover:text-on-error-container rounded-md transition-colors flex items-center gap-2 text-left w-full">
                <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
