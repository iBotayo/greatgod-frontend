'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../provider/auth-provider';
import { useDb } from '../provider/db-provider';
import { NotificationBadge } from '../notifications/notification-badge';
import { NavigationMenu } from './navigation-menu';
import { performGlobalSearch, SearchResult } from '../../lib/search';

export function TopAppBar() {
  const router = useRouter();
  const { currentUser, isAuthReady } = useAuth();
  const { db } = useDb();
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSuggestions([]);
      }
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSuggestions([]);
      }
    };
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() === '') {
      setSuggestions([]);
    } else {
      setSuggestions(performGlobalSearch(db, val).slice(0, 5)); // show max 5 suggestions
    }
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

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
          
          <div className="relative flex items-center" ref={searchContainerRef}>
            {isSearchOpen ? (
              <div className="flex items-center bg-surface-container-low rounded-full px-3 py-1 shadow-sm w-48 sm:w-64 transition-all z-50 ring-1 ring-outline-variant">
                <span className="material-symbols-outlined text-secondary text-sm mr-2">search</span>
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                  <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-full bg-transparent border-none text-sm font-body-md focus:outline-none focus:ring-0 text-on-surface p-0"
                  />
                </form>
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSuggestions([]); }} className="text-secondary hover:text-on-surface p-1 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                
                {suggestions.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-surface-paper border border-outline-variant rounded-xl shadow-lg overflow-hidden flex flex-col">
                    {suggestions.map(s => (
                      <Link 
                        key={s.id} 
                        href={s.url} 
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSuggestions([]); }}
                        className="p-3 border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low transition-colors text-left"
                      >
                        <span className="block font-label-sm text-secondary uppercase text-[10px] tracking-wider mb-1">{s.type}</span>
                        <span className="block font-headline-sm text-sm text-on-surface mb-1 truncate">{s.title}</span>
                        {s.excerpt && <span className="block font-body-md text-xs text-on-surface-variant truncate">{s.excerpt}</span>}
                      </Link>
                    ))}
                    <button 
                      onClick={handleSearchSubmit} 
                      className="p-3 bg-surface-container-lowest text-primary text-sm font-label-sm hover:bg-surface-bright transition-colors text-center"
                    >
                      View all results
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)} 
                title="Search" 
                className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center"
              >
                <span aria-hidden="true" className="material-symbols-outlined">search</span>
              </button>
            )}
          </div>

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
