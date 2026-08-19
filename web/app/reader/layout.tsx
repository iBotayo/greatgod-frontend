'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/provider/auth-provider';

export default function ReaderLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      // In a real app we'd redirect to sign-in, but since we have a persona switcher, 
      // we just show a message if they aren't logged in.
      // router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-stack-lg mt-16 text-center">
        <h1 className="font-headline-lg text-primary mb-4">Authentication Required</h1>
        <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-8">
          Please use the Persona Switcher at the bottom right to select a Reader or Author role to view the dashboard.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
