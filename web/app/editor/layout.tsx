'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/provider/auth-provider';
import { getPrimaryDashboardUrl } from '../../lib/auth-utils';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthReady } = useAuth();
  const router = useRouter();

  const isEditor = currentUser?.roles.includes('EDITOR') || currentUser?.roles.includes('ADMIN');

  useEffect(() => {
    if (isAuthReady && !currentUser) router.replace('/sign-in');
    else if (isAuthReady && currentUser && !isEditor) router.replace(getPrimaryDashboardUrl(currentUser));
  }, [currentUser, isAuthReady, isEditor, router]);

  if (!isAuthReady || !currentUser || !isEditor) return null;

  return (
    <div className="flex flex-1 overflow-hidden bg-background text-on-background min-h-screen">
      {/* SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex flex-col p-4 gap-2 h-[calc(100vh-64px)] w-64 fixed bg-surface-container-low border-r border-outline-variant z-40 overflow-y-auto">
        <div className="mb-stack-md px-4 pt-4 flex flex-col items-center">
          <img 
            className="w-16 h-16 rounded-full object-cover mb-4 border border-outline-variant" 
            src={currentUser?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuC9iu94IVCtIVzaJOswoFmxRlih_4rvGOfjf838ySFstRIbpP42ERiMnjPfqMA6l3WdN4bWzXaMn-dDO_k61o4LO8Re6OEAleT1mxm8OMbThGP3holS2guGAEcyKTvEe4Tq-dV5LsAJfAmYoEIXM6SKrgnlamHXle955chAeB6K879PQjjhCSfAKSq6DeGqkMGaBKFrYTLoptW25Qkt65cpc-rmv7uBRjGZMoY7XuumupB6Ri4_WjWO"} 
            alt="Editor"
          />
          <h1 className="font-headline-md text-primary text-xl text-center leading-tight">GreatGod Editorial</h1>
          <p className="text-label-sm font-label-sm text-secondary mt-1">Managing Editor</p>
        </div>
        
        <nav className="flex flex-col gap-1 flex-1">
          <Link href="/editor" className="flex items-center gap-3 px-4 py-3 bg-primary-fixed-dim text-on-primary-fixed rounded-full hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-label-sm font-label-sm">Dashboard</span>
          </Link>
          <Link href="/editor/queue" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-all duration-150">
            <span className="material-symbols-outlined">pending_actions</span>
            <span className="text-label-sm font-label-sm">Review Queue</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-all duration-150">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-label-sm font-label-sm">Editorial Calendar</span>
          </Link>
          <Link href="/library" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-all duration-150">
            <span className="material-symbols-outlined">auto_stories</span>
            <span className="text-label-sm font-label-sm">Content Library</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-all duration-150">
            <span className="material-symbols-outlined">group</span>
            <span className="text-label-sm font-label-sm">Team</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-margin-mobile md:p-gutter flex flex-col min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
