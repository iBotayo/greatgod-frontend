'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/provider/auth-provider';

export default function ReaderLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && !currentUser) {
      router.replace('/sign-in');
    }
  }, [currentUser, isAuthReady, router]);

  if (!isAuthReady || !currentUser) return null;

  return <>{children}</>;
}
