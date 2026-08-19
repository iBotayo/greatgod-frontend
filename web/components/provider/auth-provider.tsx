'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../../types';
import { useDb } from './db-provider';

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchUser: (userId: string | null) => void;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { db } = useDb();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [mounted, setMounted] = useState(false);

  if (!mounted && typeof window !== 'undefined') {
    setMounted(true);
    const savedUserId = localStorage.getItem('greatgod_mock_user_id');
    if (savedUserId) {
      const user = db.users.find(u => u.id === savedUserId);
      if (user) {
        setCurrentUser(user);
      }
    }
  }

  const switchUser = (userId: string | null) => {
    if (!userId) {
      setCurrentUser(null);
      localStorage.removeItem('greatgod_mock_user_id');
      return;
    }
    const user = db.users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('greatgod_mock_user_id', user.id);
    }
  };

  const hasRole = (role: Role) => {
    if (!currentUser) return role === 'GUEST';
    return currentUser.roles.includes(role);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, switchUser, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
