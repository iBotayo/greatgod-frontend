'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/provider/auth-provider';
import { getPrimaryDashboardUrl } from '../../lib/auth-utils';

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthReady } = useAuth();
  const router = useRouter();
  const canAccess = currentUser?.roles.includes('AUTHOR') || currentUser?.roles.includes('ADMIN');

  useEffect(() => {
    if (isAuthReady && !currentUser) router.replace('/sign-in');
    else if (isAuthReady && currentUser && !canAccess) router.replace(getPrimaryDashboardUrl(currentUser));
  }, [canAccess, currentUser, isAuthReady, router]);

  if (!isAuthReady || !currentUser || !canAccess) return null;

  return <>{children}</>;
}
