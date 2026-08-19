'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/provider/auth-provider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  const isAdmin = currentUser?.roles.includes('ADMIN');

  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-stack-lg mt-16 text-center">
        <h1 className="font-headline-lg text-primary mb-4">Administrator Access Required</h1>
        <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-8">
          Please use the Persona Switcher at the bottom right to select an Admin role to view the system dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden pt-16 bg-background text-on-background min-h-screen">
      {/* SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex flex-col p-4 gap-2 h-[calc(100vh-64px)] w-64 fixed bg-surface-container-low border-r border-outline-variant z-40 overflow-y-auto">
        <div className="mb-stack-md px-4 pt-4 flex flex-col items-start border-b border-outline-variant pb-8">
          <h1 className="font-headline-md text-headline-md font-medium text-primary">GreatGod</h1>
          <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mt-1">Editorial CMS</p>
        </div>
        
        <div className="px-2 mb-6">
          <button className="w-full bg-primary-container text-on-primary rounded-lg py-3 px-4 font-label-sm text-label-sm flex items-center justify-center gap-2 hover:bg-surface-tint transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Publication
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1 px-2">
          <Link href="/admin" className="text-primary font-bold border-r-2 border-primary opacity-80 duration-150 flex items-center gap-3 px-3 py-2 -mx-4 ml-0 pl-4 bg-surface-container">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="font-label-sm text-label-sm">Dashboard</span>
          </Link>
          <Link href="#" className="text-secondary hover:bg-surface-container transition-colors flex items-center gap-3 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined">auto_stories</span>
            <span className="font-label-sm text-label-sm">Content Manager</span>
          </Link>
          <Link href="#" className="text-secondary hover:bg-surface-container transition-colors flex items-center gap-3 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined">perm_media</span>
            <span className="font-label-sm text-label-sm">Media Library</span>
          </Link>
          <Link href="#" className="text-secondary hover:bg-surface-container transition-colors flex items-center gap-3 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined">group</span>
            <span className="font-label-sm text-label-sm">User Management</span>
          </Link>
          <Link href="#" className="text-secondary hover:bg-surface-container transition-colors flex items-center gap-3 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </Link>
          <Link href="#" className="text-secondary hover:bg-surface-container transition-colors flex items-center gap-3 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined">manage_accounts</span>
            <span className="font-label-sm text-label-sm">Role Management</span>
          </Link>
          <Link href="#" className="text-secondary hover:bg-surface-container transition-colors flex items-center gap-3 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined">payments</span>
            <span className="font-label-sm text-label-sm">Donation Reports</span>
          </Link>
          <Link href="#" className="text-secondary hover:bg-surface-container transition-colors flex items-center gap-3 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="font-label-sm text-label-sm">Audit Log</span>
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
