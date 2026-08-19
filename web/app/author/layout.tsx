'use client';

import React from 'react';
import { useAuth } from '../../components/provider/auth-provider';

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-stack-lg mt-16 text-center">
        <h1 className="font-headline-lg text-primary mb-4">Authentication Required</h1>
        <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-8">
          Please use the Persona Switcher at the bottom right to select an Author or Contributor role to view the author tools.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
