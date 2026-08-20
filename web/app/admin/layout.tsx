'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/provider/auth-provider';
import { getPrimaryDashboardUrl } from '../../lib/auth-utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthReady } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = currentUser?.roles.includes('ADMIN');

  useEffect(() => {
    if (isAuthReady && !currentUser) router.replace('/sign-in');
    else if (isAuthReady && currentUser && !isAdmin) router.replace(getPrimaryDashboardUrl(currentUser));
  }, [currentUser, isAdmin, isAuthReady, router]);

  if (!isAuthReady || !currentUser || !isAdmin) return null;

  return (
    <div className="flex flex-1 overflow-hidden bg-background text-on-background min-h-screen">
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
          <Link href="/admin" className={`${pathname === '/admin' ? 'text-primary font-bold border-r-2 border-primary bg-surface-container -mx-4 ml-0 pl-4 opacity-80' : 'text-secondary hover:bg-surface-container px-3 rounded-lg'} duration-150 flex items-center gap-3 py-2 transition-colors`}>
            <span className="material-symbols-outlined" style={pathname === '/admin' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
            <span className="font-label-sm text-label-sm">Dashboard</span>
          </Link>
          <Link href="/admin/users" className={`${pathname === '/admin/users' ? 'text-primary font-bold border-r-2 border-primary bg-surface-container -mx-4 ml-0 pl-4 opacity-80' : 'text-secondary hover:bg-surface-container px-3 rounded-lg'} duration-150 flex items-center gap-3 py-2 transition-colors`}>
            <span className="material-symbols-outlined" style={pathname === '/admin/users' ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
            <span className="font-label-sm text-label-sm">User Management</span>
          </Link>
          <Link href="/admin/roles" className={`${pathname === '/admin/roles' ? 'text-primary font-bold border-r-2 border-primary bg-surface-container -mx-4 ml-0 pl-4 opacity-80' : 'text-secondary hover:bg-surface-container px-3 rounded-lg'} duration-150 flex items-center gap-3 py-2 transition-colors`}>
            <span className="material-symbols-outlined" style={pathname === '/admin/roles' ? { fontVariationSettings: "'FILL' 1" } : {}}>manage_accounts</span>
            <span className="font-label-sm text-label-sm">Role Management</span>
          </Link>
          <Link href="/admin/content" className={`${pathname === '/admin/content' ? 'text-primary font-bold border-r-2 border-primary bg-surface-container -mx-4 ml-0 pl-4 opacity-80' : 'text-secondary hover:bg-surface-container px-3 rounded-lg'} duration-150 flex items-center gap-3 py-2 transition-colors`}>
            <span className="material-symbols-outlined" style={pathname === '/admin/content' ? { fontVariationSettings: "'FILL' 1" } : {}}>auto_stories</span>
            <span className="font-label-sm text-label-sm">Content Manager</span>
          </Link>
          <Link href="/admin/media" className={`${pathname === '/admin/media' ? 'text-primary font-bold border-r-2 border-primary bg-surface-container -mx-4 ml-0 pl-4 opacity-80' : 'text-secondary hover:bg-surface-container px-3 rounded-lg'} duration-150 flex items-center gap-3 py-2 transition-colors`}>
            <span className="material-symbols-outlined" style={pathname === '/admin/media' ? { fontVariationSettings: "'FILL' 1" } : {}}>perm_media</span>
            <span className="font-label-sm text-label-sm">Media Library</span>
          </Link>
          <Link href="/admin/taxonomy" className={`${pathname === '/admin/taxonomy' ? 'text-primary font-bold border-r-2 border-primary bg-surface-container -mx-4 ml-0 pl-4 opacity-80' : 'text-secondary hover:bg-surface-container px-3 rounded-lg'} duration-150 flex items-center gap-3 py-2 transition-colors`}>
            <span className="material-symbols-outlined" style={pathname === '/admin/taxonomy' ? { fontVariationSettings: "'FILL' 1" } : {}}>label</span>
            <span className="font-label-sm text-label-sm">Taxonomy</span>
          </Link>
          <Link href="/admin/audit" className={`${pathname === '/admin/audit' ? 'text-primary font-bold border-r-2 border-primary bg-surface-container -mx-4 ml-0 pl-4 opacity-80' : 'text-secondary hover:bg-surface-container px-3 rounded-lg'} duration-150 flex items-center gap-3 py-2 transition-colors`}>
            <span className="material-symbols-outlined" style={pathname === '/admin/audit' ? { fontVariationSettings: "'FILL' 1" } : {}}>receipt_long</span>
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
