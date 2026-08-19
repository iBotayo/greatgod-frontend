'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/provider/auth-provider';

export default function ModeratorLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  const isModerator = currentUser?.roles.includes('MODERATOR') || currentUser?.roles.includes('ADMIN');

  if (!isModerator) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-stack-lg mt-16 text-center">
        <h1 className="font-headline-lg text-primary mb-4">Moderator Access Required</h1>
        <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-8">
          Please use the Persona Switcher at the bottom right to select a Moderator or Admin role to view the moderation tools.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden pt-16 bg-background text-on-background min-h-screen">
      {/* SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex flex-col p-4 gap-2 h-[calc(100vh-64px)] w-64 fixed bg-surface-container-low border-r border-outline-variant z-40 overflow-y-auto">
        <div className="mb-stack-md px-4 pt-4 flex flex-col items-center border-b border-outline-variant pb-8">
          <h1 className="font-headline-md text-primary text-xl text-center leading-tight">Editorial Suite</h1>
          <p className="text-label-sm font-label-sm text-on-surface-variant opacity-80 mt-1">Community Oversight</p>
        </div>
        
        <div className="px-2 mb-6">
          <button className="w-full bg-primary-container text-on-primary rounded-lg py-2 px-4 font-label-sm text-label-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Report
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1 px-2">
          <Link href="/moderator" className="flex items-center gap-3 px-4 py-3 text-primary border-l-4 border-primary bg-surface-container-high font-label-sm text-label-sm rounded-r-lg transition-colors duration-150 ease-in-out">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link href="/moderator/queue" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-150 ease-in-out rounded-lg">
            <span className="material-symbols-outlined">forum</span>
            Moderation Queue
          </Link>
          <Link href="#" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-150 ease-in-out rounded-lg">
            <span className="material-symbols-outlined">flag</span>
            Flagged Content
          </Link>
          <Link href="#" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-150 ease-in-out rounded-lg">
            <span className="material-symbols-outlined">history</span>
            User Logs
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen overflow-y-auto">
        <div className="p-margin-mobile md:p-gutter max-w-container-max w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
